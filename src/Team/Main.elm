module Team.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)
import Resources.Helpers exposing (Resource, viewResource)
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
        , viewInTheMedia
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
        , h2 [ class "my-7", id "contact" ] [ text "Contact" ]
        , p []
            [ text "Please reach out. I love to hear from you!!!"
            ]
        , p []
            [ Helpers.email
            ]
        , p []
            [ a [ href "https://calendar.app.google/PBwGTHVqb44PuRTH9", class "text-blue-600", target "_blank" ] [ text "Schedule a meeting with me!" ]
            ]
        ]


viewInTheMedia : Html msg
viewInTheMedia =
    div []
        [ h2 [ class "my-10" ]
            [ text "In The Media"
            ]
        , div []
            (List.map viewResource
                [ spiritFilledMedia
                , makeJoyNormal
                , christianChannel
                , inHisImage
                , churchMilitant
                ]
            )
        ]


spiritFilledMedia : Resource
spiritFilledMedia =
    { name = "Spirit Filled Media Podcast"
    , link = "https://www.buzzsprout.com/1467955/10425762-finding-your-way-catholic-stories-for-children-guest-trevor-rothaus "
    , image = "/assets/images/ProfilePictures/SpiritFilledMedia.png"
    }


makeJoyNormal : Resource
makeJoyNormal =
    { name = "Make Joy Normal Podcast"
    , link = "https://podcasts.apple.com/ca/podcast/catholic-stories-for-children-an-interview-with/id1512837291?i=1000631285156"
    , image = "/assets/images/ProfilePictures/MakeJoyNormal.png"
    }


christianChannel : Resource
christianChannel =
    { name = "Christian Channel"
    , link = "https://youtu.be/p4yi5EFbPAI?si=L0jtHxwFyyS4jMjC"
    , image = "/assets/images/ProfilePictures/ChristianChannel.png"
    }


inHisImage : Resource
inHisImage =
    { name = "In His Image Podcast"
    , link = "https://youtu.be/eqOmqdlNIDw?si=E9xTDcqQV_nFFQs-"
    , image = "/assets/images/ProfilePictures/InHisDesign.png"
    }


churchMilitant : Resource
churchMilitant =
    { name = "Church Militant"
    , link = "https://www.churchmilitant.com/news/article/new-animation-teaches-st-michael-prayer"
    , image = "/assets/images/ProfilePictures/ChurchMilitant.png"
    }


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
