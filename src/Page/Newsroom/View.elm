module Page.Newsroom.View exposing (..)

import Browser
import Component.Footer exposing (viewFooter)
import Component.Header exposing (viewSubpageHeader)
import Theme.Layout exposing (headerMargin)
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Newsroom.PR20220912 as PR20220912


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
            [ PR20220912.view
            ]
        ]


viewSignUp : Html msg
viewSignUp =
    div []
        [ p
            [ class "pb-5"
            ]
            [ text "Want tips, resources, and Catholic animations? We are giving away our prayer printable to those who sign up today!" ]
        , viewSignUpButton
        ]


viewSignUpButton : Html msg
viewSignUpButton =
    a
        [ href "https://blog.claritasstudios.com"
        , rel "noopener"
        , target "_blank"
        , style "text-decoration" "none"
        , style "padding" "10px 20px"
        , style "display" "inline-block"
        , style "border-radius" "5px"
        , style "box-shadow" "#777 1px 1px 5px"
        , style "color" "white"
        , style "background-color" "#9200B3"
        ]
        [ text "Sign Up" ]


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
