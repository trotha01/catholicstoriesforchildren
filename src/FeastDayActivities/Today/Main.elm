module FeastDayActivities.Today.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (..)
import FeastDayActivities.FeastDays exposing (..)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup exposing (..)
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
    , time : Time.Posix
    , timezone : Time.Zone
    , isLoadingZone : Bool
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , time = Time.millisToPosix 0
      , timezone = Time.utc
      , isLoadingZone = True
      }
    , Cmd.batch
        [ Task.perform NewTime Time.now
        , Task.perform NewZone Time.here
        ]
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | NewTime Time.Posix
    | NewZone Time.Zone


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )

        NewTime t ->
            let
                month =
                    monthUrlFromTime t

                day =
                    dateUrlFromTime t

                cmd =
                    if model.isLoadingZone == False then
                        Nav.load ("/feastdayactivities?m=" ++ month ++ "&d=" ++ day)

                    else
                        Cmd.none
            in
            ( { model | time = t }, cmd )

        NewZone z ->
            let
                month =
                    monthUrlFromTime model.time

                day =
                    dateUrlFromTime model.time

                cmd =
                    if model.time /= Time.millisToPosix 0 then
                        Nav.load ("/feastdayactivities?m=" ++ month ++ "&d=" ++ day)

                    else
                        Cmd.none
            in
            ( { model | timezone = z, isLoadingZone = False }, cmd )



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
    div []
        [ span [] [ text "Routing you to activities for today. Hang tight..." ] ]
