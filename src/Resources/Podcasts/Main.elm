module Resources.Podcasts.Main exposing (..)

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
        [ viewSubpageHeader "Podcasts" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Podcasts" ]
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutPodcasts
        , viewPodcasts
        , viewWorkInProgressNotice
        ]


viewAboutPodcasts : Html msg
viewAboutPodcasts =
    div []
        [ text "Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves."
        ]


viewPodcasts : Html msg
viewPodcasts =
    div []
        (List.map viewResource
            [ saintStoriesForKids
            , catholicSprouts
            , bibleInAYearWithTeddy
            , thatsTheWord
            , onTheNightTrain
            , saintsAlive
            , catholicKidsPodcast
            , catholicKidsTriviaPodcast
            ]
        )


saintStoriesForKids : Resource
saintStoriesForKids =
    { name = "Saint Stories for Kids"
    , link = "https://podcasts.apple.com/ca/podcast/saint-stories-for-kids/id1448514363"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/10_W0OwjM8Yu.png?updatedAt=1679069711783"
    }


bibleInAYearWithTeddy : Resource
bibleInAYearWithTeddy =
    { name = "Kids Bible in a Year with Teddy"
    , link = "https://podcasts.apple.com/us/podcast/kids-bible-in-a-year-with-teddy/id1676869671"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/kidsbibleinayearwithteddy_dLisfpvYA.png?updatedAt=1689211660566"
    }


catholicSprouts : Resource
catholicSprouts =
    { name = "Catholic Sprouts"
    , link = "https://podcasts.apple.com/ca/podcast/catholic-sprouts-daily-podcast-for-catholic-kids/id1406174660"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/11_HUKazDTNih.png?updatedAt=1679069711765"
    }


thatsTheWord : Resource
thatsTheWord =
    { name = "That's the word"
    , link = "https://podcasts.apple.com/us/podcast/thats-the-word-with-fr-james-yamauchi/id1540449749"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/12_NwOXTTpkTi.png?updatedAt=1679069710890"
    }


onTheNightTrain : Resource
onTheNightTrain =
    { name = "On The Night Train"
    , link = "https://podcasts.apple.com/us/podcast/on-the-night-train/id1638922447"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/On_The_Night_Train_Uy2SqRG8B.png?updatedAt=1679069840295"
    }


saintsAlive : Resource
saintsAlive =
    { name = "Saints Alive"
    , link = "https://podcasts.apple.com/us/podcast/saints-alive-podcast/id1598392451"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/14_Aps0ku8wH.png?updatedAt=1679069710842"
    }


catholicKidsPodcast : Resource
catholicKidsPodcast =
    { name = "Catholic Kids Podcast"
    , link = "https://podcasts.apple.com/us/podcast/catholic-kids-podcast/id1557527100"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/3rd_Party_Logos_Mz1VR_PBx.png?updatedAt=1679071655063"
    }


catholicKidsTriviaPodcast : Resource
catholicKidsTriviaPodcast =
    { name = "Catholic Kids Trivia Podcast"
    , link = "https://podcasts.apple.com/us/podcast/catholic-kids-trivia-podcast/id1662532400"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicKidsTriviaPodcast_rFHEiGK88.png?updatedAt=1679071809107"
    }
