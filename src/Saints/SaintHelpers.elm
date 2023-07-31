module Saints.SaintHelpers exposing (..)

import FeastDayActivities.FeastDayHelpers exposing (Activity, ActivityType(..), activityFromLink)
import Regex
import Saints.SaintList exposing (Saint)
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


activitiesFromSaint : Saint -> List ( String, Activity )
activitiesFromSaint saint =
    [ -- Only include the catholic video link if there isn't a playlist
      if saint.catholicSaintsInfoYoutubePlaylist == "" then
        [ ( saint.name, activityFromLink saint.name saint.catholicOrgVideoLink ) ]

      else
        []
    , [ ( saint.name, activityFromLink saint.name saint.catholicSaintsInfoYoutubePlaylist ) ]
    , [ ( saint.name, activityFromLink saint.name saint.catholicCuisine ) ]
    , [ ( saint.name, activityFromLink saint.name saint.christianiconographyInfo ) ]
    , [ ( saint.name, activityFromLink saint.name saint.catholicSprouts ) ]
    , [ ( saint.name, activityFromLink saint.name saint.franciscanMediaLink ) ]
    , [ ( saint.name, activityFromLink saint.name saint.teachingCatholicKidsLink ) ]
    , [ ( saint.name, activityFromLink saint.name saint.catholicOrgLink ) ]
    , [ ( saint.name, activityFromLink saint.name saint.catholicSaintsLink ) ]
    , [ ( saint.name, activityFromLink saint.name saint.uCatholicLink ) ]
    , List.map (\link -> ( saint.name, activityFromLink saint.name link )) (saint.coloringPageLink |> String.split ";")
    , List.map (\link -> ( saint.name, activityFromLink saint.name link )) (saint.saintsAliveLink |> String.split ";")
    , List.map (\link -> ( saint.name, activityFromLink saint.name link )) (saint.videoLinks |> String.split ";")
    ]
        |> List.concat
        |> List.filterMap (\( saintName, link ) -> Maybe.map (\l -> ( saintName, l )) link)


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
