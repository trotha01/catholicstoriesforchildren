module Saints.SaintHelpers exposing (..)

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
