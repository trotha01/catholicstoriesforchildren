module Animations.DaisyAndSheep.DASEpisodes exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Time exposing (Month(..))


type alias DASEpisode msg =
    { title : String
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
    [ { title = "Astronomy Program"
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
    , { title = "Liturgical Kiss"
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
    , { title = "Penitential Act"
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
    ]
