module Page.Contact.View exposing (..)

import Component.Footer exposing (viewFooter)
import Component.Header exposing (viewSubpageHeader)
import Theme.Layout exposing (headerMargin)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode



-- MAIN


view : Html msg
view =
    div
        []
        [ viewBody
        , viewFooter
        ]


viewBody : Html msg
viewBody =
    div
        [ class "h-screen"
        , class "bg-black text-white"
        , class "p-10"
        ]
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "Contact Me" ]
        , viewContactInfo
        ]


viewContactInfo : Html msg
viewContactInfo =
    div
        [ class "text-center"
        ]
        [ div
            []
            [ p []
                [ text "Please reach out."
                , br [] []
                , text "I love to hear from you!"
                ]
            , p
                [ style "overflow-wrap" "anywhere"
                , class "mt-3 lg:mt-5"
                ]
                [ -- span [ attribute "aria-hidden" "true" ] [ text "📫 " ]
                  span [ style "display" "inline-block" ]
                    [ text "trevor"
                    , span [] [ text "@" ]
                    ]
                , span [ attribute "aria-hidden" "true", property "innerHTML" (Json.Encode.string "🍯") ] []
                , span [ attribute "aria-hidden" "true", property "innerHTML" (Json.Encode.string "spam@catholicstoriesforchildren.com") ] []
                , span [ height 0, width 0, style "display" "none", hidden True ] [ text "spam@catholicstoriesforchildren.com" ]
                , span []
                    [ text "claritasstudios"
                    , span []
                        [ text "."
                        , span [] [ text "com" ]
                        ]
                    ]
                ]
            ]
        ]
