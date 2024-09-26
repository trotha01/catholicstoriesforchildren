module Animations.VideoPage exposing (..)

import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Signup


type alias Model msg =
    { title : String
    , about : Html msg
    , activities : Html msg
    , videoTitles :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    , videoLinks :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    , videoTab : VideoOption
    }


type VideoOption
    = English
    | Spanish
    | Urdu
    | Asl


type Msg
    = VideoTabClick VideoOption


update : Msg -> Model msg -> ( Model msg, Cmd Msg )
update msg model =
    case msg of
        VideoTabClick language ->
            ( { model | videoTab = language }, Cmd.none )


viewPage : Model msg -> Html Msg
viewPage page =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader page.title headerMargin
        , viewBody page
        , viewFooter
        ]


viewBody : VideoPage msg -> Html Msg
viewBody page =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Liturgical Kiss" ]
        , page.about
        , Signup.view3
        , viewVideoPlayers page
        , page.activities

        -- , div [ class "py-4" ] [ viewActivities ]
        ]


viewVideoPlayers : VideoPage msg -> Html Msg
viewVideoPlayers page =
    div
        []
        [ viewVideoPlayerTabs page
        , case page.videoTab of
            English ->
                viewVideo page.videoTitles.english page.videoLinks.english

            Spanish ->
                viewVideo page.videoTitles.spanish page.videoLinks.spanish

            Asl ->
                viewVideo page.videoTitles.asl page.videoLinks.asl

            Urdu ->
                viewVideo page.videoTitles.urdu page.videoLinks.urdu
        ]


viewVideoPlayerTabs : VideoPage msg -> Html Msg
viewVideoPlayerTabs page =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
    in
    div [ class "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ li [ class "mr-2" ]
                [ button
                    [ class
                        ("inline-block p-4 border-b-2 rounded-t-lg "
                            ++ (if page.videoTab == English then
                                    selectedClass

                                else
                                    nonSelectedClass
                               )
                        )
                    , onClick (VideoTabClick English)
                    ]
                    [ text "English" ]
                ]
            , if not (String.isEmpty page.videoLinks.spanish) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if page.videoTab == Spanish then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Spanish)
                        ]
                        [ text "Spanish" ]
                    ]

              else
                span [] []
            , if not (String.isEmpty page.videoLinks.urdu) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if page.videoTab == Urdu then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Urdu)
                        ]
                        [ text "Urdu" ]
                    ]

              else
                span [] []
            , if not (String.isEmpty page.videoLinks.asl) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if page.videoTab == Asl then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Asl)
                        ]
                        [ text "Asl" ]
                    ]

              else
                span [] []
            ]
        ]
