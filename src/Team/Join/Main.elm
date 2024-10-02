module Team.Join.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)



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
        [ viewSubpageHeader "Join the Team" headerMargin
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
        [ h1 [ class "my-10" ] [ text "Join the Team" ]
        , viewAbout
        , viewOpportunities
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
        , h2 [ class "my-7" ] [ text "Vision" ]
        , p [] [ text "Catholic Stories for Children is made with the vision that all Catholics have a strong love of God and neighbor." ]
        , h2 [ class "my-7" ] [ text "Mission" ]
        , p [] [ text "Our hope is to help others along this journey with joyful stories." ]
        ]


viewOpportunities : Html msg
viewOpportunities =
    div []
        [ div []
            [ h2 [ class "mt-16 mb-7" ] [ text "Animation Internship" ]
            , p [] [ span [ class "font-bold" ] [ text "Location: " ], span [] [ text "Mostly Remote /\u{00A0}based near Orange County, CA" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Duration: " ], span [] [ text "Ten weeks. Approximately nine hours per week" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Pay: " ], span [] [ text "$20 per hour." ] ]
            , p [] [ span [ class "font-bold" ] [ text "Date Posted: " ], span [] [ text "October 1, 2024" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Start Date: " ], span [] [ text "January, 2025" ] ]
            , br [] []
            , p [ class "font-bold" ] [ text "Job Description" ]
            , p [] [ text "We are looking for an emerging 2-D animation artist to animate backgrounds and digital assets for two projects." ]
            , ul [ class "ml-5" ]
                [ li [ class "font-bold" ] [ text "Project One: " ]
                , span [] [ text "A live-action animation series for YouTube. The series features a husband-and-wife composer/performer team, teaching preschool aged children songs with hand motions about their Catholic faith." ]
                , li [ class "font-bold" ] [ text "Project Two: " ]
                , span [] [ text "A series of shorts teaching children about famous saints. This project  is in collaboration with a well-known Catholic retailer, specializing in quiet books for infants/toddlers, and uses their original illustrations." ]
                ]
            , br [] []
            , p [] [ text "The internship will last for the length of the spring semester with the possibility of turning into a project-based contracted position." ]
            , br [] []
            , p [ class "font-bold" ] [ text "Key Qualifications:" ]
            , ul [ class "list-disc ml-5" ]
                [ li [] [ text "Desire to share our Catholic faith with children and families." ]
                , li [] [ text "Excellent communication skills, openness to collaboration, teachable attitude." ]
                , li [] [ text "Computer proficiency (Google Suites, able to learn new software/apps)." ]
                , li [] [ text "Computer requirements: Must be able to run Adobe Suite products." ]
                ]
            , br [] []
            , p [] [ text "Note: We are constantly updating our projects. The details may change from what is described above." ]
            , a
                [ href "https://forms.clickup.com/18021848/f/h5zer-2871/77ETSZW1EQHQ2BHB9A"
                , rel "noopener"
                , target "_blank"
                , class "mt-5"
                , style "text-decoration" "none"
                , style "padding" "10px 20px"
                , style "display" "inline-block"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                , style "color" "white"
                , style "background-color" "#9200B3"
                ]
                [ text "Apply now" ]
            ]
        , div []
            [ h2 [ class "mt-16 mb-7" ] [ text "Videographer Internship" ]
            , p [] [ span [ class "font-bold" ] [ text "Location: " ], span [] [ text "Mostly Remote /\u{00A0}based near Orange County, CA" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Duration: " ], span [] [ text "Ten weeks. Approximately nine hours per week" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Pay: " ], span [] [ text "$20 per hour. Day Rate for Filming Days: $220 per diem." ] ]
            , p [] [ span [ class "font-bold" ] [ text "Date Posted: " ], span [] [ text "October 1, 2024" ] ]
            , p [] [ span [ class "font-bold" ] [ text "Start Date: " ], span [] [ text "January, 2025" ] ]
            , br [] [ text "" ]
            , p [ class "font-bold" ] [ text "Job Description" ]
            , p [] [ text "We are looking for two emerging cinematographers to shoot multiple day-in-the-life videos approximately 6-10 minutes in length. This will be a docuseries released on our YouTube channel and delivered to our clients. The series follows members of both secular and religious orders through a typical day, with an aim to show young adult vocational discerners what community life is really like." ]
            , br [] []
            , p [] [ text "Cinematography interns will be expected to light subjects, capture footage according to the script/shot list provided by CSC producers, and edit the final film. (All locations will be within driving distance of San Diego, CA)." ]
            , br [] []
            , p [] [ text "The internship will last for the length of the spring semester with the possibility of turning into a project-based contracted position." ]
            , br [] []
            , p [ class "font-bold" ] [ text "Key Qualifications:" ]
            , ul [ class "list-disc ml-5" ]
                [ li [] [ text "Desire to help secular/religious communities increase vocations." ]
                , li [] [ text "Excellent communication skills, openness to collaboration, teachable attitude." ]
                , li [] [ text "Computer proficiency (Google Suites, able to learn new software /\u{00A0}apps)." ]
                ]
            , a
                [ href "https://forms.clickup.com/18021848/f/h5zer-2891/N0BN94ZV7P09TSEZ9K"
                , rel "noopener"
                , target "_blank"
                , class "mt-5"
                , style "text-decoration" "none"
                , style "padding" "10px 20px"
                , style "display" "inline-block"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                , style "color" "white"
                , style "background-color" "#9200B3"
                ]
                [ text "Apply now" ]
            ]
        ]
