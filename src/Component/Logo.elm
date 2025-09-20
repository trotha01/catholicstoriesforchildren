module Component.Logo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


logo : Html msg
logo =
    img
        [ src "/assets/new_logo.webp"
        , attribute "srcset" "/assets/new_logo.webp 1x, /assets/new_logo@2x.webp 2x"
        , alt "Claritas Studios"
        , height 40
        , attribute "decoding" "async"
        , style "vertical-align" "middle"
        ]
        []
