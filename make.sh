#!/bin/sh
# Can run on osx with:
# fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh
# and serve with:
# python -m SimpleHTTPServer 8000
#
# We build this way so the webpage doesn't need javascript

set -ex

elm make --optimize \
  src/Main.elm \
  --output elm.js \
  && elm make --optimize \
  src/Team/Main.elm \
  --output teamElm.js \
  && elm make --optimize \
  src/Give/Main.elm \
  --output giveElm.js \
  && elm make --optimize \
  src/Press/Main.elm \
  --output pressElm.js \
  && node build.js