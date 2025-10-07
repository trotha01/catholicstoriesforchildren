#!/bin/bash

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

  npx elm make --optimize \
  $src --output "/tmp/$output" \
  && npx uglify-js "/tmp/$output" --compress 'passes=2,pure_funcs=[F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9],pure_getters,keep_fargs=false,unsafe_comps,unsafe' \
  | npx uglify-js --mangle toplevel --output $output \
  && rm "/tmp/$output"

  # DEBUG
  # elm make $src --output "$output"
}

pair_list=(
  src/Main.elm public/elm.js
  src/Page/NotFound/Main.elm public/notfound/elm.js
  src/Page/ThankYou/Main.elm public/thankyou/elm.js
)

# Iterate through the list and pass each pair to the function
for ((i=0; i<${#pair_list[@]}; i+=2)); do
    src=${pair_list[$i]}
    output=${pair_list[$i+1]}
    elmmake "$src" "$output" &
done

wait

node build.js
