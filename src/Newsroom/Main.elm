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
        [ class "w-3/4"
        , class "max-w-3xl"
        , class "m-auto"
        ]
        [ h1
            [ class "text-left"
            , style "color" "#395D73"
            , class "my-10"
            ]
            [ text "Latest News" ]
        , div
            [ class "mb-10"
            ]
            [ viewSignUp ]
        , viewPressReleases
            [ Newsroom.PR20220912.view
            ]
        ]


viewSignUp : Html msg
viewSignUp =
    div []
        [ p
            [ class "pb-5"
            ]
            [ text "Sign up for our email list to get updates!" ]
        , a
            [ href "https://signup.catholicstoriesforchildren.com"
            , rel "noopener"
            , target "_blank"
            , style "text-decoration" "none"
            , style "padding" "10px"
            , style "display" "inline-block"
            , style "color" "black"
            , style "border" "2px solid #777"
            , style "border-radius" "5px"
            , style "box-shadow" "#777 1px 1px 5px"
            ]
            [ text "Sign Up" ]
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
