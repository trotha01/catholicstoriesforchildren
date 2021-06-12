module Header exposing (viewHeader)

import Html.String exposing (..)
import Html.String.Attributes exposing (..)


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"



-- MAIN


viewHeader : String -> Int -> Html.String.Html msg
viewHeader currentPage leftMargin =
    header
        [ style "padding" (toPx leftMargin)
        , style "background-color" "#3d5d75"
        , style "color" "white"

        -- , style "background" "hsl(267deg 50% 78%)"
        -- overflow hidden is so that the header includes the content, otherwise it collapses
        , style "overflow" "hidden"
        ]
        [ -- title
          navbar currentPage
        ]


title : Html.String.Html msg
title =
    h1 [ style "line-height" "1.2em", style "font-family" "hvdComicSerifPro" ] [ text "Catholic Stories for Children" ]


navbar : String -> Html.String.Html msg
navbar currentPage =
    nav []
        [ ul
            [ style "padding" "0"
            , style "margin" "0"
            , style "white-space" "nowrap"
            , style "overflow" "auto"
            , style "float" "right"
            ]
            [ navbarItem "#videos" "Videos" (currentPage == "videos")
            , navbarItem "#about" "About" (currentPage == "about")
            , navbarItem "#contact" "Contact" (currentPage == "contact")
            , navbarItem "#donate" "Donate Today" (currentPage == "donate")
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
