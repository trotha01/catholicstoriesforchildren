module Animations.GuardianAngel.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
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
        [ viewSubpageHeader "Guardian Angel" headerMargin |> Html.String.toHtml
        , viewBody
        , viewFooter |> Html.String.toHtml
        ]


viewBody : Html Never
viewBody =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Guardian Angel Prayer" ]
        , aboutTheAnimation
        , div [ class "mb-10" ] [ viewSignUp |> Html.String.toHtml ]
        , viewVideoPlayers
        , viewPrayer

        -- , aboutThePrayer
        ]


viewVideoPlayers : Html msg
viewVideoPlayers =
    viewVideo
        "Guardian Angel | Prayer Time with Angels"
        "https://www.youtube-nocookie.com/embed/03hmpXjV_ck"


viewVideoPlayer : String -> Html msg
viewVideoPlayer link =
    div
        [ class "w-1/2"
        ]
        [ viewVideo "Guardian Angel | Prayer Time with Angels" link
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
                ("Use this animation to help your children learn the Guardian Angel prayer though a story and song."
                    ++ " It also will help your children understand the concept of a guardian angel."
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
