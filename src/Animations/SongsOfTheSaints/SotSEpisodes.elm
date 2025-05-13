module Animations.SongsOfTheSaints.SotSEpisodes exposing (..)

import Animations.Helpers exposing (Episode, Season)
import Give.View exposing (donateWithZeffy)
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
    , josephEpisode
    ]


stThereseEpisode : Episode msg
stThereseEpisode =
    { title = "Saint Thérèse of Lisieux"
    , thumbnail = "/assets/images/AnimationImageLinks/SotsTherese.png"
    , releaseDate = Time.millisToPosix 0
    , isDisabled = False
    , isFundraising = False
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
    , isFundraising = False
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


josephEpisode : Episode msg
josephEpisode =
    { title = "Saint Joseph"
    , thumbnail = "/assets/images/AnimationImageLinks/SotsJoseph.png"
    , releaseDate = Time.millisToPosix 0
    , isDisabled = False
    , isFundraising = True
    , link = ""
    , about = josephVideoDescription
    , activities =
        { thumbnailLink = ""
        , pdfLink = ""
        , answerThumbnailLink = ""
        , answerPdfLink = ""
        }
    , videoTitles =
        { english = "Saint Joseph | Songs of the Saints"
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


imgClass : String
imgClass =
    "w-3/4 my-10 mx-auto"


josephVideoDescription : Html msg
josephVideoDescription =
    div [ class "max-w-3xl m-auto mt-20 px-5 2xl:px-0" ]
        [ h1 [ class "m-10" ] [ text "Bring our Saint Joseph Animation to Life" ]
        , img [ class "mb-10", src "/assets/images/AnimationImageLinks/SotsJoseph.png" ] []
        , h2 [] [ text "What We're Making and Why It Matters" ]
        , p []
            [ text """Every day, children search for heroes they can emulate. Lacking from modern media, children need heroes who lead with love, humility, and faith. In our new animated musical short, we bring Saint Joseph to life. In this heartfelt episode, we follow Saint Joseph—husband, father, and courageous protector—as he stands under the vast Egyptian night sky, burdened by the heavy responsibility of keeping the Holy Family safe from harm."""
            ]
        , br [] []
        , p []
            [ text "As Joseph pauses to find peace in a moment of exhaustion, he lovingly shares Mary's Magnificat, the sacred prayer that Mary proclaimed during her visitation with Elizabeth. Through his heartfelt singing, Joseph transforms worry into faith, fear into hope, and doubt into strength."
            ]
        , br [] []
        , p []
            [ a [ class "underline" ]
                [ text """Join us on Kickstarter"""
                ]
            , span [] [ text " to raise the funds needed to animate this moment in Saint Joseph's life." ]
            ]
        , br [] []
        , p []
            [ text "This animation seeks not only to entertain but also to spiritually nourish children, teaching them powerful lessons about prayer, trust in God, and courage during life's challenges. By supporting this project, you help bring to life meaningful Catholic storytelling that uplifts families, deepens faith, and offers beautiful role models of the saints."
            ]
        , br [] []
        , p []
            [ text """Your generosity ensures that more animations like "Songs of the Saints: Saint Joseph" reach families around the world, strengthening the faith of the next generation through beauty, truth, and goodness."""
            ]
        , donationButton "Support Our Next Animation"
        , br [] []
        , h2 [] [ text "Price Breakdown" ]
        , p []
            [ text """There are a number of costs with every animation, including the character design, background artwork, rigging, animation, sound effects and mix, directing, and marketing."""
            ]
        , br [] []
        , p []
            [ ul []
                [ li [] [ text "$4,400 - Pre-production (Character Design, Rigging, Background Artwork, Storyboards)" ]
                , li [] [ text "$9,550 - Production (Voice Acting and Singing, Animation, Sound Effects and Mix, Directing)" ]
                , li [] [ text "$500 - Marketing" ]
                ]
            , br [] []
            , p [] [ text "$14,450 - Total" ]
            , donationButton "Help Us Cover The Costs"
            ]
        , div [ class "mb-10" ] []
        , h2 [] [ text "Mary's Magnificat" ]
        , p []
            [ text """As evening fell over the vast desert, Joseph felt the weight of exhaustion bearing down upon him. The journey to Egypt had been arduous, the terrain unforgiving. Seeking solace, he quietly stepped away from their modest tent, mirroring the moments when Jesus Himself would later withdraw to solitary places to pray, as recorded in the Gospels (Luke 5:16, Mark 1:35). Joseph, like his divine foster son would one day model, turned his weary heart to God in quiet prayer beneath the star-filled sky."""
            ]
        , br [ class "mb-2" ] []
        , p []
            [ text """In this moment of solitude, Joseph's thoughts drifted to the words of Mary’s Magnificat (Luke 1:46-55), the powerful hymn she had proclaimed upon hearing the news of her divine motherhood. Each line echoed profoundly in his soul, reminding him of Mary's humility, trust, and joy in God's promises. He reflected deeply on Mary's chosen role, feeling the profound weight and honor of their collective calling. Joseph knew, with deepening clarity, that they too had been chosen by God for this sacred mission."""
            ]
        , br [] []
        , p []
            [ text """Through this contemplative prayer, inspired by Mary's song of praise, Joseph felt a renewed strength and consolation flooding his spirit. His doubts and fatigue eased, replaced by a serene certainty and purpose. Comforted by God's reassuring presence, Joseph rose from his knees, heartened and ready to continue their journey—secure in the knowledge that the same God who had chosen Mary had also chosen him to protect and care for the precious lives entrusted to his guardianship."""
            ]
        , donationButton "Bring the Magnificat Song to Life"
        , br [] []
        , h2 [] [ text "Pay it Forward" ]
        , p []
            [ text """Every donation allows a family to experience the beauty of the Catholic faith through animation. We are so grateful for your support!"""
            ]
        , donationButton "Pay it Forward"
        , div [ class "mb-10" ] []
        , h2 [] [ text "Calling all Star Wars Fans" ]
        , p []
            [ text """If you are a fan of Star Wars, and may notice some similarities in our designs. 
But not only Star Wars, also Lord of the Rings as well! Inspired by the epic sweep of Star Wars and the heart of Lord of the Rings, we fuse blockbuster energy with timeless Catholic devotion. Combining our love for film, pop culture, and also the historical representations of Saint Joseph with the reality of the exhaustion that comes from being a new dad
 (and taking a long journey through the desert), we get our inspired Saint Joseph design. This took many iterations, lots of research, and lots of prayer."""
            ]
        , br [] []
        , p [] [ text """The result is a bearded man with medium‑brown, shoulder‑length hair and warm tan skin. Saint Joseph has subtle dark circles under his eyes and a sturdy build.
Key character and costume details include: long hair like King Aragorn, green tunic which is traditional for Saint Joseph, worn over a light‑beige inner robe giving Jedi vibes flowing down to his sandaled feet, and a hammer holster at his waist like a saber or sword sheath which suggests his trade as a carpenter.
 Overall, the Biblical and pop‑culture reference blend create a friendly, approachable depiction of Saint Joseph for our animation.""" ]
        , br [] []
        , img [ class imgClass, src "/assets/images/JosephDesign.png", alt "Joseph Design Descriptions" ] []
        , h2 [] [ text "Saint Joseph" ]
        , p []
            [ text """As a righteous and just man, Joseph welcomed divine mystery into his life. His humility laid the foundation for extraordinary obedience. As protector and provider, he journeyed into the unknown to safeguard Mary and Jesus. His quiet strength teaches us that true courage often speaks in whispers, not shouts."""
            ]
        , br [] []
        , p []
            [ text """The flaming heart crowned with lilies is a traditional symbol for Saint Joseph and symbolizes his chaste heart and pure devotion. The carpenter’s hammer entwined with olive leaves honors both his trade and his trust in God’s plan. Our animation invites viewers to discover that heroism shines brightest in everyday acts of love, sacrifice, and faith."""
            ]
        , img [ class imgClass, src "/assets/images/JosephDescription.png", alt "Joseph Character Description" ] []
        , h2 [] [ text "Supporting this Animation" ]
        , p []
            [ text """By supporting our fundraiser, you become a co‑creator in this beautiful project. Your gift will help us animate a moment in Joseph’s journey: a moment of hardship from his Nazareth workshop to Egypt. Together, we can craft this musical short that inspires the next generation to embrace humility, courage, and trust in God—just as Saint Joseph did."""
            ]
        , donationButton "Support the Saint Joseph Animation"

        -- end
        , div [ class "mb-20 lg:mb-40" ] []
        ]


donationButton : String -> Html msg
donationButton str =
    a
        [ class "dbox-donation-page-button m-auto mt-10 bg-pink-600 no-underline font-sans flex text-lg px-8 py-4 rounded gap-2 w-fit leading-6"
        , class "shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"

        -- , href "https://www.zeffy.com/en-US/fundraisingV2/support-the-st-joseph-animation"
        , href "https://www.kickstarter.com/projects/catholicstories/saint-joseph-animation"
        , target "_blank"
        ]
        [ text str
        ]
