module Page.Animations.GigglesAndGrace.GAGEpisodes exposing (..)

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
    [ { title = "Giggles and Grace: Thank You Lord – A Joyful Musical About Morning Thanks and Gratitude to God"
      , thumbnail = "/assets/images/AnimationImageLinks/GigglesAndGrace.webp"
      , releaseDate = Time.millisToPosix 0
      , isDisabled = False
      , isFundraising = False
      , link = "/animations/gigglesandgraceshow"
      , about =
            div []
                [ aboutTheAnimation
                , Signup.view4
                ]
      , activities =
            { thumbnailLink = ""
            , pdfLink = ""
            , answerThumbnailLink = ""
            , answerPdfLink = ""
            }
      , videoTitles =
            { english = "Thank You Lord"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube.com/embed/videoseries?si=XYQhWXRqpZt3xVRu&amp;list=PL0_XgmxOXie_fE6aRjAfgxF7ngGP66fcZ&loop=1&autoplay=1"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , year = "2025"
      , duration = "3 min"
      }
    ]


-- OUTLINE MODEL


type alias OutlineEntry =
    { level : Int
    , title : String
    }


outline : List OutlineEntry
outline =
    [ { level = 1, title = "Giggles and Grace: Thank You Lord – A Joyful Musical About Morning Thanks and Gratitude to God" }
    , { level = 2, title = "Introduction: A Melody of Faith and Gratitude" }
    , { level = 3, title = "The Heart of Thank You Lord: A Musical Message of Hope" }
    , { level = 2, title = "Plot Overview: Giving Thanks in Every Season" }
    , { level = 3, title = "Morning Thanks: Waking Up with Gratitude" }
    , { level = 3, title = "Getting Ready for Mass: A Family’s Sunday Morning Journey" }
    , { level = 3, title = "When Things Go Wrong: Finding Joy in Imperfection" }
    , { level = 2, title = "The Music of Gratitude: Songs that Lift the Soul" }
    , { level = 3, title = "The “Thank You Lord” Song: A Gratitude Anthem" }
    , { level = 3, title = "Gratitude Songwriting: Turning Prayers into Music" }
    , { level = 2, title = "Gratitude in Scripture: Lessons that Inspire the Story" }
    , { level = 3, title = "Biblical Foundations of Thanksgiving" }
    , { level = 3, title = "Gratitude Prayer to God: From the Psalms to Modern Life" }
    , { level = 2, title = "Animation with Purpose: Bringing Faith to Life for Children" }
    , { level = 3, title = "The Visual Style of Giggles and Grace" }
    , { level = 3, title = "How the Characters Teach Morning Gratitude" }
    , { level = 2, title = "Behind the Scenes: The Creative Journey of Thank You Lord" }
    , { level = 3, title = "Inspiration and Concept Development" }
    , { level = 3, title = "Blending Faith, Humor, and Heart" }
    , { level = 2, title = "The Power of a Thank You Lord Prayer in Daily Life" }
    , { level = 3, title = "A Simple Morning Thanks Ritual" }
    , { level = 3, title = "Gratitude in Family Life and Worship" }
    , { level = 2, title = "Impact: How Giggles and Grace Inspires Viewers of All Ages" }
    , { level = 3, title = "Building Faith Through Fun" }
    , { level = 3, title = "Encouraging Thankfulness Beyond the Screen" }
    , { level = 2, title = "FAQs about Giggles and Grace: Thank You Lord" }
    , { level = 2, title = "Conclusion: Singing Thank You Lord in Every Moment" }
    ]



-- VIEW HELPERS


heading : Int -> String -> Html msg
heading lvl title =
    case lvl of
        1 ->
            h1 [ class "mb-6" ] [ text title ]

        2 ->
            h2 [ class "mb-4 mt-12 leading-relaxed" ] [ text title ]

        3 ->
            h3 [ class "mb-4 mt-8 font-bold" ] [ text title ]

        _ ->
            h3 [ class "mb-4 mt-8" ] [ text title ]


sep : Html msg
sep =
    div [ class "my-8 border-t border-gray-200" ] []


para : String -> Html msg
para s =
    p [ class "mb-6" ] [ text s ]


viewOutlineTable : Html msg
viewOutlineTable =
    div []
        [ heading 3 "🧭 Comprehensive Outline Table"
        , table []
            [ thead []
                [ tr []
                    [ th [] [ text "Heading Level" ]
                    , th [] [ text "Outline Section" ]
                    ]
                ]
            , tbody []
                (List.map
                    (\e ->
                        tr []
                            [ td [] [ text <| "H" ++ String.fromInt e.level ]
                            , td [] [ text e.title ]
                            ]
                    )
                    outline
                )
            ]
        ]



-- ARTICLE CONTENT


aboutTheAnimation : Html msg
aboutTheAnimation =
    div []
        [ -- Introduction
          heading 2 "Introduction: A Melody of Faith and Gratitude"
        , para "The animated short film Giggles and Grace: Thank You Lord invites viewers into a world filled with light, laughter, and song. It’s not just a musical—it’s a prayer in motion. This special episode teaches the beauty of morning thanks and gratitude to God, even when the comb gets stuck, shoes go missing, or a broken down car slows you down. Through catchy melodies and tender storytelling, the film reminds us that grace often hides in life’s small, imperfect moments."
        , para "At its heart, Thank You Lord captures the simple joy of saying “thank you, God” for everything—the sunshine and the storms alike."
        , sep

        -- Heart section
        , heading 3 "The Heart of Thank You Lord: A Musical Message of Hope"
        , para "Every Giggles and Grace episode carries a moral woven with music, but Thank You Lord strikes a special chord. The story unfolds as the family prepares for Sunday Mass—a day meant for reflection and renewal. Yet, chaos brews: slipping on skateboards, breakfast food fights, and missing shoes. Amid the small frustrations, we sing a tune of gratitude. An innocent song transforms the morning from hurried to holy."
        , para "The episode reveals a profound truth: worship begins long before stepping into church—it starts with morning gratitude."
        , sep

        -- Plot
        , heading 2 "Plot Overview: Giving Thanks in Every Season"
        , heading 3 "Morning Thanks: Waking Up with Gratitude"
        , para "The film opens with the family waking up to a bright, slightly messy morning. Instead of grumbling, they begin their day with a thank you prayer—a cheerful chant of thanks for the sun rising in the morning, the birds singing at the window, and the new day. It’s a moment that shows how a simple habit of morning thanks can shift the mood of an entire day."
        , heading 3 "Getting Ready for Mass: A Family’s Sunday Morning Journey"
        , para "While dressing up and searching for shoes, this family reminds each other to stay calm and thankful. The parents lead the kids in grateful prayer to God, showing that faith isn’t just about rituals—it’s about grace under pressure and laughter in chaos."
        , heading 3 "When Things Go Wrong: Finding Joy in Imperfection"
        , para "The climax arrives when everything seems to fall apart—they make it out of the house, yet the car breaks down. Instead of giving up, the family sings the “Thank You Lord” song, choosing joy over frustration. The lesson is luminous: gratitude is most powerful when life is least perfect."
        , sep

        -- Music
        , heading 2 "The Music of Gratitude: Songs that Lift the Soul"
        , heading 3 "The “Thank You Lord” Song: A Gratitude Anthem"
        , para "At the film’s emotional peak, the family joins voices in a lively gratitude song that celebrates faith and family. Its refrain—“Thank You, Lord!”—echoes the psalms of thanksgiving and invites viewers to sing along. The melody lingers long after the credits roll, inspiring real-life moments of worship."
        , heading 3 "Gratitude Songwriting: Turning Prayers into Music"
        , para "Behind the scenes, the songwriters drew inspiration from real morning routines, turning small frustrations into lyrical blessings. Their goal: to make children and adults alike hum their thank you Lord prayer on their way to school, work, or Church."
        , sep

        -- Scripture
        , heading 2 "Gratitude in Scripture: Lessons that Inspire the Story"
        , heading 3 "Biblical Foundations of Thanksgiving"
        , para "The story of Thank You Lord echoes scriptural truths found in 1 Thessalonians 5:18—“Give thanks in all circumstances.” This verse anchors the episode’s theme: gratitude isn’t optional or situational—it’s transformational."
        , heading 3 "Gratitude Prayer to God: From the Psalms to Modern Life"
        , para "Psalms like 100 and 118 remind us to “Enter His gates with thanksgiving.” The film translates these timeless verses into animation and melody, bridging ancient scripture and modern storytelling. Each frame, each lyric, becomes a living thank you prayer."
        , sep

        -- Animation with purpose
        , heading 2 "Animation with Purpose: Bringing Faith to Life for Children"
        , heading 3 "The Visual Style of Giggles and Grace"
        , para "The animation bursts with color and movement, designed to reflect the warmth of divine joy. Every sunbeam and giggle is a brushstroke of God’s light, inviting children into the world of faith through laughter."
        , heading 3 "How the Characters Teach Morning Gratitude"
        , para "The family's boundless optimism and nurturing wisdom make for a perfect model. Their actions embody morning gratitude, showing that even small acts—like helping a sibling—can be prayers of thanks."
        , sep

        -- Behind the scenes
        , heading 2 "Behind the Scenes: The Creative Journey of Thank You Lord"
        , heading 3 "Inspiration and Concept Development"
        , para "The creators wanted a story that felt both relatable and sacred. The everyday chaos of getting ready for Mass became the perfect canvas for a faith-filled comedy."
        , heading 3 "Blending Faith, Humor, and Heart"
        , para "Unlike traditional religious shows, Giggles and Grace uses humor as a vessel for theology. The laughter isn’t separate from faith—it’s part of it."
        , sep

        -- Daily life
        , heading 2 "The Power of a Thank You Lord Prayer in Daily Life"
        , heading 3 "A Simple Morning Thanks Ritual"
        , para "The film encourages viewers to begin each day with a few simple words: “Thank you, Lord.” Whether over breakfast or during a commute, this daily gratitude turns ordinary routines into sacred rhythms."
        , heading 3 "Gratitude in Family Life and Worship"
        , para "By sharing morning thanks together, families strengthen both their faith and their bond. Gratitude becomes a shared song, a tradition that extends beyond Sunday."
        , sep

        -- Impact
        , heading 2 "Impact: How Giggles and Grace Inspires Viewers of All Ages"
        , heading 3 "Building Faith Through Fun"
        , para "Children learn theology best through story and song. Thank You Lord turns faith lessons into joyful, memorable experiences that stick."
        , heading 3 "Encouraging Thankfulness Beyond the Screen"
        , para "Parents report that their kids start singing the thank you God tune at breakfast or bedtime. The story lives on—not just as entertainment, but as devotion."
        , sep

        -- FAQs
        , heading 2 "FAQs about Giggles and Grace: Thank You Lord"
        , ol [ class "list-decimal list-inside space-y-6" ]
            [ li []
                [ strong [] [ text "What is the main message of the episode?" ]
                , p [ class "mt-2" ] [ text "It teaches children (and adults) to thank God in every situation, even when life feels messy or hard." ]
                ]
            , li []
                [ strong [] [ text "Is the \"Thank You Lord\" song available for download or streaming?" ]
                , p [ class "mt-2" ] [ text "Not at the moment, it is currently only available on YouTube." ]
                ]
            , li []
                [ strong [] [ text "How does the show incorporate Scripture?" ]
                , p [ class "mt-2" ] [ text "Each episode draws from biblical themes like gratitude, kindness, and forgiveness—woven naturally into songs and stories." ]
                ]
            , li []
                [ strong [] [ text "Who is the target audience?" ]
                , p [ class "mt-2" ] [ text "Families with children ages 2+, though its message resonates with all ages." ]
                ]
            , li []
                [ strong [] [ text "What inspired the creators to focus on gratitude?" ]
                , p [ class "mt-2" ] [ text "They wanted to remind viewers that gratitude is the heartbeat of faith, especially during life's small challenges." ]
                ]
            , li []
                [ strong [] [ text "How can parents use this episode for family devotion?" ]
                , p [ class "mt-2" ] [ text "By watching together and discussing what they're thankful for each morning or after Mass." ]
                ]
            ]
        , sep

        -- Conclusion
        , heading 2 "Conclusion: Singing Thank You Lord in Every Moment"
        , para "Giggles and Grace: Thank You Lord transforms everyday chaos into holy celebration. Its message is timeless: gratitude isn’t just something you feel—it’s something you live and sing. In every burned breakfast, missed bus, or rainy morning, there’s still room to say, “Thank you, Lord.”"
        , para "Faith, after all, begins with a song of thanks."
        , sep

        -- External Link (commonly used Catholic Online Daily Prayers URL)
        , div []
            [ strong [] [ text "Blog posts:" ]
            , ul [ class "space-y-2" ]
                [ li [] [ a [ Html.Attributes.href "https://blog.claritasstudios.com/p/its-here-giggles-and-grace-is-now", class "underline" ]
                        [ text "🎉 It’s Here! Giggles & Grace is Now Out! 🎉" ]
                    ]
                , li [] [ a [ Html.Attributes.href "https://blog.claritasstudios.com/p/what-happens-when-mass-meets-music", class "underline" ]
                        [ text "What Happens When Mass Meets Music and Giggles?" ]
                    ]
                , li [] [ a [ Html.Attributes.href "https://blog.claritasstudios.com/p/giggles-and-grace-catholic-musical", class "underline" ]
                        [ text "Giggles & Grace Catholic Musical Short for Kids Inspired by Family Life" ]
                    ]
                , li [] [ a [ Html.Attributes.href "https://blog.claritasstudios.com/p/behind-the-scenes-how-our-sing-along", class "underline" ]
                        [ text "Behind the Scenes: How Our Sing-Along Animation Came to Life" ]
                    ]
                ]
            ]
        ]
