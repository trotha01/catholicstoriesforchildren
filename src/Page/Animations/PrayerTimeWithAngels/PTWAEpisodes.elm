module Page.Animations.PrayerTimeWithAngels.PTWAEpisodes exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Animations.ActOfContrition.Description as ActOfContritionDescription
import Page.Animations.GuardianAngel.Description exposing (..)
import Page.Animations.Helpers exposing (..)
import Page.Animations.StMichael.Description as StMichaelDescription
import Time


viewBody : Html msg
viewBody =
    div [ class "relative left-1/2 -translate-x-1/2" ]
        [ div
            [ class "relative left-1/2 -translate-x-1/2 py-5 px-11 max-w-3xl" ]
            [ h1 [ class "leading-10 my-10" ] [ text "Prayer Time with Angels" ]
            , div [ class "my-10" ]
                [ p [ class "my-5" ] [ text "Join Theo and Felicity as their guardian angels teach and help them understand different Catholic prayers." ]
                , p [ class "my-5" ]
                    [ text
                        ("From the prayer before meals to the prayer to their guardian angel to the Hail Mary, "
                            ++ "prayer helps kids grow in their relationship with God and grow in the virtues."
                        )
                    ]
                , p [ class "my-5" ]
                    [ text
                        ("Do you want your children to grow in gratitude? Start with the prayer before meals."
                            ++ " Do you want your children to grow in humility? Start with the Act of Contrition."
                            ++ " Do you want your children to grow in love and charity? Start incorporating intentions for other people into your prayers."
                            ++ " A habit of prayer will help your kid grow into the virtuous person that you will delight to see."
                        )
                    ]
                ]
            ]
        ]


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
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.webp"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayertimewithangels/1/guardianangelprayer"
      , about = viewGuardianAngelDescription
      , activities =
            { thumbnailLink = "/assets/images/imagekit/Guardian_Angel_Activity_Cover_1__vNBJQA8Y8.png"
            , pdfLink = "printables/Guardian-Angel-Activities.pdf"
            , answerThumbnailLink = "/assets/images/imagekit/Guardian_Angel_Activities_Answers_3__-3FACN8K8.png"
            , answerPdfLink = "printables/Guardian-Angel-Activity-Answers.pdf"
            }
      , videoTitles =
            { english = "Guardian Angel"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/videoseries?list=PL0_XgmxOXie8KX7A9KSkb3Akx8H3JT6hg&loop=1&autoplay=1"
            , spanish = ""
            , urdu = "https://www.youtube.com/embed/uG7xjTRSSaI"
            , asl = ""
            }
      , year = "2023"
      , duration = "5 min"
      }
    , { title = "Saint Michael Prayer"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.webp"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayertimewithangels/1/saintmichaelprayer"
      , about = StMichaelDescription.viewAbout
      , activities =
            { thumbnailLink = "/assets/images/imagekit/Saint_Michael_Activity_Cover_J2Qt-zF3t.png"
            , pdfLink = "/printables/Saint-Michael-Activities.pdf"
            , answerThumbnailLink = "/assets/images/imagekit/Saint_Michael_Activity_Answers_3__I3WnUgIL6.png"
            , answerPdfLink = "/printables/Saint-Michael-Activity-Answers.pdf"
            }
      , videoTitles =
            { english = "St Michael"
            , spanish = ""
            , urdu = "St Michael"
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/y2-SqI_PLv4?si=fAbS7jHGyG8saK1v&loop=1&autoplay=1"
            , spanish = ""
            , urdu = "https://www.youtube.com/embed/5ROHimFlar8?si=nlttq8zg2KthJSE1"
            , asl = ""
            }
      , year = "2023"
      , duration = "4 min"
      }
    , { title = "Act of Contrition Prayer"
      , thumbnail = "/assets/images/AnimationImageLinks/PTWA/AOC.webp"
      , releaseDate = Time.millisToPosix 1740150000000
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/prayertimewithangels/1/actofcontritionprayer"
      , about = ActOfContritionDescription.viewAbout
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
            { english = "https://www.youtube.com/embed/1i3Dx77eMDc?si=SV_xtbUf2iP-8Lxd&loop=1&autoplay=1"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "6 min"
      }

    --     , { title = "Prayer Before Meals"
    --       , thumbnail = "/assets/images/AnimationImageLinks/DefaultThumbnail.webp"
    --       , releaseDate = Time.millisToPosix 0
    --       , isDisabled = True
    --       , isFundraising = False
    --       , link = "/animations/prayerbeforemeals"
    --       , about = span [] []
    --       , activities =
    --             { thumbnailLink = ""
    --             , pdfLink = ""
    --             , answerThumbnailLink = ""
    --             , answerPdfLink = ""
    --             }
    --       , videoTitles =
    --             { english = "St Michael"
    --             , spanish = ""
    --             , urdu = ""
    --             , asl = ""
    --             }
    --       , videoLinks =
    --             { english = ""
    --             , spanish = ""
    --             , urdu = ""
    --             , asl = ""
    --             }
    --       , year = ""
    --       , duration = ""
    --       }
    --     , { title = "St Anthony"
    --       , thumbnail = "/assets/images/AnimationImageLinks/DefaultThumbnail.webp"
    --       , releaseDate = Time.millisToPosix 0
    --       , isDisabled = True
    --       , isFundraising = False
    --       , link = "/animations/stanthony"
    --       , about = span [] []
    --       , activities =
    --             { thumbnailLink = ""
    --             , pdfLink = ""
    --             , answerThumbnailLink = ""
    --             , answerPdfLink = ""
    --             }
    --       , videoTitles =
    --             { english = "St Anthony"
    --             , spanish = ""
    --             , urdu = ""
    --             , asl = ""
    --             }
    --       , videoLinks =
    --             { english = ""
    --             , spanish = ""
    --             , urdu = ""
    --             , asl = ""
    --             }
    --       , year = ""
    --       , duration = ""
    --       }
    ]
