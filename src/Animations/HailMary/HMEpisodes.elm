module Animations.HailMary.HMEpisodes exposing (..)

import Animations.HailMary.Main exposing (aboutTheAnimation, aboutThePrayer, moreAboutTheAnimation, viewAnotherPage, viewPrayer, viewResources)
import Animations.Helpers exposing (Episode, Season)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup
import Time exposing (Month(..))


seasons : List (Season msg)
seasons =
    [ { number = 1
      , description = span [] []
      , episodes = episodes
      }
    ]


episodes : List (Episode msg)
episodes =
    [ { title = "Hail Mary"
      , thumbnail = "/assets/images/AnimationImageLinks/HailMary.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , link = ""
      , about =
            div []
                [ aboutTheAnimation
                , viewPrayer
                , moreAboutTheAnimation
                , Signup.view4
                , viewResources
                , aboutThePrayer
                , viewAnotherPage
                ]
      , activities =
            { thumbnailLink = "https://ik.imagekit.io/catholicstories/9_1__-d-EPYcuW.png?updatedAt=1689288132704"
            , pdfLink = "/printables/Hail-Mary-Activities.pdf"
            , answerThumbnailLink = "https://ik.imagekit.io/catholicstories/10_1__s3i8dhFiH.png?updatedAt=1689288132684"
            , answerPdfLink = "/printables/Hail-Mary-Activity-Answers.pdf"
            }
      , videoTitles =
            { english = "Hail Mary Animation"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/HW0DzGEoa1Y?playlist=HW0DzGEoa1Y&loop=1"
            , spanish = ""
            , urdu = "https://www.youtube.com/embed/NN7gd5xqDw8?si=tUB20FMCCdN2Mafx"
            , asl = "https://www.youtube.com/embed/QNVNbLiqznI?playlist=QNVNbLiqznI&loop=1"
            }
      }
    ]
