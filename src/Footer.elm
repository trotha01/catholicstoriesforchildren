module Footer exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Signup


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"


viewFooter : Html msg
viewFooter =
    div [ class "text-white py-20 px-20 space-y-6", style "background" "black" ]
        [ h2 [ class "text-4xl font-bold" ] [ text "Follow Us" ]
        , div [ class "flex space-x-6 pt-2" ]
            [ a [ href "https://www.instagram.com/claritasstudios", target "_blank" ]
                [ img
                    [ src "/assets/instagram-logo.webp"
                    , attribute "srcset" "/assets/instagram-logo.webp 1x, /assets/instagram-logo@2x.webp 2x"
                    , alt "Instagram"
                    , class "rounded-full object-cover"
                    , width 48
                    , height 48
                    , attribute "loading" "lazy"
                    , attribute "decoding" "async"
                    ]
                    []
                ]
            , a [ href "https://www.facebook.com/claritasstudios", target "_blank" ]
                [ img
                    [ src "/assets/facebook.webp"
                    , attribute "srcset" "/assets/facebook.webp 1x, /assets/facebook@2x.webp 2x"
                    , alt "Facebook"
                    , class "rounded-full object-cover"
                    , width 48
                    , height 48
                    , attribute "loading" "lazy"
                    , attribute "decoding" "async"
                    ]
                    []
                ]
            , a [ href "https://www.pinterest.com/claritasstudios", target "_blank" ]
                [ img
                    [ src "/assets/pinterest.webp"
                    , attribute "srcset" "/assets/pinterest.webp 1x, /assets/pinterest@2x.webp 2x"
                    , alt "Pinterest"
                    , class "rounded-full object-cover"
                    , width 48
                    , height 48
                    , attribute "loading" "lazy"
                    , attribute "decoding" "async"
                    ]
                    []
                ]
            , a [ href "https://www.youtube.com/@claritasstudios", target "_blank" ]
                [ img
                    [ src "/assets/youtube.webp"
                    , attribute "srcset" "/assets/youtube.webp 1x, /assets/youtube@2x.webp 2x"
                    , alt "YouTube"
                    , class "rounded-full object-cover"
                    , width 48
                    , height 48
                    , attribute "loading" "lazy"
                    , attribute "decoding" "async"
                    ]
                    []
                ]
            ]
        , p [ class "text-lg pt-5" ]
            [ text "Copyright © 2025 Claritas Studios. All rights reserved." ]
        , div [ class "space-x-2 text-lg" ]
            [ a [ href "/about/privacy-policy", class "underline hover:text-gray-300", style "margin-right" "6px" ] [ text "Privacy Policy" ]
            , text "|"
            , a [ href "/about/terms-and-conditions", class "underline hover:text-gray-300", style "margin-left" "6px" ] [ text "Terms & Conditions" ]
            ]
        ]