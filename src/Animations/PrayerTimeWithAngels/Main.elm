module Animations.PrayerTimeWithAngels.Main exposing (..)

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
    div [ class "hcenter" ]
        [ div
            [ class "hcenter py-5 px-11 max-w-3xl" ]
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
                ]
            ]
        , div [ class "mt-2 mb-20" ]
            [ Signup.view4 |> Html.map SignupMsg ]
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
            [ href "/animations/guardianangel"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Guardian Angel Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/GuardianAngel.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Guardian Angel Animation"
                ]
                []
            ]
        , a
            [ href "/animations/stmichael"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the St Michael the Archangel Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/SaintMichael.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "St Michael Animation"
                ]
                []
            ]
        , a
            [ href "/animations/actofcontrition"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "Act of Contrition Animation Coming Soon"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/ActOfContrition.png"
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
                [ src "/assets/images/AnimationImageLinks/PrayerBeforeMeals.png"
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
                [ src "/assets/images/AnimationImageLinks/SaintAnthony.png"
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
