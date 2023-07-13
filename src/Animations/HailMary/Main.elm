module Animations.HailMary.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Signup exposing (..)
import Team.Main exposing (viewPersonImage)
import Team.Team exposing (trevor)


type VideoOption
    = English
    | ASL


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
        [ viewSubpageHeader "Hail Mary" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Teaching Children about Mother Mary through Animated Stories" ]
        , aboutTheAnimation
        , viewVideoPlayers model
        , div [ class "py-4" ] [ viewActivities ]
        , viewPrayer
        , moreAboutTheAnimation
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , div [ class "mb-20" ]
            [ viewResources
            ]
        , aboutThePrayer
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
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

                ASL ->
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
                    , onClick (VideoTabClick ASL)
                    ]
                    [ text "ASL" ]
                ]
            ]
        ]


viewVideoPlayers : Model -> Html Msg
viewVideoPlayers model =
    div
        []
        [ viewVideoPlayerTabs model
        , case model.videoTab of
            English ->
                viewVideo "Hail Mary, Full of Grace Video" englishVideoLink

            ASL ->
                viewVideo "Hail Mary, Full of Grace Video" aslVideoLink
        ]


englishVideoLink : String
englishVideoLink =
    "https://www.youtube-nocookie.com/embed/HW0DzGEoa1Y"


aslVideoLink : String
aslVideoLink =
    "https://www.youtube-nocookie.com/embed/QNVNbLiqznI"


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3" ] [ text "Welcome to Catholic Stories for Children! I’m Trevor Rothaus, the founder. You’ve visited our website because, like me, you know that Mother Mary is one of the most people in our Catholic faith. She is admired for her unwavering faith, humility, and devotion to her son, Jesus Christ." ]
        , p [ class "my-3" ]
            [ span [] [ text "Her life and teachings have been a source of inspiration for Christians, and " ]
            , span [ class "font-bold" ] [ text "Mother Mary’s story has been passed down from generation to generation." ]
            ]
        , p [ class "my-3" ] [ text "One way to teach children about Mother Mary is through animated stories. These stories convey her life and importance in a way that is engaging and memorable. By using animation, children can see the events of her life come to life before their eyes, making it easier for them to understand and remember." ]
        , p [ class "my-3" ]
            [ span [] [ text "Here is just one example of how we do this at Catholic Stories for Children." ]
            , span [ class "font-bold" ] [ text " This animation helps kids learn the Hail Mary prayer through a story and repetition." ]
            , span [] [ text " The animation is designed to be an aid for children to build a habit of prayer. You can use it during prayer time while kids still learn the words and the solemn manner to pray." ]
            ]
        ]


moreAboutTheAnimation : Html msg
moreAboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "mb-3 font-bold" ] [ text "Creating an animation on the Hail Mary prayer" ]
        , p [ class "my-3" ] [ text "When creating the animated story about Mother Mary, we stay true to her character. Her devotion to God and love for her son are at the forefront, and the animation reflects this. By doing so, children can learn about her life and teachings in a way that is both entertaining and informative." ]
        , p [ class "my-3" ] [ text "Would you agree?" ]
        , p [ class "my-3" ] [ text "Our animations are great for homeschooling, hybrid schooling, and traditional religious education." ]
        , p [ class "my-3" ] [ text "Here at Catholic Stories for Children, our animated stories cover prayer, including the Hail Mary prayer (above), the St Michael prayer, and the prayer to your Guardian Angel. These animations also explore the virtues, such as humility, faith, and compassion. Each story is carefully crafted to ensure that it is both engaging and educational." ]
        , p [ class "my-3" ] [ text "Prayer is tremendously important in our Catholic faith, and building a habit of prayer has much to offer children. By creating animated stories that teach Catholic prayers and reflect Catholic virtues and teachings, we can help children learn about the faith in a way that is both entertaining and informative. These stories can inspire children to live a life of faith, love, and compassion, just like Mother Mary did." ]
        , p [ class "my-3 font-bold" ] [ text "I invite you to receive this free guide on bringing kids to Mass. We asked parents for their top tips and put it together in this guide for you. This guide is completely free and you can start using it this week!" ]
        ]


viewResources : Html msg
viewResources =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3 font-bold" ] [ text "Additional information about the prayer to Mother Mary" ]
        , p [ class "my-3" ] [ text "Below, I have listed important prayers and resources about Mother Mary which you will find useful in sharing with children." ]
        , p [ class "my-3" ] [ text "Thank you, and may God bless you," ]
        , p [ class "my-3" ]
            [ span [ class "my-3" ] [ text "Trevor Rothaus " ]
            , viewPersonImage trevor
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "mt-10 text-lg" ]
        [ p [ class "mb-3 font-bold" ] [ text "The Prayer" ]
        , p [ class "italic mb-4" ]
            [ span [ class "block" ] [ text "Hail Mary, full of grace, the Lord is with you;" ]
            , span [ class "block" ] [ text "blessed are you among women," ]
            , span [ class "block" ] [ text "and blessed is the fruit of your womb, Jesus." ]
            , span [ class "block" ] [ text "Holy Mary, Mother of God," ]
            , span [ class "block" ] [ text "pray for us sinners" ]
            , span [ class "block" ] [ text "now and at the hour of our death." ]
            , span [ class "block" ] [ text "Amen." ]
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "font-bold leading-9" ] [ text "Additional information about the prayer to Mother Mary" ]
        , p [ class "my-10" ] [ text "The Hail Mary is a beautiful prayer to Mary, the Mother of Jesus. This prayer is filled with Scripture." ]
        , p [ class "my-10" ]
            [ text
                "In this prayer, we begin with the greeting of St. Michael the Archangel, "
            , span [ class "font-semibold" ] [ text "'Hail Mary, full of grace, the Lord is with you' (Luke 1:28). " ]
            , text
                ("What does it mean to be full of grace? Mary considered in her mind what sort of greeting this might be (Luke 1:29). "
                    ++ "To be completely filled with grace indicates that Mary is "
                    ++ "without sin."
                )
            ]
        , blockquote
            [ Html.Attributes.cite "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html"
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    ("Because of this gift of sublime grace she far surpasses all creatures, "
                        ++ "both in heaven and on earth. At the same time, however, because "
                        ++ "she belongs to the offspring of Adam she is one with all those who "
                        ++ "are to be saved. "
                    )
                ]
            , p
                [ class "mt-2" ]
                [ text "Lumen Gentium, 53"
                ]
            ]
        , p [ class "my-10" ]
            [ text
                "Then we praise Mary in the same way as her cousin Elizabeth, "
            , span [ class "font-semibold" ] [ text "'Blessed are you among women, and blessed is the fruit of your womb' (Luke 1:42)." ]
            ]
        , blockquote
            [ class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            , Html.Attributes.cite "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    ("""If after the announcement of the heavenly messenger the Virgin of Nazareth is also called """
                        ++ """ "blessed among women" (cf. Lk. 1:42), it is because of that blessing with which "God the Father" has """
                        ++ """filled us "in the heavenly places, in Christ." It is a spiritual blessing which is meant for all people and """
                        ++ """which bears in itself fullness and universality ("every blessing"). It flows from that love which, in the """
                        ++ """Holy Spirit, unites the consubstantial Son to the Father. At the same time, it is a blessing poured out through """
                        ++ """Jesus Christ upon human history until the end: upon all people. This blessing, however, refers to Mary in a """
                        ++ """special and exceptional degree: for she was greeted by Elizabeth as "blessed among women." """
                    )
                ]
            , p
                [ class "my-10"
                ]
                [ text """Pope John Paul II, Redemptoris Mater, 8"""
                ]
            ]
        , p [ class "my-10" ]
            [ text "Lastly, we ask Mary to pray for us. "
            , span [ class "font-semibold" ] [ text "'Holy Mary, Mother of God, pray for us sinners now and at the hour of death. Amen.'" ]
            ]
        ]


viewActivities : Html msg
viewActivities =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text "Hail Mary Prayer Activities" ]
        , div [ class "grid grid-cols-2 gap-4" ]
            [ div []
                [ p [ class "h-14" ]
                    [ text "Access coloring pages, copywork, discussion questions and more!"
                    ]
                , a
                    [ attribute "aria-label" "Hail Mary Prayer Activities"
                    , href "/printables/Hail-Mary-Activities.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "https://ik.imagekit.io/catholicstories/9_1__-d-EPYcuW.png?updatedAt=1689288132704"
                        ]
                        []
                    ]
                ]
            , div []
                [ p [ class "h-14" ]
                    [ text "Answers to Hail Mary Prayer activity questions."
                    ]
                , a
                    [ attribute "aria-label" "Hail Mary Activity Answers"
                    , href "/printables/Hail-Mary-Activity-Answers.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "https://ik.imagekit.io/catholicstories/10_1__s3i8dhFiH.png?updatedAt=1689288132684"
                        ]
                        []
                    ]
                ]
            ]
        ]
