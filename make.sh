#!/bin/sh
# Can run on osx with:
# fswatch -o src/* | xargs -n1 -I{} ./make.sh
# and serve with:
# python -m SimpleHTTPServer 8000

set -ex

elm make --optimize \
  src/Main.elm \
  --output elm.js \
  && node build.js
