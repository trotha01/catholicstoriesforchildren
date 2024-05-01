module Opportunities.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup exposing (..)


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        [ -- For parallax
          style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Opportunities" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "m-auto"
        , class "max-w-3xl py-5 sm:px-11"
        ]
        [ h1 [ class "mb-10 px-11 sm:px-0" ]
            [ text "Opportunities" ]

        -- <iframe src="https://forms.clickup.com/18021848/f/h5zer-2071/DJP4QJE3I8SY4M6JV3" onwheel="" width="100%" height="100%" style="background: transparent; border: 1px solid #ccc;"></iframe>
        , div [ style "height" "1400px" ]
            [ iframe
                [ src "https://forms.clickup.com/18021848/f/h5zer-2071/DJP4QJE3I8SY4M6JV3"
                , style "background" "transparent"
                , style "width" "100%"
                , style "height" "1400px"
                , style "border" "1px solid #ccc"
                , attribute "class" "clickup-embed"
                ]
                []
            ]
        ]
