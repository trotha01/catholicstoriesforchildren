#!/bin/sh
# Can run on osx with:
# fswatch -o src/* | xargs -n1 -I{} ./make.sh

set -ex

elm make --optimize \
  src/Main.elm \
  --output elm.js \
  && node build.js
