module Header exposing (viewHeader, viewSubpageHeader)

import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Encode
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
        , style "color" "#333"
        , class "colorDarkGray"
        , class "relative"
        , style "height" "48px"
        , style "font-size" "19px"

        -- overflow hidden is so that the header includes the content, otherwise it collapses
        , style "overflow" "hidden"
        ]
        [ viewLogo
        , viewHeaderTitle currentPage
        ]


viewSubpageHeader : String -> Int -> Html.String.Html msg
viewSubpageHeader currentPage leftMargin =
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , class "relative"
        , style "height" "48px"

        -- overflow hidden is so that the header includes the content, otherwise it collapses
        , style "overflow" "hidden"
        , style "padding" ("0px " ++ toPx leftMargin)
        , style "font-size" "19px"
        ]
        [ viewLogo
        , viewHeaderTitle currentPage
        , backButton
        ]


viewHeaderTitle : String -> Html msg
viewHeaderTitle title =
    a
        [ class "mobileHide"
        , class "center"
        , class "inlineBlock"
        , style "text-decoration" "none"
        , class "colorDarkGray"
        , href "/"
        ]
        [ h1
            [ style "font-family" "hvdComicSerifPro"
            , style "font-size" "19px"
            , style "margin" "0px"
            ]
            [ text "Catholic Stories for Children" ]
        ]


backButton : Html msg
backButton =
    a
        [ class "vcenter"
        , style "right" "32px"
        , style "text-decoration" "none"
        , href "/"
        , class "colorDarkGray"
        ]
        [ img
            [ src "/assets/backarrow.png"
            , style "height" "14px"
            , style "margin-right" "10px"
            ]
            []
        , span
            []
            [ text "Back" ]
        ]


viewLogo : Html.String.Html msg
viewLogo =
    a
        [ class "vcenter"
        , style "margin-left" "30px"
        , style "text-decoration" "none"
        , class "colorDarkGray"
        , href "/"
        , attribute "aria-label" "home"
        ]
        [ logo ]
