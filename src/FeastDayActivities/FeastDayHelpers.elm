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


isVideo : Activity -> Bool
isVideo activity =
    case activity of
        Video _ ->
            True

        _ ->
            False


videoActivities : List Activity -> List VideoActivity
videoActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Video v ->
                        [ { title = v.title, link = v.link } ]

                    _ ->
                        []
            )


printoutActivities : List Activity -> List PrintoutActivity
printoutActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Printout v ->
                        [ { title = v.title, link = v.link, image = v.image } ]

                    _ ->
                        []
            )


foodActivities : List Activity -> List FoodActivity
foodActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Food v ->
                        [ { title = v.title, link = v.link, image = v.image } ]

                    _ ->
                        []
            )


readingActivities : List Activity -> List ReadingActivity
readingActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Reading v ->
                        [ { title = v.title
                          , link = v.link
                          , image = v.image
                          , snippet = v.snippet
                          }
                        ]

                    _ ->
                        []
            )


type Activity
    = Video VideoActivity
    | Printout PrintoutActivity
    | Reading ReadingActivity
    | Food FoodActivity


type alias VideoActivity =
    { title : String, link : String }


type alias ReadingActivity =
    { title : String, image : String, link : String, snippet : String }


type alias PrintoutActivity =
    { title : String, image : String, link : String }


type alias FoodActivity =
    { title : String, image : String, link : String }


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
