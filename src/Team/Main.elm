module Team.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import List
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
        ]


viewTeam : Html msg
viewTeam =
    div []
        [ h2 [ class "my-10" ]
            [ text "The Team"
            ]
        , viewPeople "Staff" "" staff
        , viewPeople "Board of Advisors" "" boardOfAdvisors
        , viewPeople "Talent" "A number of talented artists, contractors, teams and people help bring these animations to life." contractors
        ]


viewPeople : String -> String -> List Person -> Html msg
viewPeople title description people =
    div [ style "margin-bottom" "100px" ]
        ([ h3 [ class "text-2xl" ] [ text title ]
         , div
            [ class "hcenter"
            ]
            [ text description ]
         ]
            ++ List.map
                (\person ->
                    div [ class "my-10" ]
                        [ viewPerson person
                        ]
                )
                people
        )


viewPerson : Person -> Html msg
viewPerson person =
    div
        [ -- POSITION
          style "display" "grid"
        , style "grid-template-columns" "72px 1fr"
        , class "h-full"

        -- SIZE
        , style "min-height" "115px"

        -- STYLE
        , style "background" "white"
        , style "border-radius" "4px"
        , style "padding" "20px"
        ]
        [ div
            [ style "margin" "0px 10px 40px 0"
            , class "float-left relative"
            ]
            [ viewPersonImage person
            ]
        , div []
            [ viewName person.name
            , viewPosition person.position
            , viewDescription person.description
            , viewSocials person
            ]
        ]


viewPersonImage : Person -> Html msg
viewPersonImage person =
    viewImage person.image person.initials


viewSocials : Person -> Html msg
viewSocials person =
    div
        [ style "margin-top" "10px"
        , class "flex items-center"
        ]
        (List.map viewSocial (List.sortWith socialSort person.socials))


socialSort : ( Social, String ) -> ( Social, String ) -> Order
socialSort ( social1, link1 ) ( social2, link2 ) =
    socialOrdering social1 social2


viewImage : String -> String -> Html msg
viewImage image initials =
    if image == "" then
        div
            [ -- POSITION
              style "position" "relative"

            -- SIZE
            , style "width" "52px"
            , style "height" "52px"

            -- STYLE
            , style "border-radius" "30px"
            , style "border" "1px solid #777"
            , style "background-color" darkPurple
            ]
            [ div
                [ style "position" "absolute"
                , style "top" "50%"
                , style "left" "50%"
                , style "transform" "translate(-50%, -50%)"
                ]
                [ text initials
                ]
            ]

    else
        img
            [ -- SIZE
              style "width" "52px"
            , style "height" "52px"

            -- STYLE
            , style "border-radius" "30px"
            , style "border" "1px solid #777"
            , style "object-fit" "cover"
            , src image
            , alt ""
            , attribute "ariaHidden" "true"
            ]
            []


viewName : String -> Html msg
viewName name =
    div []
        [ text name ]


viewPosition : String -> Html msg
viewPosition position =
    div
        [ style "color" "#333"
        , style "font-size" ".8em"
        ]
        [ text position ]


viewDescription : String -> Html msg
viewDescription description =
    div
        [ style "overflow-wrap" "anywhere"
        , style "margin-top" "10px"
        ]
        [ text description
        ]
