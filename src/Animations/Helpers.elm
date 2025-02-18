module Animations.Helpers exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode


viewVideo : String -> String -> Html msg
viewVideo videoTitle link =
    div
        [ style "position" "relative"
        , style "padding-bottom" "56.25%"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        ]
        [ iframe
            [ style "position" "absolute"
            , style "width" "100%"
            , style "height" "100%"
            , style "top" "0"
            , style "left" "0"
            , src link
            , title videoTitle
            , property "frameborder" (Json.Encode.string "0")
            , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            , property "allowfullscreen" (Json.Encode.string "true")
            ]
            []
        ]


viewVideoDescription : Html msg -> Html msg
viewVideoDescription videoDescription =
    div
        []
        [ videoDescription
        ]


viewVideoComingSoon : String -> Html msg
viewVideoComingSoon image =
    div
        [ style "position" "relative"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        ]
        [ img [ src image ] []
        ]


type alias AnimationLink =
    { link : String
    , imgSrc : String
    , ariaLabel : String
    , isLive : Bool
    }


viewAnimationLinks : String -> List AnimationLink -> Html msg
viewAnimationLinks title animationLinks =
    div
        [ class "w-full"
        , class "max-w-7xl"
        , class "m-auto"
        , class "mb-20 px-20"
        ]
        [ h2 [ class "mb-10" ]
            [ text title
            ]
        , div
            [ class "grid grid-cols-1 lg:grid-cols-2 gap-10"
            ]
            (List.map viewAnimationLink animationLinks
                ++ [ div
                        [ style "clear" "both"
                        , style "width" "1px"
                        ]
                        []
                   ]
            )
        ]


viewAnimationLink : AnimationLink -> Html msg
viewAnimationLink animationLink =
    if animationLink.isLive then
        a
            [ href animationLink.link
            , class "hover:scale-105 transition ease-out duration-50 drop-shadow-[0_10px_8px_rgb(0,0,0)]"
            , attribute "aria-label" animationLink.ariaLabel
            ]
            [ img
                [ src animationLink.imgSrc
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Prayer Time with Angels animations"
                ]
                []
            ]

    else
        div
            [ href animationLink.link
            , class "hover:scale-105 transition ease-out duration-50 drop-shadow-[0_10px_8px_rgb(0,0,0)]"
            , attribute "aria-label" animationLink.ariaLabel
            , class "grayscale hover:cursor-not-allowed"
            ]
            [ img
                [ src animationLink.imgSrc
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Prayer Time with Angels animations"
                ]
                []
            ]
