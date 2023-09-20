module Team.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)
import Team.Team exposing (..)



-- MAIN


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Team" headerMargin
        , viewBody
        , viewFooter
        ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "font-family" "hvdComicSerifPro"
    , style "width" "80%"
    , style "max-width" "800px"
    ]


h1Style : List (Attribute msg)
h1Style =
    titleStyle
        ++ [ class "my-10" ]


viewBody : Html Never
viewBody =
    div
        [ -- center
          class "hcenter"
        , style "width" "80%"
        , style "max-width" "800px"
        ]
        [ h1 [ class "my-10" ] [ text "About Us" ]
        , viewAbout
        , viewTeam
        ]


viewAbout : Html msg
viewAbout =
    div []
        [ p [ class "mb-4" ]
            [ text """Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts."""
            ]
        , p []
            [ text """Many kids today are growing up without knowing the core concepts of our faith. Many are learning the prayers without understanding the words they are saying. We hope to help bridge this gap with enjoyable stories, animations and songs. We hope to help kids grow with a strong love of neighbor and God."""
            ]
        , div [ class "mt-5" ] [ viewSignUp ]
        , h2 [ class "my-7" ] [ text "Vision" ]
        , p [] [ text "Catholic Stories for Children is made with the vision that all Catholics have a strong love of God and neighbor." ]
        , h2 [ class "my-7" ] [ text "Mission" ]
        , p [] [ text "Our hope is to help others along this journey with joyful stories." ]
        , h2 [ class "my-7" ] [ text "Contact" ]
        , p []
            [ text "Please reach out. I love to hear from you!"
            ]
        , p []
            [ Helpers.email
            ]
        , p []
            [ a [ href "https://calendar.app.google/PBwGTHVqb44PuRTH9", class "text-blue-600", target "_blank" ] [ text "Schedule a meeting with me!" ]
            ]
        ]


viewTeam : Html msg
viewTeam =
    div []
        [ h2 [ class "my-10" ]
            [ text "The Team"
            ]
        , div [ style "margin-bottom" "100px" ] [ viewPeople "Staff" "" staff ]
        , div [ style "margin-bottom" "100px" ] [ viewPeople "Board of Advisors" "" boardOfAdvisors ]
        , div [ style "margin-bottom" "100px" ] [ viewPeople "Talent" "A number of talented artists, contractors, teams and people help bring these animations to life." contractors ]
        ]
