module Header exposing (viewDonationPageHeader, viewHeader, viewSubpageHeader)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Logo exposing (logo)



-- MAIN


viewHeader : String -> Int -> Html msg
viewHeader currentPage leftMargin =
    viewSubpageHeader currentPage leftMargin


viewSubpageHeader : String -> Int -> Html msg
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
        , class ("h-[60px] md:h-[" ++ height ++ "]")
        , class "colorDarkGray"
        , class "grid items-center justify-items-center"
        , class gridColsClass
        ]
        [ viewLogo
        , viewHeaderTitle True currentPage
        , rightHandSide height
        ]


viewDonationPageHeader : String -> Int -> Html msg
viewDonationPageHeader currentPage leftMargin =
    -- Donation pages perform better without links in the header
    -- https://www.nextafter.com/blog/donation-page-secrets/
    let
        ( height, gridColsClass ) =
            ( "60px", "grid-cols-[150px_1fr]" )
    in
    header
        [ style "background-color" "#3d5d75"
        , style "background-image" "linear-gradient(130deg, #9DE2EB , #EBD6F1)"
        , class ("h-[60px] md:h-[" ++ height ++ "]")
        , class "colorDarkGray"
        , class "grid items-center justify-items-center"
        , class gridColsClass
        ]
        [ viewLogo
        , viewHeaderTitle False currentPage

        -- , rightHandSide height
        ]


viewHeaderTitle : Bool -> String -> Html msg
viewHeaderTitle includesLinks title =
    let
        ( textClass, visibleClass ) =
            if includesLinks then
                -- hide text on small screens if we are showing links
                ( "text-[0px] md:text-xl", "invisible md:visible" )

            else
                ( "text-lg md:text-xl", "" )
    in
    a
        [ style "text-decoration" "none"
        , class "colorDarkGray"
        , class visibleClass
        , class "justify-self-start"
        , href "/"
        ]
        [ h1
            [ style "font-family" "hvdComicSerifPro"
            , style "margin" "0px"
            , class textClass
            ]
            [ text "Catholic Stories for Children" ]
        ]


navigation : String -> Html msg
navigation height =
    div [ class "w-full pr-2" ]
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
        [ class "h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"
        , class "text-base"
        ]
        [ viewNavButton height "/feastdayactivities" "_self" "Activities"
        , viewNavButton height "/saints" "_self" "Saints"
        , viewNavButton height "/animations" "_self" "Animations"
        , viewNavButton height "/resources" "_self" "Resources"
        , viewNavButton height "https://www.etsy.com/shop/CatholicStories" "_blank" "Shop"
        , viewNavButton height "/give" "_self" "Give"
        , viewNavButton height "/team" "_self" "About"
        ]


viewNavButton : String -> String -> String -> String -> Html msg
viewNavButton height link linkTarget page =
    a
        [ href link
        , class "flex items-center justify-center"
        , class "hover:scale-105 transition ease-in-out"
        , class "hover:border-b-4 hover:border-[#9101b3]"
        , class "rounded"
        , class ("h-[60px] h-[" ++ height ++ "]")
        , class "p-2"
        , attribute "aria-label" page
        , target linkTarget
        ]
        [ text page ]


viewLogo : Html msg
viewLogo =
    a
        [ style "text-decoration" "none"
        , class "colorDarkGray"
        , href "/"
        , attribute "aria-label" "home"
        ]
        [ logo ]
