module Prayers.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import List exposing (head)



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
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        []
        [ viewSubpageHeader "Contact" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "p-10"
        ]
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "Common Catholic Prayers" ]
        , viewSaints
        ]


viewSaints : Html Never
viewSaints =
    div []
        [ h2 [ class headerClass ] [ text "The Our Father" ]
        , p []
            [ div [] [ text "Our Father, Who art in heaven, hallowed be Thy name;" ]
            , div [] [ text "Thy kingdom come; Thy will be done on earth as it is in" ]
            , div [] [ text "heaven. Give us this day our daily bread; and forgive us our" ]
            , div [] [ text "trespasses as we forgive those who trespass against us; and" ]
            , div [] [ text "lead us not into temptation, but deliver us from evil. Amen." ]
            ]
        , h2 [ class headerClass ] [ text "The Hail Mary" ]
        , p []
            [ div [] [ text "Hail, Mary, full of grace," ]
            , div [] [ text "the Lord is with thee." ]
            , div [] [ text "Blessed art thou amongst women" ]
            , div [] [ text "and blessed is the fruit of thy womb, Jesus." ]
            , div [] [ text "Holy Mary, Mother of God," ]
            , div [] [ text "pray for us sinners," ]
            , div [] [ text "now and at the hour of our death." ]
            , div [] [ text "Amen." ]
            ]
        , h2 [ class headerClass ] [ text "The Glory Be" ]
        , p []
            [ div [] [ text "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the" ]
            , div [] [ text "beginning, is now, and ever shall be, world without end. Amen." ]
            ]
        , h2 [ class headerClass ] [ text "Saint Michael the Archangel" ]
        , p []
            [ div [] [ text "St. Michael the Archangel, defend us in battle." ]
            , div [] [ text "Be our defense against the wickedness and snares of the Devil." ]
            , div [] [ text "May God rebuke him, we humbly pray, and do thou," ]
            , div [] [ text "O Prince of the heavenly hosts, by the power of God," ]
            , div [] [ text "cast into hell Satan, and all the evil spirits," ]
            , div [] [ text "who prowl about the world seeking the ruin of souls. Amen." ]
            ]
        , h2 [ class headerClass ] [ text "Guardian Angel Prayer" ]
        , p []
            [ div [] [ text "Angel of God," ]
            , div [] [ text "my guardian dear," ]
            , div [] [ text "To whom God’s love" ]
            , div [] [ text "commits me here," ]
            , div [] [ text "Ever this day," ]
            , div [] [ text "be at my side," ]
            , div [] [ text "To light and guard," ]
            , div [] [ text "Rule and guide." ]
            , div [] [ text "Amen." ]
            ]
        ]


headerClass : String
headerClass =
    "mb-5 mt-10"
