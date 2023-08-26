module FeastDayActivities.FeastDayHelpers exposing (..)

import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode
import Spinner
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


viewAllActivities : Bool -> List Activity -> Html msg
viewAllActivities isLoading activities =
    if isLoading then
        div [ class "text-center mt-4" ]
            [ div [ class "mb-4" ] [ text "We are getting the activity list, hang tight." ]
            , div [ class "m-auto w-10 text-[#9200B3]" ]
                [ Spinner.purpleSpinner []
                ]
            ]

    else if List.isEmpty activities then
        div [ class "mt-4" ]
            [ viewNoActivities
            ]

    else
        div [ class "text-left max-w-3xl m-auto" ]
            -- [ viewActivities "Video" (videoActivities activities) -- used for csv output
            [ viewVideos (videoActivities activities)
            , viewAudioList (audioActivities activities)
            , viewActivities "Crafts to Do" (craftActivities activities)
            , viewPrintouts "Printouts to Enjoy" (printoutActivities activities)
            , viewActivities "Games to Play" (gameActivities activities)
            , viewActivities "Images to See" (imageActivities activities)
            , viewActivities "Material to Read" (readingActivities activities)
            , viewActivities "Food to Eat" (foodActivities activities)
            , viewActivities "Books to Read" (bookActivities activities)
            , viewActivities "More" (moreActivities activities)
            ]


viewActivities : String -> List Activity -> Html msg
viewActivities title activities =
    if List.isEmpty activities then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold p-5" ] [ text title ]
            , div []
                (List.map viewActivity activities)
            ]


viewPrintouts : String -> List Activity -> Html msg
viewPrintouts title activities =
    if List.isEmpty activities then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold p-5" ] [ text title ]
            , div []
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
        [ img [ src activity.link, class "max-w-xl w-full p-5" ] []
        ]


viewVideos : List Activity -> Html msg
viewVideos videos =
    if List.isEmpty videos then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3 [ class "font-semibold p-5" ] [ text "Videos to Watch" ]
            , div []
                (List.map
                    (\video ->
                        div [ class "mb-10" ] [ viewVideo video ]
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
            [ h3 [ class "font-semibold p-5" ] [ text "Podcasts to Hear" ]
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
        div [ class "p-5" ]
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


isLeapYear : Int -> Bool
isLeapYear year =
    (modBy 4 year == 0 && modBy 100 year /= 0) || (modBy 400 year == 0)


previousDate : String -> String -> String -> ( String, String )
previousDate year month day =
    let
        date =
            String.toInt day |> Maybe.withDefault 0

        intYear =
            String.toInt year |> Maybe.withDefault 0
    in
    case month of
        "jan" ->
            if date - 1 > 0 then
                ( "jan", String.fromInt <| date - 1 )

            else
                ( "dec", "31" )

        "feb" ->
            if date - 1 > 0 then
                ( "feb", String.fromInt <| date - 1 )

            else
                ( "jan", "31" )

        "mar" ->
            if date - 1 > 0 then
                ( "mar", String.fromInt <| date - 1 )

            else if isLeapYear intYear then
                ( "feb", "29" )

            else
                ( "feb", "28" )

        "apr" ->
            if date - 1 > 0 then
                ( "apr", String.fromInt <| date - 1 )

            else
                ( "mar", "31" )

        "may" ->
            if date - 1 > 0 then
                ( "may", String.fromInt <| date - 1 )

            else
                ( "apr", "30" )

        "jun" ->
            if date - 1 > 0 then
                ( "jun", String.fromInt <| date - 1 )

            else
                ( "may", "31" )

        "jul" ->
            if date - 1 > 0 then
                ( "jul", String.fromInt <| date - 1 )

            else
                ( "jun", "30" )

        "aug" ->
            if date - 1 > 0 then
                ( "aug", String.fromInt <| date - 1 )

            else
                ( "jul", "30" )

        "sep" ->
            if date - 1 > 0 then
                ( "sep", String.fromInt <| date - 1 )

            else
                ( "aug", "31" )

        "oct" ->
            if date - 1 > 0 then
                ( "oct", String.fromInt <| date - 1 )

            else
                ( "sep", "30" )

        "nov" ->
            if date - 1 > 0 then
                ( "nov", String.fromInt <| date - 1 )

            else
                ( "oct", "31" )

        "dec" ->
            if date - 1 > 0 then
                ( "dec", String.fromInt <| date - 1 )

            else
                ( "nov", "30" )

        _ ->
            ( "jan", "1" )


nextDate : String -> String -> String -> ( String, String )
nextDate year month day =
    let
        date =
            String.toInt day |> Maybe.withDefault 0

        intYear =
            String.toInt year |> Maybe.withDefault 0
    in
    case month of
        "jan" ->
            if date + 1 <= 31 then
                ( "jan", String.fromInt <| date + 1 )

            else
                ( "feb", "1" )

        "feb" ->
            if isLeapYear intYear then
                if date + 1 <= 29 then
                    ( "feb", String.fromInt <| date + 1 )

                else
                    ( "mar", "1" )

            else if date + 1 <= 28 then
                ( "feb", String.fromInt <| date + 1 )

            else
                ( "mar", "1" )

        "mar" ->
            if date + 1 <= 31 then
                ( "mar", String.fromInt <| date + 1 )

            else
                ( "apr", "1" )

        "apr" ->
            if date + 1 <= 30 then
                ( "apr", String.fromInt <| date + 1 )

            else
                ( "may", "1" )

        "may" ->
            if date + 1 <= 31 then
                ( "may", String.fromInt <| date + 1 )

            else
                ( "jun", "1" )

        "jun" ->
            if date + 1 <= 30 then
                ( "jun", String.fromInt <| date + 1 )

            else
                ( "jul", "1" )

        "jul" ->
            if date + 1 <= 31 then
                ( "jul", String.fromInt <| date + 1 )

            else
                ( "aug", "1" )

        "aug" ->
            if date + 1 <= 31 then
                ( "aug", String.fromInt <| date + 1 )

            else
                ( "sep", "1" )

        "sep" ->
            if date + 1 <= 30 then
                ( "sep", String.fromInt <| date + 1 )

            else
                ( "oct", "1" )

        "oct" ->
            if date + 1 <= 31 then
                ( "oct", String.fromInt <| date + 1 )

            else
                ( "nov", "1" )

        "nov" ->
            if date + 1 <= 30 then
                ( "nov", String.fromInt <| date + 1 )

            else
                ( "dec", "1" )

        "dec" ->
            if date + 1 <= 31 then
                ( "dec", String.fromInt <| date + 1 )

            else
                ( "jan", "1" )

        _ ->
            ( "jan", "1" )


activityFromLink : String -> String -> Maybe Activity
activityFromLink saintName link =
    let
        activityTitle =
            activityTitleFromLink saintName link

        activityDescription =
            activityDescriptionFromLink saintName link

        activityImage =
            activityImageFromLink link

        activityType =
            activityTypeFromLink link
    in
    if String.isEmpty link then
        Nothing

    else
        Just
            { activityType = activityType
            , title = activityTitle
            , image = activityImage
            , link = link
            , snippet = activityDescription
            }


activityTitleFromLink : String -> String -> String
activityTitleFromLink saintName link =
    if String.contains "catholicsaints.info" link then
        saintName ++ " Catholic Saints Info"

    else if String.contains "catholiccuisine" link then
        "Catholic Cuisine"

    else if String.contains "catholic.org" link then
        "Catholic Online"

    else if String.contains "teachingcatholickids" link then
        "Teaching Catholic Kids"

    else if String.contains "youtube.com/watch" link then
        "Video"

    else if String.contains "swpals" link then
        "Video"

    else if String.contains "youtube.com/playlist" link then
        "Video Playlist"

    else if String.contains "franciscanmedia" link then
        "Story of " ++ saintName

    else if String.contains "christianiconography" link then
        saintName ++ " Iconography"

    else if String.contains "ucatholic" link then
        "uCatholic"

    else if String.contains "embed.podcasts.apple" link then
        "Podcast"

    else
        ""


activityDescriptionFromLink : String -> String -> String
activityDescriptionFromLink saintName link =
    if String.contains "catholicsaints.info" link then
        "Find information about " ++ saintName ++ " at Catholic Saints Info."

    else if String.contains "catholiccuisine" link then
        "Find recipes relating to " ++ saintName ++ " that you can cook and enjoy!"

    else if String.contains "teachingcatholickids" link then
        "Saint stories, discussion questions, and activities."

    else if String.contains "catholic.org" link then
        "Read the story of " ++ saintName ++ " at Catholic Online."

    else if String.contains "youtube.com/watch" link then
        "Watch a video about " ++ saintName ++ " on YouTube."

    else if String.contains "swpals" link then
        "Watch a video about " ++ saintName ++ " on SWPals."

    else if String.contains "youtube.com/playlist" link then
        "Watch a video playlist about " ++ saintName ++ " on YouTube."

    else if String.contains "franciscanmedia" link then
        "Listen to the story of " ++ saintName ++ " at Franciscan Media."

    else if String.contains "saintsalivepodcast" link then
        "Listen to the story of " ++ saintName ++ " with the Saints Alive Podcast."

    else if String.contains "christianiconography" link then
        "Learn about the iconography of " ++ saintName ++ "."

    else if String.contains "ucatholic" link then
        "Learn about  " ++ saintName ++ " with uCatholic."

    else if String.contains "thecatholickid" link then
        "Color with The Catholic Kid"

    else if String.contains "catholicfamilycrate" link then
        "Color with Catholic Family Crate"

    else if String.contains "embed.podcasts.apple" link then
        "Learn about " ++ saintName ++ " with this podcast."

    else
        ""


activityImageFromLink : String -> String
activityImageFromLink link =
    if String.contains "catholicsaints.info" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicSaintsInfoLogo_FvS_sLzOa.png?updatedAt=1685564323370"

    else if String.contains "catholiccuisine" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicCuisineLogo_LFRz0f3wN.png?updatedAt=1685564638950"

    else if String.contains "teachingcatholickids" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/TeachingCatholicKids_j2Zik9ZLc.png?updatedAt=1688597870744"

    else if String.contains "catholic.org" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicOnlineLogo_wG6lD6N7k.png?updatedAt=1685564889945"

    else if String.contains "youtube" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/YoutubeLogo_pTffms4iT.png?updatedAt=1685565144465"

    else if String.contains "swpals" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/SWPals_9zKzvu6ZW.jpg?updatedAt=1690806342634"

    else if String.contains "franciscanmedia" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/FranciscanMediaLogo_9jff8EeGN.png?updatedAt=1685565018915"

    else if String.contains "saintsalivepodcast" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/14_Aps0ku8wH.png?updatedAt=1679069710842"

    else if String.contains "christianiconography" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/ChristianIconographyLogo_HythFJN2P.png?updatedAt=1685564536409"

    else if String.contains "ucatholic" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/uCatholicLogo_ozBcyhYz5.png?updatedAt=1685566890685"

    else if String.contains "podcast/cs-" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/11_HUKazDTNih.png?updatedAt=1679069711765"

    else if String.contains "thecatholickid" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/TeachingCatholicKids_j2Zik9ZLc.png?updatedAt=1688597870744"

    else if String.contains "catholicfamilycrate" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/7_i5fOMR9CEB.png?updatedAt=1685581542221"

    else
        ""


activityTypeFromLink : String -> ActivityType
activityTypeFromLink link =
    if String.contains "catholicsaints.info" link then
        More

    else if String.contains "catholiccuisine" link then
        Food

    else if String.contains "catholic.org" link then
        OnlineReading

    else if String.contains "teachingcatholickids" link then
        OnlineReading

    else if String.contains "youtube" link then
        Video

    else if String.contains "swpals" link then
        Video

    else if String.contains "franciscanmedia" link then
        Audio

    else if String.contains "saintsalivepodcast" link || String.contains "podcasts" link then
        Audio

    else if String.contains "christianiconography" link then
        Images

    else if String.contains "ucatholic" link then
        OnlineReading

    else if String.contains "thecatholickid" link then
        Printout

    else if String.contains "catholicfamilycrate" link then
        Printout

    else
        More
