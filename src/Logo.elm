module Logo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


logo : Html msg
logo =
    img
        [ src "/assets/new_logo.png"
        , style "height" "40px"
        , alt ""
        , style "vertical-align" "middle"
        ]
        []
