module Animations.Helpers exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode
import Svg.Attributes exposing (d)
import Time
import Url exposing (percentEncode)


type alias Production msg =
    { title : String
    , thumbnail : String
    , link : String
    , about : Html msg
    , seasons : List (Season msg)
    , carouselThumbnail : String
    }


type alias Season msg =
    { number : Int
    , description : Html msg
    , episodes : List (Episode msg)
    }


type alias Episode msg =
    { title : String
    , thumbnail : String
    , releaseDate : Time.Posix
    , isDisabled : Bool
    , link : String
    , about : Html msg
    , activities :
        { thumbnailLink : String
        , pdfLink : String
        , answerThumbnailLink : String
        , answerPdfLink : String
        }
    , videoTitles :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    , videoLinks :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    }


type alias AnimationLink =
    { link : String
    , imgSrc : String
    , ariaLabel : String
    , isLive : Bool
    }


viewVideo : String -> String -> Html msg
viewVideo videoTitle link =
    div
        [ style "position" "relative"
        , style "padding-bottom" "56.25%"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        ]
        [ iframe
            [ style "position" "absolute"
            , style "width" "100%"
            , style "height" "100%"
            , style "top" "0"
            , style "left" "0"
            , src link
            , title videoTitle
            , property "frameborder" (Json.Encode.string "0")
            , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            , property "allowfullscreen" (Json.Encode.string "true")
            ]
            []
        ]


viewVideoDescription : Html msg -> Html msg
viewVideoDescription videoDescription =
    div
        []
        [ videoDescription
        ]


viewVideoComingSoon : String -> Html msg
viewVideoComingSoon image =
    div
        [ style "position" "relative"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        ]
        [ img [ src image ] []
        ]


type alias ThumbnailData =
    { title : String
    , thumbnail : String
    , link : String
    , isDisabled : Bool
    }


viewAnimationThumbnails : String -> List ThumbnailData -> Html msg
viewAnimationThumbnails title thumbnails =
    div
        [ class "w-full"
        , class "max-w-7xl"
        , class "m-auto"
        , class "mb-20 px-20"
        ]
        [ h2 [ class "mb-10 text-7xl" ] [ text title ]
        , div
            [ class "grid grid-cols-1 lg:grid-cols-2 gap-10"
            ]
            (List.map viewAnimationThumbnail thumbnails
                ++ [ div
                        [ style "clear" "both"
                        , style "width" "1px"
                        ]
                        []
                   ]
            )
        ]


viewAnimationThumbnail : ThumbnailData -> Html msg
viewAnimationThumbnail thumbnail =
    let
        ( element, thumbnailStyle ) =
            if thumbnail.isDisabled then
                ( div, [ class "grayscale hover:cursor-not-allowed" ] )

            else
                ( a, [] )
    in
    element
        ([ href thumbnail.link
         , attribute "aria-label" (thumbnail.title ++ "Animation")
         , class "hover:scale-105 transition ease-out duration-50 drop-shadow-[0_10px_8px_rgb(0,0,0)]"
         ]
            ++ thumbnailStyle
        )
        [ img
            [ src thumbnail.thumbnail
            , style "border-radius" "5px"
            , style "width" "-webkit-fill-available"
            , alt (thumbnail.title ++ " thumbnail")
            ]
            []
        ]


episodeToThumbnailData : Production msg -> Int -> Episode msg -> ThumbnailData
episodeToThumbnailData production season episode =
    { title = episode.title
    , thumbnail = episode.thumbnail
    , link = "/animations/" ++ stringToURL production.title ++ "/" ++ String.fromInt season ++ "/" ++ stringToURL episode.title
    , isDisabled = episode.isDisabled
    }


productionToThumbnailData : Production msg -> ThumbnailData
productionToThumbnailData series =
    { title = series.title
    , thumbnail = series.thumbnail
    , link = "/animations/" ++ stringToURL series.title -- series.link
    , isDisabled = False -- Assuming series are never disabled. TODO: change to map over the episodes and check if all are disabled.
    }


removeSpaces : String -> String
removeSpaces str =
    String.filter (\c -> c /= ' ') str


stringToURL : String -> String
stringToURL s =
    -- The Elm docs say not to use "percentEncode" and to use "relative" instead, but "relative" does not encode.
    -- s |> String.toLower |> removeSpaces |> (\s2 -> relative [ s2 ] [])
    s |> String.toLower |> removeSpaces |> percentEncode
