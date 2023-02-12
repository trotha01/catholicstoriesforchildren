module Contact.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Encode



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
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        []
        [ viewSubpageHeader "Contact" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "h-screen"
        , class "bg-csc-lightpurple"
        , class "p-10"
        ]
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "Contact Us" ]
        , viewContactInfo
        ]


viewContactInfo : Html msg
viewContactInfo =
    div
        [ class "text-base sm:text-3xl"
        , class "text-center"
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
                [ -- span [ attribute "ariaHidden" "true" ] [ text "📫 " ]
                  span [ style "display" "inline-block" ]
                    [ text "trevor"
                    , span [] [ text "@" ]
                    ]
                , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "🍯") ] []
                , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "spam@catholicstoriesforchildren.com") ] []
                , span [ height 0, width 0, style "display" "none", hidden True ] [ text "spam@catholicstoriesforchildren.com" ]
                , span []
                    [ text "catholicstoriesforchildren"
                    , span []
                        [ text "."
                        , span [] [ text "com" ]
                        ]
                    ]
                ]

            -- if the email starts getting spammed, we can update to use a form
            -- , Html.String.form [ action "https://formspree.io/f/xzbkgowy", method "POST", target "my-iframe" ]
            --     [ label [] [ text "email", input [ type_ "email", name "_replyto" ] [] ]
            --     , label [] [ text "message", textarea [ type_ "message", name "message" ] [] ]
            --     , button [ type_ "submit" ] [ text "send" ]
            --     ]
            -- , iframe [ name "my-iframe", height 0, width 0 ] []
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.facebook.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://www.facebook.com/Catholic-Stories-for-Children-120657933116228"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Facebook" ]
            --     ]
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.instagram.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://www.instagram.com/catholicstoriesforchildren"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Instagram" ]
            --     ]
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.twitter.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://twitter.com/StoriesCatholic"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Twitter" ]
            --     ]
            ]
        ]
