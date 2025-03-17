module Animations.Productions exposing (..)

import Animations.DaisyAndSheep.DASEpisodes as DAS
import Animations.HailMary.HMEpisodes as HM
import Animations.Helpers exposing (Episode, Production, Season, stringToURL)
import Animations.PrayerTimeWithAngels.PTWAEpisodes as PTWA
import Animations.SongsOfTheSaints.SotSEpisodes as SOTS
import Html exposing (..)


productions : List (Production msg)
productions =
    [ { title = "Hail Mary"
      , thumbnail = "/assets/images/AnimationImageLinks/HailMary.png"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/HailMary.png"
      , link = "/animations/hailmary"
      , about = span [] []
      , seasons = HM.seasons
      }
    , { title = "Prayer Time with Angels"
      , thumbnail = "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/PrayerTimeWithAngels.png"
      , link = "/animations/prayertimewithangels"
      , about = PTWA.viewBody
      , seasons = PTWA.seasons
      }
    , { title = "Daisy and Sheep"
      , thumbnail = "/assets/images/AnimationImageLinks/DaisyAndSheep.png"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/DaisyAndSheep.png"
      , link = "/animations/daisyandsheep"
      , about = DAS.viewDescription
      , seasons = DAS.seasons
      }
    , { title = "Songs of the Saints"
      , thumbnail = "/assets/images/AnimationImageLinks/SongsOfTheSaints.png"
      , carouselThumbnail = "/assets/images/CarouselThumbnails/SongsOfTheSaints.png"
      , link = "/animations/songsofthesaints"
      , about = span [] []
      , seasons = SOTS.seasons
      }
    ]


slideshowProductions : List ( String, String )
slideshowProductions =
    List.map (\p -> ( p.carouselThumbnail, p.link )) productions


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
