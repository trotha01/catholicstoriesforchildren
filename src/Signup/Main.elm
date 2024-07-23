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
        , style "min-height" "700px"
        ]
        [ viewPageHeaderNoLinks "Sign Up" headerMargin
        , viewBody model

        -- Signup is in the footer
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-lg"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ div [ class "text-lg" ]
            [ h2 [ class "mb-10" ] [ text "Unlock a World of Faith and Fun!" ]
            , p [ class "mb-5" ]
                [ text "At Catholic Stories for Children, we're dedicated to making Catholic teachings engaging and accessible for families. By signing up for our newsletter, you'll receive: " ]
            , ul [ class "list-disc pl-5 mb-10" ]
                [ li [ class "mb-3" ]
                    [ span [ class "font-bold" ] [ text "Free Animations: " ]
                    , span [] [ text " Bring Catholic prayers, saints, and stories to life with our vibrant animations." ]
                    ]
                , li [ class "mb-3" ]
                    [ span [ class "font-bold" ] [ text "Exciting Activities: " ]
                    , span [] [ text "Engage your children with fun, faith-filled activities that reinforce what they learn." ]
                    ]
                , li [ class "mb-3" ]
                    [ span [ class "font-bold" ] [ text "Valuable Resources: " ]
                    , span [] [ text "Access a treasure trove of tools and tips to support your family's spiritual journey." ]
                    ]
                , li [ class "mb-3" ]
                    [ span [ class "font-bold" ] [ text "Exclusive Updates: " ]
                    , span [] [ text "Be the first to know about our latest projects, events, and special offers." ]
                    ]
                ]
            , p []
                [ text "Join our community of like-minded families and enrich your children's faith experience. Sign up today and start exploring the wonderful world of Catholic stories and teachings!"
                ]
            ]
        ]



-- [ Html.iframe
--     [ src "https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084"
--     , height 320
--     , style "width" "100%"
--     , attribute "frameborder" "0"
--     , attribute "scrolling" "no"
--     , attribute "data-test-id" "beehiiv-embed"
--     , style "margin" "0"
--     , style "border-radius" "4px"
--     , style "border" "2px solid #e5e7eb"
--     , style "background-color" "transparent"
--     ]
--     []
-- ]
