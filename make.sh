#!/bin/sh
# Can run on osx with:
# fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh
# ./tailwindcss -i input.css -o tailwind.css --watch
# and serve with:
# python3 -m http.server 8000
# (OLD python -m SimpleHTTPServer 8000)
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
  src/Newsroom/Main.elm \
  --output newsroomElm.js \
  && elm make \
  src/FeastDayActivities/Main.elm \
  --output feastdayactivities/elm.js \
  && node build.js