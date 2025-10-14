module Page.FeastDayActivities.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Component.Footer exposing (viewFooter)
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.FeastDayActivities.FeastDayHelpers exposing (..)
import Page.FeastDayActivities.FeastDays exposing (..)
import Page.FeastDayActivities.FeastDays.M01Jan exposing (january)
import Page.FeastDayActivities.FeastDays.M02Feb exposing (february)
import Page.FeastDayActivities.FeastDays.M03Mar exposing (march)
import Page.FeastDayActivities.FeastDays.M04Apr exposing (april)
import Page.FeastDayActivities.FeastDays.M05May exposing (may)
import Page.FeastDayActivities.FeastDays.M06Jun exposing (june)
import Page.FeastDayActivities.FeastDays.M07Jul exposing (july)
import Page.FeastDayActivities.FeastDays.M08Aug exposing (august)
import Page.FeastDayActivities.FeastDays.M09Sep exposing (september)
import Page.FeastDayActivities.FeastDays.M10Oct exposing (october)
import Page.FeastDayActivities.FeastDays.M11Nov exposing (november)
import Page.FeastDayActivities.FeastDays.M12Dec exposing (december)
import Page.Home.Sections exposing (viewStayConnected)
import Page.Saints.SaintHelpers exposing (activitiesFromSaint)
import Page.Saints.SaintList as SaintList
import Page.Signup as Signup
import Regex
import Task
import Time exposing (Month(..))
import Url


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
    = NewTime Time.Posix
    | NewZone Time.Zone
    | SaintListMsg SaintList.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
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



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        currentRoute =
            parseRoute model.url
    in
    { title = "Feast Day Activities - Claritas Studios"
    , body =
        [ div
            [ class "bg-black text-white"
            , id "body"
            ]
            [ viewBody model currentRoute
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
    let
        capMonth =
            capitalizeFirst month

        ( nextMonth, nextDay ) =
            nextDate "2025" month date

        ( prevMonth, prevDay ) =
            previousDate "2025" month date

        nextDateLink =
            createFeastDayLink nextMonth nextDay

        prevDateLink =
            createFeastDayLink prevMonth prevDay

        concatFeasts =
            String.join " and " (List.map .feast feasts)
    in
    div []
        [ -- Top navigation row (prev / back to month / next)
          div [ class "max-w-5xl mx-auto px-4 mt-6" ]
            [ div [ class "grid grid-cols-3 gap-6 items-center" ]
                [ a
                    [ href prevDateLink
                    , attribute "aria-label" "Previous"
                    , class "rounded-lg bg-gray-800/60 hover:bg-gray-800 p-4 md:p-6 shadow-md flex flex-col items-center justify-center gap-1 md:gap-4 text-center"
                    ]
                    [ img [ class "hidden md:block h-10", src "https://ik.imagekit.io/catholicstories/Resources_Icons/leftarrow_emvaRz9A6.png?updatedAt=1693003148637" ] []
                    , div []
                        [ div [ class "text-sm md:text-base font-semibold text-white leading-tight" ] [ text "Previous Day" ]
                        , div [ class "text-xs md:text-sm text-gray-400 mt-0" ] [ text (capitalizeFirst prevMonth ++ " " ++ prevDay) ]
                        ]
                    ]
                , a
                    [ href (urlPath ++ "?m=" ++ month)
                    , attribute "aria-label" ("Back to " ++ capMonth)
                    , class "rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 p-4 md:p-6 shadow-lg inline-flex flex-col items-center justify-center text-center"
                    ]
                    [ img [ class "hidden md:inline-block h-8 mb-2", src "https://ik.imagekit.io/catholicstories/Resources_Icons/calendar1_-zIHisgP2.png?updatedAt=1685581675420" ] []
                    , div [ class "text-white font-semibold text-sm md:text-lg leading-tight" ] [ text ("Back to " ++ capMonth) ]
                    ]
                , a
                    [ href nextDateLink
                    , attribute "aria-label" "Next"
                    , class "rounded-lg bg-gray-800/60 hover:bg-gray-800 p-4 md:p-6 shadow-md flex flex-col items-center justify-center gap-1 md:gap-4 text-center"
                    ]
                    [ img [ class "hidden md:block h-10", src "https://ik.imagekit.io/catholicstories/Resources_Icons/rightarrow_rccpkUlIk.png?updatedAt=1693003148251" ] []
                    , div []
                        [ div [ class "text-sm md:text-base font-semibold text-white leading-tight" ] [ text "Next Day" ]
                        , div [ class "text-xs md:text-sm text-gray-400 mt-0" ] [ text (capitalizeFirst nextMonth ++ " " ++ nextDay) ]
                        ]
                    ]
                ]
            ]
        , -- Main dark rounded header card
          div
            [ id "calendar-content"
            , class "mt-8 max-w-5xl mx-auto rounded-2xl bg-gray-900 text-white p-10 shadow-lg"
            ]
            [ -- p [ class "text-sm text-gray-400 mb-4" ] [ text breadcrumb ]
              h1 [ class "text-5xl md:text-6xl font-extrabold mb-4" ] [ text "Feast Day Activities" ]
            , h3 [ class "text-2xl text-gray-300 mb-4" ]
                [ text
                    ("Feast of "
                        ++ (if concatFeasts == "" then
                                ""

                            else
                                concatFeasts
                           )
                    )
                ]
            , span [ class "inline-block bg-purple-900/70 text-white rounded-full px-4 py-2 text-sm mb-6" ] [ text (capMonth ++ " " ++ date ++ ", 2025") ]
            ]
        , -- Content below header (signup + activities)
          div [ class "mt-10 mb-40" ]
            [ -- Signup card (rounded dark card like the header)
              div [ class "max-w-5xl mx-auto rounded-2xl text-white shadow-lg mb-10 overflow-hidden" ]
                [ viewStayConnected ]
            , -- Feast activities card (rounded dark card like the header)
              div [ class "max-w-5xl mx-auto rounded-2xl bg-gray-900 text-white p-10 shadow-lg" ]
                [ h2 [ class "text-3xl font-extrabold mb-4" ] [ text "Suggested Activities" ]
                , div [ class "max-w-3xl mx-auto" ]
                    [ viewFeastActivities model feasts
                    , div [ class "mt-10" ] [ viewWeekdayActivities ]
                    ]
                ]
            ]
        ]


viewWeekdayActivities : Html msg
viewWeekdayActivities =
    div [ class "text-left py-5" ]
        [ h3 [ class "font-semibold" ] [ text "Common Daily Prayers" ]
        , p [ class "mt-4" ] [ text "It is good to be able to center yourself on God throughout the years, months, and days. We have suggestions here to help order the hours of the day toward God. They are based on the Liturgy of the Hours. The suggestions here can be modified for you and your family. Especially with young kids that need to sleep in or go to bed early." ]
        , div [ class "mt-4 grid grid-cols-[50px,_1fr]" ]
            [ div [] [ text "6am" ]
            , div []
                [ a [ href "/prayer/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
                , span [] [ text ". " ]
                , a [ href "https://www.usccb.org/prayers/morning-offering", class "underline", target "_blank" ] [ text "Morning Offering" ]
                , span [] [ text ". " ]
                , a [ href "/animations/prayertimewithangels/1/guardianangelprayer", class "underline", target "_blank" ] [ text "Guardian Angel Prayer" ]
                , span [] [ text ". " ]
                , a [ href "https://visitationproject.org/pages/the-three-hail-marys", class "underline", target "_blank" ] [ text "Three Hail Marys devotion" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "12pm" ]
            , div []
                [ a [ href "/prayer/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "3pm" ]
            , div []
                [ a [ href "https://www.thedivinemercy.org/message/devotions/pray-the-chaplet", class "underline", target "_blank" ] [ text "Divine Mercy Chaplet" ]
                , span [] [ text ". " ]
                ]
            , div [] [ text "6pm" ]
            , div []
                [ a [ href "/prayer/angelus", class "underline", target "_blank" ] [ text "Angelus" ]
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


viewFeast : FeastActivities -> Html Msg
viewFeast feastActivities =
    div [] [ text feastActivities.feast ]


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
        addUniqueActivity : ( String, Activity ) -> List ( String, Activity ) -> List ( String, Activity )
        addUniqueActivity ( saintName, record ) uniqueRecords =
            if List.any (\( _, r ) -> r.link == record.link) uniqueRecords then
                List.map
                    (\( s, r ) ->
                        -- TODO: sub saint name, with saint name and new saint name
                        if r.link == record.link then
                            ( s
                            , { activityType = r.activityType
                              , title = String.replace s (s ++ " and " ++ saintName) r.title
                              , image = r.image
                              , link = r.link
                              , snippet = String.replace s (s ++ " and " ++ saintName) r.snippet
                              }
                            )

                        else
                            ( s, r )
                    )
                    uniqueRecords

            else
                ( saintName, record ) :: uniqueRecords

        removeDuplicates : List ( String, Activity ) -> List ( String, Activity )
        removeDuplicates records =
            List.foldl addUniqueActivity [] records

        saintActivities =
            model.saintList.saints
                |> List.filter (\saint -> List.member (String.toLower saint.name) cleanedFeastNames)
                |> List.concatMap activitiesFromSaint
                |> removeDuplicates
                |> List.map (\( _, activity ) -> activity)

        activities =
            List.append feastActivities saintActivities
    in
    div []
        [ viewAllActivities model.saintList.isLoading activities

        -- , div [ class "mt-20 rounded" ]
        --     [ iframe
        --         [ src "https://docs.google.com/forms/d/e/1FAIpQLSfBQ4oZgDKyYjH1UfaX1qFLW7UFprnO6OKZ5_X6pYoPkfi2fQ/viewform?embedded=true"
        --         , width 640
        --         , height 920
        --         , attribute "frameborder" "0"
        --         , attribute "marginheight" "0"
        --         , attribute "marginwidth" "0"
        --         ]
        --         []
        -- ]
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
    div []
        [ div
            [ class "mt-10 max-w-3xl mx-auto" ]
            [ div [ class "px-11" ]
                [ if feastMonth.month == "December" then
                    h1 [] [ text "2025 Feast Day Activities" ]

                  else
                    h1 [] [ text "2025 Feast Day Activities" ]
                , p [ class "mt-5 mb-10" ] [ text "Click on each day to see suggested feast day activitity ideas that you can use with your children to celebrate." ]
                , p [ class "mt-5 mb-10" ] [ text "You can find videos, crafts, printables, games, reading, recipes and more! There are many ways you can find here to help your kids with liturgical living." ]
                ]
            ]

        -- , div [ class "mt-2 mb-20" ]
        --     [ Signup.view4 |> Html.map SignupMsg ]
        , div
            [ class "max-w-5xl mx-auto" ]
            [ div [ class "flex items-center justify-center gap-3 mb-8" ]
                [ div
                    [ class "flex gap-2 bg-white rounded-2xl p-2 shadow-lg border mb-6 items-center"
                    , class "overflow-x-scroll"
                    ]
                    (List.map (viewMonthPillBox feastMonth.month) months)
                ]
            , div
                [ class "relative left-1/2 -translate-x-1/2"
                , style "position" "relative"
                , style "font-size" "20px"
                , class "mt-3 mb-12"
                ]
                [ viewFeastMonthHeader feastMonth.color feastMonth.month
                , div
                    [ class "grid gap-3 grid-cols-2 mx-auto px-8"
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
        , style "height" "2.5em"
        ]
        [ text month
        ]


viewFeastDays : String -> List FeastDay -> Html Msg
viewFeastDays month list =
    div
        [ class "grid gap-3 grid-cols-1"
        ]
        (List.map (viewFeastDay month) list)


createFeastDayLink : String -> String -> String
createFeastDayLink month date =
    let
        paddedDate =
            String.padLeft 2 '0' date
    in
    urlPath ++ "?m=" ++ month ++ "&d=" ++ paddedDate


viewFeastDay : String -> FeastDay -> Html Msg
viewFeastDay month feastDay =
    let
        link =
            createFeastDayLink month feastDay.date
    in
    div
        [ class "rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 hover:border-purple-300 cursor-pointer bg-white"
        ]
        [ a
            [ style "color" "black"
            , class "flex flex-col space-y-1.5 p-6 pb-2 pt-3 px-3"
            , href link
            , attribute "aria-label" (month ++ " " ++ feastDay.date)
            ]
            [ div
                [ class "flex items-start gap-2"
                ]
                [ div [ class "inline-flex items-center rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-sm font-bold px-2 py-0.5 bg-purple-50 text-purple-700 border-purple-200 shrink-0" ]
                    [ text feastDay.date ]
                ]
            , div
                [ class "font-semibold tracking-tight text-sm leading-tight text-gray-800 hover:text-purple-700 transition-colors"
                ]
                (List.map viewFeast feastDay.feasts)
            ]
        ]


viewMonthPillBox : String -> String -> Html msg
viewMonthPillBox currentMonth month =
    -- TODO: use nav html elements?
    a
        [ -- class "col-span-1"
          class
            (if String.contains month (String.toLower currentMonth) then
                --   "bg-csc-darkblue text-white"
                "bg-primary hover:bg-primary/90  bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"

             else
                "hover:bg-purple-50 text-gray-700"
            )
        , class "h-10 px-4 py-2 rounded-xl font-semibold transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"

        -- , class "hover:bg-csc-lightblue hover:text-black"
        -- , class "rounded"
        -- , class "p-2"
        -- , class "cursor-pointer"
        -- , class "capitalize"
        , class "transition hover:scale-105"
        , class "capitalize"
        , attribute "aria-label" month
        , href (urlPath ++ "?m=" ++ month)
        ]
        [ text month ]


urlPath : String
urlPath =
    "/feastdayactivities"


capitalizeFirst : String -> String
capitalizeFirst s =
    case String.uncons s of
        Nothing ->
            ""

        Just ( firstChar, rest ) ->
            String.toUpper (String.fromChar firstChar) ++ rest


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



-- div
--     [ class "mt-20 mb-5" ]
--     [ p
--         [ class "pb-2 pl-1 text-left"
--         ]
--         -- [ text "Having trouble with kids in Mass? Get our guide!" ]
--         [ text "Get free Catholic animations, printables, and more Catholic activities!" ]
--     , Html.iframe
--         [ src "https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"
--         , height 52
--         , attribute "frameborder" "0"
--         , attribute "scrolling" "no"
--         , style "margin" "0"
--         , style "border-radius" "0px !important"
--         , style "background-color" "transparent"
--         ]
--         []
--     ]
