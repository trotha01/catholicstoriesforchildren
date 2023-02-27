module Animations.HailMary.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Html.String
import Json.Encode
import Newsroom.Main exposing (viewSignUp)


type alias Model =
    { videoTab : VideoOption
    }


type VideoOption
    = English
    | ASL


main : Program () Model Msg
main =
    Browser.sandbox
        { init =
            { videoTab = English
            }
        , view = view
        , update = update
        }


type Msg
    = VideoTabClick VideoOption


update : Msg -> Model -> Model
update msg model =
    case msg of
        VideoTabClick videoTab ->
            { model | videoTab = videoTab }


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
        [ viewSubpageHeader "Give" headerMargin |> Html.String.toHtml
        , viewBody model
        , viewFooter |> Html.String.toHtml
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        ]
        [ h1 [ class "my-10" ] [ text "Hail Mary Animation for Children" ]
        , aboutTheAnimation
        , div [ class "mb-10" ] [ viewSignUp |> Html.String.toHtml ]
        , viewVideoPlayers model
        , aboutThePrayer
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
                viewVideo englishVideoLink

            ASL ->
                viewVideo aslVideoLink
        ]


englishVideoLink : String
englishVideoLink =
    "https://www.youtube-nocookie.com/embed/HW0DzGEoa1Y"


aslVideoLink : String
aslVideoLink =
    "https://www.youtube-nocookie.com/embed/QNVNbLiqznI"


viewVideo : String -> Html msg
viewVideo link =
    div
        [ class "w-1/2"
        ]
        [ div
            [ style "position" "relative"
            , style "padding-bottom" "56.25%"
            , height 0
            , style "overflow" "hidden"
            , style "max-width" "100%"
            , style "border-radius" "5px"
            ]
            [ iframe
                [ style "position" "absolute"
                , style "width" "100%"
                , style "height" "100%"
                , style "top" "0"
                , style "left" "0"
                , src link
                , title "Hail Mary, Full of Grace Video"
                , property "frameborder" (Json.Encode.string "0")
                , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                , property "allowfullscreen" (Json.Encode.string "true")
                ]
                []
            ]
        ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3" ]
            [ text "This animation helps kids learn the Hail Mary prayer though a story and repetition." ]
        , p [ class "my-3" ]
            [ text
                ("The animation is meant to be an aid for kids to slowly build a habit of prayer. "
                    ++ "It is a tool that can be used during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
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
        [ h2 [] [ text "About the Hail Mary Prayer" ]
        , p [ class "my-10" ] [ text "The Hail Mary is a beautiful prayer to Mary, the Mother of Jesus. This prayer is filled with Scripture." ]
        , p [ class "my-10" ]
            [ text
                ("In this prayer, we begin with the greeting of St. Michael the Archangel, "
                    ++ "'Hail Mary, full of grace, the Lord is with you' (Luke 1:28). "
                    ++ "What does it mean to be full of grace? Mary considered in her mind what sort of greeting this might be (Luke 1:29). "
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
                ("Then we praise Mary in the same way as her cousin Elizabeth, "
                    ++ "'Blessed are you among women, and blessed is the fruit of your womb' (Luke 1:42)."
                )
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
            [ text
                ("Lastly, we asks Mary to pray for us, "
                    ++ "Holy Mary, Mother of God, pray for us sinners now and at the hour of death. Amen."
                )
            ]
        ]
