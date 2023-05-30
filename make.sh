#!/bin/sh
# Can run on osx with:
# fswatch -o src/* build.js | xargs -n1 -I{} ./make.sh
# ./tailwindcss -i input.css -o tailwind.css --watch
# and serve with:
# python3 -m http.server 8000
# (OLD python -m SimpleHTTPServer 8000)

set -ex

elmmake() {
  # Check if two arguments are provided
  if [ $# -ne 2 ]; then
      echo "ERROR: Please provide two numbers as arguments."
      return 1
  fi

  # Store the arguments in variables
  src=$1
  output=$2

  elm make --optimize \
  $src --output "/tmp/$output" \
  && uglifyjs "/tmp/$output" --compress 'pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe' \
  | uglifyjs --mangle --output $output \
  && rm "/tmp/$output"
}

pair_list=(
  src/Main.elm elm.js
  src/Navigation/Main.elm navigationElm.js
  src/Contact/Main.elm contactElm.js
  src/Team/Main.elm teamElm.js
  src/Give/Main.elm giveElm.js
  src/Newsroom/Main.elm newsroomElm.js
  src/Animations/Main.elm animationsElm.js
  src/Animations/HailMary/Main.elm animations/hailmary/elm.js
  src/Animations/GuardianAngel/Main.elm animations/guardianangel/elm.js
  src/Animations/StMichael/Main.elm animations/stmichael/elm.js
  src/FeastDayActivities/Main.elm feastdayactivities/elm.large.js
  src/About/PrivacyPolicy/Main.elm privacyPolicyElm.js
  src/Resources/Main.elm resourcesElm.js
  src/Resources/Books/Main.elm resourcesBooksElm.js
  src/Resources/Podcasts/Main.elm resourcesPodcastsElm.js
  src/Resources/Videos/Main.elm resourcesVideosElm.js
  src/Resources/Subscriptions/Main.elm resourcesSubscriptionsElm.js
  src/Resources/Prayer/Main.elm resourcesPrayerElm.js
  src/Saints/Main.elm saintsElm.js
  src/Prayers/Main.elm prayersElm.js
)

# Iterate through the list and pass each pair to the function
for ((i=0; i<${#pair_list[@]}; i+=2)); do
    src=${pair_list[$i]}
    output=${pair_list[$i+1]}
    elmmake "$src" "$output"
done

wait

node build.js
