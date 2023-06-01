module FeastDayActivities.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (..)
import FeastDayActivities.FeastDays exposing (..)
import FeastDayActivities.FeastDays.M01Jan exposing (january)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
import Json.Encode
import Saints.SaintHelpers exposing (activityDescriptionFromLink, activityImageFromLink, activityTitleFromLink, activityTypeFromLink)
import Saints.SaintList exposing (saints)
import Signup exposing (..)
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
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key
        url
        Signup.init
    , Cmd.none
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        urlString =
                            Url.toString url

                        isMonth =
                            List.any (\month -> String.contains month urlString) months
                    in
                    if isMonth then
                        ( model, Nav.pushUrl model.key (Url.toString url) )

                    else
                        ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )



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
            ]
            [ viewSubpageHeader "Feast Day Activities" headerMargin |> Html.String.toHtml
            , viewBody model currentRoute
            , viewFooter |> Html.String.toHtml
            ]
        ]
    }


viewBody : Model -> Maybe Route -> Html Msg
viewBody model route =
    case route of
        Just (Date date) ->
            case ( date.month, date.date ) of
                ( Just m, Just d ) ->
                    -- span [] (List.map viewFeastMonthCSV feastDays) -- used for CSV output
                    feastDays
                        |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower m)
                        |> List.head
                        |> Maybe.withDefault january
                        |> .feasts
                        |> List.filter (\feastDay -> String.toLower feastDay.date == String.toLower d)
                        |> List.map .feasts
                        |> List.head
                        |> Maybe.withDefault []
                        |> viewDate m d

                ( Just m, Nothing ) ->
                    feastDays
                        |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower m)
                        |> List.head
                        |> Maybe.withDefault january
                        |> viewMonth model

                _ ->
                    viewMonth model january

        _ ->
            viewMonth model january



-- DAY VIEW


viewDate : String -> String -> List FeastActivities -> Html Msg
viewDate month date feasts =
    div
        [ class "text-center"
        , class "mt-10 max-w-3xl mx-auto"
        ]
        [ div [ class "grid md:grid-cols-[200px,_1fr]" ]
            [ a
                [ class "text-7xl text-left m-5 md:m-0"
                , href (urlPath ++ "?m=" ++ month)
                , attribute "aria-label" ("Back to " ++ month)
                ]
                -- TODO: Use a different image (this says July)
                [ div [] [ text "🗓️" ]
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
            [ viewFeastActivities feasts ]
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


viewFeastActivities : List FeastActivities -> Html Msg
viewFeastActivities feastActivitiesList =
    let
        feastActivities =
            List.concatMap .activities feastActivitiesList

        feastNames =
            List.map .feast feastActivitiesList

        cleanedFeastNames =
            List.concatMap
                (\name ->
                    name
                        |> String.split " and "
                        |> List.map String.toLower
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
            saints
                |> List.filter (\saint -> List.member (String.toLower saint.name) cleanedFeastNames)
                |> List.concatMap
                    (\saint ->
                        [ -- Only include the catholic video link if there isn't a playlist
                          if saint.catholicSaintsInfoYoutubePlaylist == "" then
                            activityFromLink saint.name saint.catholicOrgVideoLink

                          else
                            Nothing
                        , activityFromLink saint.name saint.catholicSaintsInfoYoutubePlaylist
                        , activityFromLink saint.name saint.catholicCuisine
                        , activityFromLink saint.name saint.christianiconographyInfo
                        , activityFromLink saint.name saint.franciscanMediaLink
                        , activityFromLink saint.name saint.catholicOrgLink
                        , activityFromLink saint.name saint.catholicSaintsLink
                        , activityFromLink saint.name saint.uCatholicLink
                        ]
                    )
                |> List.filterMap Basics.identity
                |> removeDuplicates

        activities =
            List.append feastActivities saintActivities
    in
    if List.isEmpty activities then
        viewNoActivities

    else
        div []
            -- [ viewActivities "Video" (videoActivities activities) -- used for csv output
            [ viewVideos (videoActivities activities)
            , viewActivities "Audio" (audioActivities activities)
            , viewActivities "Crafts" (craftActivities activities)
            , viewActivities "Printouts" (printoutActivities activities)
            , viewActivities "Games" (gameActivities activities)
            , viewActivities "Images" (imageActivities activities)
            , viewActivities "Reading" (readingActivities activities)
            , viewActivities "Recipes" (foodActivities activities)
            , viewActivities "Books" (bookActivities activities)
            , viewActivities "More" (moreActivities activities)
            ]


viewNoActivities : Html msg
viewNoActivities =
    div []
        [ p []
            [ text "We are still adding feast day activities!" ]
        , p
            []
            [ text "Please hang tight." ]
        ]


viewVideos : List Activity -> Html Msg
viewVideos videos =
    if List.isEmpty videos then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3
                [ class "text-3xl"
                , class "mb-7"
                ]
                [ text "Videos" ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map
                    (\video ->
                        viewVideo video
                    )
                    videos
                )
            ]


viewVideo : Activity -> Html msg
viewVideo video =
    if String.contains "embed" video.link then
        viewEmbeddedVideo video

    else
        viewActivity video


viewEmbeddedVideo : Activity -> Html msg
viewEmbeddedVideo video =
    div
        [ style "position" "relative"
        , style "padding-bottom" "56.25%"
        , height 0
        , style "overflow" "hidden"
        , style "max-width" "100%"
        , style "border-radius" "5px"
        , class "m-5"
        ]
        [ iframe
            [ style "position" "absolute"
            , style "width" "100%"
            , style "height" "100%"
            , style "top" "0"
            , style "left" "0"
            , src video.link
            , title video.title
            , property "frameborder" (Json.Encode.string "0")
            , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            , property "allowfullscreen" (Json.Encode.string "true")
            ]
            []
        ]


viewActivities : String -> List Activity -> Html Msg
viewActivities activityType activities =
    if List.isEmpty activities then
        span [] []

    else
        div [ class "mt-20" ]
            [ h3
                [ class "text-3xl"
                , class "mb-7"
                ]
                [ text activityType ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map viewActivity activities)
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


viewFeastMonthCSV : FeastMonth -> Html Msg
viewFeastMonthCSV feastMonth =
    span [] (List.map (viewFeastDayCSV feastMonth.month) feastMonth.feasts)


viewFeastDayCSV : String -> FeastDay -> Html Msg
viewFeastDayCSV month feastDay =
    span [] (List.map (viewFeastActivitiesCSV (month ++ " " ++ feastDay.date ++ ", 2023")) feastDay.feasts)


viewFeastActivitiesCSV : String -> FeastActivities -> Html Msg
viewFeastActivitiesCSV date feastActivities =
    span [] (List.map (viewActivityCSV date feastActivities.feast) feastActivities.activities)


viewActivityCSV : String -> String -> Activity -> Html msg
viewActivityCSV date feast activity =
    p []
        [ text
            ("\""
                ++ date
                ++ "\",\""
                ++ feast
                ++ "\",\""
                ++ activityTypeToString activity.activityType
                ++ "\",\""
                ++ activity.title
                ++ "\",\""
                ++ activity.image
                ++ "\",\""
                ++ activity.link
                ++ "\",\""
                ++ activity.snippet
                ++ "\","
            )
        ]


activityTypeToString : ActivityType -> String
activityTypeToString activityType =
    case activityType of
        Video ->
            "Video"

        Audio ->
            "Audio"

        Images ->
            "Images"

        Printout ->
            "Printout"

        OnlineReading ->
            "OnlineReading"

        Food ->
            "Food"

        Game ->
            "Game"

        Book ->
            "Book"

        Crafts ->
            "Crafts"

        More ->
            "More"


viewActivity : Activity -> Html msg
viewActivity activity =
    a
        [ class "grid grid-cols-[100px_1fr]"
        , href activity.link
        , attribute "aria-label" activity.title
        , target "_blank"
        , class "hover:bg-csc-lightpurple"
        , class "rounded m-5"
        ]
        [ img
            [ src (imageSrc activity)
            , class "w-20 h-20"
            , class "rounded"
            , class "object-cover"
            ]
            []
        , div [ class "grid grid-rows" ]
            [ h4
                [ class "text-xl text-left"
                ]
                [ text activity.title ]
            , div
                [ class "text-left"
                ]
                [ text activity.snippet ]
            ]
        ]



-- MONTHLY VIEW


viewMonth : Model -> FeastMonth -> Html Msg
viewMonth model feastMonth =
    let
        ( firstHalf, secondHalf ) =
            splitList feastMonth.feasts
    in
    div
        [ class "mt-10 max-w-3xl mx-auto" ]
        [ h1 [ class "font-bold" ] [ text "2023 Feast Day Activities" ]
        , p [ class "text-2xl mt-5 mb-10" ] [ text "Click on each day to see suggested feast day activitity ideas that you can use with your children to celebrate." ]
        , p [ class "text-2xl mt-5 mb-10" ] [ text "You can find videos, crafts, printables, games, reading, recipes and more! There are many ways you can find here to help your kids with liturgical living." ]
        , div [ class "mt-10 mb-16" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , div
            [ class "grid grid-cols-6 lg:grid-cols-12 gap-y-2"
            , class "text-3xl md:text-3xl lg:text-3xl"
            , class "mt-3"
            , class "text-center"
            , style "max-width" "800px"
            , class "hcenter"
            ]
            (List.map viewMonthPillBox months)
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


viewMonthPillBox : String -> Html msg
viewMonthPillBox month =
    -- TODO: use nav html elements?
    a
        [ class "col-span-1"
        , class "hover:bg-csc-lightblue"
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
