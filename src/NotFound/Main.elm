module NotFound.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)



-- MAIN


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
        []
        [ -- viewSubpageHeader "Not Found" headerMargin
          viewBody

        -- , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "max-w-5xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"

        -- , class "h-screen"
        , class "h-5/6"
        ]
        [ h1 [ class "mb-10 leading-9" ] [ text "Lost and Not Found" ]
        , p [] [ text "Tony Tony, come around I am lost. Dear St. Anthony, please help me find the webpage I am looking for. Thank you St. Anthony. Amen." ]
        , div [ class "mt-10" ]
            [ a
                [ href "/"
                , style "text-decoration" "none"
                , style "padding" "10px 20px"
                , style "display" "inline-block"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                , style "color" "white"
                , style "background-color" "#9200B3"
                ]
                [ text "Return Home" ]
            ]
        ]
