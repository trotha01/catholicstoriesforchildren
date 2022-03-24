module Helpers exposing (..)

import Html.String exposing (..)
import Html.String.Attributes exposing (..)



-- COLORS


blue : String
blue =
    "#9DE2EB"


darkBlue : String
darkBlue =
    "#445C73"


purple : String
purple =
    "#EBD6F1"


darkPurple : String
darkPurple =
    "#B99EDA"



-- CONSTANTS


headerMargin : Int
headerMargin =
    10


pageLeftMargin : Int
pageLeftMargin =
    40


pageTopMargin : Int
pageTopMargin =
    40



-- HELPER FUNCTIONS


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"



-- SOCIALS


instagramLogo : Html msg
instagramLogo =
    favicon "https://www.instagram.com/favicon.ico"


facebookLogo : Html msg
facebookLogo =
    favicon "https://www.facebook.com/favicon.ico"


twitterLogo : Html msg
twitterLogo =
    favicon "https://www.twitter.com/favicon.ico"


linkedInLogo : Html msg
linkedInLogo =
    favicon "https://www.linkedin.com/favicon.ico"


vimeoLogo : Html msg
vimeoLogo =
    favicon "https://vimeo.com/favicon.ico"


imdbLogo : Html msg
imdbLogo =
    favicon "https://www.imdb.com/favicon.ico"


youtubeLogo : Html msg
youtubeLogo =
    favicon "https://www.youtube.com/favicon.ico"


spotifyLogo : Html msg
spotifyLogo =
    favicon "https://www.spotify.com/favicon.ico"


soundcloudLogo : Html msg
soundcloudLogo =
    favicon "https://soundcloud.com/favicon.ico"


behanceLogo : Html msg
behanceLogo =
    favicon "https://www.behance.net/favicon.ico"


favicon : String -> Html msg
favicon link =
    img
        [ style "aria-hidden" "true"
        , src link
        , style "width" "16px"
        , style "height" "16px"
        ]
        []
