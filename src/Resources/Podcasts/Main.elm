module Resources.Podcasts.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)
import Resources.Helpers exposing (..)


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Podcasts" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Podcasts" ]
        , viewAboutPodcasts
        , div [ class "my-10" ] [ viewSignUp ]
        , viewPodcasts
        , viewWorkInProgressNotice
        ]


viewAboutPodcasts : Html Never
viewAboutPodcasts =
    div []
        [ text "Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves."
        ]


viewPodcasts : Html Never
viewPodcasts =
    div []
        (List.map viewResource
            [ saintStoriesForKids
            , catholicSprouts
            , thatsTheWord
            , onTheNightTrain
            , saintsAlive
            ]
        )


saintStoriesForKids : Resource
saintStoriesForKids =
    { name = "Saint Stories for Kids"
    , link = "https://podcasts.apple.com/ca/podcast/saint-stories-for-kids/id1448514363"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/10_W0OwjM8Yu.png?updatedAt=1679069711783"
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
