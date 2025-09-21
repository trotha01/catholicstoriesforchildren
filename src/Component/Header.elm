module Component.Header exposing (viewBanner, viewHeader, viewPageHeaderNoLinks, viewSubpageHeader)

import Component.Logo exposing (logo)
import Html exposing (..)
import Html.Attributes exposing (..)



-- MAIN


viewHeader : String -> Int -> Html msg
viewHeader currentPage leftMargin =
    viewSubpageHeader currentPage leftMargin


viewSubpageHeader : String -> Int -> Html msg
viewSubpageHeader currentPage leftMargin =
    let
        isHomePage =
            currentPage == "Claritas Studios"

        ( height, gridColsClass ) =
            if isHomePage then
                ( "111px", "grid-cols-[150px_1fr_150px] lg:grid-cols-[60px_1fr_600px] xl:grid-cols-[150px_1fr_600px]" )

            else
                ( "60px", "grid-cols-[150px_1fr_150px] lg:grid-cols-[60px_1fr_600px] xl:grid-cols-[150px_1fr_600px]" )
    in
    div []
        [ viewBanner
        , header
            [ class "text-white logo-section-bg"
            , class ("h-[60px] md:h-[" ++ height ++ "]")
            , class "grid items-center justify-items-center"
            , class gridColsClass
            ]
            [ viewLogo
            , viewHeaderTitle True currentPage
            , navigation height
            ]
        ]


viewBanner : Html msg
viewBanner =
    a
        [ href "https://youtu.be/nb7r4V_4uFc"
        , target "_blank"
        , class "block bg-[#9101b3] text-white text-center text-lg py-2 underline"
        ]
        [ text "Watch our latest animation!" ]


viewPageHeaderNoLinks : String -> Int -> Html msg
viewPageHeaderNoLinks currentPage leftMargin =
    -- Donation pages perform better without links in the header
    -- https://www.nextafter.com/blog/donation-page-secrets/
    let
        ( height, gridColsClass ) =
            ( "60px", "grid-cols-[150px_1fr]" )
    in
    div []
        [ viewBanner
        , header
            [ style "background-color" "#43868D"
            , class ("h-[60px] md:h-[" ++ height ++ "]")
            , class "text-white"
            , class "grid items-center justify-items-center"
            , class gridColsClass
            ]
            [ viewLogo
            , viewHeaderTitle False currentPage

            -- , rightHandSide height
            ]
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
            , class "text-white"
            , class textClass
            ]
            [ text title ]
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
        [ div [ class "w-8 h-0.5 m-auto bg-white" ] []
        , div [ class "w-8 h-0.5 m-auto bg-white" ] []
        , div [ class "w-8 h-0.5 m-auto bg-white" ] []
        ]


desktopNavigation : String -> Html msg
desktopNavigation height =
    nav
        [ class "h-full w-full flex justify-end content-center justify-items-center gap-4 mr-4"
        , class "text-lg"
        ]
        [ viewNavButton height "/feastdayactivities" "_self" "Calendar"
        , viewNavButton height "/saints" "_self" "Saints"
        , viewNavButton height "/animations" "_self" "Animations"
        , viewNavButton height "/resources" "_self" "Resources"
        , viewNavButton height "https://shop.claritasstudios.com/" "_blank" "Shop"

        -- , viewNavButton height "/shop" "_self" "Shop"
        , viewNavButton height "https://blog.claritasstudios.com/" "_blank" "Blog"
        , viewNavButton height "/give" "_self" "Donate"
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
