module Resources.Games.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)
import Signup exposing (..)


type alias Model =
    { signup : Signup.Model
    }


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Games" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Games" ]
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutGames
        , viewGames
        , viewWorkInProgressNotice
        ]


viewAboutGames : Html msg
viewAboutGames =
    div []
        [ text "Find games here. Games are a fun way to learn the Catholic faith."
        ]


viewGames : Html msg
viewGames =
    div []
        (List.map viewResource
            [ wanderlight
            , theCatholicCardGame
            , councilAtDaybreak
            , holyHeroes
            , brotherFrancisGames

            -- , saintCards
            , superSaintCards
            , catholicArcade
            ]
        )


wanderlight : Resource
wanderlight =
    { name = "Wanderlight"
    , link = "https://www.wanderlightgame.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/60_2jdg0x5pz.png?updatedAt=1693439790279"
    }


theCatholicCardGame : Resource
theCatholicCardGame =
    { name = "The Catholic Card Game"
    , link = "https://catholiccardgame.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/61_gGyNBdFEh.png?updatedAt=1693439790210"
    }


councilAtDaybreak : Resource
councilAtDaybreak =
    { name = "Council At Daybreak"
    , link = "https://catholiccardgame.com/collections/base-games/products/council-at-daybreak"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/CouncilAtDaybreak_zY9pkcPisJ.png?updatedAt=1693440036474"
    }



-- saintCards : Resource
-- saintCards =
--     { name = "Saint Cards"
--     , link = "https://www.saintcards.com/"
--     , image = "https://ik.imagekit.io/catholicstories/ProfileImages/62_Z__x8cDHl.png?updatedAt=1693439790262"
--     }


superSaintCards : Resource
superSaintCards =
    { name = "Super Saint Cards"
    , link = "https://armadei.com/product/super-saints/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/63_d1sooSovJJ.png?updatedAt=1693439790316"
    }


brotherFrancisGames : Resource
brotherFrancisGames =
    { name = "Brother Francis Games"
    , link = "https://brotherfrancisstore.com/collections/games"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303"
    }


catholicArcade : Resource
catholicArcade =
    { name = "Catholic Arcade"
    , link = "https://opusjoyous.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/64_P-dJU3ooLI.png?updatedAt=1693439790261"
    }


holyHeroes : Resource
holyHeroes =
    { name = "Holy Heroes Games"
    , link = "https://holyheroes.com/collections/games"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/25_OSP8-2xFJ.png?updatedAt=1682716507604"
    }
