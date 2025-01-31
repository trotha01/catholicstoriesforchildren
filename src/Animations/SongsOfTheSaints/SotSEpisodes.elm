module Animations.SongsOfTheSaints.SotSEpisodes exposing (..)

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


episodes : List (SotSEpisode msg)
episodes =
    [ { title = "Saint Thérèse of Lisieux"
      , thumbnail = "/assets/images/AnimationImageLinks/SotsTherese.png"
      , releaseDate = Time.millisToPosix 0
      , about = span [] []
      , videoTitles =
            { english = "Saint Therese | Songs of the Saints"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoLinks =
            { english = "https://www.youtube-nocookie.com/embed/_v_285ob5Rc"
            , spanish = ""
            , urdu = ""
            , asl = ""
            }
      , videoDescriptions =
            { english =
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
                        [ text "The series, Songs of the Saints, will let you encounter different saints. Each video opens with the Song of the Saints book. As you enter this book, you enter into an interment moment in the life of a saint."
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
                    ]
            , spanish = span [] []
            , urdu = span [] []
            , asl = span [] []
            }
      }
    ]
