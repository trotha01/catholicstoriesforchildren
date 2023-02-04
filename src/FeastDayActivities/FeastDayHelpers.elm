module FeastDayActivities.FeastDayHelpers exposing (..)

import Url
import Url.Parser exposing ((</>), (<?>), parse)
import Url.Parser.Query as Query


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
