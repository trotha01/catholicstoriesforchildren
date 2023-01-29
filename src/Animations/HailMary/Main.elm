module Animations.HailMary.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Encode


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Give" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        []
        [ h1 h1Style [ text "Hail Mary" ]
        , viewVideoPlayers
        , aboutTheAnimation
        , aboutThePrayer
        ]


viewVideoPlayers : Html msg
viewVideoPlayers =
    div
        [ class "grid grid-cols-2 gap-2"
        , class "max-w-5xl"
        , class "m-auto"
        ]
        [ div
            [ style "position" "relative"
            , style "padding-bottom" "56.25%"
            , height 0
            , style "overflow" "hidden"
            , style "max-width" "100%"
            , style "border-radius" "5px"
            , style "margin-top" "80px"
            ]
            [ iframe
                [ style "position" "absolute"
                , style "width" "100%"
                , style "height" "100%"
                , style "top" "0"
                , style "left" "0"
                , src "https://www.youtube.com/embed/HW0DzGEoa1Y"
                , title "Hail Mary, Full of Grace Video"
                , property "frameborder" (Json.Encode.string "0")
                , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                , property "allowfullscreen" (Json.Encode.string "true")
                ]
                []
            ]
        , div
            [ style "position" "relative"
            , style "padding-bottom" "56.25%"
            , height 0
            , style "overflow" "hidden"
            , style "max-width" "100%"
            , style "border-radius" "5px"
            , style "margin-top" "80px"
            ]
            [ iframe
                [ style "position" "absolute"
                , style "width" "100%"
                , style "height" "100%"
                , style "top" "0"
                , style "left" "0"
                , src "https://www.youtube-nocookie.com/embed/QNVNbLiqznI"
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
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "p-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Animation" ]
        , p [ class "my-10" ]
            [ text "This animation helps kids learn the Hail Mary prayer though a story and repetition." ]
        , p [ class "my-10" ]
            [ text
                ("This animation is meant to be an aid for kids to slowly build a habit of prayer. "
                    ++ "It is a tool that can be used during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "p-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Prayer" ]
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
            [ Html.String.Attributes.cite "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html"
            , class "my-10"
            , class "px-4 py-1 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
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
            , class "px-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            , Html.String.Attributes.cite "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html"
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
