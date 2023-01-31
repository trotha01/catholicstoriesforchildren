module FeastDayActivities.Main exposing (..)

-- import Html.String exposing (..)
-- import Html.String.Attributes exposing (..)

import Browser
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (Route(..), UrlDate, parseRoute, route, splitList)
import FeastDayActivities.FeastDays exposing (..)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
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
            , style "perspective" "300px"
            , style "scroll-behavior" "smooth"
            , style "background-color" "#FEF7F4"
            ]
            [ -- viewSubpageHeader "Feast Day Activities" headerMargin
              viewBody currentRoute

            -- , viewFooter
            ]
        ]
    }


viewBody : Maybe Route -> Html Msg
viewBody route =
    case Debug.log "route" route of
        Just (Date date) ->
            feastDays
                |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower date.month)
                |> List.head
                |> Maybe.withDefault january
                |> .feasts
                |> List.filter (\feastDay -> String.toLower feastDay.date == String.toLower date.date)
                |> List.map .feasts
                |> List.head
                |> Maybe.withDefault []
                |> viewDate date

        Just (Month month) ->
            feastDays
                |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower month)
                |> List.head
                |> Maybe.withDefault january
                |> viewMonth

        Nothing ->
            viewMonth january



-- DAY VIEW


viewDate : UrlDate -> List FeastActivities -> Html Msg
viewDate urlDate feasts =
    div [ class "text-center" ]
        [ h1 [ class "capitalize" ]
            [ text (urlDate.month ++ " " ++ urlDate.date)
            ]
        , viewFeastDayHeader feasts
        , div [ class "mt-10" ]
            [ viewFeastActivities feasts ]
        ]


viewFeastDayHeader : List FeastActivities -> Html Msg
viewFeastDayHeader feasts =
    let
        concatFeasts =
            String.join " and " (List.map .feast feasts)
    in
    div
        [ class "grid m-auto max-w-2xl"
        , class "text-center"
        ]
        [ h2 [ class "text-2xl" ] [ text ("Feast of " ++ concatFeasts) ] ]


viewFeast : FeastActivities -> Html Msg
viewFeast feastActivities =
    div [] [ text feastActivities.feast ]


viewFeastActivities : List FeastActivities -> Html Msg
viewFeastActivities feastActivities =
    let
        activities =
            List.concatMap .activities feastActivities

        feastDayReadingActivities =
            readingActivities activities
    in
    div []
        [ viewVideos (videoActivities activities)
        , viewPrintouts (printoutActivities activities)
        , viewReadings feastDayReadingActivities
        ]


viewVideos : List VideoActivity -> Html Msg
viewVideos videos =
    if List.isEmpty videos then
        span [] []

    else
        div []
            [ h3 [] [ text "Videos" ]
            , div []
                (List.map
                    (\video ->
                        a
                            [ href video.link
                            , target "_blank"
                            ]
                            [ text video.title
                            ]
                    )
                    videos
                )
            ]


viewPrintouts : List PrintoutActivity -> Html Msg
viewPrintouts activities =
    if List.isEmpty activities then
        span [] []

    else
        div []
            [ h3 [] [ text "Printouts" ]
            , div []
                (List.map
                    (\activity ->
                        a
                            [ href activity.link
                            , target "_blank"
                            ]
                            [ text activity.title
                            ]
                    )
                    activities
                )
            ]


viewReadings : List ReadingActivity -> Html Msg
viewReadings activities =
    if List.isEmpty activities then
        span [] []

    else
        div []
            [ h3
                [ class "text-3xl"
                ]
                [ text "Reading" ]
            , div [ class "max-w-3xl m-auto" ]
                (List.map
                    (\activity ->
                        a
                            [ class "grid grid-cols-[50px_1fr]"
                            , href activity.link
                            , target "_blank"
                            , class "hover:bg-csc-lightpurple"
                            , class "rounded m-5"
                            ]
                            [ img
                                [ src activity.image
                                , class "w-10 h-10"
                                , class "rounded"
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
                    )
                    activities
                )
            ]



-- MONTHLY VIEW


viewMonth : FeastMonth -> Html Msg
viewMonth feastMonth =
    let
        ( firstHalf, secondHalf ) =
            splitList feastMonth.feasts
    in
    div
        []
        [ h1 [ class "text-center" ] [ text "2023 Feast Day Activities" ]
        , div
            [ class "grid grid-cols-12"
            , class "text-base md:text-3xl lg:text-3xl"
            , class "mt-6"
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
            , style "margin-top" "50px"
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
        [ class "text-center"
        , class "col-span-2"
        , class "grid"
        , class "content-center"
        , class "uppercase"
        , class "text-5xl"
        , style "font-family" "hvdComicSerifPro"
        , style "background-color" color
        , style "border-top" "3px solid black"
        , style "border-bottom" "3px solid black"
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
            urlPath ++ "/" ++ month ++ "/" ++ feastDay.date
    in
    div
        []
        [ dateHR
        , a
            [ style "color" "black"
            , href link
            , class "grid grid-cols-calendar gap-3 items-center justify-items-center"
            , class "hover:bg-csc-lightpurple"
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
        , href ("./" ++ month)
        ]
        [ text month ]


urlPath : String
urlPath =
    "/feastdayactivities"


viewLink : String -> Html Msg
viewLink path =
    li [] [ a [ href path ] [ text path ] ]


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
