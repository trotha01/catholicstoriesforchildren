module Animations.HailMary.Main exposing (..)

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
        [ h1 h1Style [ text "Hail Mary" ]
        , div
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
                ]
                [ iframe
                    [ style "position" "absolute"
                    , style "width" "100%"
                    , style "height" "100%"
                    , style "top" "0"
                    , style "left" "0"
                    , src "https://www.youtube.com/embed/HW0DzGEoa1Y"
                    , title "Hail Mary, Full of Grace Video"
                    , property "frameborder" (Json.Encode.string "0")
                    , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                    , property "allowfullscreen" (Json.Encode.string "true")
                    ]
                    []
                ]
            , div
                [ style "position" "relative"
                , style "padding-bottom" "56.25%"
                , height 0
                , style "overflow" "hidden"
                , style "max-width" "100%"
                , style "border-radius" "5px"
                , style "margin-top" "80px"
                ]
                [ iframe
                    [ style "position" "absolute"
                    , style "width" "100%"
                    , style "height" "100%"
                    , style "top" "0"
                    , style "left" "0"
                    , src "https://www.youtube.com/embed/QNVNbLiqznI"
                    , title "Hail Mary, Full of Grace Video"
                    , property "frameborder" (Json.Encode.string "0")
                    , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                    , property "allowfullscreen" (Json.Encode.string "true")
                    ]
                    []
                ]
            , div [ class "mx-auto my-4 col-span-2 w-full" ]
                [ p [ class "my-10" ] [ text "The Hail Mary is a beautiful prayer to Mary, the Mother of Jesus. This prayer is filled with Scripture." ]
                , p [ class "my-10" ]
                    [ text
                        ("In this prayer, we begin with the greeting of St. Michael the Archangel, "
                            ++ "'Hail Mary, full of grace, the Lord is with you' (Luke 1:28). "
                            ++ "What does it mean to be full of grace? God gives graces to you throughout your life. "
                            ++ "But to be completely filled with grace means you are "
                            ++ "without sin. You cannot sin when you are full of the grace of God."
                            ++ "Only Mary is given this unique gift."
                        )
                    ]
                , p [ class "my-10" ]
                    [ text
                        ("Then we praise Mary in the same way as her cousin Elizabeth, "
                            ++ "'Blessed are you among women, and blessed is the fruit of your womb' (Luke 1:42)."
                        )
                    ]
                , p [ class "my-10" ]
                    [ text
                        ("Lastly, we asks Mary to pray for us"
                            ++ "Holy Mary, Mother of God, pray for us sinners now and at the hour of death. Amen."
                        )
                    ]
                ]
            ]
        ]
