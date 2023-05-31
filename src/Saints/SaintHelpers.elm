module Saints.SaintHelpers exposing (..)

import Url
import Url.Parser exposing ((</>), (<?>), parse)
import Url.Parser.Query as Query
import FeastDayActivities.FeastDayHelpers exposing (ActivityType)
import FeastDayActivities.FeastDayHelpers exposing (ActivityType(..))


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



activityTitleFromLink : String -> String
activityTitleFromLink link =
    if String.contains "catholicsaints.info" link then
        "Catholic Saints Info"

    else if String.contains "catholiccuisine" link then
        "Catholic Cuisine"

    else if String.contains "catholic.org" link then
        "Catholic Online"

    else if String.contains "youtube.com/watch" link then
        "Video"

    else if String.contains "youtube.com/playlist" link then
        "Video Playlist"

    else if String.contains "franciscanmedia" link then
        "Franciscan Media"

    else if String.contains "christianiconography" link then
        "Iconography"

    else if String.contains "ucatholic" link then
        "uCatholic"

    else
        ""


activityDescriptionFromLink : String -> String -> String
activityDescriptionFromLink saintName link =
    if String.contains "catholicsaints.info" link then
        "Find information about " ++ saintName ++ " at Catholic Saints Info."

    else if String.contains "catholiccuisine" link then
        "Find recipes relating to " ++ saintName ++ " that you can cook and enjoy!"

    else if String.contains "catholic.org" link then
        "Read the story of " ++ saintName ++ " at Catholic Online."

    else if String.contains "youtube.com/watch" link then
        "Watch a video about " ++ saintName ++ " on YouTube."

    else if String.contains "youtube.com/playlist" link then
        "Watch a video playlist about " ++ saintName ++ " on YouTube."

    else if String.contains "franciscanmedia" link then
        "Listen to the story of " ++ saintName ++ " at Franciscan Media."

    else if String.contains "christianiconography" link then
        "Learn about the iconography of " ++ saintName ++ "."

    else if String.contains "ucatholic" link then
        "Learn about  " ++ saintName ++ " with uCatholic."

    else
        ""


activityImageFromLink : String -> String
activityImageFromLink link =
    if String.contains "catholicsaints.info" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicSaintsInfoLogo_FvS_sLzOa.png?updatedAt=1685564323370"

    else if String.contains "catholiccuisine" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicCuisineLogo_LFRz0f3wN.png?updatedAt=1685564638950"

    else if String.contains "catholic.org" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicOnlineLogo_wG6lD6N7k.png?updatedAt=1685564889945"

    else if String.contains "youtube" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/YoutubeLogo_pTffms4iT.png?updatedAt=1685565144465"

    else if String.contains "franciscanmedia" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/FranciscanMediaLogo_9jff8EeGN.png?updatedAt=1685565018915"

    else if String.contains "christianiconography" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/ChristianIconographyLogo_HythFJN2P.png?updatedAt=1685564536409"

    else if String.contains "ucatholic" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/uCatholicLogo_ozBcyhYz5.png?updatedAt=1685566890685"

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

    else if String.contains "youtube" link then
        Video

    else if String.contains "franciscanmedia" link then
        Audio

    else if String.contains "christianiconography" link then
        Images

    else if String.contains "ucatholic" link then
        OnlineReading

    else
        More