module Resources.Subscriptions.Main exposing (..)

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
        [ viewSubpageHeader "Subscriptions" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Subscriptions" ]
        , viewAboutSubscriptions
        , div [ class "my-10" ] [ viewSignUp ]
        , viewSubscriptions
        ]


viewAboutSubscriptions : Html Never
viewAboutSubscriptions =
    div []
        [ text "Want monthly content at your front door? Check out these wonderful Catholic subscriptions."
        ]


viewSubscriptions : Html Never
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
            ]
        )


osvKids : Resource
osvKids =
    { name = "OSV Kids"
    , link = "https://osvkids.com"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/3_1__qbNDjJEy1.png?updatedAt=1679068242059"
    }


saintOfTheMonth : Resource
saintOfTheMonth =
    { name = "Saint of the Month"
    , link = "https://www.saintofthemonth.com"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/4_1__LjeiFaCGM1.png?updatedAt=1679068242210"
    }


massBox : Resource
massBox =
    { name = "Mass Box"
    , link = "https://themassbox.com"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/5_GX7izsR5Jp.png?updatedAt=1679068242472"
    }


faithAndFamilyCollective : Resource
faithAndFamilyCollective =
    { name = "Faith + Family Collective"
    , link = "https://faithandfamilycollective.com"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/6_tZqBkQ3sW.png?updatedAt=1679068242133"
    }


catholicFamilyCrate : Resource
catholicFamilyCrate =
    { name = "Catholic Family Crate"
    , link = "https://catholicfamilycrate.com"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/7_i5fOMR9CEB.png?updatedAt=1679068242443"
    }


magnifiKid : Resource
magnifiKid =
    { name = "MagnifiKid"
    , link = "https://us.magnificat.net/home/magnifikid"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/8_qucgsetg84.png?updatedAt=1679068242095"
    }


formed : Resource
formed =
    { name = "Formed"
    , link = "https://formed.org"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/9_6wjdaJHdc.png?updatedAt=1679068242300"
    }
