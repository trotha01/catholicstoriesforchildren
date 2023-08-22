module Resources.Videos.Main exposing (..)

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
        [ viewSubpageHeader "Youtube Channels" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Youtube Channels" ]
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutVideos
        , viewVideos
        , viewWorkInProgressNotice
        ]


viewAboutVideos : Html msg
viewAboutVideos =
    div []
        [ text "Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home."
        ]


viewVideos : Html msg
viewVideos =
    div []
        (List.map viewResource
            [ catholicStoriesForChildren
            , christineInAction
            , tomkin
            , juiceBox
            , catholicKidsMedia
            , brotherFrancis
            , catholicSongsForKids
            , opusJoyous
            , catholicIcing
            , amyheysart
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


juiceBox : Resource
juiceBox =
    { name = "Spirit Juice Kids"
    , link = "https://www.youtube.com/@SpiritJuiceKids"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/juicebox_flQW7t8YD.png?updatedAt=1692736674561"
    }


catholicIcing : Resource
catholicIcing =
    { name = "Catholic Icing"
    , link = "https://www.youtube.com/@CatholicIcing"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/41_XrkKmwtXL.png?updatedAt=1682876930378"
    }


amyheysart : Resource
amyheysart =
    { name = "Amy Heyse Art"
    , link = "https://www.youtube.com/@amyheyseart"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/AmyH_ld3G4EoVX.png?updatedAt=1692735921831"
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
