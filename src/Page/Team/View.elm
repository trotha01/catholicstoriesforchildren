module Page.Team.View exposing (..)

import Component.Footer exposing (viewFooter)
import Component.Social exposing (email)
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Resources.Helpers exposing (Resource, viewResource)
import Page.Team.Team exposing (..)



-- MAIN


view : Html msg
view =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , class "bg-black text-white"
        ]
        [ viewBody
        , viewFooter
        ]


viewBody : Html msg
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
            [ text """Claritas Studios is a 501(c)(3) nonprofit built with a passion for spreading God's love to hearts around the world through engaging and beautiful stories, animations, and music."""
            ]
        , p []
            [ text """We envision our work nurturing people of all ages around the world in their spiritual development by providing captivating and faith-filled stories that instill Catholic values and a deep connection to the Catholic faith."""
            ]

        -- , div [ class "mt-5" ] [ viewSignUp ]
        , h2 [ class "my-7" ] [ text "Vision" ]
        , p [] [ text "Claritas Studios envisions our work nurturing people of all ages around the world in their spiritual development by providing captivating and faith-filled stories that instill Catholic values and a deep connection to the Catholic faith." ]
        , h2 [ class "my-7" ] [ text "Mission" ]
        , p [] [ text "The mission of Claritas Studios is to engage future saints with the Catholic faith through stories that inspire, educate, and foster an understanding of the beauty and joy of God's love." ]
        , h2 [ class "my-7", id "contact" ] [ text "Contact" ]
        , p []
            [ text "Please reach out. I love to hear from you!!!"
            ]
        , p []
            [ email
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
                , ocCatholic
                , inHisImage

                -- , churchMilitant
                , cfnLive
                ]
            )
        ]


ocCatholic : Resource
ocCatholic =
    { name = "Orange County Catholic"
    , link = "https://www.occatholic.com/catholic-stories-for-children-helping-the-next-generation-understand-the-faith/"
    , image = "/assets/images/ProfilePictures/OCCatholic.png"
    }


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


cfnLive : Resource
cfnLive =
    { name = "CFN Live"
    , link = "https://vimeo.com/963295296/89fc748d09?share=copy"
    , image = "/assets/images/ProfilePictures/CFN.png"
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
