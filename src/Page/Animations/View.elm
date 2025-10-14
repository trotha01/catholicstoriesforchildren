module Page.Animations.View exposing (..)

import Browser
import Browser.Navigation as Nav
import Component.Footer exposing (viewFooter)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Page.Animations.Helpers exposing (..)
import Page.Animations.Helpers.Carousel as Carousel exposing (Carousel)
import Page.Animations.Productions as Productions exposing (getEpisodeFromURLPath, getProductionFromURLPath, getSeasonFromURLPath, productions)
import Task
import Time
import Url
import Url.Parser exposing ((</>), Parser, int, parse, string)


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , time : Time.Posix
    , timezone : Time.Zone
    , videoTab : VideoOption
    , videoDetailTab : VideoDetailOption
    , slideshow : Carousel (Production Msg)
    }


type VideoOption
    = English
    | Spanish
    | Urdu
    | Asl


type VideoDetailOption
    = Episodes
    | Activities
    | Details
    | Suggested


type Msg
    = UrlChanged Url.Url
    | NoOp
    | NewTime Time.Posix
    | NewZone Time.Zone
    | VideoTabClick VideoOption
    | VideoDetailsTabClick VideoDetailOption String
    | NextSlide
    | PrevSlide


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , time = Time.millisToPosix 0
      , timezone = Time.utc
      , videoTab = English
      , videoDetailTab = getTabFromUrl url
      , slideshow = Carousel.init Productions.productions
      }
    , Cmd.batch
        [ Task.perform NewTime Time.now
        , Task.perform NewZone Time.here
        ]
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UrlChanged url ->
            let
                tabFromUrl =
                    getTabFromUrl url
            in
            ( { model
                | url = url
                , videoDetailTab = tabFromUrl
              }
            , Cmd.none
            )

        NewTime time ->
            ( { model | time = time }, Cmd.none )

        NewZone zone ->
            ( { model | timezone = zone }, Cmd.none )

        VideoTabClick videoTab ->
            ( { model | videoTab = videoTab }, Cmd.none )

        VideoDetailsTabClick tab path ->
            let
                newUrl =
                    if String.contains "?" path then
                        path ++ "&tab=" ++ String.toLower (tabToString tab)

                    else
                        path ++ "?tab=" ++ String.toLower (tabToString tab)
            in
            ( { model | videoDetailTab = tab }
            , Nav.pushUrl model.key newUrl
            )

        NextSlide ->
            ( { model | slideshow = Carousel.next model.slideshow }, Cmd.none )

        PrevSlide ->
            ( { model | slideshow = Carousel.prev model.slideshow }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


view : Url.Url -> Model -> Browser.Document Msg
view url model =
    let
        urlRoute =
            parseRoute url

        title =
            getTitleFromRoute urlRoute
    in
    { title = title ++ " - Claritas Studios"
    , body =
        [ div
            [ class "bg-black text-white"
            ]
            [ viewBody model urlRoute
            , viewFooter
            ]
        ]
    }


getTitleFromRoute : Maybe Route -> String
getTitleFromRoute urlRoute =
    case urlRoute of
        Just (EpisodeRoute r) ->
            getTitleFromEpisodeRoute r

        _ ->
            ""


getTitleFromEpisodeRoute : AnimationEpisode -> String
getTitleFromEpisodeRoute r =
    case
        ( r.production, r.season, r.episode )
    of
        ( Just productionURL, Just seasonURL, Just episodeUrl ) ->
            case getEpisodeFromURLPath productionURL seasonURL episodeUrl of
                ( Just _, Just _, Just pageEpisode ) ->
                    pageEpisode.title

                _ ->
                    ""

        ( Just productionURL, Just seasonURL, Nothing ) ->
            case getSeasonFromURLPath productionURL seasonURL of
                ( Just production, _ ) ->
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


viewBody : Model -> Maybe Route -> Html Msg
viewBody model urlRoute =
    case urlRoute of
        Just (EpisodeRoute r) ->
            viewEpisodeRoute model r

        _ ->
            viewProductions model


viewEpisodeRoute : Model -> AnimationEpisode -> Html Msg
viewEpisodeRoute model r =
    case ( r.production, r.season, r.episode ) of
        ( Just productionURL, Just seasonURL, Just episodeUrl ) ->
            viewSpecificEpisode model productionURL seasonURL episodeUrl

        ( Just productionURL, Just seasonURL, Nothing ) ->
            viewSeasonEpisodes model productionURL seasonURL

        ( Just productionURL, Nothing, Nothing ) ->
            viewProductionEpisodes model productionURL

        _ ->
            viewProductions model


viewSpecificEpisode : Model -> String -> Int -> String -> Html Msg
viewSpecificEpisode model productionURL seasonURL episodeUrl =
    case getEpisodeFromURLPath productionURL seasonURL episodeUrl of
        ( Just production, Just season, Just pageEpisode ) ->
            if pageEpisode.isFundraising then
                pageEpisode.about

            else
                viewEpisode model production season.number pageEpisode

        _ ->
            viewProductions model


viewSeasonEpisodes : Model -> String -> Int -> Html Msg
viewSeasonEpisodes model productionURL seasonURL =
    case getSeasonFromURLPath productionURL seasonURL of
        ( Just production, Just season ) ->
            let
                pageEpisode =
                    List.head season.episodes
            in
            case pageEpisode of
                Just e ->
                    viewEpisode model production season.number e

                Nothing ->
                    div []
                        [ img [ src production.carouselThumbnail ] []
                        , viewEpisodes production
                        ]

        _ ->
            viewProductions model


viewProductionEpisodes : Model -> String -> Html Msg
viewProductionEpisodes model productionURL =
    case getProductionFromURLPath productionURL of
        Just production ->
            let
                pageEpisode =
                    production.seasons
                        |> List.head
                        |> Maybe.map .episodes
                        |> Maybe.andThen List.head
            in
            case pageEpisode of
                Just e ->
                    viewEpisode model production 1 e

                Nothing ->
                    div []
                        [ img [ src production.carouselThumbnail ] []
                        , viewEpisodes production
                        ]

        _ ->
            viewProductions model


viewProductions : Model -> Html Msg
viewProductions model =
    div
        [ class "relative left-1/2 -translate-x-1/2 px-11 max-w-7xl" ]
        [ --     div
          --     [ class "relative left-1/2 -translate-x-1/2 py-5 px-11 max-w-7xl" ]
          --     [ h2 [ class "mb-10 text-3xl md:text-7xl" ] [ text "Start teaching your children with Catholic animations" ]
          --     , div [ class "my-10" ]
          --         [ p [ class "leading-10" ]
          --             [ text "Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts." ]
          --         , p [ class "my-5" ] [ text "Use these animations to help your kids build a habit of prayer." ]
          --         , p [ class "my-5" ]
          --             [ text
          --                 ("From the prayer before meals to the prayer to their guardian angel to the Hail Mary, "
          --                     ++ "prayer helps kids grow in their relationship with God and grow in the virtues."
          --                 )
          --             ]
          --         , p [ class "my-5" ]
          --             [ text
          --                 ("Do you want your children to grow in gratitude? Start with the prayer before meals."
          --                     ++ " Do you want your children to grow in humility? Start with the Act of Contrition."
          --                     ++ " Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers."
          --                     ++ " A habit of prayer will help your kid grow into the virtuous person that you will delight to see."
          --                 )
          --             ]
          --         ]
          --     ]
          -- , div [ class "mt-2 mb-20 text-black" ]
          --     [ Signup.view4 |> Html.map SignupMsg ]
          div
            [ class "m-auto max-w-7xl"
            ]
            [ viewAnimationThumbnailsLarge <| List.map productionToThumbnailData productions
            ]
        ]


viewEpisodes : Production msg -> Html msg
viewEpisodes production =
    div
        [ class "flex overflow-x-auto space-x-4 scrollbar-hide"
        , class "flex-none cursor-pointer"
        , style "scroll-behavior" "smooth"
        ]
        (production
            |> .seasons
            |> List.map .episodes
            |> List.concat
            |> List.map
                (\episode ->
                    a
                        [ href episode.link, class "flex-none w-64 md:w-80 group pt-5 pl-5" ]
                        [ div []
                            [ div
                                [ class "relative mb-2 rounded-lg transform scale-100 translate-z-0"
                                , class "transition-all duration-300 group-hover:scale-[1.02]"
                                , class "group-hover:before:border-[4px] rounded-lg"
                                , class "before:absolute before:inset-[-7px] before:rounded-lg group-hover:before:border group-hover:before:border-white"
                                ]
                                [ div [ class "aspect-video rounded-lg overflow-hidden" ]
                                    [ img
                                        [ src episode.thumbnail
                                        , alt episode.title
                                        , attribute "loading" "lazy"
                                        , attribute "decoding" "async"
                                        , class "w-full h-full object-cover"
                                        ]
                                        []
                                    ]
                                ]
                            ]
                        , div [ class "px-1 transition-colors duration-300 group-hover:text-white" ]
                            [ h3 [ class "text-gray-300 font-semibold mb-1 transition-colors duration-300 group-hover:text-white" ]
                                [ text episode.title ]
                            , div [ class "flex items-center text-gray-400 text-sm group-hover:text-white" ]
                                [ span [ class "text-sm font-medium px-2 py-1 border border-gray-400 rounded group-hover:border-white" ] [ text production.age ]
                                , span [ class "mx-2 text-xs opacity-50" ] [ text "•" ]
                                , text episode.year
                                , span [ class "mx-2 text-xs opacity-50" ] [ text "•" ]
                                , text episode.duration
                                ]
                            ]
                        ]
                )
        )


viewEpisode : Model -> Production msg -> Int -> Episode msg -> Html Msg
viewEpisode model production season episode =
    let
        episodeCount =
            production
                |> .seasons
                |> List.map .episodes
                |> List.concat
                |> List.length

        newModel =
            case ( episodeCount, model.videoDetailTab, String.isEmpty episode.activities.pdfLink ) of
                ( 1, Episodes, False ) ->
                    -- If there is only one episode and it has activities, show activities
                    { model | videoDetailTab = Activities }

                ( 1, Episodes, True ) ->
                    -- If there is only one episode and no activities, show details
                    { model | videoDetailTab = Details }

                _ ->
                    model
    in
    div
        [ class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        , class "max-w-7xl"
        ]
        [ -- a
          -- [ class "text-7xl text-left md:m-0"
          -- -- TODO: go to previous page
          -- , href "/animations"
          -- , attribute "aria-label" "Back"
          -- ]
          -- [ div [ class "mt-10" ] [ img [ class "h-20", src "https://ik.imagekit.io/catholicstories/Resources_Icons/leftarrow_emvaRz9A6.png?updatedAt=1693003148637" ] [] ]
          -- ]
          viewVideoPlayers newModel episode
        , viewVideoDetailTabs episodeCount newModel episode
        , case newModel.videoDetailTab of
            Episodes ->
                if episodeCount > 1 then
                    viewEpisodes production |> Html.map (\_ -> NoOp)

                else if not (String.isEmpty episode.activities.pdfLink) then
                    viewActivities episode |> Html.map (\_ -> NoOp)

                else
                    viewAbout episode |> Html.map (\_ -> NoOp)

            Activities ->
                viewActivities episode |> Html.map (\_ -> NoOp)

            Details ->
                viewAbout episode |> Html.map (\_ -> NoOp)

            Suggested ->
                viewSuggestedProductions production
                    |> Html.map (\_ -> NoOp)
        ]


viewSuggestedProductions : Production msg -> Html Msg
viewSuggestedProductions currentProduction =
    let
        -- Filter productions to exclude the current one
        suggestedProductions =
            productions
                |> List.filter (\p -> p.link /= currentProduction.link)
                |> List.take 5
    in
    viewAnimationThumbnailsSmall Nothing <| List.map productionToThumbnailData suggestedProductions


viewAbout : Episode msg -> Html msg
viewAbout episode =
    div [ class "mt-10 max-w-3xl text-white" ]
        [ episode.about
        ]


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
            , div [ class "flex" ]
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
                            , attribute "loading" "lazy"
                            , attribute "decoding" "async"
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
                                , attribute "loading" "lazy"
                                , attribute "decoding" "async"
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


viewVideoPlayers : Model -> Episode msg -> Html Msg
viewVideoPlayers model page =
    div
        []
        [ case model.videoTab of
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
        , div [ class "flex justify-end items-center gap-4 mt-2" ]
            [ viewVideoPlayerTabs model page
            , a
                [ class "bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                , href "https://www.zeffy.com/en-US/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e"
                , target "_blank"
                ]
                [ text "Donate" ]
            ]
        ]


viewVideoDetailTabs : Int -> Model -> Episode msg -> Html Msg
viewVideoDetailTabs episodeCount model episode =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
    in
    div
        [ class "text-xl font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ if episodeCount == 1 then
                span [] []

              else
                li [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if model.videoDetailTab == Episodes then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoDetailsTabClick Episodes episode.link)
                        ]
                        [ text "Episodes" ]
                    ]
            , if String.isEmpty episode.activities.thumbnailLink then
                span [] []

              else
                li [ class "mr-2" ]
                    [ button
                        [ class
                            ("inline-block p-4 border-b-2 rounded-t-lg "
                                ++ (if model.videoDetailTab == Activities then
                                        selectedClass

                                    else
                                        nonSelectedClass
                                   )
                            )
                        , onClick (VideoDetailsTabClick Activities episode.link)
                        ]
                        [ text "Activities" ]
                    ]
            , li [ class "mr-2" ]
                [ button
                    [ class
                        ("inline-block p-4 border-b-2 rounded-t-lg "
                            ++ (if model.videoDetailTab == Details then
                                    selectedClass

                                else
                                    nonSelectedClass
                               )
                        )
                    , onClick (VideoDetailsTabClick Details episode.link)
                    ]
                    [ text "Details" ]
                ]
            , li [ class "mr-2" ]
                [ button
                    [ class
                        ("inline-block p-4 border-b-2 rounded-t-lg "
                            ++ (if model.videoDetailTab == Suggested then
                                    selectedClass

                                else
                                    nonSelectedClass
                               )
                        )
                    , onClick (VideoDetailsTabClick Suggested episode.link)
                    ]
                    [ text "Suggested" ]
                ]
            ]
        ]


viewVideoPlayerTabs : Model -> Episode msg -> Html Msg
viewVideoPlayerTabs model page =
    let
        availableLanguages =
            [ ( English, page.videoLinks.english )
            , ( Spanish, page.videoLinks.spanish )
            , ( Urdu, page.videoLinks.urdu )
            , ( Asl, page.videoLinks.asl )
            ]
                |> List.filter (\( _, link ) -> not (String.isEmpty link))
    in
    if List.length availableLanguages <= 1 then
        span [] []

    else
        div [ class "text-lg text-end text-gray-500 dark:text-gray-400" ]
            [ select
                [ class "bg-transparent rounded-lg"
                , onInput (String.toLower >> toVideoOption >> VideoTabClick)
                ]
                (List.map
                    (\( language, _ ) ->
                        option
                            [ value (toString language)
                            , selected (model.videoTab == language)
                            ]
                            [ text (toLanguageName language) ]
                    )
                    availableLanguages
                )
            ]


toString : VideoOption -> String
toString option =
    case option of
        English ->
            "english"

        Spanish ->
            "spanish"

        Urdu ->
            "urdu"

        Asl ->
            "asl"


toVideoOption : String -> VideoOption
toVideoOption str =
    case str of
        "english" ->
            English

        "spanish" ->
            Spanish

        "urdu" ->
            Urdu

        "asl" ->
            Asl

        _ ->
            English


toLanguageName : VideoOption -> String
toLanguageName option =
    case option of
        English ->
            "English"

        Spanish ->
            "Spanish"

        Urdu ->
            "Urdu"

        Asl ->
            "ASL"


getTabFromUrl : Url.Url -> VideoDetailOption
getTabFromUrl url =
    case url.query of
        Just query ->
            if String.contains "tab=activities" query then
                Activities

            else if String.contains "tab=details" query then
                Details

            else if String.contains "tab=suggested" query then
                Suggested

            else
                Episodes

        Nothing ->
            Episodes


tabToString : VideoDetailOption -> String
tabToString tab =
    case tab of
        Episodes ->
            "episodes"

        Activities ->
            "activities"

        Details ->
            "details"

        Suggested ->
            "suggested"
