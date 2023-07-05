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
        , class "bg-csc-lightpurple"
        , class "pt-5"
        ]
        [ viewNavButton 1 "_self" "/" "Home"
        , viewNavButton 2 "_self" "/team" "About Us"
        , viewNavButton 3 "_self" "/animations" "Animations"
        , viewNavButton 4 "_self" "/contact" "Contact"
        , viewNavButton 5 "_self" "/resources" "Resources"
        , viewNavButton 6 "_self" "/give" "Give"
        , viewNavButton 7 "_blank" "https://www.etsy.com/shop/CatholicStories" "Shop"
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
        , class "text-4xl text-semibold"
        , style "animation" ("fadeIn " ++ animationTime ++ "s")
        , target linkTarget
        ]
        [ span [ class "px-10 m-auto" ] [ text page ] ]
