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

        ( height, rightHandSide, gridColsClass ) =
            if isHomePage then
                ( "111px", navigation, "grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]" )

            else
                ( "60px", navigation, "grid-cols-[150px_1fr_150px] lg:grid-cols-[150px_1fr_600px]" )
    in
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , class ("h-[60px] md:h-" ++ height)
        , class "colorDarkGray"
        , class "grid items-center justify-items-center"
        , class gridColsClass
        ]
        [ viewLogo
        , viewHeaderTitle currentPage
        , rightHandSide height
        ]


viewHeaderTitle : String -> Html msg
viewHeaderTitle title =
    a
        [ style "text-decoration" "none"
        , class "colorDarkGray"
        , class "invisible md:visible"
        , class "justify-self-start"
        , href "/"
        ]
        [ h1
            [ style "font-family" "hvdComicSerifPro"
            , style "margin" "0px"
            , class "text-[0px] md:text-2xl"
            ]
            [ text "Catholic Stories for Children" ]
        ]


navigation : String -> Html msg
navigation height =
    div [ class "w-full" ]
        [ div [ class "lg:hidden" ] [ hamburgerMenu ]
        , div [ class "hidden lg:block w-full" ] [ desktopNavigation height ]
        ]


hamburgerMenu : Html msg
hamburgerMenu =
    a
        [ href "/navigation"
        , class "space-y-2"
        , attribute "aria-label" "menu"
        ]
        [ div [ class "w-8 h-0.5 m-auto bg-gray-600" ] []
        , div [ class "w-8 h-0.5 m-auto bg-gray-600" ] []
        , div [ class "w-8 h-0.5 m-auto bg-gray-600" ] []
        ]


desktopNavigation : String -> Html msg
desktopNavigation height =
    nav
        [ class "h-full w-full grid grid-cols-5 content-center justify-items-center"
        ]
        [ viewNavButton height "/team" "About Us"
        , viewNavButton height "/animations" "Animations"
        , viewNavButton height "/contact" "Contact"
        , viewNavButton height "/newsroom" "Newsroom"
        , viewNavButton height "/give" "Give"
        ]


viewNavButton : String -> String -> String -> Html msg
viewNavButton height link page =
    a
        [ href link
        , class "flex items-center justify-center"
        , class "hover:bg-csc-lightpurple"
        , class "hover:border-b-2 hover:border-gray-700"
        , class "rounded-t"
        , class "text-lg"
        , style "height" height
        , class "w-full"
        , attribute "aria-label" page
        ]
        [ text page ]


viewMobileNavButton : String -> String -> Html msg
viewMobileNavButton link page =
    a
        [ href link
        , class "hover:bg-csc-lightpurple"
        , class "hover:border-b-2"
        , class "p-5"
        , class "rounded-t"
        , class "text-lg"
        ]
        [ text page ]


backButton : Html msg
backButton =
    a
        [ style "text-decoration" "none"
        , href "/"
        , class "colorDarkGray"
        , class "grid grid-cols-2 items-center justify-items-center"
        , class "visible md:invisible"
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
