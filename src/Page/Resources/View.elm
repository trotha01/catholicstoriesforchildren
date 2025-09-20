module Page.Resources.View exposing (..)

import Component.Footer exposing (viewFooter)
import Component.Header exposing (viewSubpageHeader)
import Theme.Layout exposing (headerMargin)
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Resources.Books
import Page.Resources.Games
import Page.Resources.Helpers exposing (..)
import Page.Resources.Podcasts
import Page.Resources.Prayer.Main
import Page.Resources.Subscriptions
import Page.Resources.Videos
import Page.Signup as Signup
import Url


view : Url.Url -> Html msg
view url =
    let
        urlString =
            Url.toString url
    in
    if String.contains "books" urlString then
        viewResources books

    else if String.contains "games" urlString then
        viewResources games

    else if String.contains "podcasts" urlString then
        viewResources podcasts

    else if String.contains "prayer" urlString then
        Page.Resources.Prayer.Main.view

    else if String.contains "subscriptions" urlString then
        viewResources subscriptions

    else if String.contains "videos" urlString then
        viewResources videos

    else
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
    div []
        [ div [ class "max-w-3xl m-auto p-5" ]
            [ h1 [ class "my-10 leading-10" ] [ text "Resources" ]
            , viewAboutResources
            ]
        , div [ class "mt-2 mb-20" ]
            [ Signup.view4 ]
        , div
            [ class "max-w-3xl m-auto p-5" ]
            [ viewResourceGroups
            ]
        ]


viewAboutResources : Html msg
viewAboutResources =
    div []
        [ p [] [ text "Find links to podcasts, videos, books and more. There are a lot of resources out there for Catholic parents and we are here to help you find them." ]
        ]


viewResourceGroups : Html msg
viewResourceGroups =
    div []
        (List.map viewResourceGroup [ books, podcasts, videos, subscriptions, prayerResources, feastDayActivities, games ])


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


viewResources : ResourceGroup -> Html msg
viewResources resourceGroup =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text resourceGroup.name ]
        , div [ class "mb-20" ]
            [ Signup.view4 ]
        , div []
            [ text resourceGroup.description
            ]
        , div []
            (List.map viewResource
                resourceGroup.resources
            )
        ]


podcasts : ResourceGroup
podcasts =
    { name = "Podcasts"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/1_EAfo23y5R.png?updatedAt=1679066451335"
    , description = "Find audio podcasts here. Your kids can listen to them while on the road, traveling, while doing coloring activities, or they can be simply enjoyed by themselves."
    , link = "/resources/podcasts"
    , resources = Page.Resources.Podcasts.podcasts
    }


videos : ResourceGroup
videos =
    { name = "Youtube Channels"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/3_mTKsUZQuM.png?updatedAt=1679066450272"
    , description = "Find video content here. Videos are a wonderful engaging way to bring a visual representation of the faith into your home."
    , link = "/resources/videos"
    , resources = Page.Resources.Videos.videos
    }


books : ResourceGroup
books =
    { name = "Books"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/2_4YvKGvP_Y.png?updatedAt=1679066449106"
    , description = "Find books here. It's hard to go wrong with a good Catholic book."
    , link = "/resources/books"
    , resources = Page.Resources.Books.books
    }


subscriptions : ResourceGroup
subscriptions =
    { name = "Subscriptions"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/4_U5qO_iICx.png?updatedAt=1679066449068"
    , description = "Want monthly content at your front door? Check out these wonderful Catholic subscriptions."
    , link = "/resources/subscriptions"
    , resources = Page.Resources.Subscriptions.subscriptions
    }


prayerResources : ResourceGroup
prayerResources =
    { name = "Prayer Resources"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/prayerresources_gN76-j6pz.png?updatedAt=1683227269863"
    , description = "Find more resources here to help build your prayer life"
    , link = "/resources/prayer"
    , resources = []
    }


feastDayActivities : ResourceGroup
feastDayActivities =
    { name = "Feast Day Activities"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/feastdaycalendar_1__YTmPRisXH.png?updatedAt=1686096632436"
    , description = "Find activities for feast days throughout the year"
    , link = "/feastdayactivities"
    , resources = []
    }


games : ResourceGroup
games =
    { name = "Games"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/Game%20Icon_rb2djF7Hf.png?updatedAt=1693438195519"
    , description = "Find game resources for a fun way to learn about the Catholic faith"
    , link = "/resources/games"
    , resources = Page.Resources.Games.games
    }
