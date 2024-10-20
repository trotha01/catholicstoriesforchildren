module Animations.DaisyAndSheep.PenitentialAct.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Signup exposing (..)


type VideoOption
    = English
    | Spanish


type alias Model =
    { videoTab : VideoOption
    , signup : Signup.Model
    }


type Msg
    = VideoTabClick VideoOption
    | SignupMsg Signup.Msg


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( { videoTab = English, signup = Signup.init }, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )

        VideoTabClick language ->
            ( { model | videoTab = language }, Cmd.none )


view : Model -> Html Msg
view model =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Penitential Act" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Penitential Act" ]
        , aboutTheAnimation
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewVideoPlayers model
        , div [ class "py-4" ] [ viewActivities ]

        -- , viewPrayer
        -- , scripture
        -- , tradition
        -- , magisterialTeachings
        -- , aboutThePrayer
        ]


englishVideoLink : String
englishVideoLink =
    "https://www.youtube-nocookie.com/embed/ay8Kzqeyrrc"


spanishVideoLink : String
spanishVideoLink =
    "https://www.youtube-nocookie.com/embed/cfZsgMZjCAw"


viewVideoPlayers : Model -> Html Msg
viewVideoPlayers model =
    div
        []
        [ viewVideoPlayerTabs model
        , case model.videoTab of
            English ->
                viewVideo "Penitential Act | Daisy and Sheep" englishVideoLink

            Spanish ->
                viewVideo "Penitential Act | Daisy and Sheep" spanishVideoLink
        ]


viewVideoPlayerTabs : Model -> Html Msg
viewVideoPlayerTabs model =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

        ( englishClass, aslClass ) =
            case model.videoTab of
                English ->
                    ( selectedClass, nonSelectedClass )

                Spanish ->
                    ( nonSelectedClass, selectedClass )
    in
    div [ class "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ li [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ englishClass)
                    , onClick (VideoTabClick English)
                    ]
                    [ text "English" ]
                ]
            , li
                [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ aslClass)
                    , onClick (VideoTabClick Spanish)
                    ]
                    [ text "Spanish" ]
                ]
            ]
        ]


viewVideoPlayer : String -> Html msg
viewVideoPlayer link =
    div
        [ class "w-1/2"
        ]
        [ viewVideo "Penitential Act | Daisy and Sheep" link
        ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3" ]
            [ text
                ("Use this animation to help your children learn about the Penitential Act."
                    ++ " These animations will help your children stay engaged with the Mass from beginning to end."
                )
            ]
        ]


viewActivities : Html msg
viewActivities =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text "Penitential Act" ]
        , div [ class "grid grid-cols-2 gap-4" ]
            [ div []
                [ p [ class "h-14" ]
                    [ text "Access coloring pages, copywork, discussion questions and more!"
                    ]
                , a
                    [ attribute "aria-label" "Penitential Act"
                    , href "/printables/daisyandsheep/Penitential Act.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "/assets/images/daisyandsheep/penitentialact.png"
                        ]
                        []
                    ]
                ]
            , div []
                [ p [ class "h-14" ]
                    [ text "Answers to Penitential Act activity questions."
                    ]
                , a
                    [ attribute "aria-label" "Penitential Act Activity Answers"
                    , href "/printables/daisyandsheep/Penitential Act Answer Key.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "/assets/images/daisyandsheep/penitentialactanswers.png"
                        ]
                        []
                    ]
                ]
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "mt-10 text-lg" ]
        [ h2 [ class "mb-3" ] [ text "The Prayer" ]
        , p []
            [ span [ class "block" ] [ text "Angel Of God, my guardian dear," ]
            , span [ class "block" ] [ text "to whom God's love commits me here," ]
            , span [ class "block" ] [ text "ever this day be at my side," ]
            , span [ class "block" ] [ text "to light and guard, to rule and guide." ]
            , span [ class "block" ] [ text "Amen." ]
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Guardian Angel Prayer" ]
        , p [ class "my-3" ] [ text "" ]
        ]


scripture : Html msg
scripture =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Scripture" ]
        , p [ class "" ]
            [ text "We find a reference to guardian angels in Jesus' parable of the Lost Sheep. He talks about the guardian angels of the little ones and how their angels always look upon the face of God the Father in heaven." ]
        , p [ class "my-3 font-semibold" ]
            [ text """See that you do not despise one of these little ones, for I say to you that their angels in heaven always look upon the face of my heavenly Father.  - Matthew 18:10 """ ]
        , p [ class "" ]
            [ text
                ("We also find a reference to guardian angels in Acts of the Apostles when Peter knocked on the gateway door at the house of Mary, the mother of Mark. Rhonda was excited to hear his voice so she ran to the others to announce his arrival."
                    ++ " But they didn't believe her and thought it was Peter's angel."
                )
            ]
        , p [ class "my-3 font-semibold" ]
            [ span [ class "italic" ] [ text """ Angelus eius est! """ ]
            , span [] [ text """- "It's his angel!" - Acts 12:15 """ ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    " See on what intimate terms the early Christians were with their guardian angels. And what about you? "
                ]
            , p
                [ class "mt-2" ]
                [ text "St Josemaría Escrivá, The Way, 570"
                ]
            ]
        ]


tradition : Html msg
tradition =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Tradition" ]
        , p [ class "" ]
            [ text "We can find some of our early church fathers talking about guardian angels." ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "For regiments of angels are distributed over nations and cities; and perhaps some even are assigned to particular individuals."
                ]
            , p
                [ class "mt-2" ]
                [ text "Clement of Alexandria, Miscellanies 6.17"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "High dignity of souls, that each from its birth has an Angel set in charge over it!"
                ]
            , p
                [ class "mt-2" ]
                [ text "St. Jerome"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "Beside each believer stands an angel as protector and shepherd leading him to life."
                ]
            , p
                [ class "mt-2" ]
                [ text "St. Basil, Adv. Eunomium III, 1: PG 29, 656B"
                ]
            ]
        ]


magisterialTeachings : Html msg
magisterialTeachings =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Popes and The Magisterium" ]
        , p [ class "" ]
            [ text "We can also find popes and magisterial teachings on the care of angels over us." ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "From its beginning until death, human life is surrounded by their watchful care and intercession."
                ]
            , p
                [ class "mt-2" ]
                [ text "CCC 336"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "Dear friends, the Lord is ever close and active in humanity’s history and accompanies us with the unique presence of his Angels, whom today the Church venerates as “Guardian Angels”, that is, ministers of the divine care for every human being. From the beginning until the hour of death, human life is surrounded by their constant protection."
                ]
            , p
                [ class "mt-2" ]
                [ text "Pope Benedict XVI, Angelus, Oct. 2, 2011]"
                ]
            ]
        ]
