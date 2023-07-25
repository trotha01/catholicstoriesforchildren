module FeastDayActivities.Main exposing (..)

import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (..)
import FeastDayActivities.FeastDays exposing (..)
import FeastDayActivities.FeastDays.M01Jan exposing (january)
import FeastDayActivities.FeastDays.M02Feb exposing (february)
import FeastDayActivities.FeastDays.M03Mar exposing (march)
import FeastDayActivities.FeastDays.M04Apr exposing (april)
import FeastDayActivities.FeastDays.M05May exposing (may)
import FeastDayActivities.FeastDays.M06Jun exposing (june)
import FeastDayActivities.FeastDays.M07Jul exposing (july)
import FeastDayActivities.FeastDays.M08Aug exposing (august)
import FeastDayActivities.FeastDays.M09Sep exposing (september)
import FeastDayActivities.FeastDays.M10Oct exposing (october)
import FeastDayActivities.FeastDays.M11Nov exposing (november)
import FeastDayActivities.FeastDays.M12Dec exposing (december)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Regex
import Saints.SaintHelpers exposing (activityDescriptionFromLink, activityImageFromLink, activityTitleFromLink, activityTypeFromLink)
import Saints.SaintList as SaintList
import Signup exposing (..)
import Spinner
import Task
import Time exposing (Month(..))
import Url


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
    , signup : Signup.Model
    , time : Time.Posix
    , timezone : Time.Zone
    , saintList : SaintList.Model
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , signup = Signup.init
      , time = Time.millisToPosix 0
      , timezone = Time.utc
      , saintList = SaintList.init
      }
    , Cmd.batch
        [ Task.perform NewTime Time.now
        , Task.perform NewZone Time.here
        , SaintList.fetchSaints |> Cmd.map SaintListMsg
        ]
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg
    | NoOp
    | NewTime Time.Posix
    | NewZone Time.Zone
    | SaintListMsg SaintList.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        urlString =
                            Url.toString url

                        hasMonth =
                            List.any (\month -> String.contains month urlString) months
                    in
                    if hasMonth then
                        ( { model | url = url }, Nav.pushUrl model.key (Url.toString url) )

                    else
                        ( { model | url = url }, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , jumpToHeader
            )

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )

        NewTime t ->
            ( { model | time = t }, Cmd.none )

        NewZone z ->
            ( { model | timezone = z }, Cmd.none )

        SaintListMsg saintListMsg ->
            let
                ( newSaintList, _ ) =
                    SaintList.update saintListMsg model.saintList
            in
            ( { model | saintList = newSaintList }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


jumpToHeader : Cmd Msg
jumpToHeader =
    Dom.getElement "calendar-content"
        |> Task.andThen (\i -> Dom.setViewportOf "body" 0 i.element.y)
        |> Task.attempt (\_ -> NoOp)



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
    { title = "Feast Day Activities - Catholic Stories for Children"
    , body =
        [ div
            [ -- For parallax
              style "height" "100vh"
            , style "overflow-x" "hidden"
            , style "overflow-y" "auto"
            , style "background-color" "#FEF7F4"
            , id "body"
            ]
            [ viewSubpageHeader "Feast Day Activities" headerMargin
            , viewBody model currentRoute
            , viewFooter
            ]
        ]
    }


viewBody : Model -> Maybe Route -> Html Msg
viewBody model route =
    let
        defaultMonth =
            monthFromTime model.time
    in
    case route of
        Just (Date date) ->
            case ( date.month, date.date ) of
                ( Just m, Just d ) ->
                    -- span [] (List.map viewFeastMonthCSV feastDays) -- used for CSV output
                    feastDays
                        |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower m)
                        |> List.head
                        |> Maybe.withDefault defaultMonth
                        |> .feasts
                        |> List.filter (\feastDay -> String.toLower feastDay.date == String.toLower d)
                        |> List.map .feasts
                        |> List.head
                        |> Maybe.withDefault []
                        |> viewDate model m d

                ( Just m, Nothing ) ->
                    feastDays
                        |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower m)
                        |> List.head
                        |> Maybe.withDefault defaultMonth
                        |> viewMonth model

                _ ->
                    viewMonth model defaultMonth

        _ ->
            viewMonth model defaultMonth



-- DAY VIEW


viewDate : Model -> String -> String -> List FeastActivities -> Html Msg
viewDate model month date feasts =
    div
        [ class "text-center"
        , class "mt-10 max-w-3xl mx-auto"
        , id "calendar-content"
        ]
        [ div [ class "grid md:grid-cols-[200px,_1fr]" ]
            [ a
                [ class "text-7xl text-left m-5 md:m-0"
                , href (urlPath ++ "?m=" ++ month)
                , attribute "aria-label" ("Back to " ++ month)
                ]
                [ div [] [ img [ class "h-20", src "https://ik.imagekit.io/catholicstories/Resources_Icons/calendar1_-zIHisgP2.png?updatedAt=1685581675420" ] [] ]
                , div [ class "text-sm capitalize" ] [ text ("Back to " ++ month) ]
                ]
            , div
                []
                [ h1 [ class "capitalize text-left mx-5 md:mx-0" ]
                    [ text ("Catholic Activities for Children for " ++ month ++ " " ++ date ++ ", 2023")
                    ]
                , viewFeastDayHeader feasts
                ]
            ]
        , div
            [ class "mt-10 mb-40"
            , class "min-h-screen"
            ]
            [ viewWeekdayActivities
            , viewFeastActivities model feasts
            ]
        ]


viewWeekdayActivities : Html msg
viewWeekdayActivities =
    div [ class "text-left" ]
        [ h3 [ class "font-semibold" ] [ text "Common Daily Prayers" ]
        , p [ class "mt-4" ] [ text "It is good to be able to center yourself on God throughout the years, months, and days. We have suggestions here to help order the hours of the day toward God. They are based on the Liturgy of the Hours. The suggestions here can be modified for you and your family. Especially with young kids that need to sleep in or go to bed early." ]
        , div [ class "mt-4 grid grid-cols-[50px,_1fr]" ]
            [ div [] [ text "6am" ]
            , div []
                [ a [ href "https://www.usccb.org/prayers/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
                , span [] [ text ". " ]
                , a [ href "https://www.usccb.org/prayers/morning-offering", class "underline", target "_blank" ] [ text "Morning Offering" ]
                , span [] [ text ". " ]
                , a [ href "/animations/guardianangel", class "underline", target "_blank" ] [ text "Guardian Angel Prayer" ]
                , span [] [ text ". " ]
                , a [ href "https://visitationproject.org/pages/the-three-hail-marys", class "underline", target "_blank" ] [ text "Three Hail Marys devotion" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "12pm" ]
            , div []
                [ a [ href "https://www.usccb.org/prayers/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "3pm" ]
            , div []
                [ a [ href "https://www.thedivinemercy.org/message/devotions/pray-the-chaplet", class "underline", target "_blank" ] [ text "Divine Mercy Chaplet" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "6pm" ]
            , div []
                [ a [ href "https://www.usccb.org/prayers/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "9pm" ]
            , div []
                -- TODO: add the mystery of the day here
                [ a [ href "https://www.thecatholickid.com/how-to-pray-the-rosary-for-kids/", class "underline", target "_blank" ] [ text "Rosary" ]
                , span [] [ text ". " ]
                , a [ href "https://www.ignatianspirituality.com/ignatian-prayer/the-examen/", class "underline", target "_blank" ] [ text "Evening Examen" ]
                , span [] [ text ". " ]
                , a [ href "https://visitationproject.org/pages/the-three-hail-marys", class "underline", target "_blank" ] [ text "Three Hail Marys devotion" ]
                , span [] [ text ". " ]
                ]
            ]
        ]


viewFeastDayHeader : List FeastActivities -> Html Msg
viewFeastDayHeader feasts =
    let
        concatFeasts =
            String.join " and " (List.map .feast feasts)
    in
    div
        [ class "grid m-auto max-w-2xl mx-5 md:mx-0" ]
        [ h2 [ class "text-2xl text-left" ] [ text ("Feast of " ++ concatFeasts) ] ]


viewFeast : FeastActivities -> Html Msg
viewFeast feastActivities =
    div [] [ text feastActivities.feast ]


activityFromLink : String -> String -> Maybe Activity
activityFromLink saintName link =
    let
        activityTitle =
            activityTitleFromLink link

        activityDescription =
            activityDescriptionFromLink saintName link

        activityImage =
            activityImageFromLink link

        activityType =
            activityTypeFromLink link
    in
    if String.isEmpty link then
        Nothing

    else
        Just
            { activityType = activityType
            , title = activityTitle
            , image = activityImage
            , link = link
            , snippet = activityDescription
            }


viewFeastActivities : Model -> List FeastActivities -> Html Msg
viewFeastActivities model feastActivitiesList =
    let
        feastActivities =
            List.concatMap .activities feastActivitiesList

        feastNames =
            List.map .feast feastActivitiesList

        removeParens =
            case Regex.fromString " \\(.*\\)" of
                Nothing ->
                    identity

                Just regex ->
                    Regex.replace regex (\_ -> "")

        cleanedFeastNames =
            List.concatMap
                (\name ->
                    name
                        |> String.split " and "
                        |> List.map String.toLower
                        |> List.map removeParens
                )
                feastNames

        -- Helper functions to remove duplicate activities
        addUniqueActivity : Activity -> List Activity -> List Activity
        addUniqueActivity record uniqueRecords =
            if List.any (\r -> r.link == record.link) uniqueRecords then
                uniqueRecords

            else
                record :: uniqueRecords

        removeDuplicates : List Activity -> List Activity
        removeDuplicates records =
            List.foldl addUniqueActivity [] records

        saintActivities =
            model.saintList.saints
                |> List.filter (\saint -> List.member (String.toLower saint.name) cleanedFeastNames)
                |> List.concatMap
                    (\saint ->
                        [ -- Only include the catholic video link if there isn't a playlist
                          if saint.catholicSaintsInfoYoutubePlaylist == "" then
                            [ activityFromLink saint.name saint.catholicOrgVideoLink ]

                          else
                            []
                        , [ activityFromLink saint.name saint.catholicSaintsInfoYoutubePlaylist ]
                        , [ activityFromLink saint.name saint.catholicCuisine ]
                        , [ activityFromLink saint.name saint.christianiconographyInfo ]
                        , [ activityFromLink saint.name saint.catholicSprouts ]
                        , [ activityFromLink saint.name saint.franciscanMediaLink ]
                        , [ activityFromLink saint.name saint.teachingCatholicKidsLink ]
                        , [ activityFromLink saint.name saint.catholicOrgLink ]
                        , [ activityFromLink saint.name saint.catholicSaintsLink ]
                        , [ activityFromLink saint.name saint.uCatholicLink ]
                        , [ activityFromLink saint.name saint.coloringPageLink ]
                        , List.map (activityFromLink saint.name) (saint.saintsAliveLink |> String.split ";")
                        ]
                    )
                |> List.concat
                |> List.filterMap Basics.identity
                |> removeDuplicates

        activities =
            List.append feastActivities saintActivities
    in
    if model.saintList.isLoading then
        div [ class "text-center mt-4" ]
            [ div [ class "mb-4" ] [ text "We are getting the feast day activities, hang tight." ]
            , div [ class "m-auto w-10 text-[#9200B3]" ]
                [ Spinner.purpleSpinner []
                ]
            ]

    else if List.isEmpty activities then
        div [ class "mt-4" ]
            [ viewNoActivities
            ]

    else
        div []
            -- [ viewActivities "Video" (videoActivities activities) -- used for csv output
            [ viewVideos (videoActivities activities)
            , viewAudioList (audioActivities activities)
            , viewActivities (craftActivities activities)
            , viewPrintouts (printoutActivities activities)
            , viewActivities (gameActivities activities)
            , viewActivities (imageActivities activities)
            , viewActivities (readingActivities activities)
            , viewActivities (foodActivities activities)
            , viewActivities (bookActivities activities)
            , viewActivities (moreActivities activities)
            ]


type alias FeastMonth =
    { key : String
    , month : String
    , feasts : List FeastDay
    , color : String
    }


type alias FeastDay =
    { date : String
    , feasts : List FeastActivities
    }


type alias FeastActivities =
    { feast : String
    , activities : List Activity
    }



-- MONTHLY VIEW


viewMonth : Model -> FeastMonth -> Html Msg
viewMonth model feastMonth =
    let
        ( firstHalf, secondHalf ) =
            splitList feastMonth.feasts
    in
    div
        [ class "mt-10 max-w-3xl mx-auto" ]
        [ div [ class "px-4" ]
            [ h1 [] [ text "2023 Feast Day Activities" ]
            , p [ class "mt-5 mb-10" ] [ text "Click on each day to see suggested feast day activitity ideas that you can use with your children to celebrate." ]
            , p [ class "mt-5 mb-10" ] [ text "You can find videos, crafts, printables, games, reading, recipes and more! There are many ways you can find here to help your kids with liturgical living." ]
            , div [ class "mt-10 mb-16" ]
                [ Signup.view model.signup |> Html.map SignupMsg ]
            ]
        , div
            []
            [ div
                [ class "grid grid-cols-6 lg:grid-cols-12 gap-y-2 justify-items-center"
                , class "text-3xl md:text-3xl lg:text-3xl"
                , class "mt-3"
                , class "text-center"
                , style "max-width" "800px"
                , class "hcenter"
                ]
                (List.map (viewMonthPillBox feastMonth.month) months)
            , div
                [ style "width" "100vw"
                , style "max-width" "800px"
                , class "hcenter"
                , style "position" "relative"
                , style "font-size" "20px"
                , class "mt-3 mb-12"
                , class "grid grid-cols-2"
                ]
                [ viewFeastMonthHeader feastMonth.color feastMonth.month
                , div
                    [ class "grid grid-cols-1 md:grid-cols-2"
                    , class "col-span-2"
                    , style "background-color" "white"
                    , style "padding" "50px"
                    ]
                    [ viewFeastDays feastMonth.key firstHalf
                    , viewFeastDays feastMonth.key secondHalf
                    ]
                ]
            ]
        ]


viewFeastMonthHeader : String -> String -> Html Msg
viewFeastMonthHeader color month =
    h2
        [ class "grid col-span-2 content-center text-center"
        , class "uppercase text-5xl"
        , class "rounded"
        , style "font-family" "hvdComicSerifPro"
        , style "background-color" "#9de3ec"
        , style "height" "2.5em"
        ]
        [ text month
        ]


viewFeastDays : String -> List FeastDay -> Html Msg
viewFeastDays month list =
    div
        [ class "col-span-1" ]
        (List.map (viewFeastDay month) list
            ++ [ dateHR ]
        )


viewFeastDay : String -> FeastDay -> Html Msg
viewFeastDay month feastDay =
    let
        link =
            urlPath ++ "?m=" ++ month ++ "&d=" ++ feastDay.date
    in
    div
        []
        [ dateHR
        , a
            [ style "color" "black"
            , href link
            , attribute "aria-label" (month ++ " " ++ feastDay.date)
            , class "grid grid-cols-calendar gap-3 items-center justify-items-center"
            , class "hover:bg-csc-lightpurple"
            , class "transition hover:scale-105"
            , class "rounded"
            ]
            [ div
                [ class "my-3"
                , class "text-3xl"
                ]
                [ text feastDay.date ]
            , div
                [ class "justify-self-start"
                ]
                (List.map viewFeast feastDay.feasts)
            ]
        ]


viewMonthPillBox : String -> String -> Html msg
viewMonthPillBox currentMonth month =
    -- TODO: use nav html elements?
    a
        [ class "col-span-1"
        , class
            (if String.contains month (String.toLower currentMonth) then
                "bg-csc-darkblue text-white"

             else
                ""
            )
        , class "hover:bg-csc-lightblue hover:text-black"
        , class "rounded"
        , class "p-2"
        , class "cursor-pointer"
        , class "capitalize"
        , class "transition hover:scale-105"
        , attribute "aria-label" month
        , href (urlPath ++ "?m=" ++ month)
        ]
        [ text month ]


urlPath : String
urlPath =
    "/feastdayactivities"


dateWidth : String
dateWidth =
    "50px"


dateHR : Html Msg
dateHR =
    hr
        [ style "width" dateWidth
        , style "margin-left" "0px"
        , style "border-top" "4px solid #415c71"
        ]
        []


monthFromTime : Time.Posix -> FeastMonth
monthFromTime t =
    t |> Time.toMonth Time.utc |> feastMonthFromMonth


feastMonthFromMonth : Month -> FeastMonth
feastMonthFromMonth month =
    case month of
        Jan ->
            january

        Feb ->
            february

        Mar ->
            march

        Apr ->
            april

        May ->
            may

        Jun ->
            june

        Jul ->
            july

        Aug ->
            august

        Sep ->
            september

        Oct ->
            october

        Nov ->
            november

        Dec ->
            december
