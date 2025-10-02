module Page.Home.Sections exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


viewHeroSection : Html msg
viewHeroSection =
    section
        [ class "home-hero relative isolate overflow-hidden" ]
        [ div [ class "absolute inset-0 -z-10 home-hero-backdrop" ] []
        , div
            [ class "mx-auto flex max-w-6xl flex-col gap-16 px-6 py-24 lg:flex-row lg:items-center lg:py-32"
            ]
            [ div [ class "max-w-2xl" ]
                [ div [ class "inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-amber-700 shadow-sm ring-1 ring-amber-200 backdrop-blur" ]
                    [ text "Claritas Studios" ]
                , h1 [ class "mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl" ]
                    [ text "Stories that form hearts in the light of Christ" ]
                , p [ class "mt-6 text-lg leading-relaxed text-slate-700 sm:text-xl" ]
                    [ text "We craft hand-drawn Catholic animations that help families pray, learn, and fall in love with the lives of the saints." ]
                , div [ class "mt-10 flex flex-wrap gap-4" ]
                    [ a
                        [ href "/animations"
                        , class "inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-600"
                        ]
                        [ text "Watch the stories" ]
                    , a
                        [ href "/give"
                        , class "inline-flex items-center justify-center rounded-full bg-white/80 px-6 py-3 text-base font-semibold text-amber-700 ring-2 ring-amber-500/60 transition hover:bg-amber-500/10"
                        ]
                        [ text "Support the mission" ]
                    ]
                ]
            , div [ class "lg:flex-1" ]
                [ div [ class "home-hero-card mx-auto max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-xl shadow-amber-900/10 backdrop-blur" ]
                    [ div [ class "relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100/60 via-white to-sky-100/70" ]
                        [ div [ class "absolute inset-0 home-hero-illustration" ] []
                        , img
                            [ src "/assets/images/home/ClaritasStudios-800.webp"
                            , alt "Claritas Studios crest"
                            , class "absolute inset-x-10 bottom-6 mx-auto w-3/4 max-w-xs drop-shadow-lg"
                            , attribute "srcset" "/assets/images/home/ClaritasStudios-400.webp 400w, /assets/images/home/ClaritasStudios-800.webp 800w, /assets/images/home/ClaritasStudios-1200.webp 1200w"
                            , attribute "sizes" "(max-width: 1024px) 70vw, 320px"
                            ]
                            []
                        ]
                    , div [ class "mt-6 space-y-2 text-center" ]
                        [ p [ class "text-sm font-semibold uppercase tracking-widest text-amber-600" ] [ text "Forming future saints" ]
                        , p [ class "text-base text-slate-600" ] [ text "Non-profit animation studio bringing the Gospel to families everywhere." ]
                        ]
                    ]
                ]
            ]
        ]


viewMissionPillars : Html msg
viewMissionPillars =
    section [ class "bg-white/70 py-24" ]
        [ div [ class "mx-auto max-w-6xl px-6" ]
            [ div [ class "max-w-3xl" ]
                [ h2 [ class "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" ]
                    [ text "Rooted in beauty, truth, and goodness" ]
                , p [ class "mt-4 text-lg leading-relaxed text-slate-600" ]
                    [ text "Every frame is prayerfully crafted to invite children and parents into the mysteries of the faith." ]
                ]
            , div [ class "mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" ]
                (List.map missionCard missionHighlights)
            ]
        ]


viewFeaturedStories : Html msg
viewFeaturedStories =
    section [ class "relative overflow-hidden py-24" ]
        [ div [ class "absolute inset-0 -z-10 bg-gradient-to-br from-sky-100/80 via-white to-amber-100/70" ] []
        , div [ class "mx-auto max-w-6xl px-6" ]
            [ div [ class "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" ]
                [ div [ class "max-w-2xl" ]
                    [ h2 [ class "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" ]
                        [ text "Animated series that invite your family into the story" ]
                    , p [ class "mt-4 text-lg leading-relaxed text-slate-600" ]
                        [ text "Discover original series, music videos, and prayer companions designed to help little ones encounter Jesus and His friends." ]
                    ]
                , a [ href "/animations", class "text-base font-semibold text-amber-600 transition hover:text-amber-700" ]
                    [ text "Explore all shows →" ]
                ]
            , div [ class "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3" ]
                (List.map storyCard featuredStories)
            ]
        ]


viewStudioApproach : Html msg
viewStudioApproach =
    section [ class "py-24" ]
        [ div [ class "mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center" ]
            [ div [ class "lg:flex-1" ]
                [ div [ class "home-approach-panel relative overflow-hidden rounded-3xl border border-amber-200/70 bg-amber-50/60 p-10 text-slate-900 shadow-lg shadow-amber-900/10" ]
                    [ div [ class "text-sm font-semibold uppercase tracking-[0.3em] text-amber-500" ] [ text "Our Process" ]
                    , h3 [ class "mt-4 text-3xl font-semibold tracking-tight" ] [ text "Technology & tradition working together" ]
                    , p [ class "mt-6 text-lg leading-relaxed text-slate-700" ]
                        [ text "From concept to color, our artists, theologians, and musicians collaborate to ensure each story is both captivating and faithful to Church teaching." ]
                    , ul [ class "mt-8 space-y-4 text-base text-slate-600" ]
                        (List.map
                            (\( title, description ) ->
                                li []
                                    [ div [ class "text-base font-semibold text-slate-800" ] [ text title ]
                                    , div [ class "mt-1 text-sm text-slate-600" ] [ text description ]
                                    ]
                            )
                            [ ( "Immersive storytelling", "Scriptural and historical research guides every scene." )
                            , ( "Thoughtful design", "Warm palettes and gentle motion support a prayerful pace." )
                            , ( "Global reach", "Translations and resources bring the Gospel to families worldwide." )
                            ]
                        )
                    ]
                ]
            , div [ class "lg:flex-1" ]
                [ div [ class "space-y-6" ]
                    [ div [ class "rounded-3xl bg-white/70 p-8 shadow-lg ring-1 ring-slate-200/60" ]
                        [ h4 [ class "text-xl font-semibold text-slate-900" ] [ text "A mission for the whole Church" ]
                        , p [ class "mt-3 text-base leading-relaxed text-slate-600" ]
                            [ text "Claritas Studios operates as a 501(c)(3) non-profit. Your generosity helps us keep every episode freely accessible so that any family can pray along." ]
                        ]
                    , div [ class "rounded-3xl bg-gradient-to-br from-amber-500 via-amber-400 to-rose-400 p-[1px] shadow-xl shadow-amber-900/20" ]
                        [ div [ class "rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/95 p-8 text-slate-900" ]
                            [ h4 [ class "text-xl font-semibold" ] [ text "Our impact" ]
                            , div [ class "mt-6 grid gap-6 sm:grid-cols-3" ]
                                [ impactStat "40+" "Episodes and shorts released"
                                , impactStat "25k" "Families praying with us each month"
                                , impactStat "12" "Languages and counting"
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]


viewTestimonialSpotlight : Html msg
viewTestimonialSpotlight =
    section [ class "relative overflow-hidden py-24" ]
        [ div [ class "absolute inset-0 -z-10 home-testimonial-backdrop" ] []
        , div [ class "mx-auto max-w-5xl px-6 text-center" ]
            [ div [ class "inline-flex items-center rounded-full bg-white/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.3em] text-sky-700 shadow-sm ring-1 ring-sky-200" ]
                [ text "Testimonials" ]
            , h2 [ class "mt-8 text-3xl font-semibold text-slate-900 sm:text-4xl" ]
                [ text "“Claritas has transformed our family prayer time.”" ]
            , p [ class "mt-6 text-lg leading-relaxed text-slate-700" ]
                [ text "“My children ask to watch the saint stories every night. The music, the art, and the reflections help them love Jesus more. Thank you for creating something so beautiful and trustworthy.”" ]
            , div [ class "mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-slate-500" ] [ text "— Maria, mother of four" ]
            , div [ class "mt-12 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-600" ]
                [ div [ class "flex items-center gap-2" ]
                    [ span [ class "h-2 w-2 rounded-full bg-amber-500" ] []
                    , text "Trusted by Catholic dioceses" ]
                , div [ class "flex items-center gap-2" ]
                    [ span [ class "h-2 w-2 rounded-full bg-sky-500" ] []
                    , text "Featured on EWTN & Catholic Answers" ]
                ]
            ]
        ]


viewSupportInvitation : Html msg
viewSupportInvitation =
    section [ class "bg-white/80 py-24" ]
        [ div [ class "mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center" ]
            [ div [ class "lg:w-2/3" ]
                [ h2 [ class "text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl" ]
                    [ text "Help us share the Gospel through animation" ]
                , p [ class "mt-4 text-lg leading-relaxed text-slate-600" ]
                    [ text "Each donation supports artists, voice talent, theologians, and translators who are committed to bringing the beauty of the Catholic faith to families everywhere." ]
                , div [ class "mt-8 flex flex-wrap gap-4" ]
                    [ a
                        [ href "/give"
                        , class "inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:-translate-y-0.5 hover:bg-amber-600"
                        ]
                        [ text "Make a gift" ]
                    , a
                        [ href "/contact"
                        , class "inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold text-amber-700 ring-2 ring-amber-500/60 transition hover:bg-amber-500/10"
                        ]
                        [ text "Partner with us" ]
                    ]
                ]
            , div [ class "lg:w-1/3" ]
                [ div [ class "rounded-3xl bg-gradient-to-br from-amber-500 via-rose-400 to-sky-500 p-[1px] shadow-xl shadow-amber-900/20" ]
                    [ div [ class "rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/95 p-8 text-center text-slate-900" ]
                        [ h3 [ class "text-xl font-semibold" ] [ text "Your generosity in action" ]
                        , p [ class "mt-4 text-base leading-relaxed text-slate-600" ]
                            [ text "Monthly supporters receive behind-the-scenes artwork, prayer resources, and premiere access to new episodes." ]
                        ]
                    ]
                ]
            ]
        ]


viewStayConnected : Html msg
viewStayConnected =
    section [ class "home-newsletter relative overflow-hidden py-24" ]
        [ div [ class "absolute inset-0 -z-10 home-newsletter-overlay" ] []
        , div [ class "mx-auto max-w-4xl px-6 text-center" ]
            [ h2 [ class "text-3xl font-semibold tracking-tight text-white sm:text-4xl" ]
                [ text "Stay in the loop with new releases" ]
            , p [ class "mt-4 text-lg leading-relaxed text-white/80" ]
                [ text "Receive prayer guides, feast day activities, and early access to upcoming episodes." ]
            , div [ class "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" ]
                [ a
                    [ href "/signup"
                    , class "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-amber-600 shadow-lg shadow-amber-900/20 transition hover:-translate-y-0.5 hover:bg-amber-50 sm:w-auto"
                    ]
                    [ text "Join the newsletter" ]
                , a
                    [ href "/resources"
                    , class "inline-flex w-full items-center justify-center rounded-full border border-white/60 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10 sm:w-auto"
                    ]
                    [ text "Browse family resources" ]
                ]
            ]
        ]


missionHighlights : List ( String, String )
missionHighlights =
    [ ( "Faithful storytelling", "Our writers and theologians collaborate to keep every script rooted in Church teaching." )
    , ( "Handcrafted animation", "Artists blend classical illustration with modern tools to create movement that feels reverent and engaging." )
    , ( "Music that lifts the heart", "Original compositions and traditional hymns invite viewers into prayer." )
    , ( "Free & accessible", "Episodes stream on our site and YouTube so any family can watch." )
    , ( "For every season", "From Advent to Corpus Christi, we produce specials that help families celebrate the liturgical year." )
    , ( "Global community", "Translations and subtitles help us serve families around the world." )
    ]


missionCard : ( String, String ) -> Html msg
missionCard ( title, description ) =
    div [ class "mission-card group relative overflow-hidden rounded-3xl border border-amber-200/70 bg-white/80 p-8 shadow-lg shadow-amber-900/5 transition hover:-translate-y-1 hover:shadow-amber-500/20" ]
        [ div [ class "absolute inset-0 -z-10 mission-card-glow" ] []
        , div [ class "text-lg font-semibold text-slate-900" ] [ text title ]
        , p [ class "mt-3 text-base leading-relaxed text-slate-600" ] [ text description ]
        ]


featuredStories : List ( String, String, String )
featuredStories =
    [ ( "The Holy Family", "Journey with Jesus, Mary, and Joseph through the joyful mysteries.", "/assets/images/home/lets-become-saints-bg.webp" )
    , ( "Choir of Angels", "Sing along with the choirs of heaven in catechetical music videos.", "/assets/images/home/sanctify-screen-time-bg.webp" )
    , ( "Champions of the Church", "Meet heroic saints who show kids how to follow Christ today.", "/assets/images/home/technology-art-collide-bg.webp" )
    ]


storyCard : ( String, String, String ) -> Html msg
storyCard ( title, description, imageUrl ) =
    div [ class "story-card group relative overflow-hidden rounded-3xl" ]
        [ img
            [ src imageUrl
            , alt title
            , class "h-64 w-full object-cover object-center transition duration-500 group-hover:scale-105"
            ]
            []
        , div [ class "story-card-overlay" ] []
        , div [ class "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent p-6 text-white" ]
            [ h3 [ class "text-xl font-semibold" ] [ text title ]
            , p [ class "mt-2 text-sm text-white/80" ] [ text description ]
            , a [ href "/animations", class "mt-4 inline-flex items-center text-sm font-semibold text-amber-200 transition hover:text-white" ]
                [ text "Watch now →" ]
            ]
        ]


impactStat : String -> String -> Html msg
impactStat value description =
    div []
        [ div [ class "text-3xl font-semibold text-slate-900" ] [ text value ]
        , div [ class "mt-1 text-sm text-slate-600" ] [ text description ]
        ]
