module FeastDayActivities.FeastDayHelpers exposing (..)

import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode
import Time
import Url
import Url.Parser exposing ((</>), (<?>), parse)
import Url.Parser.Query as Query


type alias FeastMonth =
    { key : String
    , month : String
    , feasts : List FeastDay
    , color : String
    }


type alias FeastDay =
    { date : String
    , feasts : List FeastActivities
    }


type alias FeastActivities =
    { feast : String
    , activities : List Activity
    }


type alias Activity =
    { activityType : ActivityType
    , title : String
    , image : String
    , link : String
    , snippet : String
    }


type ActivityType
    = Video
    | Audio
    | Images
    | Printout
    | OnlineReading
    | Food
    | Game
    | Book
    | Crafts
    | More


videoActivities : List Activity -> List Activity
videoActivities activities =
    filterActivities (\activityType -> activityType == Video) activities


printoutActivities : List Activity -> List Activity
printoutActivities activities =
    filterActivities (\activityType -> activityType == Printout) activities


foodActivities : List Activity -> List Activity
foodActivities activities =
    filterActivities (\activityType -> activityType == Food) activities


audioActivities : List Activity -> List Activity
audioActivities activities =
    filterActivities (\activityType -> activityType == Audio) activities


readingActivities : List Activity -> List Activity
readingActivities activities =
    filterActivities (\activityType -> activityType == OnlineReading) activities


bookActivities : List Activity -> List Activity
bookActivities activities =
    filterActivities (\activityType -> activityType == Book) activities


gameActivities : List Activity -> List Activity
gameActivities activities =
    filterActivities (\activityType -> activityType == Game) activities


imageActivities : List Activity -> List Activity
imageActivities activities =
    filterActivities (\activityType -> activityType == Images) activities


craftActivities : List Activity -> List Activity
craftActivities activities =
    filterActivities (\activityType -> activityType == Crafts) activities


moreActivities : List Activity -> List Activity
moreActivities activities =
    filterActivities (\activityType -> activityType == More) activities


filterActivities : (ActivityType -> Bool) -> List Activity -> List Activity
filterActivities isFilterType activities =
    activities
        |> List.concatMap
            (\activity ->
                if isFilterType activity.activityType then
                    [ activity ]

                else
                    []
            )


splitList : List x -> ( List x, List x )
splitList list =
    ( List.take (List.length list // 2) list
    , List.drop (List.length list // 2) list
    )


type Route
    = Date UrlDate


type alias UrlDate =
    { month : Maybe String, date : Maybe String }


parseRoute : Url.Url -> Maybe Route
parseRoute =
    parse route


urlDateParser : Url.Parser.Parser (Maybe String -> Maybe String -> a) a
urlDateParser =
    Url.Parser.s "feastdayactivities"
        <?> Query.string "m"
        <?> Query.string "d"


route : Url.Parser.Parser (Route -> a) a
route =
    Url.Parser.map (\m -> \d -> Date { month = m, date = d }) urlDateParser


imageSrc : Activity -> String
imageSrc activity =
    Dict.get activity.image images
        |> Maybe.withDefault activity.image


images : Dict String String
images =
    Dict.fromList
        [ ( "FranciscanMedia", "https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960" )
        , ( "LoyolaPress", "https://lpress-craft.loyolapress.com/images/ocf-articles/Microsites/SaintsStories_100x100.jpeg" )
        , ( "SaintsFeastFamily", "https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg" )
        ]


viewFeastMonthCSV : FeastMonth -> Html msg
viewFeastMonthCSV feastMonth =
    span [] (List.map (viewFeastDayCSV feastMonth.month) feastMonth.feasts)


viewFeastDayCSV : String -> FeastDay -> Html msg
viewFeastDayCSV month feastDay =
    span [] (List.map (viewFeastActivitiesCSV (month ++ " " ++ feastDay.date ++ ", 2023")) feastDay.feasts)


viewFeastActivitiesCSV : String -> FeastActivities -> Html msg
viewFeastActivitiesCSV date feastActivities =
    span [] (List.map (viewActivityCSV date feastActivities.feast) feastActivities.activities)


viewActivityCSV : String -> String -> Activity -> Html msg
viewActivityCSV date feast activity =
    p []
        [ text
            ("\""
                ++ date
                ++ "\",\""
                ++ feast
                ++ "\",\""
                ++ activityTypeToString activity.activityType
                ++ "\",\""
                ++ activity.title
                ++ "\",\""
                ++ activity.image
                ++ "\",\""
                ++ activity.link
                ++ "\",\""
                ++ activity.snippet
                ++ "\","
            )
        ]


viewActivities : String -> List Activity -> Html msg
viewActivities title activities =
    if List.isEmpty activities then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold" ] [ text title ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map viewActivity activities)
            ]


viewPrintouts : String -> List Activity -> Html msg
viewPrintouts title activities =
    if List.isEmpty activities then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold" ] [ text title ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map
                    (\activity ->
                        viewPrintout activity
                    )
                    activities
                )
            ]


viewPrintout : Activity -> Html msg
viewPrintout activity =
    a [ href activity.link ]
        [ img [ src activity.link, class "max-w-xl" ] []
        ]


viewVideos : List Activity -> Html msg
viewVideos videos =
    if List.isEmpty videos then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold" ] [ text "Videos to Watch" ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map
                    (\video ->
                        viewVideo video
                    )
                    videos
                )
            ]


viewVideo : Activity -> Html msg
viewVideo video =
    if String.contains "embed" video.link then
        viewEmbeddedVideo video

    else
        viewActivity video


viewEmbeddedVideo : Activity -> Html msg
viewEmbeddedVideo video =
    div
        [ style "position" "relative"
        , style "padding-bottom" "56.25%"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        , class "m-5"
        ]
        [ iframe
            [ style "position" "absolute"
            , style "width" "100%"
            , style "height" "100%"
            , style "top" "0"
            , style "left" "0"
            , src video.link
            , title video.title
            , property "frameborder" (Json.Encode.string "0")
            , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            , property "allowfullscreen" (Json.Encode.string "true")
            ]
            []
        ]


viewAudioList : List Activity -> Html msg
viewAudioList audioList =
    if List.isEmpty audioList then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold" ] [ text "Podcasts to Hear" ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map viewAudio audioList)
            ]


viewAudio : Activity -> Html msg
viewAudio audio =
    if String.contains "embed" audio.link then
        viewEmbeddedAudio audio

    else
        viewActivity audio


viewEmbeddedAudio : Activity -> Html msg
viewEmbeddedAudio activity =
    let
        link =
            activity.link
    in
    if String.isEmpty link then
        span [] []

    else
        div [ class "p-7" ]
            [ iframe
                [ src link
                , attribute "allow" "autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                , attribute "frameborder" "0"
                , height 180
                , style "width" "100%;max-width:660px;overflow:hidden;border-radius:10px;"
                , attribute "sandbox" "allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                ]
                []
            ]


activityTypeToString : ActivityType -> String
activityTypeToString activityType =
    case activityType of
        Video ->
            "Video"

        Audio ->
            "Audio"

        Images ->
            "Images"

        Printout ->
            "Printout"

        OnlineReading ->
            "OnlineReading"

        Food ->
            "Food"

        Game ->
            "Game"

        Book ->
            "Book"

        Crafts ->
            "Crafts"

        More ->
            "More"


viewActivity : Activity -> Html msg
viewActivity activity =
    a
        [ class "grid grid-cols-[100px_1fr]"
        , href activity.link
        , attribute "aria-label" activity.title
        , target "_blank"
        , class "hover:bg-csc-lightpurple"
        , class "rounded m-5"
        ]
        [ img
            [ src (imageSrc activity)
            , class "w-20 h-20"
            , class "rounded"
            , class "object-cover"
            ]
            []
        , div [ class "grid grid-rows" ]
            [ h4
                [ class "text-xl text-left"
                ]
                [ text activity.title ]
            , div
                [ class "text-left"
                ]
                [ text activity.snippet ]
            ]
        ]


viewNoActivities : Html msg
viewNoActivities =
    div []
        [ p []
            [ text "No activities found for today's feast day. We are still working on adding activities." ]
        , p
            []
            [ text "Thank you for your patience." ]
        ]


dateUrlFromTime : Time.Posix -> String
dateUrlFromTime t =
    t
        |> Time.toDay Time.utc
        |> (\d ->
                if d < 10 then
                    "0" ++ String.fromInt d

                else
                    String.fromInt d
           )


monthUrlFromTime : Time.Posix -> String
monthUrlFromTime t =
    t |> Time.toMonth Time.utc |> feastMonthFromMonth


feastMonthFromMonth : Time.Month -> String
feastMonthFromMonth month =
    case month of
        Time.Jan ->
            "jan"

        Time.Feb ->
            "feb"

        Time.Mar ->
            "mar"

        Time.Apr ->
            "apr"

        Time.May ->
            "may"

        Time.Jun ->
            "jun"

        Time.Jul ->
            "jul"

        Time.Aug ->
            "aug"

        Time.Sep ->
            "sep"

        Time.Oct ->
            "oct"

        Time.Nov ->
            "nov"

        Time.Dec ->
            "dec"
