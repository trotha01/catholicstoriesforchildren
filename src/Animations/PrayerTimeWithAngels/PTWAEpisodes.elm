module Animations.PrayerTimeWithAngels.PTWAEpisodes exposing (..)

import Animations.GuardianAngel.Main
import Animations.Helpers exposing (..)
import Animations.StMichael.Main
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
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
    [ { title = "Guardian Angel Prayer"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , link = "/animations/guardianangel"
      , about = Animations.GuardianAngel.Main.viewBody
      , activities =
            { thumbnailLink = "https://ik.imagekit.io/catholicstories/Guardian_Angel_Activity_Cover_1__vNBJQA8Y8.png?updatedAt=1688494259496"
            , pdfLink = "printables/Guardian-Angel-Activities.pdf"
            , answerThumbnailLink = "https://ik.imagekit.io/catholicstories/Guardian_Angel_Activities_Answers_3__-3FACN8K8.png?updatedAt=1688495546612"
            , answerPdfLink = "printables/Guardian-Angel-Activity-Answers.pdf"
            }
      , videoTitles =
            { english = "Guardian Angel"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/03hmpXjV_ck?si=VVADLnsDcTPL0Tm2&loop=1"
            , spanish = ""
            , urdu = "https://www.youtube.com/embed/uG7xjTRSSaI"
            , asl = ""
            }
      }
    , { title = "Saint Michael Prayer"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , link = "/animations/stmichael"
      , about = Animations.StMichael.Main.viewAbout
      , activities =
            { thumbnailLink = "https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Cover_J2Qt-zF3t.png?updatedAt=1688494130199"
            , pdfLink = "/printables/Saint-Michael-Activities.pdf"
            , answerThumbnailLink = "https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Answers_3__I3WnUgIL6.png?updatedAt=1688495548276"
            , answerPdfLink = "/printables/Saint-Michael-Activity-Answers.pdf"
            }
      , videoTitles =
            { english = "St Michael"
            , spanish = ""
            , urdu = "St Michael"
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/y2-SqI_PLv4?playlist=y2-SqI_PLv4&loop=1"
            , spanish = ""
            , urdu = "https://www.youtube.com/embed/5ROHimFlar8?si=nlttq8zg2KthJSE1"
            , asl = ""
            }
      }
    , { title = "Act of Contrition Prayer"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/AOC.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = True
      , link = "/animations/actofcontrition"
      , about = span [] []
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Act of Contrition"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = ""
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Prayer Before Meals"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/PrayerBeforeMeals.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = True
      , link = "/animations/prayerbeforemeals"
      , about = span [] []
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "St Michael"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = ""
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "St Anthony"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/SaintAnthony.png"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = True
      , link = "/animations/stanthony"
      , about = span [] []
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "St Michael"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = ""
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      }
    ]


prayerTimeWithAngelsAnimationLinks : List AnimationLink
prayerTimeWithAngelsAnimationLinks =
    [ { link = "/animations/guardianangel"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.png"
      , ariaLabel = "See the Guardian Angel Animation"
      , isLive = True
      }
    , { link = "/animations/stmichael"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.png"
      , ariaLabel = "See the St Michael the Archangel Animation"
      , isLive = True
      }
    , { link = "/animations/actofcontrition"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/AOC.png"
      , ariaLabel = "Act of Contrition Animation Coming Soon"
      , isLive = True
      }
    , { link = "/animations/prayerbeforemeals"
      , imgSrc = "/assets/images/AnimationImageLinks/PrayerBeforeMeals.png"
      , ariaLabel = "Prayer Before Meals Animation Coming Soon"
      , isLive = False
      }
    , { link = "/animations/saintanthony"
      , imgSrc = "/assets/images/AnimationImageLinks/SaintAnthony.png"
      , ariaLabel = "St Anthony Animation Coming Soon"
      , isLive = False
      }
    ]
