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
        [ viewNavButton "/" "Home"
        , viewNavButton "/team" "About Us"
        , viewNavButton "/animations" "Animations"
        , viewNavButton "/contact" "Contact"
        , viewNavButton "/resources" "Resources"
        , viewNavButton "/give" "Give"
        ]


viewNavButton : String -> String -> Html msg
viewNavButton link page =
    a
        [ href link
        , class "hover:bg-csc-lightpurple"
        , class "px-10 py-5"
        , class "rounded-t"
        , class "text-4xl text-semibold"
        ]
        [ span [ class "px-10 m-auto" ] [ text page ] ]
