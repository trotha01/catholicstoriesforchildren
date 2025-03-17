module Animations.View exposing (..)

import Animations.Helpers exposing (..)
import Animations.Helpers.Carousel as Carousel exposing (Carousel)
import Animations.Productions as Productions exposing (getEpisodeFromURLPath, getProductionFromURLPath, getSeasonFromURLPath, productions)
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
import Url.Parser exposing ((</>), (<?>), Parser, int, parse, s, string)


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , signup : Signup.Model
    , time : Time.Posix
    , timezone : Time.Zone
    , videoTab : VideoOption
    , slideshow : Carousel ( String, String )
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
    | NextSlide
    | PrevSlide


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , signup = Signup.init
      , time = Time.millisToPosix 0
      , timezone = Time.utc
      , videoTab = English
      , slideshow = Carousel.init Productions.slideshowProductions
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

                        isProductionsPage =
                            String.contains "animations" urlString
                    in
                    if isProductionsPage then
                        ( { model | url = url }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )

                    else
                        ( { model | url = url }, Cmd.batch [ Nav.load (Url.toString url), scrollToTopCmd ] )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , if String.contains "e=" (Url.toString url) then
                -- jumpToTop
                scrollToTopCmd

              else
                -- jumpToHeader
                scrollToTopCmd
            )

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )

        NextSlide ->
            ( { model | slideshow = Carousel.next model.slideshow }, Cmd.none )

        PrevSlide ->
            ( { model | slideshow = Carousel.prev model.slideshow }, Cmd.none )

        NewTime t ->
            ( { model | time = t }, Cmd.none )

        NewZone z ->
            ( { model | timezone = z }, Cmd.none )

        VideoTabClick language ->
            ( { model | videoTab = language }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


scrollToTopCmd : Cmd Msg
scrollToTopCmd =
    Dom.setViewport 0 0
        |> Task.perform (\_ -> NoOp)



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


view : Url.Url -> Model -> Browser.Document Msg
view url model =
    let
        urlRoute =
            parseRoute url

        title =
            case urlRoute of
                Just (EpisodeRoute r) ->
                    case
                        ( r.production, r.season, r.episode )
                    of
                        ( Just productionURL, Just seasonURL, Just episodeUrl ) ->
                            case getEpisodeFromURLPath productionURL seasonURL episodeUrl of
                                ( Just production, Just season, Just pageEpisode ) ->
                                    pageEpisode.title

                                _ ->
                                    ""

                        ( Just productionURL, Just seasonURL, Nothing ) ->
                            case getSeasonFromURLPath productionURL seasonURL of
                                ( Just production, Just season ) ->
                                    production.title

                                _ ->
                                    ""

                        ( Just productionURL, Nothing, Nothing ) ->
                            case getProductionFromURLPath productionURL of
                                Just production ->
                                    -- view season 1 by default
                                    production.title

                                _ ->
                                    ""

                        _ ->
                            ""

                _ ->
                    ""
    in
    { title = title ++ " - Catholic Stories for Children"
    , body =
        [ div
            [ class "bg-[#282c2e] text-white"
            ]
            [ viewSubpageHeader "Animations" headerMargin
            , viewBody model urlRoute
            , viewFooter
            ]
        ]
    }


viewBody : Model -> Maybe Route -> Html Msg
viewBody model urlRoute =
    case urlRoute of
        Just (EpisodeRoute r) ->
            case
                ( r.production, r.season, r.episode )
            of
                ( Just productionURL, Just seasonURL, Just episodeUrl ) ->
                    case getEpisodeFromURLPath productionURL seasonURL episodeUrl of
                        ( Just production, Just season, Just pageEpisode ) ->
                            viewEpisode model pageEpisode

                        _ ->
                            viewProductions model

                ( Just productionURL, Just seasonURL, Nothing ) ->
                    case getSeasonFromURLPath productionURL seasonURL of
                        ( Just production, Just season ) ->
                            viewEpisodes model production season.number

                        _ ->
                            viewProductions model

                ( Just productionURL, Nothing, Nothing ) ->
                    case getProductionFromURLPath productionURL of
                        Just production ->
                            -- view season 1 by default
                            viewEpisodes model production 1

                        _ ->
                            viewProductions model

                _ ->
                    viewProductions model

        _ ->
            viewProductions model


viewProductions : Model -> Html Msg
viewProductions model =
    div
        [ class "hcenter" ]
        [ div
            [ class "hcenter py-5 px-11 max-w-3xl" ]
            [ h1 [ class "leading-10 my-10" ] [ text "Start teaching your children with Catholic animations" ]
            , div [ class "my-10" ]
                [ p [ class "leading-10" ]
                    [ text "Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts." ]
                , p [ class "my-5" ] [ text "Use these animations to help your kids build a habit of prayer." ]
                , p [ class "my-5" ]
                    [ text
                        ("From the prayer before meals to the prayer to their guardian angel to the Hail Mary, "
                            ++ "prayer helps kids grow in their relationship with God and grow in the virtues."
                        )
                    ]
                , p [ class "my-5" ]
                    [ text
                        ("Do you want your children to grow in gratitude? Start with the prayer before meals."
                            ++ " Do you want your children to grow in humility? Start with the Act of Contrition."
                            ++ " Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers."
                            ++ " A habit of prayer will help your kid grow into the virtuous person that you will delight to see."
                        )
                    ]
                ]
            ]
        , div [ class "mt-2 mb-20 text-black" ]
            [ Signup.view4 |> Html.map SignupMsg ]
        , viewAnimationThumbnails "Animations" <| List.map productionToThumbnailData productions
        ]


viewEpisodes : Model -> Production msg -> Int -> Html Msg
viewEpisodes model production season =
    div
        [ class "hcenter"
        ]
        [ production.about |> Html.map (\_ -> NoOp)
        , div [ class "mt-2 mb-20 text-black" ]
            [ Signup.view4 |> Html.map (\_ -> NoOp) ]
        , let
            episodes =
                production
                    |> .seasons
                    |> List.map .episodes
                    |> List.concat

            episodeThumbnails =
                List.map (episodeToThumbnailData production season) episodes

            firstEpisode =
                List.head episodes
          in
          if List.length episodes == 1 then
            case firstEpisode of
                Just e ->
                    viewEpisode model e

                Nothing ->
                    viewAnimationThumbnails "Episodes" episodeThumbnails

          else
            viewAnimationThumbnails "Episodes" episodeThumbnails
        ]


viewEpisode : Model -> Episode msg -> Html Msg
viewEpisode model episode =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        ]
        [ -- a
          -- [ class "text-7xl text-left md:m-0"
          -- -- TODO: go to previous page
          -- , href "/animations"
          -- , attribute "aria-label" "Back"
          -- ]
          -- [ div [ class "mt-10" ] [ img [ class "h-20", src "https://ik.imagekit.io/catholicstories/Resources_Icons/leftarrow_emvaRz9A6.png?updatedAt=1693003148637" ] [] ]
          -- ]
          h1 [ class "my-10 leading-10", id "top" ] [ text episode.title ]
        , viewVideoPlayers model episode
        , viewActivities episode |> Html.map (\_ -> NoOp)
        , viewAbout episode |> Html.map (\_ -> NoOp)
        ]


viewAbout : Episode msg -> Html msg
viewAbout episode =
    episode.about


viewActivities : Episode msg -> Html msg
viewActivities episode =
    if String.isEmpty episode.activities.pdfLink then
        span [] []

    else
        div []
            [ h2 [ class "mb-3 mt-5" ] [ text (episode.title ++ " Activities") ]
            , p [ class "h-14" ]
                [ text "Many of our animations come with activities, reflection questions, guided imaginitive prayer and more!"
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
                , if episode.activities.answerPdfLink == "" then
                    span [] []

                  else
                    div []
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


type Route
    = EpisodeRoute AnimationEpisode


type alias AnimationEpisode =
    { production : Maybe String
    , season : Maybe Int
    , episode : Maybe String
    }


parseRoute : Url.Url -> Maybe Route
parseRoute =
    parse route


routeParser : Parser (AnimationEpisode -> a) a
routeParser =
    Url.Parser.oneOf
        [ (Url.Parser.s "animations" </> string </> int </> string)
            |> Url.Parser.map (\p s e -> { production = Just p, season = Just s, episode = Just e })
        , (Url.Parser.s "animations" </> string </> int)
            |> Url.Parser.map (\p s -> { production = Just p, season = Just s, episode = Nothing })
        , (Url.Parser.s "animations" </> string)
            |> Url.Parser.map (\p -> { production = Just p, season = Nothing, episode = Nothing })
        , Url.Parser.s "animations"
            |> Url.Parser.map { production = Nothing, season = Nothing, episode = Nothing }
        ]


route : Url.Parser.Parser (Route -> a) a
route =
    Url.Parser.map (\e -> EpisodeRoute e) routeParser


removeSpaces : String -> String
removeSpaces str =
    String.filter (\c -> c /= ' ') str


episodeUrlParam : Episode msg -> String
episodeUrlParam episode =
    episode.title |> removeSpaces |> String.toLower


viewVideoPlayers : Model -> Episode msg -> Html Msg
viewVideoPlayers model page =
    div
        []
        [ viewVideoPlayerTabs model page
        , case model.videoTab of
            English ->
                viewVideo page.videoTitles.english page.videoLinks.english

            Spanish ->
                -- TODO: these changes should also be made in the videoplayertabs function
                if String.isEmpty page.videoLinks.spanish then
                    viewVideo page.videoTitles.english page.videoLinks.english

                else
                    viewVideo page.videoTitles.spanish page.videoLinks.spanish

            Asl ->
                if String.isEmpty page.videoLinks.asl then
                    viewVideo page.videoTitles.english page.videoLinks.english

                else
                    viewVideo page.videoTitles.asl page.videoLinks.asl

            Urdu ->
                if String.isEmpty page.videoLinks.urdu then
                    viewVideo page.videoTitles.english page.videoLinks.english

                else
                    viewVideo page.videoTitles.urdu page.videoLinks.urdu
        ]


viewVideoPlayerTabs : Model -> Episode msg -> Html Msg
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
