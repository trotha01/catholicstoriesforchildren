module FeastDayActivities.FeastDayHelpers exposing (..)

import Url
import Url.Parser exposing ((</>), parse)


splitList : List x -> ( List x, List x )
splitList list =
    ( List.take (List.length list // 2) list
    , List.drop (List.length list // 2) list
    )


type Route
    = Month String
    | Date UrlDate


type alias UrlDate =
    { month : String, date : String }


parseRoute : Url.Url -> Maybe Route
parseRoute =
    parse route


urlMonthParser : Url.Parser.Parser (String -> a) a
urlMonthParser =
    Url.Parser.s "feastdayactivities" </> Url.Parser.string


urlDayParser : Url.Parser.Parser (UrlDate -> a) a
urlDayParser =
    Url.Parser.s "feastdayactivities"
        </> Url.Parser.string
        </> Url.Parser.string
        |> Url.Parser.map UrlDate


route : Url.Parser.Parser (Route -> a) a
route =
    Url.Parser.oneOf
        [ Url.Parser.map Date urlDayParser
        , Url.Parser.map Month urlMonthParser
        ]
