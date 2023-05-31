module Resources.Main exposing (..)

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


main : Program () Model msg
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


view : Html msg
view =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Resources" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html msg
viewBody =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Resources" ]
        , viewAboutResources
        , div [ class "mb-10" ] [ viewSignUp ]
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
        (List.map viewResourceGroup [ books, podcasts, videos, subscriptions, prayerResources ])


viewResourceGroup : ResourceGroup -> Html msg
viewResourceGroup resourceGroup =
    a
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"
        , href ("/resources/" ++ resourceGroup.link)
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
    , link = "podcasts"
    }


videos : ResourceGroup
videos =
    { name = "Youtube Channels"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272"
    , description = "Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home."
    , link = "videos"
    }


books : ResourceGroup
books =
    { name = "Books"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106"
    , description = "Find books here. It's hard to go wrong with a good Catholic book."
    , link = "books"
    }


subscriptions : ResourceGroup
subscriptions =
    { name = "Subscriptions"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068"
    , description = "Want monthly content at your front door? Check out these wonderful Catholic subscriptions."
    , link = "subscriptions"
    }


prayerResources : ResourceGroup
prayerResources =
    { name = "Prayer Resources"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863"
    , description = "Find more resources here to help build your prayer life"
    , link = "prayer"
    }
