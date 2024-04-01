module Signup.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewPageHeaderNoLinks, viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)
import Signup exposing (..)


type alias Model =
    {}


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( {}, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        , style "position" "relative"
        ]
        [ viewPageHeaderNoLinks "Sign Up" headerMargin
        , viewBody model
        , div [ style "position" "absolute", style "bottom" "0" ]
            [ viewFooter
            ]
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ Html.iframe
            [ src "https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084"
            , height 320
            , style "width" "100%"
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , attribute "data-test-id" "beehiiv-embed"
            , style "margin" "0"
            , style "border-radius" "4px"
            , style "border" "2px solid #e5e7eb"
            , style "background-color" "transparent"
            ]
            []
        ]
