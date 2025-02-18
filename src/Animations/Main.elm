module Animations.Main exposing (..)

import Animations.Helpers exposing (AnimationLink, viewAnimationLink, viewAnimationLinks)
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
        [ class "bg-[#282c2e] text-white"
        ]
        [ viewSubpageHeader "Animations" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "hcenter" ]
        [ div
            [ class "hcenter py-5 px-11 max-w-3xl" ]
            [ h1 [ class "leading-10 my-10" ] [ text "Start teaching your children with Catholic animations" ]
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
        , div [ class "mt-2 mb-20 text-black" ]
            [ Signup.view4 |> Html.map SignupMsg ]
        , viewAnimationLinks animationLinks
        ]


animationLinks : List AnimationLink
animationLinks =
    [ { link = "/animations/hailmary"
      , imgSrc = "/assets/images/AnimationImageLinks/HailMary.png"
      , ariaLabel = "See the Hail Mary Animation"
      , isLive = True
      }
    , { link = "/animations/prayertimewithangels"
      , imgSrc = "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png"
      , ariaLabel = "See the Prayer Time with Angels animation"
      , isLive = True
      }
    , { link = "/animations/daisyandsheep"
      , imgSrc = "/assets/images/AnimationImageLinks/DaisyAndSheep.png"
      , ariaLabel = "See the Daisy and Sheep animation"
      , isLive = True
      }
    , { link = "/animations/songsofthesaints"
      , imgSrc = "/assets/images/AnimationImageLinks/SongsOfTheSaints.png"
      , ariaLabel = "See the Songs of the Saints animations"
      , isLive = True
      }
    ]
