module Resources.Videos.Main exposing (..)

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
        [ viewSubpageHeader "Youtube Channels" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Youtube Channels" ]
        , viewAboutVideos
        , div [ class "my-10" ] [ viewSignUp ]
        , viewVideos
        , viewWorkInProgressNotice
        ]


viewAboutVideos : Html Never
viewAboutVideos =
    div []
        [ text "Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home."
        ]


viewVideos : Html Never
viewVideos =
    div []
        (List.map viewResource
            [ catholicStoriesForChildren
            , christineInAction
            , tomkin
            , catholicKidsMedia
            , brotherFrancis
            , catholicSongsForKids
            , catholicIcing
            , opusJoyous
            , prostradaDesigns
            ]
        )


catholicStoriesForChildren : Resource
catholicStoriesForChildren =
    { name = "Catholic Stories For Children"
    , link = "https://www.youtube.com/@CatholicStoriesforChildren"
    , image = "https://ik.imagekit.io/catholicstories/CSCLogo_JiNT9WUPX.png?updatedAt=1679070448402"
    }


catholicKidsMedia : Resource
catholicKidsMedia =
    { name = "Catholic Kids Media"
    , link = "https://www.youtube.com/@CatholicKidsMedia"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/17_z9ZERCAuK.png?updatedAt=1679070333348"
    }


brotherFrancis : Resource
brotherFrancis =
    { name = "Brother Francis"
    , link = "https://www.youtube.com/@BrotherFrancis"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303"
    }


tomkin : Resource
tomkin =
    { name = "Tomkin"
    , link = "https://www.youtube.com/playlist?list=PL9CQlldupc5_L0shwBi1w-n5liWhD0ArO"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/15_Wrw3_kbKK.png?updatedAt=1679070333309"
    }


christineInAction : Resource
christineInAction =
    { name = "Christine In Action"
    , link = "https://www.youtube.com/@ChristineInAction"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/christineinaction_Le5_7yr2K.jpeg?updatedAt=1682821244341"
    }


catholicSongsForKids : Resource
catholicSongsForKids =
    { name = "Catholic Songs for Kids"
    , link = "https://www.youtube.com/@catholicsongsforkids"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/40_vS6tZTdD3.png?updatedAt=1682876930344"
    }


catholicIcing : Resource
catholicIcing =
    { name = "Catholic Icing"
    , link = "https://www.youtube.com/@CatholicIcing"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/41_XrkKmwtXL.png?updatedAt=1682876930378"
    }


prostradaDesigns : Resource
prostradaDesigns =
    { name = "Prostrada Designs"
    , link = "https://www.youtube.com/@prostradadesignsllc"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/42_GMJuNZEVs.png?updatedAt=1683226627331"
    }


opusJoyous : Resource
opusJoyous =
    { name = "Opus Joyous"
    , link = "https://www.youtube.com/@OpusJoyous"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/opusjoyouslogo__bVhpC3Fj.jpeg?updatedAt=1687549207653"
    }
