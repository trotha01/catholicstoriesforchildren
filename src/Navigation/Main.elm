module Navigation.Main exposing (..)

import Browser
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
                    |> toString 0
                    |> text
                    |> toHtml
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
        [ viewNavButton 1 "/" "Home"
        , viewNavButton 2 "/team" "About Us"
        , viewNavButton 3 "/animations" "Animations"
        , viewNavButton 4 "/contact" "Contact"
        , viewNavButton 5 "/resources" "Resources"
        , viewNavButton 6 "/give" "Give"
        ]


viewNavButton : Float -> String -> String -> Html msg
viewNavButton index link page =
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
        ]
        [ span [ class "px-10 m-auto" ] [ text page ] ]
