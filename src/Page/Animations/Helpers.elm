module Page.Animations.Helpers exposing (..)

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
    , shortDescription : String
    , duration : String
    , year : String
    , age : String
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
    , isFundraising : Bool
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
    , year : String
    , duration : String
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


viewAnimationThumbnailsSmall : Maybe (Episode msg) -> List ThumbnailData -> Html msg
viewAnimationThumbnailsSmall activeEpisode thumbnails =
    viewAnimationThumbnails "md:grid-cols-3" thumbnails activeEpisode


viewAnimationThumbnailsLarge : List ThumbnailData -> Html msg
viewAnimationThumbnailsLarge thumbnails =
    viewAnimationThumbnails "lg:grid-cols-2" thumbnails Nothing


viewAnimationThumbnails : String -> List ThumbnailData -> Maybe (Episode msg) -> Html msg
viewAnimationThumbnails cols thumbnails activeEpisode =
    div
        [ class "w-full"
        , class "my-20"
        ]
        [ div
            [ class ("grid grid-cols " ++ cols ++ " gap-10")
            ]
            (List.map (viewAnimationThumbnail activeEpisode) thumbnails
                ++ [ div
                        [ style "clear" "both"
                        , style "width" "1px"
                        ]
                        []
                   ]
            )
        ]


thumbnailIsActive : ThumbnailData -> Maybe (Episode msg) -> Bool
thumbnailIsActive thumbnail activeEpisode =
    case activeEpisode of
        Just episode ->
            thumbnail.title == episode.title

        Nothing ->
            False


viewAnimationThumbnail : Maybe (Episode msg) -> ThumbnailData -> Html msg
viewAnimationThumbnail activeEpisode thumbnail =
    let
        ( element, thumbnailStyle, imgStyle ) =
            if thumbnail.isDisabled then
                ( div, [ class "grayscale hover:cursor-not-allowed" ], [] )

            else if thumbnailIsActive thumbnail activeEpisode then
                ( a, [], [ class "border-4 border-white-500 p-2" ] )

            else
                ( a, [], [] )
    in
    element
        ([ href thumbnail.link
         , attribute "aria-label" (thumbnail.title ++ "Animation")
         , class "hover:scale-105 transition ease-out duration-50 drop-shadow-[0_10px_8px_rgb(0,0,0)]"
         ]
            ++ thumbnailStyle
        )
        [ img
            ([ src thumbnail.thumbnail
             , style "border-radius" "5px"
             , style "width" "-webkit-fill-available"
             , alt (thumbnail.title ++ " thumbnail")
             ]
                ++ imgStyle
            )
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
    , link = "/animations/" ++ stringToURL series.title ++ "?tab=episodes" -- series.link
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
