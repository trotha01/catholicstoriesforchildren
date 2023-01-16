module Logo exposing (..)

import Html
import Html.Attributes
import Html.String exposing (..)
import Html.String.Attributes exposing (..)


logo : Html msg
logo =
    img
        [ src "/assets/logo_solid.svg"
        , style "height" "30px"
        , alt ""
        , style "vertical-align" "middle"
        ]
        []
