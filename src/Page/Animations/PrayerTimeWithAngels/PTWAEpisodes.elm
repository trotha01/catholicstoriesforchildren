module Page.Animations.PrayerTimeWithAngels.PTWAEpisodes exposing (..)

import Page.Animations.ActOfContrition.Description as ActOfContritionDescription
import Page.Animations.GuardianAngel.Description exposing (..)
import Page.Animations.Helpers exposing (..)
import Page.Animations.StMichael.Description as StMichaelDescription
import Html exposing (..)
import Html.Attributes exposing (..)
import Time exposing (Month(..))


viewBody : Html msg
viewBody =
    div [ class "hcenter" ]
        [ div
            [ class "hcenter py-5 px-11 max-w-3xl" ]
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
            { english = "https://www.youtube.com/embed/1i3Dx77eMDc"
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


prayerTimeWithAngelsAnimationLinks : List AnimationLink
prayerTimeWithAngelsAnimationLinks =
    [ { link = "/animations/guardianangel"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/GuardianAngelPrayer.webp"
      , ariaLabel = "See the Guardian Angel Animation"
      , isLive = True
      }
    , { link = "animations/prayertimewithangels/1/saintmichaelprayer"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/StMichaelPrayer.webp"
      , ariaLabel = "See the St Michael the Archangel Animation"
      , isLive = True
      }
    , { link = "/animations/actofcontrition"
      , imgSrc = "/assets/images/AnimationImageLinks/PTWA/AOC.webp"
      , ariaLabel = "Act of Contrition Animation Coming Soon"
      , isLive = True
      }
    , { link = "/animations/prayerbeforemeals"
      , imgSrc = "/assets/images/AnimationImageLinks/DefaultThumbnail.webp"
      , ariaLabel = "Prayer Before Meals Animation Coming Soon"
      , isLive = False
      }
    , { link = "/animations/saintanthony"
      , imgSrc = "/assets/images/AnimationImageLinks/DefaultThumbnail.webp"
      , ariaLabel = "St Anthony Animation Coming Soon"
      , isLive = False
      }
    ]
