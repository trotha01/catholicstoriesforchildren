module Page.Animations.Productions exposing (..)

import Page.Animations.DaisyAndSheep.DASEpisodes as DAS
import Page.Animations.GigglesAndGrace.GAGEpisodes as GAG
import Page.Animations.HailMary.HMEpisodes as HM
import Page.Animations.Helpers exposing (Episode, Production, Season, stringToURL)
import Page.Animations.PrayerTimeWithAngels.PTWAEpisodes as PTWA
import Page.Animations.SongsOfTheSaints.SotSEpisodes as SOTS
import Html exposing (..)


productions : List (Production msg)
productions =
        [ { title = "Hail Mary"
      , thumbnail = "/assets/images/AnimationImageLinks/HailMary.webp"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/resized/HailMary.webp"
      , link = "/animations/hailmary"
      , about = span [] []
      , seasons = HM.seasons
      , shortDescription = "Learn one of the most beautiful prayers in the Catholic tradition. A prayer of love and devotion to our Blessed Mother Mary."
      , duration = "5 minutes"
      , year = "2020"
      , age = "Ages 2+"
      }
    , { title = "Prayer Time with Angels"
      , thumbnail = "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.webp"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/resized/PrayerTimeWithAngels.webp"
      , link = "/animations/prayertimewithangels"
      , about = PTWA.viewBody
      , seasons = PTWA.seasons
      , shortDescription = "Join Theo and Felicity as they learn common Catholic prayers from their guardian angels."
      , duration = "5 minutes"
      , year = "2023"
      , age = "Ages 6+"
      }
    , { title = "Daisy and Sheep"
      , thumbnail = "/assets/images/AnimationImageLinks/DaisyAndSheep.webp"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/resized/DaisyAndSheep.webp"
      , link = "/animations/daisyandsheep"
      , about = DAS.viewDescription
      , seasons = DAS.seasons
      , shortDescription = "Join Daisy and Sheep as they learn about the Mass one part at a time and discover fun facts about the Catholic Church."
      , duration = "5 minutes"
      , year = "2024"
      , age = "Ages 10+"
      }
    , { title = "Songs of the Saints"
      , thumbnail = "/assets/images/AnimationImageLinks/SongsOfTheSaints.webp"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/resized/SongsOfTheSaints.webp"
      , link = "/animations/songsofthesaints"
      , about = span [] []
      , seasons = SOTS.seasons
      , shortDescription = "Sing along with your favorite saints in this musical journey."
      , duration = "5 minutes"
      , year = "2025"
      , age = "Ages 10+"
      }
    , { title = "Giggles and Grace Show"
      , thumbnail = "/assets/images/AnimationImageLinks/GigglesAndGrace.webp"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/GigglesAndGrace.webp"
      , link = "/animations/gigglesandgraceshow"
      , about = span [] []
      , seasons = GAG.seasons
      , shortDescription = "Discover Giggles and Grace: Thank You Lord, a musical animated short film that celebrates the joy of thanking God even when things go wrong."
      , duration = "3 min"
      , year = "2025"
      , age = "Ages 2+"
      }
    ]


getEpisodeFromURLPath : String -> Int -> String -> ( Maybe (Production msg), Maybe (Season msg), Maybe (Episode msg) )
getEpisodeFromURLPath production season episode =
    let
        ( mp, ms ) =
            getSeasonFromURLPath production season
    in
    ( mp
    , ms
    , ms
        -- get the matching episode
        |> Maybe.map (\p -> p.episodes)
        |> Maybe.map (List.filter (\e -> episode == stringToURL e.title))
        |> Maybe.andThen List.head
    )


getSeasonFromURLPath : String -> Int -> ( Maybe (Production msg), Maybe (Season msg) )
getSeasonFromURLPath production season =
    let
        mp =
            getProductionFromURLPath production

        -- get the matching season
    in
    ( mp
    , mp
        |> Maybe.map (\p -> p.seasons)
        |> Maybe.map (List.filter (\s -> s.number == season))
        |> Maybe.andThen List.head
    )


getProductionFromURLPath : String -> Maybe (Production msg)
getProductionFromURLPath production =
    productions
        -- get the matching production
        |> List.filter (\p -> production == stringToURL p.title)
        |> List.head
