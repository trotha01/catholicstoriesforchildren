module Saints.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (viewVideos)
import FeastDayActivities.Main exposing (activityFromLink)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
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
    , patronageView : LongTextView
    }


type LongTextView
    = Full
    | Partial


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
      , patronageView = Partial
      }
    , SaintList.fetchSaints |> Cmd.map SaintListMsg
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SetQuery String
    | SignupMsg Signup.Msg
    | SaintListMsg SaintList.Msg
    | ChangePatronageView LongTextView


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

        ChangePatronageView viewType ->
            ( { model | patronageView = viewType }, Cmd.none )



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
            let
                saintsAliveLinks =
                    String.split ";" saint.saintsAliveLink
            in
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
                    , viewPatronage model saint
                    , viewVideos
                        ((if saint.catholicSaintsInfoYoutubePlaylist /= "" then
                            [ activityFromLink saintName saint.catholicSaintsInfoYoutubePlaylist ]

                          else
                            [ activityFromLink saintName saint.catholicSaintsInfoYoutubePlaylist ]
                         )
                            |> List.filterMap Basics.identity
                        )
                    , viewActivity saintName saint.catholicCuisine
                    , div []
                        (List.map (viewPodcastActivity saintName) saintsAliveLinks)
                    , viewActivity saintName saint.catholicSprouts
                    , viewActivity saintName saint.franciscanMediaLink
                    , viewActivity saintName saint.christianiconographyInfo
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


viewPatronage : Model -> Saint -> Html Msg
viewPatronage model saint =
    let
        showFullOrPartial =
            case
                model.patronageView
            of
                Full ->
                    identity

                Partial ->
                    \s ->
                        s
                            |> String.split " "
                            |> List.take 80
                            |> String.join " "

        cleanedPatronage =
            saint.patronOf
                -- Remove ; delimiter and quotes around each item
                |> String.replace "';'" ", "
                -- Remove the outer quotes
                |> String.slice 1 -1

        patronageList =
            cleanedPatronage
                |> showFullOrPartial

        isShowingEverything =
            String.length cleanedPatronage
                == String.length patronageList

        displayToggle =
            if model.patronageView == Partial && isShowingEverything then
                " hidden"

            else
                ""
    in
    if String.isEmpty patronageList then
        span [] []

    else
        div []
            [ span [ class "font-bold" ] [ text "Patronage: " ]
            , span [] [ text (patronageList ++ " ") ]
            , span
                [ class ("text-blue-500 cursor-pointer underline" ++ displayToggle)
                , onClick
                    (ChangePatronageView
                        (if model.patronageView == Full then
                            Partial

                         else
                            Full
                        )
                    )
                ]
                [ text
                    (if model.patronageView == Full then
                        "View Less"

                     else
                        "View More"
                    )
                ]
            ]


viewFeastDay : Saint -> Html msg
viewFeastDay saint =
    if String.isEmpty saint.feastDay then
        span [] []

    else
        div []
            [ span [ class "font-bold" ] [ text "Feast day: " ]
            , span [] [ text saint.feastDay ]
            ]


viewPodcastActivity : String -> String -> Html msg
viewPodcastActivity saintName link =
    if String.isEmpty link then
        span [] []

    else
        div [ class "p-7" ]
            [ iframe
                [ src link
                , attribute "allow" "autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                , attribute "frameborder" "0"
                , height 180
                , style "width" "100%;max-width:660px;overflow:hidden;border-radius:10px;"
                , attribute "sandbox" "allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                ]
                []
            ]


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


saintSort : Model -> Saint -> Saint -> Order
saintSort model a b =
    let
        aMatchesName =
            String.contains (String.toLower model.query) (String.toLower a.name)

        bMatchesName =
            String.contains (String.toLower model.query) (String.toLower b.name)

        aMatchesAltName =
            String.contains (String.toLower model.query) (String.toLower a.alternativeNames)

        bMatchesAltName =
            String.contains (String.toLower model.query) (String.toLower b.alternativeNames)

        aMatchesPatronage =
            String.contains (String.toLower model.query) (String.toLower a.patronOf)

        bMatchesPatronage =
            String.contains (String.toLower model.query) (String.toLower b.patronOf)
    in
    -- if the query matches one of the names, exit with that one first
    -- if both names match, check the alt names, then patronage, then score
    if aMatchesName && not bMatchesName then
        LT

    else if bMatchesName && not aMatchesName then
        GT

    else if aMatchesAltName && not bMatchesAltName then
        LT

    else if bMatchesAltName && not aMatchesAltName then
        GT

    else if aMatchesPatronage && not bMatchesPatronage then
        LT

    else if bMatchesPatronage && not aMatchesPatronage then
        GT

    else
        let
            aScore =
                a.score |> String.toInt |> Maybe.withDefault 0

            bScore =
                b.score |> String.toInt |> Maybe.withDefault 0
        in
        case
            compare aScore bScore
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
                model.saintList.saints
                    |> List.filter
                        (\s ->
                            String.contains (String.toLower query) (String.toLower s.name)
                                || String.contains (String.toLower query) (String.toLower s.alternativeNames)
                                || String.contains (String.toLower (convertDate query)) (String.toLower s.feastDay)
                                || String.contains (String.toLower query) (String.toLower s.patronOf)
                        )
                    -- TODO: update saint sort to take how close the match is into consideration
                    |> List.sortWith (saintSort model)
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
        , div [] (List.map (viewSaint model) filteredSaints)
        ]


viewSaint : Model -> Saint -> Html Msg
viewSaint model saint =
    let
        nameHighlight =
            highlightString False model.query saint.name

        patronage =
            saint.patronOf
                -- Remove ; delimiter and quotes around each item
                |> String.replace "';'" ", "
                -- Remove the outer quotes
                |> String.slice 1 -1

        altNames =
            saint.alternativeNames
                -- Remove ; delimiter and quotes around each item
                |> String.replace "';'" ", "
                -- Remove the outer quotes
                |> String.slice 1 -1

        extra =
            if model.query == "" then
                span [] []

            else if String.contains (String.toLower model.query) (String.toLower saint.name) then
                -- We don't need to show anything extra if the name matches the query
                span [] []

            else if String.contains (String.toLower model.query) (String.toLower altNames) then
                span []
                    [ text "Also called: "
                    , highlightString True model.query altNames
                    ]

            else if String.contains (String.toLower (convertDate model.query)) (String.toLower saint.feastDay) then
                span []
                    [ text "Feast Day: "
                    , highlightString True (convertDate model.query) saint.feastDay
                    ]

            else if String.contains (String.toLower model.query) (String.toLower patronage) then
                span []
                    [ text "Patronage: "
                    , highlightString True model.query patronage
                    ]

            else
                span [] []
    in
    div []
        [ a
            [ href (absolute [ "saints" ] [ string "s" saint.name ])
            , attribute "aria-label" saint.name
            , class "transition hover:underline hover:text-sky-500"
            ]
            [ span [ class "pr-3" ] [ nameHighlight ]
            , span [ class "opacity-50" ] [ extra ]
            ]
        ]


highlightString : Bool -> String -> String -> Html msg
highlightString clip substring string =
    let
        parts =
            String.split (String.toLower substring) (String.toLower string)
    in
    if substring == "" || List.length parts == 1 then
        span [] [ text string ]

    else
        case parts of
            before :: after ->
                let
                    beforeText =
                        String.left (String.length before) string
                            -- Trim the before string.
                            |> (\s ->
                                    if clip then
                                        String.right 10 s

                                    else
                                        s
                               )
                            |> dropBefore ";"

                    beforeElipsis =
                        if String.length before == String.length beforeText then
                            ""

                        else
                            "..."

                    highlightedText =
                        String.slice (String.length before) (String.length before + String.length substring) string

                    afterText =
                        String.dropLeft (String.length before + String.length substring) string
                            -- Trim the after string.
                            |> (\s ->
                                    if clip then
                                        String.left 20 s

                                    else
                                        s
                               )
                            |> takeUntil ";"

                    afterElipsis =
                        if String.length afterText == String.length (String.dropLeft (String.length before + String.length substring) string) then
                            ""

                        else
                            "..."
                in
                span []
                    [ span [] [ text beforeElipsis ]
                    , span [] [ text beforeText ]
                    , span [ class "bg-yellow-200" ] [ text highlightedText ]
                    , span [] [ text afterText ]
                    , span [] [ text afterElipsis ]
                    ]

            _ ->
                span [] [ text string ]


takeUntil : String -> String -> String
takeUntil delimiter string =
    case String.split delimiter string of
        before :: after ->
            before

        _ ->
            string


dropBefore : String -> String -> String
dropBefore delimiter string =
    if not (String.contains delimiter string) then
        string

    else
        case String.split delimiter string of
            before :: after ->
                String.join ";" after

            _ ->
                string
