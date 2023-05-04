module Resources.Prayer.Main exposing (..)

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
        [ viewSubpageHeader "Prayer Resources" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Prayer Resources" ]
        , viewAboutPrayerResources
        , div [ class "my-10" ] [ viewSignUp ]
        , viewVideos
        , viewWorkInProgressNotice
        ]


viewAboutPrayerResources : Html Never
viewAboutPrayerResources =
    div []
        [ text "Find resources to help build your prayer life here."
        ]


viewVideos : Html Never
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
