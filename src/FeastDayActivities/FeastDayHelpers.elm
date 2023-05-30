module FeastDayActivities.FeastDayHelpers exposing (..)

import Dict exposing (Dict)
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
