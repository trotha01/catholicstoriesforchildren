module Resources.Main exposing (..)

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
        [ viewSubpageHeader "Resources" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Resources" ]
        , viewAboutResources
        , a
            [ href "/animations/actofcontrition"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "Act of Contrition Animation Coming Soon"
            , class "block mt-20 mb-2"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Act of Contrition Animation"
                ]
                []
            ]
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewResourceGroups
        , viewWorkInProgressNotice
        ]


viewAboutResources : Html msg
viewAboutResources =
    div []
        [ p [] [ text "Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them." ]
        ]


viewResourceGroups : Html msg
viewResourceGroups =
    div []
        (List.map viewResourceGroup [ books, podcasts, videos, subscriptions, prayerResources, feastDayActivities, gameResources ])


viewResourceGroup : ResourceGroup -> Html msg
viewResourceGroup resourceGroup =
    a
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"
        , href resourceGroup.link
        , attribute "aria-label" resourceGroup.name
        ]
        [ div []
            [ img [ src resourceGroup.image, class "w-20 h-20 object-cover" ] []
            ]
        , div []
            [ h2 [] [ text resourceGroup.name ]
            , p [] [ text resourceGroup.description ]
            ]
        ]


podcasts : ResourceGroup
podcasts =
    { name = "Podcasts"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/1_EAfo23y5R.png?updatedAt=1679066451335"
    , description = "Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves."
    , link = "/resources/podcasts"
    }


videos : ResourceGroup
videos =
    { name = "Youtube Channels"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272"
    , description = "Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home."
    , link = "/resources/videos"
    }


books : ResourceGroup
books =
    { name = "Books"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106"
    , description = "Find books here. It's hard to go wrong with a good Catholic book."
    , link = "/resources/books"
    }


subscriptions : ResourceGroup
subscriptions =
    { name = "Subscriptions"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068"
    , description = "Want monthly content at your front door? Check out these wonderful Catholic subscriptions."
    , link = "/resources/subscriptions"
    }


prayerResources : ResourceGroup
prayerResources =
    { name = "Prayer Resources"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863"
    , description = "Find more resources here to help build your prayer life"
    , link = "/resources/prayer"
    }


feastDayActivities : ResourceGroup
feastDayActivities =
    { name = "Feast Day Activities"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png?updatedAt=1686096632436"
    , description = "Find activities for feast days throughout the year"
    , link = "/feastdayactivities"
    }


gameResources : ResourceGroup
gameResources =
    { name = "Games"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/Game%20Icon_rb2djF7Hf.png?updatedAt=1693438195519"
    , description = "Find game resources for a fun way to learn about the Catholic faith"
    , link = "/resources/games"
    }
