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

  # DEBUG
  # elm make $src --output "$output"
}

pair_list=(
  src/Main.elm elm.js
  src/About/PrivacyPolicy/Main.elm about/privacy-policy/elm.js
  src/Animations/ActOfContrition/Main.elm animations/actofcontrition/elm.js
  src/Animations/GuardianAngel/Main.elm animations/guardianangel/elm.js
  src/Animations/HailMary/Main.elm animations/hailmary/elm.js
  src/Animations/Main.elm animations/elm.js
  src/Animations/StMichael/Main.elm animations/stmichael/elm.js
  src/Contact/Main.elm contact/elm.js
  src/FeastDayActivities/Main.elm feastdayactivities/elm.js
  src/FeastDayActivities/Today/Main.elm feastdayactivities/today/elm.js
  src/Give/Main.elm give/elm.js
  src/Navigation/Main.elm navigation/elm.js
  src/Newsroom/Main.elm newsroom/elm.js
  src/Opportunities/Main.elm opportunities/elm.js
  src/Prayers/Main.elm prayers/elm.js
  src/Prayer/Angelus/Main.elm prayer/angelus/elm.js
  src/Resources/Books/Main.elm resources/books/elm.js
  src/Resources/Games/Main.elm resources/games/elm.js
  src/Resources/Main.elm resources/elm.js
  src/Resources/Podcasts/Main.elm resources/podcasts/elm.js
  src/Resources/Prayer/Main.elm resources/prayer/elm.js
  src/Resources/Subscriptions/Main.elm resources/subscriptions/elm.js
  src/Resources/Videos/Main.elm resources/videos/elm.js
  src/Saints/Main.elm saints/elm.js
  src/Signup/Main.elm signup/elm.js
  src/Team/Main.elm team/elm.js
  src/ThankYou/Main.elm thankyou/elm.js
)

# Iterate through the list and pass each pair to the function
for ((i=0; i<${#pair_list[@]}; i+=2)); do
    src=${pair_list[$i]}
    output=${pair_list[$i+1]}
    elmmake "$src" "$output" &
done

wait

node build.js
