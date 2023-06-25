module Prayers.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
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
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        []
        [ viewSubpageHeader "Prayers" headerMargin |> Html.String.toHtml
        , viewBody
        , viewFooter |> Html.String.toHtml
        ]


viewBody : Html Never
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "p-10"
        ]
        [ h1
            [ class "text-center"
            , class "my-10 leading-8"
            ]
            [ text "Common Catholic Prayers" ]
        , viewSaints
        ]


viewSaints : Html Never
viewSaints =
    div []
        [ details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "The Our Father" ]
                ]
            , div [ class "p-4" ]
                [ div [] [ text "Our Father, Who art in heaven, hallowed be Thy name;" ]
                , div [] [ text "Thy kingdom come; Thy will be done on earth as it is in" ]
                , div [] [ text "heaven. Give us this day our daily bread; and forgive us our" ]
                , div [] [ text "trespasses as we forgive those who trespass against us; and" ]
                , div [] [ text "lead us not into temptation, but deliver us from evil. Amen." ]
                ]
            ]
        , details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "The Hail Mary" ]
                ]
            , p [ class "p-4" ]
                [ div [] [ text "Hail, Mary, full of grace," ]
                , div [] [ text "the Lord is with thee." ]
                , div [] [ text "Blessed art thou amongst women" ]
                , div [] [ text "and blessed is the fruit of thy womb, Jesus." ]
                , div [] [ text "Holy Mary, Mother of God," ]
                , div [] [ text "pray for us sinners," ]
                , div [] [ text "now and at the hour of our death." ]
                , div [] [ text "Amen." ]
                ]
            ]
        , details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "The Glory Be" ]
                ]
            , p [ class "p-4" ]
                [ div [] [ text "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the" ]
                , div [] [ text "beginning, is now, and ever shall be, world without end. Amen." ]
                ]
            ]
        , details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "Saint Michael the Archangel" ]
                ]
            , p [ class "p-4" ]
                [ div [] [ text "St. Michael the Archangel, defend us in battle." ]
                , div [] [ text "Be our defense against the wickedness and snares of the Devil." ]
                , div [] [ text "May God rebuke him, we humbly pray, and do thou," ]
                , div [] [ text "O Prince of the heavenly hosts, by the power of God," ]
                , div [] [ text "cast into hell Satan, and all the evil spirits," ]
                , div [] [ text "who prowl about the world seeking the ruin of souls. Amen." ]
                ]
            ]
        , details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "Guardian Angel Prayer" ]
                ]
            , p [ class "p-4" ]
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
        , details []
            [ summary [ class "list-none cursor-pointer hover:bg-csc-lightpurple px-4 py-8 rounded underline text-sky-500 leading-8" ]
                [ h2 [] [ text "The Angelus" ]
                ]
            , p [ class "p-4" ]
                [ div [] [ text "V. The Angel of the Lord declared unto Mary," ]
                , div [] [ text "R. And she conceived of the Holy Spirit." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "Hail, Mary, full of grace," ]
                , div [] [ text "the Lord is with thee." ]
                , div [] [ text "Blessed art thou amongst women" ]
                , div [] [ text "and blessed is the fruit of thy womb, Jesus." ]
                , div [] [ text "Holy Mary, Mother of God," ]
                , div [] [ text "pray for us sinners," ]
                , div [] [ text "now and at the hour of our death." ]
                , div [] [ text "Amen." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "V. Behold the handmaid of the Lord," ]
                , div [] [ text "R. Be it done unto me according to your Word." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "Hail, Mary..." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "V. And the Word was made flesh," ]
                , div [] [ text "R. and dwelt among us." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "Hail, Mary..." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "V. Pray for us, O holy Mother of God," ]
                , div [] [ text "R. That we may be made worthy of the promises of Christ." ]
                , div [ class "py-4" ] [ text "" ]
                , div [] [ text "Let us pray:" ]
                , div [] [ text " Pour forth, we beseech you, O Lord, your grace into our hearts:" ]
                , div [] [ text " that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel," ]
                , div [] [ text " may by his Passion and Cross be brought to the glory of his Resurrection." ]
                , div [] [ text " Through the same Christ our Lord." ]
                , div [] [ text " Amen" ]
                ]
            ]
        ]


headerClass : String
headerClass =
    "mb-5 mt-10"
