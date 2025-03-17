module Animations.Helpers.Carousel exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)


type alias Carousel a =
    { items : List a
    , currentIndex : Int
    }


init : List a -> Carousel a
init items =
    { items = items, currentIndex = 0 }


next : Carousel a -> Carousel a
next carousel =
    let
        newIndex =
            (carousel.currentIndex + 1) |> modBy (List.length carousel.items)
    in
    { carousel | currentIndex = newIndex }


prev : Carousel a -> Carousel a
prev carousel =
    let
        newIndex =
            (carousel.currentIndex - 1 + List.length carousel.items) |> modBy (List.length carousel.items)
    in
    { carousel | currentIndex = newIndex }


getCurrent : Carousel a -> Maybe a
getCurrent carousel =
    List.head (List.drop carousel.currentIndex carousel.items)


getNext : Carousel a -> Maybe a
getNext carousel =
    carousel
        |> next
        |> getCurrent


getPrevious : Carousel a -> Maybe a
getPrevious carousel =
    carousel
        |> prev
        |> getCurrent


viewSlides : Carousel ( String, String ) -> msg -> msg -> Html msg
viewSlides carousel nextSlide prevSlide =
    div
        [ class "relative w-screen h-[calc(80vw/3)] overflow-hidden flex items-center justify-start"
        ]
        [ -- Slides
          div
            [ class "flex transition-transform duration-500 ease-in-out"
            , style "transform" ("translateX(" ++ String.fromInt (10 - carousel.currentIndex * 80) ++ "vw)")
            ]
            -- TODO: show first and last slide when carousel is at the end or beginning
            (List.indexedMap (viewSlide carousel.currentIndex) carousel.items)

        -- Left arrow
        , button
            [ class "absolute left-0 z-20 p-4 bg-black/30 text-white text-3xl h-full w-[10vw] hover:bg-black/50 transition"

            -- , class "opacity-0 hover:opacity-100"
            , onClick prevSlide
            ]
            [ text "‹" ]

        -- Right arrow
        , button
            [ class "absolute right-0 z-20 p-4 bg-black/30 text-white text-3xl h-full w-[10vw] hover:bg-black/50 transition"

            -- , class "opacity-0 hover:opacity-100"
            , onClick nextSlide
            ]
            [ text "›" ]
        ]


viewSlide : Int -> Int -> ( String, String ) -> Html msg
viewSlide currentIndex index ( thumbnail, link ) =
    a
        [ class "w-[80vw] aspect-[3/1] flex-shrink-0 transition-transform duration-500 ease-in-out"
        , style "background" ("url('" ++ thumbnail ++ "') center center / cover no-repeat")
        , style "display" "flex"
        , style "align-items" "center"
        , style "text-align" "center"
        , style "cursor" "pointer"
        , href link
        ]
        []
