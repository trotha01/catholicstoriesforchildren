module Animations.DaisyAndSheep.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup exposing (..)


type alias Model =
    { signup : Signup.Model }


type Msg
    = SignupMsg Signup.Msg


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( { signup = Signup.init }, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )


view : Model -> Html Msg
view model =
    div
        [ class "bg-[#FEF7F4]"
        ]
        [ viewSubpageHeader "Animations" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "hcenter py-5 px-11"
        , style "max-width" "800px"
        ]
        [ h1 [ class "leading-10" ] [ text "Start teaching your children with Catholic animations" ]
        , div [ class "my-10" ]
            [ p [ class "my-5" ] [ text "Use these animations to help your kids learn about the Catholic Mass and fun facts about the Cathoilc Church." ]
            , p [ class "my-5" ]
                [ text
                    ("Walk step by step through the Mass with these animations. Your kids will start to "
                        ++ "learn each part and become more engaged as they understand what is happening every Sunday!"
                    )
                ]
            , div [ class "mt-2" ]
                [ Signup.view model.signup |> Html.map SignupMsg ]
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
            [ href "/animations/daisyandsheep/liturgicalkiss"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Liturgical Kiss Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/LiturgicalKiss.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Liturgical Kiss Animation"
                ]
                []
            ]
        , a
            [ href "/animations/daisyandsheep/astronomyprogram"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Astronmy Program Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/AstronomyProgram.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Astronomy Program Animation"
                ]
                []
            ]
        , a
            [ href "/animations/daisyandsheep/penitentialact"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Penitential Act Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/PenitentialAct.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Penitential Act Animation"
                ]
                []
            ]
        ]
