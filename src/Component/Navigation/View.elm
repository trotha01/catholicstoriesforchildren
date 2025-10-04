module Component.Navigation.View exposing (..)

import Component.Header exposing (viewHeader)
import Html exposing (..)
import Html.Attributes exposing (..)
import Theme.Layout exposing (headerMargin)


view : Html msg
view =
    div [ class "bg-black" ]
        [ viewHeader "Menu" headerMargin
        , div
            [ class "min-h-screen"
            , class "flex flex-col"
            , class "bg-black text-white"
            , class "pt-5 px-20"
            , class "text-semibold"
            , class "text-xl sm:text-2xl md:text-3xl"
            ]
            [ viewNavButton 1 "_self" "/animations" "Animations"
            , viewNavButton 2 "_self" "/feastdayactivities" "Calendar"
            , viewNavButton 3 "_self" "/saints" "Saints"
            , viewNavButton 4 "_self" "/resources" "Resources"
            , viewNavButton 5 "_blank" "https://shop.claritasstudios.com/" "Shop"
            , viewNavButton 6 "_blank" "https://blog.claritasstudios.com/" "Blog"
            , viewNavButton 7 "_self" "/give" "Donate"
            , viewNavButton 8 "_self" "/team" "About Us"
            , a
                [ href "/give"
                , class "block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-colors"
                ]
                [ text "Support Us"
                ]
            ]
        ]


viewNavButton : Float -> String -> String -> String -> Html msg
viewNavButton index linkTarget link page =
    let
        animationTime =
            (index * 0.5)
                |> Basics.clamp 1 3
                |> String.fromFloat
    in
    a
        [ href link
        , class "hover:bg-csc-lightpurple"
        , class "py-5"
        , class "rounded-t"
        , style "animation" ("fadeIn " ++ animationTime ++ "s")
        , target linkTarget
        ]
        [ span [ class "m-auto" ] [ text page ] ]
