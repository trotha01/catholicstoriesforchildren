module Home.Sections exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

viewLaritasStudios : Html msg
viewLaritasStudios =
    div [ class "flex flex-col items-center justify-center text-center space-y-2 py-20 logo-section-bg", style "font-family" "Cinzel", style "color" "#ffbf00", style "text-shadow" "   0 0 5px #FFD700, 0 0 10px #FFD700, 0 0 15px #FFD700, 0 0 20px #FFAA00;"]
            [ img
                [ src "/assets/images/home/ClaritasStudios.png"
                , alt "Claritas Studios Logo"
                , class "mb-2"
                , style "width" "400px"
                ]
                []
              , p
                  [ class "uppercase tracking-wide text-base md:text-lg font-semibold drop-shadow-md" ]
                  [ text "Illuminating the journey to sainthood" ]
              , p
                  [ class "uppercase tracking-wide text-base md:text-lg font-semibold drop-shadow-md" ]
                  [ text "through the art of animation." ]

            ]

viewMission : Html msg
viewMission =
    div
        [ class "relative flex items-center mission-background"]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "Let’s Become Saints Together" ]
            , h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                [ text "Our Mission" ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "We are a Catholic non-profit animation studio with the mission of inspiring people of all ages to become the saints they were destined to be." ]
            ]
        ]


viewSanctifyScreenTime : Html msg
viewSanctifyScreenTime =
    div
        [ class "relative flex items-center sanctify-screen-time-background"]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "Sanctify Your Screen Time" ]
            , h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                [ text "OUR ANIMATED SHOWS" ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "Because of your generous support we offer a number of shows and shorts on our website or on YouTube. Sing along with the saints and angels, learn about the Church, and pray with your Catholic heroes." ]
            ]
        ]


viewTechnologyArtCollide : Html msg
viewTechnologyArtCollide =
    div
        [ class "relative flex items-center technology-art-collide-background"]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "When Technology and Art Collide" ]
            , h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                [ text "MEET OUR TEAM" ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "Claritas Studios (formerly Catholic Stories for Children) was started when a software engineer noticed his Catechism students didn’t know much about their faith and were always on their phones. Hear the whole story." ]
            ]
        ]


viewWhatPeopleSaying : Html msg
viewWhatPeopleSaying =
    div
        [ class "relative flex items-center what-people-saying-background"]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "What People are Saying" ]
            , h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                [ text "PRESS & TESTIMONIALS" ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "These animated stories have already impacted the lives of thousands of Catholic families. See what God is doing through media." ]
            ]
        ]

viewSupportMission : Html msg
viewSupportMission =
    div
        [ class "relative flex items-center support-mission-background"]
        [ div [ class "text-white w-full px-20 sm:px-6 lg:px-8 py-20" ]
            [ h1 [ class "text-4xl md:text-5xl font-bold mb-2 tracking-tight text-left", style "font-family" "Lora" ]
                [ text "How to Support our Mission" ]
            , h2 [ class "text-xl md:text-2xl font-light uppercase tracking-widest mb-4 text-left border-b border-white inline-block pb-1" ]
                [ text "CONNECT & CONTRIBUTE" ]
            , p [ class "max-w-2xl text-lg md:text-xl leading-relaxed text-left mt-4" ]
                [ text "Animation takes a lot of time and resources. By supporting our non-profit, we can connect millions of future saints all over the world and bring the light of faith." ]
            ]
        ]