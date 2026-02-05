module Page.FeastDayActivities.FeastDays.M04Apr exposing (..)

import Page.FeastDayActivities.FeastDayHelpers exposing (ActivityType(..), FeastMonth)
import Page.FeastDayActivities.FeastDays.MovingFeasts exposing (..)


april : FeastMonth
april =
    { key = "apr"
    , month = "April"
    , color = "#ebdf72"
    , feasts =
        [ { date = "02"
          , feasts =
                [ holyThursdayFeast
                , { feast = "Saint Francis of Paola"
                  , activities =
                        [ { activityType = Video
                          , title = "St. Francis of Paola"
                          , link = "https://www.youtube-nocookie.com/embed/8SL_wCW_Srs"
                          , image = ""
                          , snippet = ""
                          }
                        , { activityType = OnlineReading
                          , title = "Saint Francis of Paola, Hermit"
                          , image = "https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg"
                          , link = "https://mycatholic.life/saints/saints-of-the-liturgical-year/april-2-saint-francis-of-paola-hermit/"
                          , snippet = "James Martotille and his bride wedded and lived in the town of Paola, in the southernmost region of Italy. During the first years of their marriage, they were unable to conceive a child. Being devout Catholics, they turned to prayer and beseeched the intercession of Saint Francis of Assisi..."
                          }
                        ]
                  }
                ]
          }
        , { date = "03"
          , feasts =
                [ goodFridayFeast
                ]
          }
        , { date = "04"
          , feasts =
                [ holySaturdayFeast
                , { feast = "Saint Isidore"
                  , activities =
                        [ { activityType = Audio
                          , title = "Saint Isidore of Seville’s Story"
                          , image = "https://ik.imagekit.io/catholicstories/FeastDayActivities/FranciscanMediaLogo_H3hNRUlza.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676251074960"
                          , link = "https://www.franciscanmedia.org/saint-of-the-day/saint-isidore-of-seville/"
                          , snippet = "The 76 years of Isidore’s life were a time of conflict and growth for the Church in Spain. The Visigoths had invaded the land a century and a half earlier, and shortly before Isidore’s birth they set up their own capital. They were Arians..."
                          }
                        , { activityType = OnlineReading
                          , title = "Saint Isidore, Bishop and Doctor of the Church"
                          , image = "https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg"
                          , link = "https://mycatholic.life/saints/saints-of-the-liturgical-year/april-4-saint-isidore-bishop-and-doctor-of-the-church/"
                          , snippet = "Isidore, a man of great distinction, bishop of the church of Seville, successor and brother of bishop Leander, flourished from the time of Emperor Maurice and King Reccared. In him antiquity reasserted itself..."
                          }
                        ]
                  }
                ]
          }
        , { date = "05"
          , feasts =
                [ easterSundayFeast
                , { feast = "Saint Vincent Ferrer"
                  , activities =
                        [ { activityType = OnlineReading
                          , title = "Saint Vincent Ferrer, Priest"
                          , image = "https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg"
                          , link = "https://mycatholic.life/saints/saints-of-the-liturgical-year/april-5-saint-vincent-ferrer-priest/"
                          , snippet = "It can be said that today’s saint lived two sequential lives. The first forty-nine years of his life were, in many ways, a preparation for the final twenty years of his life..."
                          }
                        ]
                  }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Saint John Baptist de la Salle"
                  , activities =
                        [ { activityType = OnlineReading
                          , title = "Saint John Baptist de la Salle, Priest"
                          , image = "https://mycatholic.life/wp-content/uploads/2021/08/My-Catholic-Life-MCL-Header.jpg"
                          , link = "https://mycatholic.life/saints/saints-of-the-liturgical-year/april-7-saint-john-baptist-de-la-salle-priest/"
                          , snippet = "Saint John Baptist de La Salle died on Good Friday, perhaps as a divine sign of the sacrificial life he had lived for the salvation of souls..."
                          }
                        ]
                  }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Stanislaus", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ divineMercySundayFeast
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Martin I", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Anselm of Canterbury", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint George", activities = [] }
                , { feast = "Saint Adalbert", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Fidelis of Sigmaringen", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Saint Mark the Evangelist", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Peter Chanel", activities = [] }
                , { feast = "Saint Louis Grignon de Montfort", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Saint Catherine of Siena", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "Pope Saint Pius V", activities = [] }
                ]
          }
        ]
    }
