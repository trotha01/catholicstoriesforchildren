module Animations.Main exposing (..)

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
            [ p [ class "my-5" ] [ text "Use these animations to help your kids build a habit of prayer." ]
            , p [ class "my-5" ]
                [ text
                    ("From the prayer before meals to the prayer to their guardian angel to the Hail Mary, "
                        ++ "prayer helps kids grow in their relationship with God and grow in the virtues."
                    )
                ]
            , p [ class "my-5" ]
                [ text
                    ("Do you want your children to grow in gratitude? Start with the prayer before meals."
                        ++ " Do you want your children to grow in humility? Start with the Act of Contrition."
                        ++ " Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers."
                        ++ " A habit of prayer will help your kid grow into the virtuous person that you will delight to see."
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
            [ href "/animations/hailmary"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Hail Mary Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/HailMary.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Hail Mary Animation"
                ]
                []
            ]
        , a
            [ href "/animations/prayertimewithangels"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Prayer Time with Angels animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Prayer Time with Angels animations"
                ]
                []
            ]
        , a
            [ href "/animations/daisyandsheep"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "Daisy and Sheep animations"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/DaisyAndSheep.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Daisy and Sheep Animations"
                ]
                []
            ]
        , div
            [ style "clear" "both"
            , style "width" "1px"
            ]
            []
        ]
