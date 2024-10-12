module Animations.DaisyAndSheep.DASEpisodes exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Time exposing (Month(..), Posix)


type alias DASEpisode msg =
    { title : String
    , thumbnail : String
    , releaseDate : Time.Posix
    , about : Html msg
    , activities :
        { thumbnailLink : String
        , pdfLink : String
        , answerThumbnailLink : String
        , answerPdfLink : String
        }
    , videoTitles :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    , videoLinks :
        { english : String
        , spanish : String
        , urdu : String
        , asl : String
        }
    }


episodes : List (DASEpisode msg)
episodes =
    [ { title = "Liturgical Kiss"
      , thumbnail = "/assets/images/AnimationImageLinks/LiturgicalKiss.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/liturgicalkissworksheet.png"
            , pdfLink = "/printables/daisyandsheep/Liturgical Kiss.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/liturgicalkissworksheetanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Liturgical Kiss Answer Key.pdf"
            }
      , videoTitles =
            { english = "Liturgical Kiss | Daisy and Sheep"
            , spanish = "Beso Litúrgico | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/i6zBgnZQq9U"
            , spanish = "https://www.youtube-nocookie.com/embed/vgUZq1hhmXM"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Astronomy Program"
      , thumbnail = "/assets/images/AnimationImageLinks/AstronomyProgram.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/astronomyprogramworksheet.png"
            , pdfLink = "/printables/daisyandsheep/Astronomy Program.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/astronomyprogramworksheetanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Astronomy Program Answer Key.pdf"
            }
      , videoTitles =
            { english = "Astronomy Program | Daisy and Sheep"
            , spanish = "La Specola Vaticana | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/QIcgtKMKe40"
            , spanish = "https://www.youtube-nocookie.com/embed/nP5e0y7DNNI"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Penitential Act"
      , thumbnail = "/assets/images/AnimationImageLinks/PenitentialAct.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/penitentialact.png"
            , pdfLink = "/printables/daisyandsheep/Penitential Act.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/penitentialactanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Penitential Act Answer Key.pdf"
            }
      , videoTitles =
            { english = "Penitential Act | Daisy and Sheep"
            , spanish = "Penitential Act | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/ay8Kzqeyrrc"
            , spanish = "https://www.youtube-nocookie.com/embed/cfZsgMZjCAw"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Guardian Angel"
      , thumbnail = "/assets/images/AnimationImageLinks/GuardianAngel.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/guardianangel.png"
            , pdfLink = "/printables/daisyandsheep/Guardian Angel.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Guardian Angel | Daisy and Sheep"
            , spanish = "Ángel de la Guarda | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/C-FmlvV9JWI"
            , spanish = "https://www.youtube-nocookie.com/embed/HhoLRdTxTYc"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Gospel as Living Word"
      , thumbnail = "/assets/images/AnimationImageLinks/GospelAsLivingWord.png"
      , releaseDate = Time.millisToPosix 1728136800000 -- Saturday, October 5, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/gospelaslivingword.png"
            , pdfLink = "/printables/daisyandsheep/Gospel As Living Word.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Gospel As Living Word | Daisy and Sheep"
            , spanish = "Gospel As Living Word | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/G-Yz76BrIvo"
            , spanish = "https://www.youtube-nocookie.com/embed/nEv2wpyFpwk"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "The Virgin Mary, Mother"
      , thumbnail = "/assets/images/AnimationImageLinks/MaryApparitions.png"
      , releaseDate = Time.millisToPosix 1728136800000 -- Saturday, October 5, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/maryapparitions.png"
            , pdfLink = "/printables/daisyandsheep/Mary Apparitions.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/maryapparitionsanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Mary Apparitions Answers.pdf"
            }
      , videoTitles =
            { english = "Mary, my mother | Daisy and Sheep"
            , spanish = "Mary, my mother | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/w_v9goHWsNs"
            , spanish = "https://www.youtube-nocookie.com/embed/LLDGWewq1lM"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Prayer of the Faithful"
      , thumbnail = "/assets/images/AnimationImageLinks/PrayerOfTheFaithful.png"
      , releaseDate = Time.millisToPosix 1728741600000 -- Saturday, October 12, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/prayerofthefaithful.png"
            , pdfLink = "/printables/daisyandsheep/Prayer of the Faithful.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Prayer of the Faithful | Daisy and Sheep"
            , spanish = "Prayer of the Faithful | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/Khn3A6UFCXg"
            , spanish = "https://www.youtube-nocookie.com/embed/vURcMiGvR9s"
            , urdu = ""
            , asl = ""
            }
      }
    ]
