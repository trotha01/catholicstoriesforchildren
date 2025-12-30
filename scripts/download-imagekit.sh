#!/usr/bin/env bash
set -euo pipefail

# Script: download-imagekit.sh
# Purpose: Find all ik.imagekit.io URLs in the repository and download them
# into ./assets/images/imagekit preserving the filename (query string removed).
# Usage: ./scripts/download-imagekit.sh

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
# Save into public so files are served from /public/static/assets/...
TARGET_DIR="$ROOT_DIR/public/static/assets/images/imagekit"

mkdir -p "$TARGET_DIR"

# Find URLs. Exclude elm-stuff, dist, node_modules, .git by filtering results.
# Use a temp file and a POSIX-friendly read loop so the script works on macOS
# (bash 3) which doesn't have `mapfile`, and with BSD grep which may not
# support --exclude-dir.
URL_TMPFILE=$(mktemp)
grep -Rho "https://ik.imagekit.io[^\"'[:space:]\)>]*" "$ROOT_DIR" 2>/dev/null \
  | grep -v -E "elm-stuff|/dist/|node_modules|/.git/" \
  | sort -u > "$URL_TMPFILE"

URLS=()
while IFS= read -r line || [ -n "$line" ]; do
  # Only accept well-formed ImageKit URLs that start with the expected host
  case "$line" in
    https://ik.imagekit.io/*)
      URLS+=("$line")
      ;;
    *)
      echo "Skipping invalid or malformed match: $line" >&2
      ;;
  esac
done < "$URL_TMPFILE"
rm -f "$URL_TMPFILE"

if [ ${#URLS[@]} -eq 0 ]; then
  echo "No ImageKit URLs found in repository." >&2
  exit 0
fi

echo "Found ${#URLS[@]} unique ImageKit URLs. Starting downloads..."

failed=()
count=0
for url in "${URLS[@]}"; do
  # strip query string
  cleanUrl="${url%%\?*}"
  # path after host, e.g. "catholicstories/Resources_Icons/2.png"
  pathPart="${cleanUrl#https://ik.imagekit.io/}"
  # if the first path segment is the project container (e.g. 'catholicstories'),
  # drop it so we place files under TARGET_DIR/<remaining_path>
  firstSeg="${pathPart%%/*}"
  if [ "$firstSeg" = "catholicstories" ]; then
    subpath="${pathPart#*/}"
  else
    subpath="$pathPart"
  fi

  # Preserve directory structure but URL-decode the filename (basename) so
  # encoded characters like %20 become actual spaces on disk. Decoding only
  # the basename avoids turning percent-encoded slashes into path separators.
  dirPart="$(dirname "$subpath")"
  filePart="$(basename "$subpath")"
  # Decode percent-encoding in the filename. Use printf with hex escapes which
  # works in bash to convert sequences like %20 -> ' '. This avoids depending
  # on external tools like python/perl.
  decodedFile="$(printf '%b' "${filePart//%/\\x}")"
  dest="$TARGET_DIR/$dirPart/$decodedFile"

  # ensure destination directory exists
  destDir="$(dirname "$dest")"
  mkdir -p "$destDir"

  if [ -f "$dest" ]; then
    echo "Skipping (exists): ${dest#$ROOT_DIR/}"
    continue
  fi

  echo "Downloading: $url -> $dest"
    if curl -L --fail --retry 3 --retry-delay 2 -o "$dest" "$url"; then
    count=$((count+1))
  else
    echo "FAILED: $url" >&2
    failed+=("$url")
    # remove partial file if created
    [ -f "$dest" ] && rm -f "$dest"
  fi
done

echo "Done. Downloaded $count files."
if [ ${#failed[@]} -gt 0 ]; then
  echo "Failed to download ${#failed[@]} files:" >&2
  for f in "${failed[@]}"; do
    echo "  $f" >&2
  done
  exit 2
fi

exit 0
