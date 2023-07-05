module Resources.Prayer.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
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
        [ viewSubpageHeader "Prayer Resources" headerMargin |> Html.String.toHtml
        , viewBody model
        , viewFooter |> Html.String.toHtml
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Prayer Resources" ]
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutPrayerResources
        , viewVideos
        , viewWorkInProgressNotice
        ]


viewAboutPrayerResources : Html msg
viewAboutPrayerResources =
    div []
        [ text "Find resources to help build your prayer life here."
        ]


viewVideos : Html msg
viewVideos =
    div []
        (List.map viewResource
            [ theHallowApp
            , theAmenApp
            , twoByTwo
            ]
        )


theHallowApp : Resource
theHallowApp =
    { name = "The Hallow Prayer App"
    , link = "https://hallow.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/45_n7tIe7YkV.png?updatedAt=1683227692949"
    }


theAmenApp : Resource
theAmenApp =
    { name = "The Amen Prayer App"
    , link = "https://amenapp.org/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/44_A3rkyg807.png?updatedAt=1683227692705"
    }


twoByTwo : Resource
twoByTwo =
    { name = "Two by two Prayer Website"
    , link = "https://twobytwoprayer.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/twobytwo_jqaTekz8M.png?updatedAt=1683228056777"
    }
