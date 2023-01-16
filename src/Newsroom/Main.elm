module Newsroom.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Newsroom.PR20220912


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        [ style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Newsroom" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ style "width" "80%"
        , style "max-width" "800px"
        , style "margin" "auto"
        ]
        [ h1
            (h1Style
                ++ [ style "text-align" "left"
                   , style "color" "#395D73"
                   ]
            )
            [ text "Latest News" ]
        , viewPressReleases
            [ Newsroom.PR20220912.view
            ]
        ]


viewPressReleases : List (Html Never) -> Html Never
viewPressReleases prs =
    div
        [ style "background-color" "white"
        , style "border-radius" "5px"
        , style "padding" "20px 40px"
        , style "margin" "auto"
        , style "margin-bottom" "2em"
        ]
        (List.map viewPressRelease prs)


viewPressRelease : Html Never -> Html Never
viewPressRelease pr =
    div [ style "line-height" "1.6em" ] [ pr ]