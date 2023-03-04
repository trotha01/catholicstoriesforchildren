module Animations.Helpers exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode


viewVideo : String -> String -> Html msg
viewVideo videoTitle link =
    div
        [ style "position" "relative"
        , style "padding-bottom" "56.25%"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        ]
        [ iframe
            [ style "position" "absolute"
            , style "width" "100%"
            , style "height" "100%"
            , style "top" "0"
            , style "left" "0"
            , src link
            , title videoTitle
            , property "frameborder" (Json.Encode.string "0")
            , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            , property "allowfullscreen" (Json.Encode.string "true")
            ]
            []
        ]
