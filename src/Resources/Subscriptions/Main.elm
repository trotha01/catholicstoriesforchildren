module Resources.Subscriptions.Main exposing (..)

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
        [ viewSubpageHeader "Subscriptions" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Subscriptions" ]
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutSubscriptions
        , viewSubscriptions
        , viewWorkInProgressNotice
        ]


viewAboutSubscriptions : Html msg
viewAboutSubscriptions =
    div []
        [ text "Want monthly content at your front door? Check out these wonderful Catholic subscriptions."
        ]


viewSubscriptions : Html msg
viewSubscriptions =
    div []
        (List.map viewResource
            [ osvKids
            , saintOfTheMonth
            , massBox
            , faithAndFamilyCollective
            , catholicFamilyCrate
            , magnifiKid
            , formed
            , diaryOfAGodman
            ]
        )


osvKids : Resource
osvKids =
    { name = "OSV Kids Magazine"
    , link = "https://osvkids.com/magazine/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/3_1__qbNDjJEy1.png?updatedAt=1685581657645"
    }


saintOfTheMonth : Resource
saintOfTheMonth =
    { name = "Saint of the Month Box"
    , link = "https://www.saintofthemonth.com"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/4_1__LjeiFaCGM1.png?updatedAt=1685581640310"
    }


massBox : Resource
massBox =
    { name = "Mass Box"
    , link = "https://themassbox.com"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/5_GX7izsR5Jp.png?updatedAt=1685581558288"
    }


faithAndFamilyCollective : Resource
faithAndFamilyCollective =
    { name = "Faith + Family Collective"
    , link = "https://faithandfamilycollective.com"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/6_tZqBkQ3sW.png?updatedAt=1685581578667"
    }


catholicFamilyCrate : Resource
catholicFamilyCrate =
    { name = "Catholic Family Crate"
    , link = "https://catholicfamilycrate.com"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/7_i5fOMR9CEB.png?updatedAt=1685581542221"
    }


lettersFromTheSaints : Resource
lettersFromTheSaints =
    { name = "Letters from the Saints"
    , link = "https://www.lettersfromthesaints.com/"
    , image = ""
    }


magnifiKid : Resource
magnifiKid =
    { name = "MagnifiKid"
    , link = "https://us.magnificat.net/home/magnifikid"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/8_qucgsetg84.png?updatedAt=1685581652225"
    }


formed : Resource
formed =
    { name = "Formed"
    , link = "https://formed.org"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/9_6wjdaJHdc.png?updatedAt=1685581568223"
    }


diaryOfAGodman : Resource
diaryOfAGodman =
    { name = "Diary of a God-Man"
    , link = "https://www.diaryofagodman.com/subscriptions"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/27_LJ8rjMXH6.png?updatedAt=1682716507484"
    }
