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
        [ class "w-screen h-screen"
        , class "grid grid-rows-6"
        , class "bg-csc-lightpurple"
        ]
        [ viewNavButton "/" "Home"
        , viewNavButton "/team" "About Us"
        , viewNavButton "/animations" "Animations"
        , viewNavButton "/contact" "Contact"
        , viewNavButton "/newsroom" "Newsroom"
        , viewNavButton "/give" "Give"
        ]


viewNavButton : String -> String -> Html msg
viewNavButton link page =
    a
        [ href link
        , class "hover:bg-csc-lightpurple"
        , class "p-10"
        , class "rounded-t"
        , class "border-b-gray-500 border-b-2"
        , class "text-2xl"
        ]
        [ text page ]
