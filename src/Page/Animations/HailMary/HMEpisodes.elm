module Page.Animations.HailMary.HMEpisodes exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Animations.Helpers exposing (Episode, Season)
import Page.Signup as Signup
import Page.Team.Team exposing (trevor, viewPersonImage)
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
    [ { title = "Hail Mary"
      , thumbnail = "/assets/images/AnimationImageLinks/HailMary.webp"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/hailmary"
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
      , year = "2020"
      , duration = "3 min"
      }
    ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3" ] [ text "Mother Mary is one of the most important people in our Catholic faith. She is admired for her unwavering faith, humility, and devotion to her son, Jesus Christ." ]
        , p [ class "my-3" ]
            [ span [] [ text "Her life and teachings have been a source of inspiration for Christians, and " ]
            , span [ class "font-bold" ] [ text "Mother Mary’s story has been passed down from generation to generation." ]
            ]
        , p [ class "my-3" ] [ text "One way to teach children about Mother Mary is through animated stories. These stories convey her life and importance in a way that is engaging and memorable. By using animation, children can see the events of her life come to life before their eyes, making it easier for them to understand and remember." ]
        , p [ class "my-3" ]
            [ span [] [ text "Here is just one example of how we do this at Claritas Studios." ]
            , span [ class "font-bold" ] [ text " This animation helps kids learn the Hail Mary prayer through a story and repetition." ]
            , span [] [ text " The animation is designed to be an aid for children to build a habit of prayer. You can use it during prayer time while kids still learn the words and the solemn manner to pray." ]
            ]
        ]


moreAboutTheAnimation : Html msg
moreAboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "mb-3 font-bold" ] [ text "Creating an animation on the Hail Mary prayer" ]
        , p [ class "my-3" ] [ text "When creating the animated story about Mother Mary, we stay true to her character. Her devotion to God and love for her son are at the forefront, and the animation reflects this. By doing so, children can learn about her life and teachings in a way that is both entertaining and informative." ]
        , p [ class "my-3" ] [ text "Would you agree?" ]
        , p [ class "my-3" ] [ text "Our animations are great for homeschooling, hybrid schooling, and traditional religious education." ]
        , p [ class "my-3" ] [ text "Here at Claritas Studios, our animated stories cover prayer, including the Hail Mary prayer (above), the St Michael prayer, and the prayer to your Guardian Angel. These animations also explore the virtues, such as humility, faith, and compassion. Each story is carefully crafted to ensure that it is both engaging and educational." ]
        , p [ class "my-3" ] [ text "Prayer is tremendously important in our Catholic faith, and building a habit of prayer has much to offer children. By creating animated stories that teach Catholic prayers and reflect Catholic virtues and teachings, we can help children learn about the faith in a way that is both entertaining and informative. These stories can inspire children to live a life of faith, love, and compassion, just like Mother Mary did." ]
        ]


viewResources : Html msg
viewResources =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3 font-bold" ] [ text "Additional information about the prayer to Mother Mary" ]
        , p [ class "my-3" ] [ text "Below, I have listed important prayers and resources about Mother Mary which you will find useful in sharing with children." ]
        , p [ class "my-3" ] [ text "Thank you, and may God bless you," ]
        , p [ class "my-3" ]
            [ span [ class "my-3" ] [ text "Trevor Rothaus " ]
            , viewPersonImage trevor
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "mt-10 text-lg" ]
        [ p [ class "mb-3 font-bold" ] [ text "The Prayer" ]
        , p [ class "italic mb-4" ]
            [ span [ class "block" ] [ text "Hail Mary, full of grace, the Lord is with you;" ]
            , span [ class "block" ] [ text "blessed are you among women," ]
            , span [ class "block" ] [ text "and blessed is the fruit of your womb, Jesus." ]
            , span [ class "block" ] [ text "Holy Mary, Mother of God," ]
            , span [ class "block" ] [ text "pray for us sinners" ]
            , span [ class "block" ] [ text "now and at the hour of our death." ]
            , span [ class "block" ] [ text "Amen." ]
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "font-bold leading-9" ] [ text "Additional information about the prayer to Mother Mary" ]
        , p [ class "my-10" ] [ text "The Hail Mary is a beautiful prayer to Mary, the Mother of Jesus. This prayer is filled with Scripture." ]
        , p [ class "my-10" ]
            [ text
                "In this prayer, we begin with the greeting of St. Michael the Archangel, "
            , span [ class "font-semibold" ] [ text "'Hail Mary, full of grace, the Lord is with you' (Luke 1:28). " ]
            , text
                ("What does it mean to be full of grace? Mary considered in her mind what sort of greeting this might be (Luke 1:29). "
                    ++ "To be completely filled with grace indicates that Mary is "
                    ++ "without sin."
                )
            ]
        , blockquote
            [ Html.Attributes.cite "https://www.vatican.va/archive/hist_councils/ii_vatican_council/documents/vat-ii_const_19641121_lumen-gentium_en.html"
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    ("Because of this gift of sublime grace she far surpasses all creatures, "
                        ++ "both in heaven and on earth. At the same time, however, because "
                        ++ "she belongs to the offspring of Adam she is one with all those who "
                        ++ "are to be saved. "
                    )
                ]
            , p
                [ class "mt-2" ]
                [ text "Lumen Gentium, 53"
                ]
            ]
        , p [ class "my-10" ]
            [ text
                "Then we praise Mary in the same way as her cousin Elizabeth, "
            , span [ class "font-semibold" ] [ text "'Blessed are you among women, and blessed is the fruit of your womb' (Luke 1:42)." ]
            ]
        , blockquote
            [ class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            , Html.Attributes.cite "https://www.vatican.va/content/john-paul-ii/en/encyclicals/documents/hf_jp-ii_enc_25031987_redemptoris-mater.html"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    ("""If after the announcement of the heavenly messenger the Virgin of Nazareth is also called """
                        ++ """ "blessed among women" (cf. Lk. 1:42), it is because of that blessing with which "God the Father" has """
                        ++ """filled us "in the heavenly places, in Christ." It is a spiritual blessing which is meant for all people and """
                        ++ """which bears in itself fullness and universality ("every blessing"). It flows from that love which, in the """
                        ++ """Holy Spirit, unites the consubstantial Son to the Father. At the same time, it is a blessing poured out through """
                        ++ """Jesus Christ upon human history until the end: upon all people. This blessing, however, refers to Mary in a """
                        ++ """special and exceptional degree: for she was greeted by Elizabeth as "blessed among women." """
                    )
                ]
            , p
                [ class "my-10"
                ]
                [ text """Pope John Paul II, Redemptoris Mater, 8"""
                ]
            ]
        , p [ class "my-10" ]
            [ text "Lastly, we ask Mary to pray for us. "
            , span [ class "font-semibold" ] [ text "'Holy Mary, Mother of God, pray for us sinners now and at the hour of death. Amen.'" ]
            ]
        ]


viewAnotherPage : Html msg
viewAnotherPage =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "font-bold leading-9" ] [ text "Prayer Time with Angels Animations" ]
        , p [ class "my-10" ] [ text "Make sure to also check our our Prayer time with Angels Animations! Learn the prayer to your Guardian Angel and the St. Michael Prayer with Theo and Felicity!" ]
        , a
            [ href "/animations/prayertimewithangels"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "See the Prayer Time with Angels animation"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Prayer Time with Angels animations"
                ]
                []
            ]
        ]
