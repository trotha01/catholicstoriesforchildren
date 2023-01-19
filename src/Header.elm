module Header exposing (viewHeader, viewSubpageHeader)

import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Logo exposing (logo)



-- MAIN


viewHeader : String -> Int -> Html.String.Html msg
viewHeader currentPage leftMargin =
    viewSubpageHeader currentPage leftMargin


viewSubpageHeader : String -> Int -> Html.String.Html msg
viewSubpageHeader currentPage leftMargin =
    let
        isHomePage =
            currentPage == "Catholic Stories for Children"

        ( height, mobileBackButton, smallGridClass ) =
            if isHomePage then
                ( "111px", span [] [], "grid-cols-[100px_1fr]" )

            else
                ( "48px", backButton, "grid-cols-[100px_1fr_200px]" )
    in
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , style "height" height
        , class "colorDarkGray"
        , class smallGridClass
        , class "grid md:grid-cols-[150px_1fr_150px] items-center justify-items-center"
        ]
        [ viewLogo
        , viewHeaderTitle currentPage
        , mobileBackButton
        ]


viewHeaderTitle : String -> Html msg
viewHeaderTitle title =
    a
        [ style "text-decoration" "none"
        , class "colorDarkGray"
        , class "invisible md:visible"
        , class "justify-self-center"
        , href "/"
        ]
        [ h1
            [ style "font-family" "hvdComicSerifPro"
            , style "margin" "0px"
            , class "text-2xl"

            -- We hide the anchor element so the grid 3-column layout stays
            -- but display:none the title so it doesnt affect the height.
            , class "hidden md:inline"
            ]
            [ text "Catholic Stories for Children" ]
        ]


backButton : Html msg
backButton =
    a
        [ style "text-decoration" "none"
        , href "/"
        , class "colorDarkGray"
        , class "grid grid-cols-2 items-center justify-items-center"
        ]
        [ img
            [ src "/assets/backarrow.png"
            , style "height" "14px"
            ]
            []
        , span
            []
            [ text "Back" ]
        ]


viewLogo : Html.String.Html msg
viewLogo =
    a
        [ style "text-decoration" "none"
        , class "colorDarkGray"
        , href "/"
        , attribute "aria-label" "home"
        ]
        [ logo ]
