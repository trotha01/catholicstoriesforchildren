module Logo exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


logo : Html msg
logo =
    img
        [ src "/assets/logo_solid.svg"
        , style "height" "30px"
        , alt ""
        , style "vertical-align" "middle"
        ]
        []
