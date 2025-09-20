module Component.Social exposing (Social(..), email, externalLink, viewSocial)

import Html exposing (Html, a, img, span, text)
import Html.Attributes exposing (..)
import Json.Encode as Encode


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


email : Html msg
email =
    span []
        [ span [ style "display" "inline-block" ]
            [ text "trevor"
            , span [] [ text "@" ]
            ]
        , span [ attribute "aria-hidden" "true", property "innerHTML" (Encode.string "🍯") ] []
        , span [ attribute "aria-hidden" "true", property "innerHTML" (Encode.string "spam@catholicstoriesforchildren.com") ] []
        , span [ height 0, width 0, style "display" "none", hidden True ] [ text "spam@catholicstoriesforchildren.com" ]
        , span []
            [ text "claritasstudios"
            , span []
                [ text "."
                , span [] [ text "com" ]
                ]
            ]
        ]


externalLink : String -> String -> List (Html msg) -> Html msg
externalLink label link children =
    a
        [ href link
        , style "text-decoration" "none"
        , target "_blank"
        , attribute "aria-label" label
        ]
        children


viewSocialLink : Html msg -> String -> String -> Html msg
viewSocialLink image link label =
    a
        [ href link
        , style "text-decoration" "none"
        , target "_blank"
        , attribute "aria-label" label
        , class "inline-block"
        ]
        [ image ]


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


favicon : String -> String -> Html msg
favicon alternativeText link =
    img
        [ attribute "aria-hidden" "true"
        , src link
        , style "width" "16px"
        , style "height" "16px"
        , alt alternativeText
        ]
        []
