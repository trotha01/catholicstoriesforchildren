module Animations.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)


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
    div []
        [ viewSubpageHeader "Team" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ -- center
          class "hcenter"
        , style "width" "80%"
        , style "max-width" "800px"
        ]
        [ h1 [ class "mt-10" ] [ text "Animations" ]
        , div [ class "my-10" ]
            [ p [] [ text "Our animations are built to help kids understand common Catholic prayers." ]
            , p [] [ text "You can use them to help your kids build a habit of prayer." ]
            , div [ class "mt-5" ] [ viewSignUp ]
            ]
        , animations
        ]


animations : Html msg
animations =
    div
        [ class "w-full"
        , class "grid grid-cols-1 lg:grid-cols-2"
        , class "max-w-7xl"
        , class "m-auto"
        , class "mb-20"
        ]
        [ a
            [ href "/animations/hailmary"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Hail Mary Animation"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/HailMaryThumbnail__gib_kTB5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792895348"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Hail Mary Animation"
                ]
                []
            ]
        , a
            [ href "/animations/guardianangel"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Guardian Angel Animation"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/GuardianAngelThumbnailWatchNow_BjJTzxGXi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675312385506"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Guardian Angel Animation"
                ]
                []
            ]
        , div
            [ style "border-radius" "5px"
            , class "grayscale"
            , class "hover:cursor-not-allowed"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/StMichaelThumbnail_NT9bW1h_f.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897722"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "St Michael Animation"
                ]
                []
            ]
        , div
            [ style "border-radius" "5px"
            , class "grayscale"
            , class "hover:cursor-not-allowed"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/ActOfContritionThumbnail_ZhqDBSv-_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897691"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Act of Contrition Animation"
                ]
                []
            ]
        , div
            [ style "border-radius" "5px"
            , class "grayscale"
            , class "hover:cursor-not-allowed"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/PrayerBeforeMealsThumbnail_BEdVorQ-U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897552"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Prayer Before Meals Animation"
                ]
                []
            ]
        , div
            [ style "border-radius" "5px"
            , class "grayscale"
            , class "hover:cursor-not-allowed"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/StAnthonyThumbnail_zew-tMMcf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897276"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "St Anthony Animation"
                ]
                []
            ]
        , div
            [ style "clear" "both"
            , style "width" "1px"
            ]
            []
        ]
