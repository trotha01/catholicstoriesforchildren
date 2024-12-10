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
    , { title = "Communion of Saints"
      , thumbnail = "/assets/images/AnimationImageLinks/CommunionOfSaints.png"
      , releaseDate = Time.millisToPosix 1729000800000 -- Tuesday, October 15, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/communionofsaints.png"
            , pdfLink = "/printables/daisyandsheep/Communion of Saints.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/communionofsaintsanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Communion of Saints Answers.pdf"
            }
      , videoTitles =
            { english = "Communion of Saints | Daisy and Sheep"
            , spanish = "Communion of Saints | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/cbb2iRzz9pc"
            , spanish = "https://www.youtube-nocookie.com/embed/3o5bCo0gQyM"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Eucharistic Wine"
      , thumbnail = "/assets/images/AnimationImageLinks/EucharisticWine.png"
      , releaseDate = Time.millisToPosix 1729000800000 -- Tuesday, October 15, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/eucharisticwine.png"
            , pdfLink = "/printables/daisyandsheep/Eucharistic Wine.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/eucharisticwineanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Eucharistic Wine Answers.pdf"
            }
      , videoTitles =
            { english = "Eucharistic Wine | Daisy and Sheep"
            , spanish = "Eucharistic Wine | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/u-hMEMTnfVY"
            , spanish = "https://www.youtube-nocookie.com/embed/8RTTl5yKQEg"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Pope Names"
      , thumbnail = "/assets/images/AnimationImageLinks/PopeNames.png"
      , releaseDate = Time.millisToPosix 1729605600000 -- Tuesday, October 21, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/popenames.png"
            , pdfLink = "/printables/daisyandsheep/Pope Names.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/popenamesanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Pope Names Answers.pdf"
            }
      , videoTitles =
            { english = "Pope Names | Daisy and Sheep"
            , spanish = "Pope Names | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/rijyDOxbcbo"
            , spanish = "https://www.youtube.com/embed/XmzSx4vMne0"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Preparing the Altar"
      , thumbnail = "/assets/images/AnimationImageLinks/PreparingTheAltar.png"
      , releaseDate = Time.millisToPosix 1729951200000 -- Saturday, October 26, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/preparingthealtar.png"
            , pdfLink = "/printables/daisyandsheep/Preparing the Altar.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/preparingthealtaranswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Preparing The Altar Answers.pdf"
            }
      , videoTitles =
            { english = "Preparing the Altar | Daisy and Sheep"
            , spanish = "Preparing the Altar | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/8ql_OwO4JjI"
            , spanish = "https://www.youtube.com/embed/-pwWI-xypn4"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Being a Saint"
      , thumbnail = "/assets/images/AnimationImageLinks/BeingASaint.png"
      , releaseDate = Time.millisToPosix 1729951200000 -- Saturday, October 26, 2024 7:00:00 AM GMT-07:00
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/beingasaint.png"
            , pdfLink = "/printables/daisyandsheep/Being a Saint.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Being a Saint | Daisy and Sheep"
            , spanish = "Being a Saint | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/-XrR2uYSyWg"
            , spanish = "https://www.youtube.com/embed/ECA41xh2qTY"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Holy Holy Holy"
      , thumbnail = "/assets/images/AnimationImageLinks/HolyHolyHoly.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Holy Holy Holy | Daisy and Sheep"
            , spanish = "Holy Holy Holy | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/Zpde2k4gvPc"
            , spanish = "https://www.youtube.com/embed/rihM8lIOKKg"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Doctors of the Church"
      , thumbnail = "/assets/images/AnimationImageLinks/DoctorOfTheChurch.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/doctorofthechurch.png"
            , pdfLink = "/printables/daisyandsheep/Doctors of the Church.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/doctorofthechurchanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/Doctors of the Church Answers.pdf"
            }
      , videoTitles =
            { english = "Doctors of the Church | Daisy and Sheep"
            , spanish = "Doctors of the Church | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/rupDa-FbT2E"
            , spanish = "https://www.youtube.com/embed/0xOCqUbtlqA"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Dewfall"
      , thumbnail = "/assets/images/AnimationImageLinks/Dewfall.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/thedewfall.png"
            , pdfLink = "/printables/daisyandsheep/TheDewfall.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/thedewfallanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/TheDewfallAnswers.pdf"
            }
      , videoTitles =
            { english = "The Dewfall | Daisy and Sheep"
            , spanish = "The Dewfall | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/KjNv5g0B7Bk"
            , spanish = "https://www.youtube.com/embed/YRG4D4P0UA8"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "The Sacraments"
      , thumbnail = "/assets/images/AnimationImageLinks/Sacraments.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/sacraments.png"
            , pdfLink = "/printables/daisyandsheep/Sacraments.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/sacramentsanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/SacramentsAnswers.pdf"
            }
      , videoTitles =
            { english = "The Sacraments | Daisy and Sheep"
            , spanish = "The Sacraments | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/BF1kL8R075M"
            , spanish = "https://www.youtube.com/embed/mID8IVUWlf4"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "The Lamb of God"
      , thumbnail = "/assets/images/AnimationImageLinks/LambOfGod.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/lambofgod.png"
            , pdfLink = "/printables/daisyandsheep/LambOfGod.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/lambofgodanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/LambOfGodAnswers.pdf"
            }
      , videoTitles =
            { english = "Lamb of God | Daisy and Sheep"
            , spanish = "Lamb of God | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/EpCX6CmlR0I"
            , spanish = "https://www.youtube.com/embed/19Ty4oGCkI0"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "The 7 Gifts"
      , thumbnail = "/assets/images/AnimationImageLinks/The7Gifts.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/the7gifts.png"
            , pdfLink = "/printables/daisyandsheep/The7Gifts.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/the7giftsanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/The7GiftsAnswers.pdf"
            }
      , videoTitles =
            { english = "The 7 Gifts | Daisy and Sheep"
            , spanish = "The 7 Gifts | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/9oCveljpiMA"
            , spanish = "https://www.youtube.com/embed/TrZNL11Jpvs"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Transubstantiation"
      , thumbnail = "/assets/images/AnimationImageLinks/Transubstantiation.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/transubstantiation.png"
            , pdfLink = "/printables/daisyandsheep/Transubstantiation.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Transubstantiation | Daisy and Sheep"
            , spanish = "Transubstantiation | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/16ms4F1PIaE"
            , spanish = "https://www.youtube.com/embed/DAWC8VYmgm0"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Ash Wednsesday"
      , thumbnail = "/assets/images/AnimationImageLinks/AshWednesday.png"
      , releaseDate = Time.millisToPosix 1732633200000
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/ashwednesday.png"
            , pdfLink = "/printables/daisyandsheep/ashwednesday.pdf"
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Ash Wednesday | Daisy and Sheep"
            , spanish = "Ash Wednesday | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/5AEzncj0UIk"
            , spanish = "https://www.youtube.com/embed/NEiFT8ewEw0"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Liturgical Colors"
      , thumbnail = "/assets/images/AnimationImageLinks/LiturgicalColors.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/liturgicalcolors.png"
            , pdfLink = "/printables/daisyandsheep/liturgicalcolors.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/liturgicalcolorsanswers.png"
            , answerPdfLink = "/printables/daisyandsheep/liturgicalcolorsanswers.pdf"
            }
      , videoTitles =
            { english = "Liturgical Colors | Daisy and Sheep"
            , spanish = "Liturgical Colors | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/VHgrRVss19g"
            , spanish = "https://www.youtube.com/embed/BwbvZLdnPmU"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Easter"
      , thumbnail = "/assets/images/AnimationImageLinks/Easter.png"
      , releaseDate = Time.millisToPosix 1733238000000
      , about = span [] []
      , activities =
            { thumbnailLink = "/assets/images/daisyandsheep/easter.png"
            , pdfLink = "/printables/daisyandsheep/easter.pdf"
            , answerThumbnailLink = "/assets/images/daisyandsheep/easteranswers.png"
            , answerPdfLink = "/printables/daisyandsheep/easteranswers.pdf"
            }
      , videoTitles =
            { english = "Easter | Daisy and Sheep"
            , spanish = "Easter | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/J1QydSx3N5M"
            , spanish = "https://www.youtube.com/embed/0Epu9Gu4UvQ"
            , urdu = ""
            , asl = ""
            }
      }
    , { title = "Vatican Bank"
      , thumbnail = "/assets/images/AnimationImageLinks/VaticanBank.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Vatican Bank | Daisy and Sheep"
            , spanish = "Vatican Bank | Daisy and Sheep"
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/hiVG7LS3sTQ"
            , spanish = "https://www.youtube.com/embed/apbCO8i9azI"
            , urdu = ""
            , asl = ""
            }
      }
    ]
