module Page.Home.Sections exposing
    ( Model
    , Msg(..)
    , init
    , update
    , viewMission
    , viewWhatPeopleSaying
    , viewCategories
    , viewStayConnected
    , viewSupportMission
    )

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Page.Animations.Helpers exposing (Production)
import Page.Animations.Productions as Productions
import Page.Animations.View exposing (viewEpisodes)
import Time
import Process
import Task


-- Local model for Home sections (testimonials carousel with animation state)
type alias Model =
    { testiIndex : Int
    , nextIndex : Maybe Int
    , animDir : Int -- 1 = next (left), -1 = prev (right)
    , animating : Bool
    }

init : Model
init =
    { testiIndex = 0
    , nextIndex = Nothing
    , animDir = 0
    , animating = False
    }

type Msg
    = NextTesti
    | PrevTesti
    | GoTesti Int
    | AnimationEnd


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
    in
    case msg of
        NextTesti ->
            if model.animating then
                ( model, Cmd.none )
            else
                startAnim (model.testiIndex + 1) 1

        PrevTesti ->
            if model.animating then
                ( model, Cmd.none )
            else
                startAnim (model.testiIndex - 1) -1

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
                    startAnim i dir

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

        idx =
            sectionsModel.testiIndex

        current =
            List.drop idx testimonials |> List.head |> Maybe.withDefault (List.head testimonials |> Maybe.withDefault { quote = "", author = "", subtitle = "", avatar = "?" })

        next =
            case sectionsModel.nextIndex of
                Just n ->
                    List.drop n testimonials |> List.head |> Maybe.withDefault current

                Nothing ->
                    current

        -- Build the sliding track children depending on direction
        trackChildren : List (Html Msg)
        trackChildren =
            if sectionsModel.animating then
                if sectionsModel.animDir == 1 then
                    [ div [ class "w-full shrink-0" ] [ card current ]
                    , div [ class "w-full shrink-0" ] [ card next ]
                    ]
                else
                    [ div [ class "w-full shrink-0" ] [ card next ]
                    , div [ class "w-full shrink-0" ] [ card current ]
                    ]
            else
                [ div [ class "w-full shrink-0" ] [ card current ] ]

        translateX : String
        translateX =
            if sectionsModel.animating then
                if sectionsModel.animDir == 1 then
                    "translateX(-100%)"
                else
                    "translateX(100%)"
            else
                "translateX(0)"

        dot : Int -> Html Msg
        dot i =
            let
                isActive =
                    case sectionsModel.nextIndex of
                        Just n ->
                            i == n

                        Nothing ->
                            i == idx

                active = if isActive then "bg-purple-500" else "bg-purple-500/40"
            in
            button
                [ class ("w-3 h-3 rounded-full " ++ active)
                , onClick (GoTesti i)
                ]
                []
    in
    div [ class "bg-gray-900 py-20 px-6 text-white relative overflow-hidden" ]
        [ h2 [ class "text-4xl md:text-5xl font-extrabold text-center" ] [ text "What Parents Are Saying" ]
        , stars
        , div [ class "max-w-5xl mx-auto mt-10" ]
            [ div [ class "flex items-center gap-4" ]
                [ button [ class "grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow", onClick PrevTesti ] [ span [ class "text-2xl" ] [ text "‹" ] ]
                , div [ class "relative flex-1 overflow-hidden" ]
                    [ div
                        [ class "flex w-full"
                        , style "transition" (if sectionsModel.animating then "transform 450ms ease" else "none")
                        , style "will-change" (if sectionsModel.animating then "transform" else "auto")
                        , style "transform" translateX
                        ]
                        trackChildren
                    ]
                , button [ class "grid place-content-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-purple-600 shadow", onClick NextTesti ] [ span [ class "text-2xl" ] [ text "›" ] ]
                ]
            , div [ class "flex items-center justify-center gap-2 mt-6" ] (List.map dot (List.range 0 (total - 1)))
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
            , a [ href "/give", class "border border-purple-700 text-purple-700 px-6 py-3 rounded-md font-semibold" ] [ text "Become a Monthly Supporter" ]
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


substackEmbedUrl : String
substackEmbedUrl =
    "https://blog.claritasstudios.com/embed"


viewStayConnected : Html msg
viewStayConnected =
    div [ class "bg-gradient-to-r from-purple-600 to-indigo-600 py-16 px-6 text-center text-white" ]
        [ h2 [ class "text-3xl md:text-4xl font-bold mb-2" ] [ text "Stay Connected" ]
        , p [ class "mb-8 text-lg max-w-3xl mx-auto" ]
            [ text "Get notified about new stories, activities, and special content for your family." ]
        , div [ class "max-w-3xl mx-auto" ]
            [ node "iframe"
                [ attribute "src" substackEmbedUrl
                , attribute "title" "Substack Signup"
                , attribute "frameborder" "0"
                , attribute "scrolling" "no"
                , attribute "loading" "lazy"
                , style "width" "100%"
                , style "height" "220px"
                , style "background" "transparent"
                , class "rounded"
                ]
                []
            ]
        ]
