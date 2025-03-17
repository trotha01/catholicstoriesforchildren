module Animations.SongsOfTheSaints.SotSEpisodes exposing (..)

import Animations.Helpers exposing (Episode, Season)
import Give.Main exposing (donateWithZeffy)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Time exposing (Month(..), Posix)


type alias SotSEpisode msg =
    { title : String
    , thumbnail : String
    , releaseDate : Time.Posix
    , about : Html msg
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
    , videoDescriptions :
        { english : Html msg
        , spanish : Html msg
        , urdu : Html msg
        , asl : Html msg
        }
    }


seasons : List (Season msg)
seasons =
    [ { number = 1
      , description = span [] []
      , episodes = episodes
      }
    ]


episodes : List (Episode msg)
episodes =
    [ stThereseEpisode
    , carloEpisode
    ]


stThereseEpisode : Episode msg
stThereseEpisode =
    { title = "Saint Thérèse of Lisieux"
    , thumbnail = "/assets/images/AnimationImageLinks/SotsTherese.png"
    , releaseDate = Time.millisToPosix 0
    , isDisabled = False
    , link = ""
    , about = thereseVideoDescription
    , activities =
        { thumbnailLink = ""
        , pdfLink = ""
        , answerThumbnailLink = ""
        , answerPdfLink = ""
        }
    , videoTitles =
        { english = "Saint Therese | Songs of the Saints"
        , spanish = ""
        , urdu = ""
        , asl = ""
        }
    , videoLinks =
        { english = "https://www.youtube.com/embed/_v_285ob5Rc"
        , spanish = ""
        , urdu = ""
        , asl = ""
        }
    }


carloEpisode : Episode msg
carloEpisode =
    { title = "Carlo Acutis"
    , thumbnail = "/assets/images/AnimationImageLinks/SotsCarlo.png"
    , releaseDate = Time.millisToPosix 1741359600000 -- Friday, March 7, 2025 7:00:00 AM GMT-08:00
    , isDisabled = False
    , link = ""
    , about = carloVideoDescription
    , activities =
        { thumbnailLink = ""
        , pdfLink = ""
        , answerThumbnailLink = ""
        , answerPdfLink = ""
        }
    , videoTitles =
        { english = "Carlo Acutis | Songs of the Saints"
        , spanish = ""
        , urdu = ""
        , asl = ""
        }
    , videoLinks =
        { english = "https://www.youtube.com/embed/Q3X7LFbNzrw"
        , spanish = ""
        , urdu = ""
        , asl = ""
        }
    }


thereseVideoDescription : Html msg
thereseVideoDescription =
    div []
        [ p []
            [ text "Join Saint Thérèse of Lisieux, also known as the Little Flower or St. Therese of the Child Jesus, in a moment of her life!"
            ]
        , br [] []
        , p []
            [ text "In a moment of doubt, she turns to prayer. Follow along as she prays two of the prayers of one of her favorite saints, Saint Theresa of Ávila."
            ]
        , br [] []
        , p []
            [ text "This Saint Thérèse of Lisieux animation is meant for kids and adults. This animation may inspire you to begin the Saint Thérèse of Lisieux novena. Or to pray the prayer of The Little Flower. Use this video as inspiration for your next meditative prayer. The feast of Saint Thérèse of Lisieux is October 1st."
            ]
        , br [] []
        , p []
            [ text "The series, Songs of the Saints, will let you encounter different saints. Each video opens with the Song of the Saints book. As you enter this book, you enter into an intimate moment in the life of a saint."
            ]
        , br [] []
        , p []
            [ text "May this video on these saints inspire you to read their books, The Story of a Soul from St. Thérèse of Lisieux, or one of the many works from Saint Theresa of Ávila, such as The Interior Castle. These Carmelites are sure to capture your heart and bring you to Jesus."
            ]
        , br [] []
        , p []
            [ text "Also, make sure to check out our sponsor, "
            , a [ href "https://www.allsaintsplay.com/" ] [ text "All Saints Play" ]
            , text "! Joyful resources for Catholic families."
            ]
        , br [] []
        , p []
            [ text """In her book, Saint Thérèse of Lisieux writes (translated by Michael Day, Cong., Orat.) after she entered Carmel, """
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "My dream was at last realized, and peace flooded my soul, a deep, sweet, inexpressible peace, an inward peace which has been my lot these eight and a half years. It has never left me, not even when trials were at their height. Everything here delighted me, our little cell most of all; it was as though I had been transported to my far-away desert. But my happiness, I must say again, was a calm happiness." ]
                ]
            ]
        , br [] []
        , p []
            [ text """But, a few hours before her Profession, """
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "So deep became my darkness that one fact alone was clear to me - I did not have a religious vocation and must return to the world. My anguish was indescribable. What did one do in such a crisis" ]
                ]
            ]
        , br [] []
        , p []
            [ text """In our video, we take the creative license of having The Little Flower turn to the prayers of Saint Teresa of Ávila. In her book, she turns to the Novice Mistress."""
            ]
        , br [] []
        , p []
            [ text """She continues, """
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#fde7f4] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "My act of humility acted like a charm in putting the devil to flight. He had hoped to catch me in his toils by getting me to keep my trouble to myself. But it was I who caught him." ]
                ]
            ]
        , br [] []
        , p []
            [ text """This Little Flower inspired the creation of this song and video, and we pray that the Little Flower inspires you to deepen your life in Christ."""
            ]
        , br [] []
        , p []
            [ text """Here are the full prayers of Saint Teresa of Ávila."""
            ]
        , br [] []
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "Let nothing disturb you, Let nothing frighten you, All things are passing away: God never changes. Patience obtains all things. Whoever has God lacks nothing; God alone suffices." ]
                ]
            ]
        , br [] []
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "Guided by You Lord, grant that I may always allow myself to be guided by You, always follow Your plans, and perfectly accomplish Your Holy Will. Grant that in all things, great and small, today and all the days of my life, I may do whatever You require of me. Help me respond to the slightest prompting of Your Grace, so that I may be Your trustworthy instrument for Your honour. May Your Will be done in time and in eternity by me, in me, and through me. Amen." ]
                ]
            ]

        -- , viewAnotherEpisode carloEpisode "/animations/songsofthesaints/1/carloacutis"
        ]


carloVideoDescription : Html msg
carloVideoDescription =
    div []
        [ p []
            [ text "Join Carlo Acutis, to be canonized April 27, in a moment of his life."
            ]
        , br [] []
        , p []
            [ text "In this video, we see Carlo turn to prayer when he hits a snag in his website. He turns to one of his favorite saints, Saint Francis. Follow along in song as Carlo prays the famous Prayer of Peace."
            ]
        , br [] []
        , p []
            [ text "In the book, "
            , span [ class "italic" ] [ text "My Son Carlo" ]
            , text ", his mother writes, "
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "Websites were his passion. He had created various ones, and one in particular, about Eucharistic miracles, had gained worldwide acclaim. … Creating websites was his way of satisfying his great desire to proclaim the Good News to everyone. He was animated by an irrepressible desire to constantly bring the beauty of the contents of the Christian faith to light." ]
                ]
            ]
        , br [] []
        , p []
            [ text "She continues,"
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "Carlo was always an optimist. And even when everything seemed to be falling apart, he never stopped hoping and never gave in to resignation." ]
                ]
            ]
        , br [] []
        , p []
            [ text "Carlo's mom relates his spirit to the words of Saint Pope John Paul II, "
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-[#dfe6f7] dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "Do not abandon yourselves to despair. We are the Easter people and hallelujah is our song." ]
                ]
            ]
        , br [] []
        , p []
            [ text "May this animation inspire you to learn more about this incredible soon-to-be-saint. Or maybe even visit his tomb where his body rests in Assisi, Italy. Use this video as inspiration for your next meditative prayer. Carlo’s canonization may not be until April, but you can ask for his intercession any time!"
            ]
        , br [] []
        , p []
            [ text "Also, make sure to check out our sponsor, "
            , a [ href "https://notredamefcu.com/", class "underline decoration-sky-500" ] [ text "Notre Dame Federal Credit Union" ]
            , text "! We switched from a major bank to this Catholic credit union and love it! We love working with folks who also focus on service to others. They have helped us get our little business up and running smoothly. They also have the "
            , a [ href "https://notredamefcu.com/elevate-fundraising/", class "underline decoration-sky-500" ] [ text "ELEVATE suite" ]
            , text " of fundraising tools to help nonprofits."
            ]
        , a [ href "https://notredamefcu.com/" ]
            [ img [ src "/assets/images/NDFCULogo.png", alt "Notre Dame FCU Logo", class "bg-white rounded px-8 py-6 mt-4 w-96 mx-auto" ] []
            ]
        , br [] []
        , p []
            [ text "In our animation, we take the creative license of having Carlo turn to the prayer of Saint Francis of Assisi. We don’t know of anything written that mentions what Carlo did when he hit a problem with his websites. We know Carlo loved building websites. And we know Carlo faced his struggles with courage, with joy, and through Christ."
            ]
        , br [] []
        , p []
            [ text "I want to thank everyone who helped contribute to this video, whether through the creation itself, through donations, or through prayers. We are so grateful for you!"
            ]
        , br [] []
        , p []
            [ text "I pray this animation and song honors the incredible person of Carlo Acutis."
            ]
        , br [] []
        , p []
            [ text "If you would like to see more songs and animation like this, we would like to ask for you to consider helping us by donating, sharing our videos, or praying for us. Thank you!"
            ]
        , br [] []
        , donateWithZeffy

        -- , viewAnotherEpisode stThereseEpisode "/animations/songsofthesaints/1/saintthérèseoflisieux"
        ]


viewAnotherEpisode : Episode msg -> String -> Html msg
viewAnotherEpisode episode link =
    div
        [ class "mx-auto my-4 col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "font-bold leading-9" ] [ text episode.title ]
        , p [ class "my-10" ] [ text ("Make sure to also check our our " ++ episode.title ++ " Animation!") ]
        , a
            [ href link
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" ("See the " ++ episode.title ++ " animation")
            ]
            [ img
                [ src episode.thumbnail
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt (episode.title ++ " thumbnail")
                ]
                []
            ]
        ]
