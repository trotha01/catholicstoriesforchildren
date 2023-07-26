module Saints.SaintHelpers exposing (..)

import FeastDayActivities.FeastDayHelpers exposing (ActivityType(..))
import Regex
import Url
import Url.Parser exposing ((</>), (<?>), parse)
import Url.Parser.Query as Query


type Route
    = SaintRoute (Maybe String)


parseRoute : Url.Url -> Maybe Route
parseRoute =
    parse route


route : Url.Parser.Parser (Route -> a) a
route =
    Url.Parser.map SaintRoute urlSaintParser


urlSaintParser : Url.Parser.Parser (Maybe String -> a) a
urlSaintParser =
    Url.Parser.s "saints" <?> Query.string "s"


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

    else
        More


monthList : List String
monthList =
    [ "January"
    , "February"
    , "March"
    , "April"
    , "May"
    , "June"
    , "July"
    , "August"
    , "September"
    , "October"
    , "November"
    , "December"
    ]



-- Function to separate the letters and numbers from a given string


convertDate : String -> String
convertDate input =
    let
        monthPattern =
            Regex.fromString "([a-zA-Z]+)"
                |> Maybe.withDefault Regex.never

        datePattern =
            Regex.fromString "([0-9]+)"
                |> Maybe.withDefault Regex.never

        date =
            Regex.find datePattern input
                |> List.head
                |> Maybe.map .match
                |> Maybe.withDefault ""
                |> removeLeadingZero

        month =
            Regex.find monthPattern input
                |> List.head
                |> Maybe.map .match
                |> Maybe.withDefault ""
                |> String.toLower
                |> (\monthQuery ->
                        List.filter (\m -> String.contains monthQuery (String.toLower m)) monthList
                   )
                |> List.head
                |> Maybe.withDefault ""

        converted =
            if date == "" && month == "" then
                input
                    |> String.trim

            else
                date
                    ++ " "
                    ++ month
                    |> String.trim
    in
    converted


removeLeadingZero : String -> String
removeLeadingZero input =
    if String.left 1 input == "0" then
        String.dropLeft 1 input

    else
        input
