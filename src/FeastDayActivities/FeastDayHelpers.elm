module FeastDayActivities.FeastDayHelpers exposing (..)

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
    | Printout
    | Reading
    | Food


isVideo : Activity -> Bool
isVideo activity =
    activity.activityType == Video


videoActivities : List Activity -> List Activity
videoActivities activities =
    filterActivities (\activityType -> activityType == Video) activities


printoutActivities : List Activity -> List Activity
printoutActivities activities =
    filterActivities (\activityType -> activityType == Printout) activities


foodActivities : List Activity -> List Activity
foodActivities activities =
    filterActivities (\activityType -> activityType == Food) activities


readingActivities : List Activity -> List Activity
readingActivities activities =
    filterActivities (\activityType -> activityType == Reading) activities


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
