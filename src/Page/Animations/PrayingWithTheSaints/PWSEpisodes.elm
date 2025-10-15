module Page.Animations.PrayingWithTheSaints.PWSEpisodes exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Animations.Helpers exposing (Episode, Season)
import Page.Signup as Signup
import Time


seasons : List (Season msg)
seasons =
    [ { number = 1
      , description = span [] []
      , episodes = episodes
      }
    ]


episodes : List (Episode msg)
episodes =
    [ { title = "Pray the Luminous Mysteries with St Thérèse of Lisieux"
      , thumbnail = "https://img.youtube.com/vi/V9tfs8CU1nw/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praytheluminousmysterieswithstthereseoflisieux"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Luminous Mysteries with St Thérèse of Lisieux"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/V9tfs8CU1nw"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Sorrowful Mysteries with St Thérèse of Lisieux"
      , thumbnail = "https://img.youtube.com/vi/RXFcoxLtEgI/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythesorrowfulmysterieswithstthereseoflisieux"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Sorrowful Mysteries with St Thérèse of Lisieux"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/RXFcoxLtEgI"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Joyful Mysteries with St Thérèse of Lisieux"
      , thumbnail = "https://img.youtube.com/vi/FpFsFC6tMwo/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythejoyfulmysterieswithstthereseoflisieux"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Joyful Mysteries with St Thérèse of Lisieux"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/FpFsFC6tMwo"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Angelus with Saint Thérèse"
      , thumbnail = "https://img.youtube.com/vi/KikBDbT9Z3Q/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praytheangeluswithsainttherese"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Angelus with Saint Thérèse"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/KikBDbT9Z3Q"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "3 min"
      }
    , { title = "Pray the Memorare with Saint Thérèse"
      , thumbnail = "https://img.youtube.com/vi/9aOachJpF9g/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythememorarewithsainttherese"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Memorare with Saint Thérèse"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/9aOachJpF9g"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "1 min"
      }
    , { title = "Pray the Glorious Mysteries with St Thérèse of Lisieux"
      , thumbnail = "https://img.youtube.com/vi/s1anknpeFzw/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythegloriousmysterieswithstthereseoflisieux"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Glorious Mysteries with St Thérèse of Lisieux"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/s1anknpeFzw"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Memorare with Carlo Acutis"
      , thumbnail = "https://img.youtube.com/vi/UINgLALfSCs/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythememorarewithcarloacutis"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Memorare with Carlo Acutis"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/UINgLALfSCs"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "1 min"
      }
    , { title = "Pray the Angelus with Carlo Acutis"
      , thumbnail = "https://img.youtube.com/vi/7uRR-tYDrd8/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praytheangeluswithcarloacutis"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Angelus with Carlo Acutis"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/7uRR-tYDrd8"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "2 min"
      }
    , { title = "Pray the Sorrowful Mysteries with Carlo"
      , thumbnail = "https://img.youtube.com/vi/cFeBmfU14c4/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythesorrowfulmysterieswithcarlo"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Sorrowful Mysteries with Carlo"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/cFeBmfU14c4"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Luminous Mysteries with Carlo"
      , thumbnail = "https://img.youtube.com/vi/Dt2K1uSWyJo/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praytheluminousmysterieswithcarlo"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Luminous Mysteries with Carlo"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/Dt2K1uSWyJo"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Glorious Mysteries with Carlo Acutis"
      , thumbnail = "https://img.youtube.com/vi/kf5p74ROguc/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythegloriousmysterieswithcarloacutis"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Glorious Mysteries with Carlo Acutis"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/kf5p74ROguc"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    , { title = "Pray the Joyful Mysteries with Carlo"
      , thumbnail = "https://img.youtube.com/vi/uvLfv0jkq-I/maxresdefault.jpg"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayingwiththesaints/1/praythejoyfulmysterieswithcarlo"
      , about =
            div []
                [ Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Pray the Joyful Mysteries with Carlo"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/uvLfv0jkq-I"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "21 min"
      }
    ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mxauto colspan2 wfull"
        , class "textlg"
        , class "maxw3xl"
        , class "center"
        ]
        [ div [ class "mxauto maxw4xl" ]
            [ p [ class "mb6" ] [ text "Pray common prayers with the saints in this collection of 12 videos featuring St. Thérèse of Lisieux and Carlo Acutis." ]
            ]
        ]