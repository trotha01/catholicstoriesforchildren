module Animations.GuardianAngel.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Encode


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Give" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        []
        [ h1 h1Style [ text "Guardian Angel Prayer" ]
        , viewVideoPlayers
        , aboutTheAnimation

        -- , aboutThePrayer
        ]


viewVideoPlayers : Html msg
viewVideoPlayers =
    div
        [ class "grid grid-cols-2 gap-2"
        , class "max-w-5xl"
        , class "m-auto"
        ]
        [ div
            [ style "position" "relative"
            , style "padding-bottom" "56.25%"
            , height 0
            , style "overflow" "hidden"
            , style "max-width" "100%"
            , style "border-radius" "5px"
            , style "margin-top" "80px"
            , class "col-span-2"
            ]
            [ iframe
                [ style "position" "absolute"
                , style "width" "100%"
                , style "height" "100%"
                , style "top" "0"
                , style "left" "0"
                , src "https://www.youtube-nocookie.com/embed/03hmpXjV_ck"
                , title "Guardian Angel | Prayer Time with Angels"
                , property "frameborder" (Json.Encode.string "0")
                , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                , property "allowfullscreen" (Json.Encode.string "true")
                ]
                []
            ]
        ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "p-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Animation" ]
        , p [ class "my-10" ]
            [ text
                ("This animation helps kids learn the Guardian Angel prayer though a story and song. "
                    ++ " It also helps kids understand the concept of a guardian angel."
                )
            ]
        , p [ class "my-10" ]
            [ text
                ("This animation is meant to be an aid for kids to slowly build a habit of prayer. "
                    ++ "It is a tool that can be used during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "p-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Prayer" ]
        , p [ class "my-10" ] [ text "" ]
        ]
