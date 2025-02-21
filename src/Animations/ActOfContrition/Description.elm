module Animations.ActOfContrition.Description exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)


viewAbout : Html msg
viewAbout =
    div []
        [ aboutTheAnimation
        , viewPrayer
        , aboutThePrayer
        , viewAnotherPage
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
                ("Use this animation to help your children learn the Act of Contrition prayer though a story and song."
                    ++ " It also will help your children learn more about the Sacrament of Confession and how Jesus washes our sins away."
                )
            ]
        , p [ class "my-3" ]
            [ text
                ("This animation is meant to be an aid for your children to slowly build a habit of prayer. "
                    ++ "You can use it during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "mt-10 text-lg" ]
        [ h2 [ class "mb-3" ] [ text "The Prayer" ]
        , p [ class "mb-5" ]
            [ span [ class "block" ] [ text "My God," ]
            , span [ class "block" ] [ text "I am sorry for my sins with all my heart." ]
            , span [ class "block" ] [ text "In choosing to do wrong" ]
            , span [ class "block" ] [ text "and failing to do good," ]
            , span [ class "block" ] [ text "I have sinned against you" ]
            , span [ class "block" ] [ text "whom I should love above all things." ]
            , span [ class "block" ] [ text "I firmly intend, with your help," ]
            , span [ class "block" ] [ text "to do penance," ]
            , span [ class "block" ] [ text "to sin no more," ]
            , span [ class "block" ] [ text "and to avoid whatever leads me to sin." ]
            , span [ class "block" ] [ text "Our Savior Jesus Christ suffered and died for us." ]
            , span [ class "block" ] [ text "In his name, my God, have mercy." ]
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
        [ h2 [ class "mb-3 mt-5" ] [ text "See More on Penance and Reconciliation" ]
        , h3 [ class "my-3 mt-6 font-bold" ] [ text "Scripture" ]
        , p [ class "my-3" ] [ text "The Seven Penitential Psalms: 6, 32, 38, 51, 102, 130, and 143." ]
        , p [ class "my-3" ] [ text "The contritite heart of Zacchaeus: Luke 19:1-10." ]
        , p [ class "my-3" ] [ text "The contrite heart of the Penitant woman: Luke 7:36-50." ]
        , p [ class "my-3" ] [ text "Jesus giving the authority to forgive sins: John 20:22-23." ]
        , h3 [ class "my-3" ] [ text "Church Teachings" ]
        , p [ class "my-3 mt-6 font-bold" ] [ text "CCC 1422-1498" ]
        , p [ class "my-3" ] [ text "The Nicene Creed and the Apostles’ Creed. Both profess our belief in the forgiveness of sins." ]
        , p [ class "my-3" ] [ text "The five precepts of the Church. Confessing sins is one." ]
        ]


viewAnotherPage : Html msg
viewAnotherPage =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "font-bold leading-9" ] [ text "Daisy and Sheep Animations" ]
        , p [ class "my-10" ] [ text "Make sure to also check our our Daisy and Sheep Animations! Learn the Mass and Catholic fun facts with Daisy and Sheep!" ]
        , a
            [ href "/animations/daisyandsheep"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Daisy and Sheep animations"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/DaisyAndSheep.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Daisy and Sheep Animations"
                ]
                []
            ]
        ]
