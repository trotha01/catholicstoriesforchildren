module Saints.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Html.String
import Saints.SaintHelpers exposing (..)
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
    , query : String
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url "", Cmd.none )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetQuery String


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    if String.contains "saints" (Url.toString url) then
                        ( model, Nav.pushUrl model.key (Url.toString url) )

                    else
                        ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )

        SetQuery newQuery ->
            ( { model | query = newQuery }, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        currentRoute =
            parseRoute model.url
    in
    { title = "Saints - Catholic Stories for Children"
    , body =
        [ div
            []
            [ viewSubpageHeader "Saints" headerMargin |> Html.String.toHtml
            , case currentRoute of
                Just (SaintRoute s) ->
                    viewBody model s

                Nothing ->
                    viewBody model Nothing
            , viewFooter |> Html.String.toHtml
            ]
        ]
    }


viewBody : Model -> Maybe String -> Html Msg
viewBody model saintName =
    div
        [ class "bg-[#FEF7F4]"
        ]
        [ div
            [ class "max-w-4xl mx-auto p-10" ]
            [ case saintName of
                Just s ->
                    viewSaintPage s

                Nothing ->
                    viewSaints model
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
                    , viewActivity saintName saint.uCatholicLink
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


saintSort : Saint -> Saint -> Order
saintSort a b =
    case
        compare
            (a.score |> String.toInt |> Maybe.withDefault 0)
            (b.score |> String.toInt |> Maybe.withDefault 0)
    of
        LT ->
            GT

        EQ ->
            EQ

        GT ->
            LT


viewSaints : Model -> Html Msg
viewSaints model =
    let
        query =
            String.toLower model.query

        filteredSaints =
            if String.isEmpty query then
                saints

            else
                List.filter
                    (\s ->
                        String.contains query (String.toLower s.name)
                            || String.contains query (String.toLower s.alternativeNames)
                            || String.contains query (String.toLower s.feastDay)
                            || String.contains query (String.toLower s.patronOf)
                    )
                    saints
                    |> List.sortWith saintSort
    in
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
        , input
            [ type_ "text"
            , placeholder "Search for a Saint"
            , value model.query
            , onInput SetQuery
            , style "box-shadow" "#777 1px 1px 5px"
            , class "rounded p-2 mb-2 text-lg"
            ]
            []
        , div [] (List.map viewSaint filteredSaints)
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
