module Page.Home.Sections exposing
    ( Model
    , Msg(..)
    , init
    , update
    , viewCategories
    , viewMission
    , viewStayConnected
    , viewSupportMission
    , viewWhatPeopleSaying
    )

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Page.Animations.Helpers exposing (Production)
import Page.Animations.Productions as Productions
import Page.Animations.View exposing (viewEpisodes)
import Process
import Task



-- Local model for Home sections (testimonials carousel with animation state)


type alias Model =
    { testiIndex : Int
    , nextIndex : Maybe Int
    , animDir : Int -- 1 = next (left), -1 = prev (right)
    , animating : Bool
    , paused : Bool
    }


init : Model
init =
    { testiIndex = 0
    , nextIndex = Nothing
    , animDir = 0
    , animating = False
    , paused = False
    }


type Msg
    = NextAuto
    | NextArrow
    | PrevArrow
    | GoTesti Int
    | AnimationEnd
    | ResumeAutoplay


viewMission : Html msg
viewMission =
    let
        missionCard : String -> String -> String -> Html msg
        missionCard title description iconChar =
            div [ class "rounded-2xl bg-gray-800/40 border border-gray-700/60 shadow-sm p-6 md:p-8" ]
                [ div [ class "flex flex-col items-start text-left" ]
                    [ span [ class "w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 grid place-content-center text-2xl" ] [ text iconChar ]
                    , h3 [ class "mt-4 font-semibold text-lg md:text-xl text-white" ] [ text title ]
                    , p [ class "text-sm md:text-base text-gray-300 mt-2" ] [ text description ]
                    ]
                ]
    in
    div [ class "bg-gray-900 py-16 px-6 text-white text-center flex flex-col items-center" ]
        [ h2 [ class "text-3xl md:text-4xl font-bold mb-2" ] [ text "Our Mission" ]
        , p [ class "max-w-2xl text-lg mx-auto text-center opacity-90" ]
            [ text "Claritas Studios is a 501(c)(3) nonprofit with the mission to engage future saints with the Catholic faith through stories that inspire, educate, and foster an understanding of the beauty and joy of God's love." ]
        , div [ class "max-w-5xl w-full mx-auto mt-8 space-y-6" ]
            [ missionCard "Faith Formation" "Building strong spiritual foundations through engaging content that brings the Catholic faith to life for young hearts." "❤"
            , missionCard "Educational Excellence" "Combining entertainment with learning to create memorable experiences that teach and inspire." "📘"
            , missionCard "Family-Centered" "Content that brings families together, creating shared moments of faith and joy." "👨\u{200D}👩\u{200D}👧"
            , missionCard "Artistic Innovation" "High-quality animation and storytelling that captures imagination and hearts." "✨"
            ]
        ]


type alias Testimonial =
    { quote : String
    , author : String
    , subtitle : String
    , avatar : String
    }


testimonials : List Testimonial
testimonials =
    [ { quote = "I love how there is a story, animation, and even music to learning prayers. We know that children often, if not always, learn first through their experiences and senses. The incorporation of such animation then will definitely help our children learn these prayers more easily."
      , author = "Cam"
      , subtitle = "Mother of 2 & Social Worker"
      , avatar = "C"
      }
    , { quote = "My children have been focusing on a consecration to their Guardian Angels this summer, and your Guardian Angel series has been a hit this week!"
      , author = "Catherine"
      , subtitle = "Homeschool Mom"
      , avatar = "C"
      }
    , { quote = "My children love these videos! They enjoy watching, rewatching, and seeing their favorite characters. Even though my kids know the prayers, the way the stories are put together give them new chances for when they can pray and how the faith is part of their little lives. Can’t wait for more!"
      , author = "Anonymous Parent"
      , subtitle = "Parent"
      , avatar = "A"
      }
    , { quote = "My five year old daughter came running as soon I started playing these videos. She loved every minute of it (she has a huge devotion to Mary) and she even turned the laptop so that it would completely face her as she watched."
      , author = "Anonymous Mother & Educator"
      , subtitle = "Educator"
      , avatar = "A"
      }
    ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        maxIdx =
            List.length testimonials - 1

        wrap n =
            if n < 0 then
                maxIdx

            else if n > maxIdx then
                0

            else
                n

        startAnim toIdx dir =
            ( { model
                | nextIndex = Just (wrap toIdx)
                , animDir = dir
                , animating = True
              }
            , Task.perform (\_ -> AnimationEnd) (Process.sleep 450)
            )

        resumeAfterPause : Cmd Msg
        resumeAfterPause =
            Task.perform (\_ -> ResumeAutoplay) (Process.sleep 60000)
    in
    case msg of
        NextAuto ->
            if model.animating || model.paused then
                ( model, Cmd.none )

            else
                startAnim (model.testiIndex + 1) 1

        NextArrow ->
            if model.animating then
                ( model, Cmd.none )

            else
                let
                    ( m1, c1 ) =
                        startAnim (model.testiIndex + 1) 1
                in
                ( { m1 | paused = True }, Cmd.batch [ c1, resumeAfterPause ] )

        PrevArrow ->
            if model.animating then
                ( model, Cmd.none )

            else
                let
                    ( m1, c1 ) =
                        startAnim (model.testiIndex - 1) -1
                in
                ( { m1 | paused = True }, Cmd.batch [ c1, resumeAfterPause ] )

        GoTesti i ->
            if model.animating then
                ( model, Cmd.none )

            else
                let
                    dir =
                        if i == model.testiIndex then
                            0

                        else if i > model.testiIndex then
                            1

                        else
                            -1
                in
                if dir == 0 then
                    ( model, Cmd.none )

                else
                    let
                        ( m1, c1 ) =
                            startAnim i dir
                    in
                    ( { m1 | paused = True }, Cmd.batch [ c1, resumeAfterPause ] )

        AnimationEnd ->
            case model.nextIndex of
                Just toIdx ->
                    ( { model
                        | testiIndex = toIdx
                        , nextIndex = Nothing
                        , animDir = 0
                        , animating = False
                      }
                    , Cmd.none
                    )

                Nothing ->
                    ( { model | animating = False, animDir = 0 }, Cmd.none )

        ResumeAutoplay ->
            ( { model | paused = False }, Cmd.none )


viewWhatPeopleSaying : Model -> Html Msg
viewWhatPeopleSaying sectionsModel =
    let
        stars : Html msg
        stars =
            div [ class "text-yellow-400 text-2xl mt-2 text-center" ] [ text "★★★★★" ]

        card : Testimonial -> Html msg
        card t =
            div [ class "rounded-2xl bg-gray-800/40 border border-gray-700/60 shadow-sm p-8 md:p-10" ]
                [ p [ class "text-gray-100 italic text-xl md:text-2xl leading-relaxed" ] [ text t.quote ]
                , div [ class "flex items-center gap-3 mt-8" ]
                    [ span [ class "w-12 h-12 rounded-full bg-purple-600 text-white grid place-content-center font-bold" ] [ text t.avatar ]
                    , div []
                        [ p [ class "text-white font-semibold" ] [ text t.author ]
                        , p [ class "text-gray-400 text-sm" ] [ text t.subtitle ]
                        ]
                    ]
                ]

        total =
            List.length testimonials

        last =
            total - 1

        idx =
            sectionsModel.testiIndex

        prev : Testimonial
        prev =
            let
                i =
                    if idx - 1 < 0 then
                        total - 1

                    else
                        idx - 1
            in
            List.drop i testimonials |> List.head |> Maybe.withDefault current

        current : Testimonial
        current =
            List.drop idx testimonials |> List.head |> Maybe.withDefault (List.head testimonials |> Maybe.withDefault { quote = "", author = "", subtitle = "", avatar = "?" })

        next : Testimonial
        next =
            let
                i =
                    if idx + 1 > total - 1 then
                        0

                    else
                        idx + 1
            in
            List.drop i testimonials |> List.head |> Maybe.withDefault current

        nextForAnim : Testimonial
        nextForAnim =
            case sectionsModel.nextIndex of
                Just n ->
                    List.drop n testimonials |> List.head |> Maybe.withDefault next

                Nothing ->
                    next

        -- Add isWrapForward and isWrapBackward
        isWrapForward : Bool
        isWrapForward =
            sectionsModel.animating
                && sectionsModel.animDir
                == 1
                && idx
                == last
                && sectionsModel.nextIndex
                == Just 0

        isWrapBackward : Bool
        isWrapBackward =
            sectionsModel.animating
                && sectionsModel.animDir
                == -1
                && idx
                == 0
                && sectionsModel.nextIndex
                == Just last

        trackChildren : List (Html Msg)
        trackChildren =
            [ div [ class "w-full shrink-0" ] [ card prev ]
            , div [ class "w-full shrink-0" ] [ card current ]
            , div [ class "w-full shrink-0" ]
                [ card
                    (if sectionsModel.animating && sectionsModel.animDir == 1 then
                        nextForAnim

                     else
                        next
                    )
                ]
            ]

        translateX : String
        translateX =
            if sectionsModel.animating then
                if sectionsModel.animDir == 1 then
                    "translateX(-200%)"

                else
                    "translateX(0)"

            else
                "translateX(-100%)"

        dot : Int -> Html Msg
        dot i =
            let
                isActive =
                    case sectionsModel.nextIndex of
                        Just n ->
                            i == n

                        Nothing ->
                            i == idx

                pulseThisDot =
                    case sectionsModel.nextIndex of
                        Just n ->
                            (isWrapForward || isWrapBackward) && (i == n)

                        Nothing ->
                            False

                base =
                    if isActive then
                        "bg-purple-500"

                    else
                        "bg-purple-500/40"

                pulse =
                    if pulseThisDot then
                        " ring-2 ring-purple-300 animate-pulse"

                    else
                        ""
            in
            button
                [ class "w-12 h-12 flex items-center justify-center" -- 48x48 tap target
                , attribute "aria-label" ("Go to testimonial " ++ String.fromInt (i + 1))
                , attribute "aria-current"
                    (if isActive then
                        "true"

                     else
                        "false"
                    )
                , type_ "button"
                , onClick (GoTesti i)
                ]
                [ span [ class ("w-3 h-3 rounded-full " ++ base ++ pulse) ] [] ]
    in
    div [ class "bg-gray-900 py-20 px-6 text-white relative overflow-hidden" ]
        [ h2 [ class "text-4xl md:text-5xl font-extrabold text-center" ] [ text "What Parents Are Saying" ]
        , stars
        , div [ class "relative max-w-5xl mx-auto mt-10" ]
            [ -- arrows (fixed vertical center, independent of card height)
              button
                [ class "absolute z-10 grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow top-1/2 -translate-y-1/2 left-0"
                , attribute "aria-label" "Previous testimonial"
                , type_ "button"
                , onClick PrevArrow
                ]
                [ span [ class "text-2xl" ] [ text "‹" ] ]
            , button
                [ class "absolute z-10 grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow top-1/2 -translate-y-1/2 right-0"
                , attribute "aria-label" "Next testimonial"
                , type_ "button"
                , onClick NextArrow
                ]
                [ span [ class "text-2xl" ] [ text "›" ] ]
            , div [ class "mx-24" ]
                [ -- fixed-height viewport so arrows don't move with varying content height
                  div [ class "relative overflow-hidden h-80 md:h-96" ]
                    [ div
                        [ class "flex w-full h-full"
                        , style "transition"
                            (if sectionsModel.animating then
                                if isWrapForward || isWrapBackward then
                                    "transform 350ms ease"

                                else
                                    "transform 450ms ease"

                             else
                                "none"
                            )
                        , style "will-change"
                            (if sectionsModel.animating then
                                "transform"

                             else
                                "auto"
                            )
                        , style "transform" translateX
                        ]
                        trackChildren
                    ]
                ]
            , div [ class "flex items-center justify-center gap-1 mt-6" ] (List.map dot (List.range 0 (total - 1)))
            ]
        ]


viewSupportMission : Html msg
viewSupportMission =
    div [ class "bg-black py-20 px-6 text-center text-white" ]
        [ span [ class "text-4xl mb-4 block text-purple-500" ] [ text "❤" ]
        , h2 [ class "text-3xl md:text-4xl font-bold mb-4" ] [ text "Support Our Mission" ]
        , p [ class "max-w-3xl mx-auto text-lg mb-8" ] [ text "As a nonprofit, we rely on the generosity of families like yours to continue creating beautiful Catholic content. Your support helps us produce more stories and reach more children." ]
        , div [ class "flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4" ]
            [ a [ href "/give", class "bg-purple-700 text-white px-6 py-3 rounded-md font-semibold" ] [ text "Make a Donation" ]
            , a [ href "/give", class "border border-purple-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400/70" ] [ text "Become a Monthly Supporter" ]
            ]
        ]


viewCategories : Html msg
viewCategories =
    let
        viewCategoryRow : Production msg -> Html msg
        viewCategoryRow production =
            div
                [ class "mb-16 ml-4"
                , class "relative"
                ]
                [ h2 [ class "text-white text-2xl font-bold mb-4 pl-5" ] [ text production.title ]
                , div [ class "mb-16 relative pb-4" ]
                    [ viewEpisodes production
                    ]
                ]
    in
    div [ class "bg-black py-16" ] (List.map viewCategoryRow Productions.productions)



-- Page.Home.Sections.elm


substackEmbedUrl : String
substackEmbedUrl =
    "https://blog.claritasstudios.com/embed"


viewStayConnected : Html msg
viewStayConnected =
    div [ class "bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6 text-center text-white" ]
        [ h2 [ class "text-3xl md:text-4xl font-bold mb-2" ] [ text "Stay Connected" ]
        , p [ class "mb-6 text-lg max-w-3xl mx-auto" ]
            [ text "Get notified about new stories, activities, and special content for your family." ]
        , div [ class "max-w-3xl mx-auto" ]
            [ -- Placeholder reserves space to avoid CLS and holds the data-src
              div
                [ attribute "data-substack-src" substackEmbedUrl
                , attribute "data-height" "220"
                , class "rounded bg-transparent"
                , style "width" "100%"
                , style "height" "220px"
                ]
                []
            , p [ id "substack-fallback-link", class "mt-3" ]
                [ a
                    [ href substackEmbedUrl
                    , target "_blank"
                    , rel "noopener noreferrer"
                    , class "underline"
                    , attribute "aria-label" "Subscribe on Substack"
                    ]
                    [ text "Subscribe on Substack" ]
                ]
            ]
        ]
