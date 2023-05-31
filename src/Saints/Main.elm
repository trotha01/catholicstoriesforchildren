module Saints.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
import Saints.SaintHelpers exposing (Route(..), parseRoute)
import Saints.SaintList exposing (Saint, saints)
import Url
import Url.Builder exposing (..)


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url, Cmd.none )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = Debug.log "urlChanged" url }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        currentRoute =
            Debug.log "parsed route" (parseRoute model.url)
    in
    { title = "Saints - Catholic Stories for Children"
    , body =
        [ div
            []
            [ viewSubpageHeader "Saints" headerMargin |> Html.String.toHtml
            , case currentRoute of
                Just (SaintRoute s) ->
                    viewBody s

                Nothing ->
                    viewBody Nothing
            , viewFooter |> Html.String.toHtml
            ]
        ]
    }


viewBody : Maybe String -> Html Msg
viewBody saintName =
    div
        [ class "bg-[#FEF7F4]"
        ]
        [ div
            [ class "max-w-4xl mx-auto p-10" ]
            [ case saintName of
                Just s ->
                    viewSaintPage s

                Nothing ->
                    viewSaints
            ]
        ]


viewSaintPage : String -> Html Msg
viewSaintPage saintName =
    let
        maybeSaint =
            List.filter (\s -> s.name == saintName) saints
                |> List.head
    in
    case maybeSaint of
        Nothing ->
            div
                []
                [ viewBackButton
                , h1
                    [ class "text-center"
                    , class "my-10"
                    ]
                    [ text saintName ]
                , div []
                    [ div [] [ text "Sorry, we had an error getting the information for this saint" ]
                    ]
                ]

        Just saint ->
            div
                []
                [ viewBackButton
                , h1
                    [ class "text-center"
                    , class "my-10"
                    ]
                    [ text saintName ]
                , div []
                    [ viewFeastDay saint

                    -- Need to cleanup patron data before viewing patronage
                    -- , viewPatronage saint
                    , viewActivity saintName saint.catholicOrgVideoLink
                    , viewActivity saintName saint.catholicSaintsInfoYoutubePlaylist
                    , viewActivity saintName saint.catholicCuisine
                    , viewActivity saintName saint.christianiconographyInfo
                    , viewActivity saintName saint.franciscanMediaLink
                    , viewActivity saintName saint.catholicOrgLink
                    , viewActivity saintName saint.catholicSaintsLink
                    ]
                ]


viewBackButton : Html msg
viewBackButton =
    a
        [ href "/saints"
        , attribute "aria-label" "Back to list of saints"
        , class "text-lg hover:underline hover:text-sky-500"
        ]
        [ text "Back" ]


viewPatronage : Saint -> Html msg
viewPatronage saint =
    if String.isEmpty saint.patronOf then
        span [] []

    else
        div [] [ text ("Patronage: " ++ saint.patronOf) ]


viewFeastDay : Saint -> Html msg
viewFeastDay saint =
    if String.isEmpty saint.feastDay then
        span [] []

    else
        div [] [ text ("Feast day: " ++ saint.feastDay) ]


viewActivity : String -> String -> Html msg
viewActivity saintName link =
    let
        activityTitle =
            activityTitleFromLink link

        activityDescription =
            activityDescriptionFromLink saintName link

        activityImage =
            activityImageFromLink link
    in
    if String.isEmpty link then
        span [] []

    else
        a
            [ class "grid grid-cols-[100px_1fr] rounded p-7"
            , class "transition duration-500"
            , class "hover:bg-csc-lightpurple hover:scale-105"
            , target "_blank"
            , attribute "aria-label" activityTitle
            , href link
            ]
            [ div []
                [ img [ src activityImage, class "w-20 h-20 object-cover" ] []
                ]
            , div []
                [ h2 [ class "text-lg" ] [ text activityTitle ]
                , p [] [ text activityDescription ]
                ]
            ]


activityTitleFromLink : String -> String
activityTitleFromLink link =
    if String.contains "catholicsaints.info" link then
        "Catholic Saints Info"

    else if String.contains "catholiccuisine" link then
        "Catholic Cuisine"

    else if String.contains "catholic.org" link then
        "Catholic Online"

    else if String.contains "youtube.com/watch" link then
        "Video"

    else if String.contains "youtube.com/playlist" link then
        "Video Playlist"

    else if String.contains "franciscanmedia" link then
        "Franciscan Media"

    else if String.contains "christianiconography" link then
        "Iconography"

    else
        ""


activityDescriptionFromLink : String -> String -> String
activityDescriptionFromLink saintName link =
    if String.contains "catholicsaints.info" link then
        "Find information about " ++ saintName ++ " at Catholic Saints Info."

    else if String.contains "catholiccuisine" link then
        "Find recipes relating to " ++ saintName ++ " that you can cook and enjoy!"

    else if String.contains "catholic.org" link then
        "Read the story of " ++ saintName ++ " at Catholic Online."

    else if String.contains "youtube.com/watch" link then
        "Watch a video about " ++ saintName ++ " on YouTube."

    else if String.contains "youtube.com/playlist" link then
        "Watch a video playlist about " ++ saintName ++ " on YouTube."

    else if String.contains "franciscanmedia" link then
        "Listen to the story of " ++ saintName ++ " at Franciscan Media."

    else if String.contains "christianiconography" link then
        "Learn about the iconography of " ++ saintName ++ "."

    else
        ""


activityImageFromLink : String -> String
activityImageFromLink link =
    if String.contains "catholicsaints.info" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicSaintsInfoLogo_FvS_sLzOa.png?updatedAt=1685564323370"

    else if String.contains "catholiccuisine" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicCuisineLogo_LFRz0f3wN.png?updatedAt=1685564638950"

    else if String.contains "catholic.org" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicOnlineLogo_wG6lD6N7k.png?updatedAt=1685564889945"

    else if String.contains "youtube" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/YoutubeLogo_pTffms4iT.png?updatedAt=1685565144465"

    else if String.contains "franciscanmedia" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/FranciscanMediaLogo_9jff8EeGN.png?updatedAt=1685565018915"

    else if String.contains "christianiconography" link then
        "https://ik.imagekit.io/catholicstories/ProfileImages/ChristianIconographyLogo_HythFJN2P.png?updatedAt=1685564536409"

    else
        ""


viewSaints : Html Msg
viewSaints =
    div []
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "List of Saints and Blesseds" ]
        , div [ class "mb-10" ]
            [ p [] [ text "This is an extensive but not exhaustive list of the saints and blesseds recognized by the Catholic Church." ]
            , p []
                [ span [] [ text "Information about these saints can be found at " ]
                , a
                    [ href "https://www.catholic.org/saints/stindex.php"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "Catholic Online"
                    ]
                    [ text "Catholic Online" ]
                , span [] [ text ", " ]
                , a
                    [ href "https://mycatholic.life/saints/"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "My Catholic Lif"
                    ]
                    [ text "My Catholic Life" ]
                , span [] [ text ", or " ]
                , a
                    [ href "https://catholicsaints.info/"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "Catholic Saints Info"
                    ]
                    [ text "Catholic Saints Info" ]
                ]
            ]
        , div [] (List.map viewSaint saints)
        ]


viewSaint : Saint -> Html Msg
viewSaint saint =
    div [ class "h-7" ]
        [ a
            [ href (absolute [ "saints" ] [ string "s" saint.name ])
            , attribute "aria-label" saint.name
            , class "transition hover:underline hover:text-sky-500"
            ]
            [ text saint.name ]
        ]
