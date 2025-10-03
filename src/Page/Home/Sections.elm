module Page.Home.Sections exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Animations.Helpers exposing (Production)
import Page.Animations.Productions as Productions


viewClaritasStudios : Html msg
viewClaritasStudios =
    div [ class "flex flex-col items-center justify-center text-center space-y-2 py-40 logo-section-bg", style "font-family" "Cinzel", style "color" "#ffbf00", style "text-shadow" "   0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700, 0 0 20px #FFAA00;" ]
        [ img
            [ src "/assets/images/home/ClaritasStudios-800.webp"
            , alt "Claritas Studios Logo"
            , class "mb-2"
            , width 400
            , attribute "srcset" "/assets/images/home/ClaritasStudios-400.webp 400w, /assets/images/home/ClaritasStudios-800.webp 800w, /assets/images/home/ClaritasStudios-1200.webp 1200w"
            , attribute "sizes" "(max-width: 720px) 80vw, 400px"
            , attribute "loading" "eager"
            , attribute "decoding" "async"
            , attribute "fetchpriority" "high"
            ]
            []
        , p
            [ class "uppercase tracking-wide text-base md:text-lg font-semibold drop-shadow-md" ]
            [ text "Animations from the heart" ]
        , p [ class "normal-case text-sm pt-5" ]
            [ text "*formerly Catholic Stories for Children" ]
        ]


viewMission : Html msg
viewMission =
    let
        missionFeature title description =
            div [ class "flex items-start space-x-4 mb-4" ]
                [ span [ class "text-2xl text-purple-500" ] [ text "•" ]
                , div []
                    [ h3 [ class "font-semibold text-lg" ] [ text title ]
                    , p [ class "text-sm opacity-80" ] [ text description ]
                    ]
                ]
    in
    div [ class "bg-gray-900 py-16 px-6 text-white" ]
        [ h2 [ class "text-3xl md:text-4xl font-bold mb-4" ] [ text "Our Mission" ]
        , p [ class "max-w-2xl text-lg mb-8" ] [ text "Claritas Studios is a nonprofit dedicated to bringing the beauty of Catholic faith to life through engaging animation and storytelling. We create high-quality content that helps children learn prayers, discover inspiring saints, and explore the richness of Catholic tradition." ]
        , missionFeature "Faith Formation" "Building strong spiritual foundations"
        , missionFeature "Educational Excellence" "Combining entertainment with learning"
        , missionFeature "Family-Centered" "Content that brings families together"
        , missionFeature "Artistic Innovation" "High-quality animation and storytelling"
        ]


viewSanctifyScreenTime : Html msg
viewSanctifyScreenTime =
    div
        [ class "relative flex items-center sanctify-screen-time-background" ]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "Sanctify Your Screen Time" ]
            , a [ href "/animations" ]
                [ h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                    [ text "OUR ANIMATED SHOWS" ]
                ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "Because of your generous support we offer a number of shows and shorts on our website or on YouTube. Sing along with the saints and angels, learn about the Church, and pray with your Catholic heroes." ]
            ]
        ]


viewTechnologyArtCollide : Html msg
viewTechnologyArtCollide =
    div
        [ class "relative flex items-center technology-art-collide-background" ]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "When Technology and Art Collide" ]
            , a [ href "/team" ]
                [ h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                    [ text "MEET OUR TEAM" ]
                ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "Claritas Studios (formerly Catholic Stories for Children) was started when a software engineer noticed his Catechism students didn’t know much about their faith and were always on their phones." ]
            ]
        ]


viewWhatPeopleSaying : Html msg
viewWhatPeopleSaying =
    let
        stars : Html msg
        stars =
            div [ class "flex text-yellow-400 mb-2" ]
                [ span [ class "text-2xl" ] [ text "★★★★★" ] ]

        testimonial : String -> String -> Html msg
        testimonial quote author =
            div [ class "border-l-4 border-indigo-500 pl-4 mb-8" ]
                [ stars
                , p [ class "text-gray-300 italic mb-2" ] [ text quote ]
                , p [ class "text-sm text-gray-500" ] [ text author ]
                ]
    in
    div [ class "bg-gray-800 py-16 px-6 text-white" ]
        [ h2 [ class "text-3xl md:text-4xl font-bold mb-6" ] [ text "What Parents Are Saying" ]
        , testimonial "\"Our children absolutely love these stories! They're beautifully animated and teach important lessons about our faith.\"" "- Maria T., Mother of 3"
        , testimonial "\"Finally, quality Catholic content we can trust! These stories have become part of our bedtime routine.\"" "- James R., Father of 2"
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
            let
                firstSeasonEpisodes =
                    production.seasons
                        |> List.head
                        |> Maybe.map .episodes
                        |> Maybe.withDefault []
            in
            div [ class "mb-16" ]
                [ h2 [ class "text-white text-2xl font-bold mb-4 px-4 md:px-12" ] [ text production.title ]
                , div [ class "relative group" ]
                    [ div
                        [ class "flex overflow-x-auto space-x-4 px-4 md:px-12 pb-4 scrollbar-hide"
                        , class "flex-none cursor-pointer"
                        , style "scroll-behavior" "smooth"
                        ]
                        (List.map
                            (\episode ->
                                div
                                    [ class "flex-none w-64 md:w-80 p-2"
                                    ]
                                    [ a [ href episode.link ]
                                        [ div 
                                            [ class "relative mb-2 rounded-lg transform scale-100 translate-z-0" 
                                            , class "transition-all duration-300 hover:scale-[1.02]"
                                            , class "hover:before:border-4 rounded-lg"
                                            , class "before:absolute before:inset-[-7px] before:rounded-lg hover:before:border hover:before:border-white"
                                            ]
                                            [ div [ class "aspect-video rounded-lg overflow-hidden" ]
                                                [ img
                                                    [ src episode.thumbnail
                                                    , alt episode.title
                                                    , class "w-full h-full object-cover"
                                                    ]
                                                    []
                                                ]
                                            ]
                                        ]
                                    , div [ class "px-1" ]
                                        [ h3 [ class "text-white font-semibold mb-1" ]
                                            [ text episode.title ]
                                        , div [ class "flex items-center text-gray-400 text-sm" ]
                                            [ span [ class "text-sm font-medium px-2 py-1 border border-gray-400 rounded" ] [ text production.age ]
                                            , span [ class "mx-2 text-xs opacity-50" ] [ text "•" ]
                                            , text production.year
                                            , span [ class "mx-2 text-xs opacity-50" ] [ text "•" ]
                                            , text production.duration
                                            ]
                                        ]
                                    ]
                            )
                            firstSeasonEpisodes
                        )
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
