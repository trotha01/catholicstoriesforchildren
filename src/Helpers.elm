module Helpers exposing (..)

import Html as H
import Html.Events exposing (keyCode, on)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Decode as Decode
import Json.Encode



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
    favicon "instagram" "https://www.instagram.com/favicon.ico"


facebookLogo : Html msg
facebookLogo =
    favicon "facebook" "https://www.facebook.com/favicon.ico"


twitterLogo : Html msg
twitterLogo =
    favicon "twitter" "https://www.twitter.com/favicon.ico"


linkedInLogo : Html msg
linkedInLogo =
    favicon "linkedin" "https://www.linkedin.com/favicon.ico"


vimeoLogo : Html msg
vimeoLogo =
    favicon "vimeo" "https://vimeo.com/favicon.ico"


imdbLogo : Html msg
imdbLogo =
    favicon "imdb" "https://www.imdb.com/favicon.ico"


youtubeLogo : Html msg
youtubeLogo =
    favicon "youtube" "https://www.youtube.com/favicon.ico"


pinterestLogo : Html msg
pinterestLogo =
    favicon "pinterest" "https://www.pinterest.com/favicon.ico"


spotifyLogo : Html msg
spotifyLogo =
    favicon "spotify" "https://www.spotify.com/favicon.ico"


soundcloudLogo : Html msg
soundcloudLogo =
    favicon "soundcloud" "https://soundcloud.com/favicon.ico"


behanceLogo : Html msg
behanceLogo =
    favicon "behance" "https://www.behance.net/favicon.ico"


paypalLogo : Html msg
paypalLogo =
    favicon "paypal" "https://www.paypal.com/favicon.ico"


favicon : String -> String -> Html msg
favicon alternativeText link =
    img
        [ style "aria-hidden" "true"
        , src link
        , style "width" "16px"
        , style "height" "16px"
        , alt alternativeText
        ]
        []


email : Html msg
email =
    span []
        [ span [ style "display" "inline-block" ]
            [ text "trevor"
            , span [] [ text "@" ]
            ]
        , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "🍯") ] []
        , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "spam@catholicstoriesforchildren.com") ] []
        , span [ height 0, width 0, style "display" "none", hidden True ] [ text "spam@catholicstoriesforchildren.com" ]
        , span []
            [ text "catholicstoriesforchildren"
            , span []
                [ text "."
                , span [] [ text "com" ]
                ]
            ]
        ]


h1Style : List (Attribute msg)
h1Style =
    titleStyle
        ++ [ style "margin-top" "2em"
           , style "line-height" "1em"
           ]


h2Style : List (Attribute msg)
h2Style =
    titleStyle
        ++ [ style "line-height" "1.1em"
           ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "text-align" "center"
    , style "font-family" "hvdComicSerifPro"
    ]


type Social
    = Website
    | Instagram
    | Twitter
    | Vimeo
    | IMDB
    | Facebook
    | LinkedIn
    | YouTube
    | Pinterest
    | Spotify
    | SoundCloud
    | Behance


viewSocial : ( Social, String ) -> Html msg
viewSocial ( social, link ) =
    case social of
        Website ->
            viewSocialLink (text "🌐") link "website"

        Instagram ->
            viewSocialLink instagramLogo link "instagram"

        Twitter ->
            viewSocialLink twitterLogo link "twitter"

        Facebook ->
            viewSocialLink facebookLogo link "facebook"

        LinkedIn ->
            viewSocialLink linkedInLogo link "linkedin"

        Vimeo ->
            viewSocialLink vimeoLogo link "vimeo"

        IMDB ->
            viewSocialLink imdbLogo link "imdb"

        YouTube ->
            viewSocialLink youtubeLogo link "youtube"

        Pinterest ->
            viewSocialLink pinterestLogo link "pinterest"

        Spotify ->
            viewSocialLink spotifyLogo link "spotify"

        SoundCloud ->
            viewSocialLink soundcloudLogo link "soundcloud"

        Behance ->
            viewSocialLink behanceLogo link "behance"


viewSocialLink : Html msg -> String -> String -> Html msg
viewSocialLink image link label =
    a
        [ href link
        , style "text-decoration" "none"
        , target "_blank"
        , style "margin-right" "10px"
        , attribute "aria-label" label
        , class "inline-block"
        ]
        [ image ]


externalLink : String -> String -> List (Html msg) -> Html msg
externalLink label link children =
    a
        [ href link
        , style "text-decoration" "none"
        , target "_blank"
        , attribute "aria-label" label
        ]
        children


onEnter : msg -> H.Attribute msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Decode.succeed msg

            else
                Decode.fail "not ENTER"
    in
    on "keydown" (Decode.andThen isEnter keyCode)
