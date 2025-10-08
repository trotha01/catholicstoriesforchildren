module Page.Animations.Helpers.Carousel exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Page.Animations.Helpers exposing (Production)
import Svg exposing (circle, path, polygon, svg)
import Svg.Attributes


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


viewSlides : Carousel (Production msg) -> msg -> msg -> Html msg
viewSlides carousel nextSlide prevSlide =
    div
        [ class "relative h-screen overflow-hidden"
        ]
        [ -- Slides container
          div
            [ class "flex transition-transform duration-500 ease-in-out w-full h-full"
            , style "transform" ("translateX(-" ++ String.fromInt (carousel.currentIndex * 100) ++ "%)")
            ]
            (List.indexedMap (viewSlide carousel.currentIndex) carousel.items)

        -- Left arrow
        , button
            [ class "absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 text-white rounded-full hover:bg-white/50 transition group"
            , type_ "button"
            , attribute "aria-label" "Previous slide"
            , attribute "title" "Previous slide"
            , onClick prevSlide
            ]
            [ Svg.svg
                [ Svg.Attributes.width "40"
                , Svg.Attributes.height "40"
                , Svg.Attributes.viewBox "0 0 24 24"
                , Svg.Attributes.class "group-hover:scale-110 transition"
                , Html.Attributes.attribute "aria-hidden" "true"
                , Html.Attributes.attribute "focusable" "false"
                ]
                [ Svg.path
                    [ Svg.Attributes.d "M15 18l-6-6 6-6"
                    , Svg.Attributes.stroke "currentColor"
                    , Svg.Attributes.strokeWidth "2"
                    , Svg.Attributes.fill "none"
                    , Svg.Attributes.strokeLinecap "round"
                    , Svg.Attributes.strokeLinejoin "round"
                    ]
                    []
                ]
            ]

        -- Right arrow
        , button
            [ class "absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/30 text-white rounded-full hover:bg-white/50 transition group"
            , type_ "button"
            , attribute "aria-label" "Next slide"
            , attribute "title" "Next slide"
            , onClick nextSlide
            ]
            [ Svg.svg
                [ Svg.Attributes.width "40"
                , Svg.Attributes.height "40"
                , Svg.Attributes.viewBox "0 0 24 24"
                , Svg.Attributes.class "group-hover:scale-110 transition"
                , Html.Attributes.attribute "aria-hidden" "true"
                , Html.Attributes.attribute "focusable" "false"
                ]
                [ Svg.path
                    [ Svg.Attributes.d "M9 18l6-6-6-6"
                    , Svg.Attributes.stroke "currentColor"
                    , Svg.Attributes.strokeWidth "2"
                    , Svg.Attributes.fill "none"
                    , Svg.Attributes.strokeLinecap "round"
                    , Svg.Attributes.strokeLinejoin "round"
                    ]
                    []
                ]
            ]
        ]


viewSlide : Int -> Int -> Production msg -> Html msg
viewSlide _ _ production =
    div
        [ class "w-full h-screen flex-shrink-0 transition-transform duration-500 ease-in-out relative"
        , style "background-image" ("linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('" ++ production.carouselThumbnail ++ "')")
        , style "background-size" "cover"
        , style "background-position" "center"
        , style "background-repeat" "no-repeat"
        ]
        [ div [ class "relative h-full flex items-center px-4 md:px-12" ]
            [ div [ class "max-w-2xl space-y-6 pl-8" ]
                [ h1 [ class "text-5xl md:text-7xl font-bold text-white leading-tight" ]
                    [ text production.title ]
                , p [ class "text-xl md:text-2xl text-gray-200 max-w-md" ]
                    [ text production.shortDescription ]
                , div [ class "flex items-center space-x-4" ]
                    [ a [ href production.link, class "bg-white hover:bg-gray-200 text-black px-8 py-4 rounded font-bold text-lg flex items-center space-x-2 transition" ]
                        [ Svg.svg
                            [ Svg.Attributes.width "24"
                            , Svg.Attributes.height "24"
                            , Svg.Attributes.viewBox "0 0 24 24"
                            ]
                            [ Svg.polygon [ Svg.Attributes.points "6 3 20 12 6 21 6 3" ] [] ]
                        , span [] [ text "Play" ]
                        ]
                    , a
                        [ href (production.link ++ "?tab=details")
                        , class "bg-gray-600/80 hover:bg-gray-600 text-white px-8 py-4 rounded font-bold text-lg flex items-center space-x-2 transition"
                        , Html.Attributes.attribute "aria-label" ("Learn more about " ++ production.title)
                        ]
                        [ Svg.svg
                            [ Svg.Attributes.width "24"
                            , Svg.Attributes.height "24"
                            , Svg.Attributes.viewBox "0 0 24 24"
                            , Svg.Attributes.fill "none"
                            , Svg.Attributes.stroke "currentColor"
                            , Svg.Attributes.strokeWidth "2"
                            , Svg.Attributes.strokeLinecap "round"
                            , Svg.Attributes.strokeLinejoin "round"

                            -- , class "lucide lucide-info w-6 h-6"
                            ]
                            [ Svg.circle
                                [ Svg.Attributes.cx "12"
                                , Svg.Attributes.cy "12"
                                , Svg.Attributes.r "10"
                                ]
                                []
                            , Svg.path [ Svg.Attributes.d "M12 16v-4" ] []
                            , Svg.path [ Svg.Attributes.d "M12 8h.01" ] []
                            ]
                        , span [] [ text "More Info" ]
                        ]
                    ]
                , div [ class "flex items-center space-x-4 mt-8 text-white/80" ]
                    [ span [ class "text-sm font-medium px-2 py-1 border border-gray-400 rounded" ] [ text production.age ]
                    , span [ class "text-sm font-medium" ] [ text production.year ]
                    ]
                ]
            ]
        ]
