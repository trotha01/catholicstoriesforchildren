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
import Saints.SaintList as SaintList exposing (Saint)
import Signup exposing (..)
import Spinner
import Url
import Url.Builder exposing (..)


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , query : String
    , signup : Signup.Model
    , saintList : SaintList.Model
    }


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


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , query = ""
      , signup = Signup.init
      , saintList = SaintList.init
      }
    , SaintList.fetchSaints |> Cmd.map SaintListMsg
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetQuery String
    | SignupMsg Signup.Msg
    | SaintListMsg SaintList.Msg


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

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )

        SaintListMsg saintListMsg ->
            let
                ( newSaintList, _ ) =
                    SaintList.update saintListMsg model.saintList
            in
            ( { model | saintList = newSaintList }, Cmd.none )



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
                    viewSaintPage model s

                Nothing ->
                    viewSaints model
            ]
        ]


viewSaintPage : Model -> String -> Html Msg
viewSaintPage model saintName =
    let
        maybeSaint =
            List.filter (\s -> s.name == saintName) model.saintList.saints
                |> List.head
    in
    case maybeSaint of
        Nothing ->
            let
                spinnerOrError =
                    if model.saintList.isLoading then
                        div [ class "text-center" ]
                            [ span [ class "mb-4" ] [ text "We are getting information for this saints, this may take some time." ]
                            , div [ class "m-auto w-10 text-[#9200B3]" ]
                                [ Spinner.purpleSpinner []
                                ]
                            ]

                    else
                        div []
                            [ div [] [ text "Sorry, we had an error getting the information for this saint" ]
                            ]
            in
            div
                []
                [ viewBackButton
                , h1
                    [ class "text-center"
                    , class "my-10"
                    ]
                    [ text saintName ]
                , spinnerOrError
                ]

        Just saint ->
            div
                []
                [ p [] [ text "We have gathered a number of links to videos, images, and activities for the saints. Before clicking away, add your email below to stay informed on how to keep kids strong in the faith, gain access to valuable Catholic content for free, and be the first to receive high-quality animations as soon as they're released." ]
                , div [ class "mt-10" ]
                    [ Signup.view model.signup |> Html.map SignupMsg ]
                , div [ class "mt-10" ] [ viewBackButton ]
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

        isLoadingClass =
            if model.saintList.isLoading then
                ""

            else
                "hidden"

        filteredSaints =
            if String.isEmpty query then
                model.saintList.saints

            else
                List.filter
                    (\s ->
                        String.contains query (String.toLower s.name)
                            || String.contains query (String.toLower s.alternativeNames)
                            || String.contains query (String.toLower s.feastDay)
                            || String.contains query (String.toLower s.patronOf)
                    )
                    model.saintList.saints
                    |> List.sortWith saintSort
    in
    div []
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "List of Saints and Blesseds" ]
        , div [ class "mb-10" ]
            [ p [] [ text "Here at Catholic Stories for children, we are commited to providing valuable content for Catholic families. We help raise kids strong in the Catholic faith. We do this throught, stories, animations, music, and providing resources for Catholic families." ]
            , div [ class "mt-10" ]
                [ Signup.view model.signup |> Html.map SignupMsg ]
            , p [ class "mt-10" ] [ text "This is an extensive but not exhaustive list of the saints and blesseds recognized by the Catholic Church." ]
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
            , class "rounded p-4 mb-4 text-lg w-full text-xl"
            ]
            []
        , div [ class ("text-center " ++ isLoadingClass) ]
            [ span [ class "mb-4" ] [ text "We are getting the list of saints, this may take some time." ]
            , div [ class "m-auto w-10 text-[#9200B3]" ]
                [ Spinner.purpleSpinner []
                ]
            ]
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
