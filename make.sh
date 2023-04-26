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
  src/Navigation/Main.elm \
  --output navigationElm.js \
  && elm make --optimize \
  src/Contact/Main.elm \
  --output contactElm.js \
  && elm make --optimize \
  src/Team/Main.elm \
  --output teamElm.js \
  && elm make --optimize \
  src/Give/Main.elm \
  --output giveElm.js \
  && elm make --optimize \
  src/Newsroom/Main.elm \
  --output newsroomElm.js \
  && elm make --optimize \
  src/Animations/Main.elm \
  --output animationsElm.js \
  && elm make --optimize \
  src/Animations/HailMary/Main.elm \
  --output animations/hailmary/elm.js \
  && elm make --optimize \
  src/Animations/GuardianAngel/Main.elm \
  --output animations/guardianangel/elm.js \
  && elm make \
  src/FeastDayActivities/Main.elm \
  --output feastdayactivities/elm.js \
  && elm make --optimize \
  src/About/PrivacyPolicy/Main.elm \
  --output privacyPolicyElm.js \
  && elm make --optimize \
  src/Resources/Main.elm \
  --output resourcesElm.js \
  && elm make --optimize \
  src/Resources/Books/Main.elm \
  --output resourcesBooksElm.js \
  && elm make --optimize \
  src/Resources/Podcasts/Main.elm \
  --output resourcesPodcastsElm.js \
  && elm make --optimize \
  src/Resources/Videos/Main.elm \
  --output resourcesVideosElm.js \
  && elm make --optimize \
  src/Resources/Subscriptions/Main.elm \
  --output resourcesSubscriptionsElm.js \
  && elm make --optimize \
  src/Saints/Main.elm \
  --output saintsElm.js \
  && elm make --optimize \
  src/Prayers/Main.elm \
  --output prayersElm.js \
  && node build.js