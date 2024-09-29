module Animations.DaisyAndSheep.Main exposing (..)

import Animations.DaisyAndSheep.DASEpisodes exposing (..)
import Animations.Helpers exposing (..)
import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Signup exposing (..)
import Task
import Time exposing (Month(..))
import Url
import Url.Parser exposing ((</>), (<?>), parse)
import Url.Parser.Query as Query


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , signup : Signup.Model
    , time : Time.Posix
    , timezone : Time.Zone
    , videoTab : VideoOption
    }


type VideoOption
    = English
    | Spanish
    | Urdu
    | Asl


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg
    | NoOp
    | NewTime Time.Posix
    | NewZone Time.Zone
    | VideoTabClick VideoOption


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
      , signup = Signup.init
      , time = Time.millisToPosix 0
      , timezone = Time.utc
      , videoTab = English
      }
    , Cmd.batch
        [ Task.perform NewTime Time.now
        , Task.perform NewZone Time.here
        ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        urlString =
                            Url.toString url

                        isDASPage =
                            String.contains "daisyandsheep" urlString
                    in
                    if isDASPage then
                        ( { model | url = url }, Nav.pushUrl model.key (Url.toString url) )

                    else
                        ( { model | url = url }, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , if String.contains "e=" (Url.toString url) then
                jumpToTop

              else
                jumpToHeader
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

        VideoTabClick language ->
            ( { model | videoTab = language }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


jumpToHeader : Cmd Msg
jumpToHeader =
    Dom.getElement "top"
        |> Task.andThen (\i -> Dom.setViewportOf "body" 0 i.element.y)
        |> Task.attempt (\_ -> NoOp)


jumpToTop : Cmd Msg
jumpToTop =
    Dom.getElement "top"
        |> Task.andThen (\i -> Dom.setViewportOf "body" 0 0)
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
    { title = "Daisy and Sheep Animations - Catholic Stories for Children"
    , body =
        [ div
            [ class "bg-[#FEF7F4]"
            ]
            [ viewSubpageHeader "Animations" headerMargin
            , viewBody model currentRoute
            , viewFooter
            ]
        ]
    }


viewBody : Model -> Maybe Route -> Html Msg
viewBody model urlRoute =
    case urlRoute of
        Just (Episode animationEpisode) ->
            case animationEpisode.episode of
                Just episodeUrl ->
                    case episodeFromURL episodeUrl of
                        Just pageEpisode ->
                            viewEpisode model pageEpisode

                        _ ->
                            viewEpisodes model

                _ ->
                    viewEpisodes model

        _ ->
            viewEpisodes model


viewEpisodes : Model -> Html Msg
viewEpisodes model =
    div
        [ class "hcenter py-5 px-11"
        , style "max-width" "800px"
        ]
        [ h1 [ class "leading-10", id "top" ] [ text "Start teaching your children with Catholic animations" ]
        , div [ class "my-10" ]
            [ p [ class "my-5" ] [ text "Use these animations to help your kids learn about the Catholic Mass and fun facts about the Cathoilc Church." ]
            , p [ class "my-5" ]
                [ text
                    ("Walk step by step through the Mass with these animations. Your kids will start to "
                        ++ "learn each part and become more engaged as they understand what is happening every Sunday!"
                    )
                ]
            , div [ class "mt-2" ]
                [ Signup.view model.signup |> Html.map SignupMsg ]
            ]
        , animations
        ]


viewEpisode : Model -> DASEpisode msg -> Html Msg
viewEpisode model episode =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        ]
        [ a
            [ class "text-7xl text-left md:m-0"
            , href "/animations/daisyandsheep"
            , attribute "aria-label" "Back"
            ]
            [ div [ class "mt-10" ] [ img [ class "h-20", src "https://ik.imagekit.io/catholicstories/Resources_Icons/leftarrow_emvaRz9A6.png?updatedAt=1693003148637" ] [] ]
            ]
        , h1 [ class "my-10 leading-10", id "top" ] [ text episode.title ]

        -- , page.about
        -- , Signup.view3
        , viewVideoPlayers model episode
        , viewActivities episode
        ]


viewActivities : DASEpisode msg -> Html Msg
viewActivities episode =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text (episode.title ++ " Activities") ]
        , p [ class "h-14" ]
            [ text "Access activities, reflection questions, guided imaginitive prayer and more!"
            ]
        , div [ class "grid grid-cols-2 gap-4" ]
            [ div []
                [ a
                    [ attribute "aria-label" (episode.title ++ " Activities")
                    , href episode.activities.pdfLink
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src episode.activities.thumbnailLink
                        ]
                        []
                    ]
                ]
            , div []
                [ a
                    [ attribute "aria-label" (episode.title ++ " Activity Answers")
                    , href episode.activities.answerPdfLink
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src episode.activities.answerThumbnailLink
                        ]
                        []
                    ]
                ]
            ]
        ]


animations : Html msg
animations =
    div
        [ class "w-full"
        , class "grid grid-cols-1 lg:grid-cols-2"
        , class "max-w-7xl"
        , class "m-auto"
        , class "mb-20"
        ]
        [ a
            [ href "/animations/daisyandsheep?e=liturgicalkiss"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Liturgical Kiss Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/LiturgicalKiss.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Liturgical Kiss Animation"
                ]
                []
            ]
        , a
            [ href "/animations/daisyandsheep?e=astronomyprogram"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Astronmy Program Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/AstronomyProgram.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Astronomy Program Animation"
                ]
                []
            ]
        , a
            [ href "/animations/daisyandsheep?e=penitentialact"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Penitential Act Animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/PenitentialAct.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Penitential Act Animation"
                ]
                []
            ]
        ]


type Route
    = Episode AnimationEpisode


type alias AnimationEpisode =
    { episode : Maybe String }


parseRoute : Url.Url -> Maybe Route
parseRoute =
    parse route


urlDateParser : Url.Parser.Parser (Maybe String -> a) a
urlDateParser =
    Url.Parser.s "animations"
        </> Url.Parser.s "daisyandsheep"
        <?> Query.string "e"


route : Url.Parser.Parser (Route -> a) a
route =
    Url.Parser.map (\e -> Episode { episode = e }) urlDateParser


removeSpaces : String -> String
removeSpaces str =
    String.filter (\c -> c /= ' ') str


episodeUrlParam : DASEpisode msg -> String
episodeUrlParam episode =
    episode.title |> removeSpaces |> String.toLower


episodeFromURL : String -> Maybe (DASEpisode msg)
episodeFromURL urlString =
    List.foldl
        (\episode responseEpisode ->
            if urlString == episodeUrlParam episode then
                Just episode

            else
                responseEpisode
        )
        Nothing
        episodes


viewVideoPlayers : Model -> DASEpisode msg -> Html Msg
viewVideoPlayers model page =
    div
        []
        [ viewVideoPlayerTabs model page
        , case model.videoTab of
            English ->
                viewVideo page.videoTitles.english page.videoLinks.english

            Spanish ->
                viewVideo page.videoTitles.spanish page.videoLinks.spanish

            Asl ->
                viewVideo page.videoTitles.asl page.videoLinks.asl

            Urdu ->
                viewVideo page.videoTitles.urdu page.videoLinks.urdu
        ]


viewVideoPlayerTabs : Model -> DASEpisode msg -> Html Msg
viewVideoPlayerTabs model page =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
    in
    div [ class "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ li [ class "mr-2" ]
                [ button
                    [ class
                        ("inline-block p-4 border-b-2 rounded-t-lg "
                            ++ (if model.videoTab == English then
                                    selectedClass

                                else
                                    nonSelectedClass
                               )
                        )
                    , onClick (VideoTabClick English)
                    ]
                    [ text "English" ]
                ]
            , if not (String.isEmpty page.videoLinks.spanish) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if model.videoTab == Spanish then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Spanish)
                        ]
                        [ text "Spanish" ]
                    ]

              else
                span [] []
            , if not (String.isEmpty page.videoLinks.urdu) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if model.videoTab == Urdu then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Urdu)
                        ]
                        [ text "Urdu" ]
                    ]

              else
                span [] []
            , if not (String.isEmpty page.videoLinks.asl) then
                li
                    [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if model.videoTab == Asl then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoTabClick Asl)
                        ]
                        [ text "Asl" ]
                    ]

              else
                span [] []
            ]
        ]
