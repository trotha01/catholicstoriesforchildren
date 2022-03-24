module Header exposing (viewHeader, viewSubpageHeader)

import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Logo exposing (logo)


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"



-- MAIN


viewHeader : String -> Int -> Html.String.Html msg
viewHeader currentPage leftMargin =
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , style "color" "white"

        -- overflow hidden is so that the header includes the content, otherwise it collapses
        , style "overflow" "hidden"
        , style "padding" ("0px " ++ toPx leftMargin)
        ]
        [ logo
        , h1
            [ style "font-family" "hvdComicSerifPro"
            , style "font-size" "1em"
            , style "display" "inline"
            , style "float" "right"
            , style "text-shadow" "#3d3d3d 3px 3px 11px"
            ]
            [ text "Catholic Stories for Children" ]

        -- navbar currentPage
        ]


centerStyle : List (Attribute msg)
centerStyle =
    [ style "position" "relative"
    , style "left" "50%"
    , style "transform" "translateX(-50%)"
    ]


viewSubpageHeader : String -> Int -> Html.String.Html msg
viewSubpageHeader currentPage leftMargin =
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , style "color" "white"
        , style "position" "relative"

        -- overflow hidden is so that the header includes the content, otherwise it collapses
        , style "overflow" "hidden"
        , style "padding" ("0px " ++ toPx leftMargin)
        ]
        [ backButton
        , span centerStyle [ logo ]
        , h1
            [ style "font-family" "hvdComicSerifPro"
            , style "font-size" "1em"
            , style "display" "inline"
            , style "float" "right"
            , style "text-shadow" "#3d3d3d 3px 3px 11px"
            , class "mobileHide"
            ]
            [ text "Catholic Stories for Children" ]

        -- navbar currentPage
        ]


backButton : Html msg
backButton =
    a
        [ style "position" "absolute"
        , style "top" "50%"
        , style "transform" "translateY(-50%)"
        , style "text-decoration" "none"
        , style "color" darkBlue
        , href "/"
        ]
        [ text "Back" ]


navbar : String -> Html.String.Html msg
navbar currentPage =
    nav []
        [ logo
        , ul
            [ style "padding" "10px"
            , style "margin" "0"
            , style "white-space" "nowrap"
            , style "overflow" "none"
            , style "float" "right"
            ]
            [ navbarItem "#videos" "Videos" (currentPage == "videos")
            , navbarItem "#about" "About" (currentPage == "about")
            , navbarItem "#contact" "Contact" (currentPage == "contact")
            , navbarItem "#give" "Give" (currentPage == "give")
            ]
        ]


navbarItem : String -> String -> Bool -> Html.String.Html msg
navbarItem link name isSelected =
    li [ style "display" "inline-block" ]
        [ a
            [ href link
            , style "display" "inline-block"
            , style "padding-right" "20px"
            , style "text-decoration" "none"
            , style "color" "white"
            ]
            [ text name ]
        ]
