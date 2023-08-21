module Prayer.ThreeHailMarys.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
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
        []
        [ viewSubpageHeader "Prayers" headerMargin
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
            , class "my-10 leading-8"
            ]
            [ text "The Three Hail Marys" ]
        , viewThreeHailMarysPage
        ]


viewThreeHailMarysPage : Html Never
viewThreeHailMarysPage =
    div [ class "max-w-3xl" ]
        [ div [ class "mb-16" ] [ viewAboutTheThreeHailMarys ]
        , div [ class "mb-16" ] [ viewThreeHailMarysPrayerVideo ]
        , div [] [ viewThreeHailMarysPrayer ]
        ]


viewAboutTheThreeHailMarys : Html Never
viewAboutTheThreeHailMarys =
    div []
        [ h2 [ class "mb-4" ] [ text "What is the Three Hail Marys" ]
        , text ""
        ]


viewThreeHailMarysPrayerVideo : Html Never
viewThreeHailMarysPrayerVideo =
    viewVideo "" "https://www.youtube-nocookie.com/embed/-r6ChB56gr4"


viewThreeHailMarysPrayer : Html Never
viewThreeHailMarysPrayer =
    div []
        [ h2 [ class "mb-4" ] [ text "The Three Hail Marys Prayer" ]
        , p []
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
