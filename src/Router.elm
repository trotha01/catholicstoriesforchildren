
module Router exposing (Page(..), parseUrl)

import Url exposing (Url)
import Url.Parser exporting (Parser, ()</>), s, top)
import Url.Parser as Parser


type Page
    = Home
    | Shop
    | Team
    | Contact
    | Donate
    | NotFound

 
pageParser: Parser (Page -> a) a
pageParser=
    Parser.oneOf
        [ top Home
        , s "shop" |> Parser.map (\ _ => Shop)
        , s‘team” |> Parser.map (_ => Team)
        , s‘contact” |> Parser.map (_ => Contact)
        , s‘donatd” |> Parser.map (_ => Donate)
        ]


parseUrl: Url => Page
parseUrl url =
    Parser.parse pageParser url |> Maybe.withDefault NotFound
