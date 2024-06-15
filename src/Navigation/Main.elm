module Navigation.Main exposing (..)

import Browser
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        [ class "min-h-screen"
        , class "flex flex-col"
        , class "bg-[#fef7f4]"
        , class "pt-5"
        , class "text-semibold"
        , class "text-xl sm:text-2xl md:text-3xl"
        ]
        [ viewNavButton 1 "_self" "/" "Home"
        , viewNavButton 2 "_self" "/feastdayactivities" "Feast Day Activities"
        , viewNavButton 3 "_self" "/saints" "Saints"
        , viewNavButton 4 "_self" "/animations" "Animations"
        , viewNavButton 5 "_self" "/resources" "Resources"

        -- , viewNavButton 6 "_blank" "https://www.etsy.com/shop/CatholicStories" "Shop"
        , viewNavButton 6 "_blank" "/shop" "Shop"
        , viewNavButton 7 "_self" "/give" "Give"
        , viewNavButton 8 "_self" "/team" "About Us"
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
        , class "px-10 py-5"
        , class "rounded-t"
        , style "animation" ("fadeIn " ++ animationTime ++ "s")
        , target linkTarget
        ]
        [ span [ class "px-10 m-auto" ] [ text page ] ]
