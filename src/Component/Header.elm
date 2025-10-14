module Component.Header exposing (..)

import Component.Logo exposing (logo)
import Component.Navigation.View as NavigationPage
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)



-- MAIN


viewHeaderWithMenu : String -> Int -> Bool -> msg -> Html msg
viewHeaderWithMenu currentPage leftMargin menuOpen toggleMsg =
    viewSubpageHeaderWithMenuMsg currentPage leftMargin menuOpen toggleMsg


viewSubpageHeaderWithMenuMsg : String -> Int -> Bool -> msg -> Html msg
viewSubpageHeaderWithMenuMsg currentPage leftMargin menuOpen openMsg =
    let
        isHomePage =
            currentPage == "Claritas Studios"

        ( height, gridColsClass ) =
            if isHomePage then
                ( "111px", "grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]" )

            else
                ( "60px", "grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]" )
    in
    div []
        [ nav
            [ class
                ("fixed top-0 left-0 right-0 z-50 "
                    ++ (if menuOpen then
                            "bg-black"

                        else
                            "bg-gradient-to-b from-black via-black/80 to-transparent"
                       )
                )
            ]
            [ div [ class "flex items-center justify-between px-4 md:px-12 py-4" ]
                [ div
                    [ class ("grid items-center justify-items-center w-full " ++ gridColsClass)
                    , class ("h-[60px] md:h-[" ++ height ++ "]")
                    ]
                    [ viewLogo
                    , viewHeaderTitle True currentPage
                    , navigationWithMsg height menuOpen openMsg
                    ]
                ]
            ]
        , if isHomePage then
            span [] []

          else
            div [ class ("h-[60px] md:h-[" ++ height ++ "]") ] []
        , viewMenuOverlay height menuOpen
        ]


viewMenuOverlay : String -> Bool -> Html msg
viewMenuOverlay height menuOpen =
    if not menuOpen then
        text ""

    else
        div
            [ class "fixed left-0 right-0 bottom-0 z-40 text-white overflow-y-auto bg-black bg-opacity-90 pointer-events-auto"
            , class "transition-opacity duration-150 ease-out opacity-100 translate-y-0"
            , class ("top-[60px] md:top-[" ++ height ++ "]")
            , attribute "role" "dialog"
            , attribute "aria-modal" "true"
            ]
            [ div [ class "p-6 transition-transform duration-150 ease-out" ]
                [ NavigationPage.view False ]
            ]


navigationWithMsg : String -> Bool -> msg -> Html msg
navigationWithMsg height menuOpen openMsg =
    div [ class "w-full pr-2 justify-self-end" ]
        [ div [ class "xl:hidden flex justify-end" ] [ hamburgerMenuWithMsg menuOpen openMsg ]
        , div [ class "hidden xl:block w-full" ] [ desktopNavigation height ]
        ]


hamburgerMenuWithMsg : Bool -> msg -> Html msg
hamburgerMenuWithMsg menuOpen openMsg =
    let
        baseBtnAttrs =
            [ onClick openMsg
            , attribute "type" "button"
            , attribute "aria-expanded"
                (if menuOpen then
                    "true"

                 else
                    "false"
                )
            , attribute "aria-label"
                (if menuOpen then
                    "Close menu"

                 else
                    "Open menu"
                )
            , class "relative w-10 h-10 grid place-content-center rounded focus:outline-none focus:ring-2 focus:ring-white/60"
            ]
    in
    if menuOpen then
        -- Render an “X” using two crossed bars
        button baseBtnAttrs
            [ div [ class "relative w-8 h-8" ]
                [ div [ class "absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-white rotate-45 transition" ] []
                , div [ class "absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-white -rotate-45 transition" ] []
                ]
            ]

    else
        -- Render the classic hamburger (three bars)
        button baseBtnAttrs
            [ div [ class "flex flex-col items-center justify-center gap-1.5 w-8 h-8" ]
                [ div [ class "w-8 h-0.5 bg-white transition" ] []
                , div [ class "w-8 h-0.5 bg-white transition" ] []
                , div [ class "w-8 h-0.5 bg-white transition" ] []
                ]
            ]


viewSubpageHeader : String -> Int -> Html msg
viewSubpageHeader currentPage leftMargin =
    let
        isHomePage =
            currentPage == "Claritas Studios"

        ( height, gridColsClass ) =
            if isHomePage then
                ( "111px", "grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]" )

            else
                ( "60px", "grid-cols-[150px_1fr_150px] xl:grid-cols-[150px_1fr_600px]" )
    in
    div []
        [ nav
            [ class "fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent" ]
            [ div [ class "flex items-center justify-between px-4 md:px-12 py-4" ]
                [ div
                    [ class ("grid items-center justify-items-center w-full " ++ gridColsClass)
                    , class ("h-[60px] md:h-[" ++ height ++ "]")
                    ]
                    [ viewLogo
                    , viewHeaderTitle True currentPage
                    , navigation height
                    ]
                ]
            ]
        , -- For the homepage render the fixed nav without a spacer so content remains where you intended
          if isHomePage then
            span [] []
            -- For subpages render the fixed nav AND a spacer immediately after to push page content below the fixed header
            -- spacer: matches header height so following content is not hidden under the fixed nav

          else
            div [ class ("h-[60px] md:h-[" ++ height ++ "]") ] []
        ]


viewPageHeaderNoLinks : String -> Int -> Html msg
viewPageHeaderNoLinks currentPage leftMargin =
    -- Donation pages perform better without links in the header
    -- https://www.nextafter.com/blog/donation-page-secrets/
    let
        ( height, gridColsClass ) =
            ( "60px", "grid-cols-[150px_1fr]" )
    in
    div []
        [ header
            [ style "background-color" "#43868D"
            , class ("h-[60px] md:h-[" ++ height ++ "]")
            , class "text-white"
            , class "grid items-center justify-items-center px-3 md:px-6"
            , class gridColsClass
            ]
            [ viewLogo
            , viewHeaderTitle False currentPage
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
        , class "text-[#333]"
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
            [ text "Claritas Studios" ]
        ]


navigation : String -> Html msg
navigation height =
    div [ class "w-full pr-2 justify-self-end" ]
        [ div [ class "xl:hidden flex justify-end" ] [ hamburgerMenu ]
        , div [ class "hidden xl:block w-full" ] [ desktopNavigation height ]
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
        [ class "h-full w-full flex justify-end content-center justify-items-center gap-8 mr-4"
        , class "text-lg text-white"
        ]
        [ viewNavButton height "/animations" "_self" "Animations"
        , viewNavButton height "/feastdayactivities" "_self" "Calendar"
        , viewNavButton height "/saints" "_self" "Saints"
        , viewNavButton height "/resources" "_self" "Resources"
        , viewNavButton height "https://shop.claritasstudios.com/" "_blank" "Shop"
        , viewNavButton height "https://blog.claritasstudios.com/" "_blank" "Blog"
        , viewNavButton height "/team" "_self" "About"
        , supportUsBtn
        ]


supportUsBtn : Html msg
supportUsBtn =
    a
        [ href "/give"
        , class "ml-2 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold bg-[#6b4ee6] hover:bg-[#7a5fff] transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6b4ee6]"
        , class "whitespace-nowrap"
        ]
        [ text "Support Us" ]


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
        , class "text-[#333]"
        , class "justify-self-start"
        , href "/"
        , attribute "aria-label" "home"
        ]
        [ logo ]
