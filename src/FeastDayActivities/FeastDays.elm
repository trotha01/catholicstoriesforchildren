module FeastDayActivities.FeastDays exposing (..)


months : List String
months =
    List.map .key feastDays


type alias FeastMonth =
    { key : String
    , month : String
    , feasts : List FeastDay
    , color : String
    }


type alias FeastDay =
    { date : String
    , feasts : List FeastActivities
    }


type alias FeastActivities =
    { feast : String
    , activities : List Activity
    }


isVideo : Activity -> Bool
isVideo activity =
    case activity of
        Video _ ->
            True

        _ ->
            False


videoActivities : List Activity -> List VideoActivity
videoActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Video v ->
                        [ { title = v.title, link = v.link } ]

                    _ ->
                        []
            )


printoutActivities : List Activity -> List PrintoutActivity
printoutActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Printout v ->
                        [ { title = v.title, link = v.link, image = v.image } ]

                    _ ->
                        []
            )


readingActivities : List Activity -> List ReadingActivity
readingActivities activities =
    activities
        |> List.concatMap
            (\activity ->
                case activity of
                    Reading v ->
                        [ { title = v.title
                          , link = v.link
                          , image = v.image
                          , snippet = v.snippet
                          }
                        ]

                    _ ->
                        []
            )


type Activity
    = Video VideoActivity
    | Printout PrintoutActivity
    | Reading ReadingActivity
    | Food FoodActivity


type alias VideoActivity =
    { title : String, link : String }


type alias ReadingActivity =
    { title : String, image : String, link : String, snippet : String }


type alias PrintoutActivity =
    { title : String, image : String, link : String }


type alias FoodActivity =
    { title : String, image : String, link : String }


feastDays : List FeastMonth
feastDays =
    [ january
    , february
    , march
    , april
    , may
    , june
    , july
    , august
    , september
    , october
    , november
    , december
    ]


january : FeastMonth
january =
    { key = "jan"
    , month = "Janury"
    , color = "#9de3ec"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Mary, Mother of God", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "Saint Basil"
                  , activities =
                        [ Video { title = "Ss. Gregory & Basil", link = "https://youtu.be/lwe8voh3H_4" }
                        ]
                  }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "The Most Holy Name of Jesus", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Elizabeth Ann Seton", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint John Newmann", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Saint André Bessette", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Saint Raymond of Penyafort", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Epiphany of the Lord", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Baptism of the Lord", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Hilary of Poitiers", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Saint Anthony of Egypt", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Fabian"
                  , activities =
                        [ Reading
                            { title = "Saint Fabian’s Story"
                            , image = "https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg"
                            , link = "https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20"
                            , snippet = "Fabian was a Roman layman who came into the city from his farm one day as clergy and people were preparing to elect a new pope. Eusebius, a Church historian, says a dove flew in and settled on the head of Fabian..."
                            }
                        ]
                  }
                , { feast = "Saint Sebastian"
                  , activities =
                        [ Reading
                            { title = "Saint Sebastian’s Story"
                            , image = "https://static.wixstatic.com/media/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg/v1/fill/w_353,h_252,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/9c2964_5d2ddb6daf2a4cd68c4b7a2b77eb28e5~mv2.jpg"
                            , link = "https://www.saintsfeastfamily.com/copy-of-st-sebastian-jan-20-1"
                            , snippet = "Almost nothing is historically certain about Sebastian except that he was a Roman martyr, was venerated in Milan even in the time of Saint Ambrose and was buried on the Appian Way, probably near the present Basilica of St. Sebastian..."
                            }
                        ]
                  }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Agnes", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Vincent (US)", activities = [] }
                , { feast = "Saint Marianne Cope", activities = [] }
                , { feast = "Day of Prayer for the Legal Protection of Unborn Children", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Francis de Sales", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "The Conversion of Saint Paul", activities = [] }
                ]
          }
        , { date = "26"
          , feasts =
                [ { feast = "Saint Timothy and Titus", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Angela Merici", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Thomas Aquinas"
                  , activities = []
                  }
                ]
          }
        , { date = "31"
          , feasts =
                [ { feast = "Saint John Bosco"
                  , activities =
                        [ Video
                            { title = "My Catholic Family - Don Bosco"
                            , link = "https://www.youtube.com/watch?v=wejhGYOGLgE"
                            }
                        ]
                  }
                ]
          }
        ]
    }


february : FeastMonth
february =
    { key = "feb"
    , month = "February"
    , color = "#395d73"
    , feasts =
        [ { date = "02"
          , feasts =
                [ { feast = "Presentation of the Lord", activities = [] }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "St Blase", activities = [] }
                , { feast = "St Ansgar", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "St Agatha", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Sts Paul Miki and Companions", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Saint Jerome Emilani", activities = [] }
                , { feast = "Saint Josephine Bakhita", activities = [] }
                ]
          }
        , { date = "10"
          , feasts =
                [ { feast = "Saint Scholastica", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Our Lady of Lourdes", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saints Cyril, Monk, and Methodius", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Seven Holy Founders of the Servite Order", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Peter Damian", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Ash Wednesday", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Polycarp", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Gregory of Narek", activities = [] }
                ]
          }
        ]
    }


march : FeastMonth
march =
    { key = "mar"
    , month = "March"
    , color = "#b99eda"
    , feasts =
        [ { date = "03"
          , feasts =
                [ { feast = "Saint Katharine Drexel", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Casimir", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Saints Perpetua and Felicity", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Saint John of God", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Frances of Rome", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Saint Patrick", activities = [] }
                ]
          }
        , { date = "18"
          , feasts =
                [ { feast = "Saint Cyril of Jerusalem", activities = [] }
                ]
          }
        , { date = "19"
          , feasts =
                [ { feast = "Saint Joseph Husband of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Turibius of Mogrovejo", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Annunciation of the Lord", activities = [] }
                ]
          }
        ]
    }


april : FeastMonth
april =
    { key = "apr"
    , month = "April"
    , color = "#ebdf72"
    , feasts =
        [ { date = "02"
          , feasts =
                [ { feast = "Palm Sunday of the Lord's Passion", activities = [] }
                , { feast = "Saint Francis of Paola", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Isidore", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint Vincent Ferrer", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Holy Thursday", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Good Friday", activities = [] }
                , { feast = "Saint John Baptist de la Salle", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Holy Saturday", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Easter Sunday", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Stanislaus", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Martin I", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Divine Mercy Sunday", activities = [] }
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
                [ { feast = "Saint Pius V.", activities = [] }
                ]
          }
        ]
    }


may : FeastMonth
may =
    { key = "may"
    , month = "May"
    , color = "#9de3ec"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Saint Joseph the Worker", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "Saint Athanasius", activities = [] }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "Saints Philip and James", activities = [] }
                ]
          }
        , { date = "10"
          , feasts =
                [ { feast = "Saint Damien de Veuster of Moloka'i", activities = [] }
                , { feast = "Saint John of Ávila", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ { feast = "Saints Nereus and Achilleus", activities = [] }
                , { feast = "Saint Pancras", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Our Lady of Fatima", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saint Mattias the Apostle", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Saint Isidore", activities = [] }
                ]
          }
        , { date = "18"
          , feasts =
                [ { feast = "The Ascension of the Lord (or 21st)", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Bernardine of Siena", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "The Ascension of the Lord (or 18th)", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Saint Rita of Cascia", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Saint Bede the Venerable", activities = [] }
                , { feast = "Saint Gregory VII", activities = [] }
                ]
          }
        , { date = "26"
          , feasts =
                [ { feast = "Saint Philip Neri", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Augustine of Canterbury", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Pentecost Sunday", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Blessed Virgin Mary, Mother of the Church", activities = [] }
                , { feast = "Saint Paul VI", activities = [] }
                ]
          }
        , { date = "31"
          , feasts =
                [ { feast = "Visitation of the Blessed Virgin Mary", activities = [] }
                ]
          }
        ]
    }


june : FeastMonth
june =
    { key = "jun"
    , month = "June"
    , color = "#395d73"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Saint Justin Martyr", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "Saints Marcellinus and Peter", activities = [] }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "Saints Charles Lwanga and Companions", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "The Most Holy Trinity", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint Boniface", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Saint Norbert", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Ephrem", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "The Most Holy Body and Blood of Christ", activities = [] }
                , { feast = "Saint Barnabas the Apostle", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Anthony of Padua", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Sacred Heart of Jesus", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Immaculate Heart of Mary", activities = [] }
                ]
          }
        , { date = "19"
          , feasts =
                [ { feast = "Saint Romuald", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Aloysius Gonzaga", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Saint Paulinus of Nola", activities = [] }
                , { feast = "Saint John Fisher", activities = [] }
                , { feast = "Saint Thomas More", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Birth of Saint John the Baptist", activities = [] }
                ]
          }
        , { date = "26"
          , feasts =
                [ { feast = "Saint Josemaría Escrivá", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Cyril of Alexandria", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Irenaeus", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Saints Peter and Paul", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "First Martyrs of the Church of Rome", activities = [] }
                ]
          }
        ]
    }


july : FeastMonth
july =
    { key = "jul"
    , month = "July"
    , color = "#b99eda"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Saint Junipero Serra", activities = [] }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "Saint Thomas the Apostle", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Elizabeth of Portugal (5th in the US)", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint Anthony Zaccaria", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Saint Maria Goretti", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Augustine Zhao Rong and Companion", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Benedict", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Henry", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saint Camillus de Lellis (18th in the US)", activities = [] }
                , { feast = "Saint Kateri Tekakwitha", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Saint Bonaventure", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Our Lady of Mount Carmel", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Apollinaris", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Lawrence of Brindisi", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Saint Mary Magdalene", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Bridget of Sweden", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Sharbel Makhlūf", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Saint James", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Saints Martha, Mary and Lazarus", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "Saint Peter Chrysologus", activities = [] }
                ]
          }
        , { date = "31"
          , feasts =
                [ { feast = "Saint Ignatius of Loyola", activities = [] }
                ]
          }
        ]
    }


august : FeastMonth
august =
    { key = "aug"
    , month = "August"
    , color = "#ebdf72"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Saint Alphonsus Maria de Liguori", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "Saint Eusebius of Vercelli", activities = [] }
                , { feast = "Saint Peter Julian Eymard", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Jean Vianney (the Curé of Ars)", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Dedication of the Basilica of Saint Mary Major", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Transfiguration of the Lord", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Saint Sixtus II, Pope and Martyr", activities = [] }
                , { feast = "Saint Cajetan", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Saint Dominic", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Teresa Benedicta of the Cross (Edith Stein)", activities = [] }
                ]
          }
        , { date = "10"
          , feasts =
                [ { feast = "Saint Lawrence", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Clare", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ { feast = "Saint Jane Frances de Chantal", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saints Pontian, Pope and Hippoloytus", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saint Maximilian Mary Kolbe", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Assumption of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Saint Stephen of Hungary", activities = [] }
                ]
          }
        , { date = "19"
          , feasts =
                [ { feast = "Saint John Eudes", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Bernard of Clairvaux", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Pius X", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Queenship of Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Rose of Lima", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Bartholomew the Apostle", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Saint Louis", activities = [] }
                , { feast = "Saint Joseph of Calasanz", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Monica", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Augustine of Hippo", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "The Passion of Saint John the Baptist", activities = [] }
                ]
          }
        ]
    }


september : FeastMonth
september =
    { key = "sep"
    , month = "September"
    , color = "#9de3ec"
    , feasts =
        [ { date = "03"
          , feasts =
                [ { feast = "Saint Gregory the Great, Pope and Doctor", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint Mother Teresa of Calcutta", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Birth of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Peter Claver", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ { feast = "Holy Name of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint John Chrysostom, Bishop and Doctor", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Exaltation of the Holy Cross", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Our Lady of Sorrows", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Saint Cornelius, Pope", activities = [] }
                , { feast = "Saint Cyprian, Bishop", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Saint Hildegard of Bingen, Virgin and Doctor of the Church", activities = [] }
                ]
          }
        , { date = "19"
          , feasts =
                [ { feast = "Saint Januarius, Bishop and Martyr", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Andrew Kim Tae-gŏn, Priest", activities = [] }
                , { feast = "Saint Paul Chŏng Ha-sang, and Companions, Martyrs", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Matthew the Evangelist, Apostle", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Pio of Pietrelcina, Priest", activities = [] }
                ]
          }
        , { date = "26"
          , feasts =
                [ { feast = "Saint Cosmas; Saint Damian, Martyrs", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint Vincent de Paul, Priest", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Wenceslaus, Martyr", activities = [] }
                , { feast = "Saint Lawrence Ruiz and Companions, Martyrs", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Saints Michael, Gabriel and Raphael, Archangels", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "Saint Jerome, Priest and Doctor", activities = [] }
                ]
          }
        ]
    }


october : FeastMonth
october =
    { key = "oct"
    , month = "October"
    , color = "#395d73"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "Saint Therese of the Child Jesus", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "Guardian Angels", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Francis of Assisi", activities = [] }
                ]
          }
        , { date = "05"
          , feasts =
                [ { feast = "Saint Faustina Kowalska", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Saint Bruno", activities = [] }
                , { feast = "Blessed Marie Rose Durocher", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Our Lady of the Rosary", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint John Henry Newman", activities = [] }
                , { feast = "Saint Denis", activities = [] }
                , { feast = "Saint John Leonardi", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint John Paul XXIII", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saint Callistus I", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Saint Teresa of Jesus", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Saint Hedwig", activities = [] }
                , { feast = "Saint Margaret Mary Alacoque", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Saint Ignatius of Antioch", activities = [] }
                ]
          }
        , { date = "18"
          , feasts =
                [ { feast = "Saint Luke the Evangelist", activities = [] }
                ]
          }
        , { date = "19"
          , feasts =
                [ { feast = "Saints Jean de Bébeuf, Isaac Jogues, Priests and Martyrs; and their Companions", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Saint Paul of the Cross", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Saint John Paul II", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint John of Capistrano", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Anthony Mary Claret", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Saint Simon and Saint Jude", activities = [] }
                ]
          }
        ]
    }


november : FeastMonth
november =
    { key = "nov"
    , month = "November"
    , color = "#b99eda"
    , feasts =
        [ { date = "01"
          , feasts =
                [ { feast = "All Saints", activities = [] }
                ]
          }
        , { date = "02"
          , feasts =
                [ { feast = "All Souls Day", activities = [] }
                ]
          }
        , { date = "03"
          , feasts =
                [ { feast = "Saint Martin de Porres", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint Charles Borromeo", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Dedication of the Lateran Basilica", activities = [] }
                ]
          }
        , { date = "10"
          , feasts =
                [ { feast = "Saint Leo the Great", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Martin of Tours", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ { feast = "Saint Josaphat", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Frances Xavier Cabrini", activities = [] }
                ]
          }
        , { date = "15"
          , feasts =
                [ { feast = "Saint Albert the Great", activities = [] }
                ]
          }
        , { date = "16"
          , feasts =
                [ { feast = "Saint Margaret of Scotland", activities = [] }
                , { feast = "Saint Gertrude the Great", activities = [] }
                ]
          }
        , { date = "17"
          , feasts =
                [ { feast = "Saint Elizabeth of Hungary", activities = [] }
                ]
          }
        , { date = "18"
          , feasts =
                [ { feast = "Dedication of the Basilicas of Saints Peter and Paul", activities = [] }
                , { feast = "Saint Rose Philippine Duchesne", activities = [] }
                ]
          }
        , { date = "20"
          , feasts =
                [ { feast = "Our Lord Jesus Christ, King of the Universe - Solemnity", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Presentation of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "22"
          , feasts =
                [ { feast = "Saint Cecilia", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint Clement I", activities = [] }
                , { feast = "Blessed Miguel Agustín Pro", activities = [] }
                , { feast = "Saint Columban", activities = [] }
                ]
          }
        , { date = "24"
          , feasts =
                [ { feast = "Saint Andrew Dung-Lac, Priest and his Companions", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Saint Catherine of Alexandria", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "Saint Andrew the Apostle", activities = [] }
                ]
          }
        ]
    }


december : FeastMonth
december =
    { key = "dec"
    , month = "December"
    , color = "#ebdf72"
    , feasts =
        [ { date = "03"
          , feasts =
                [ { feast = "Saint Francis Xavier", activities = [] }
                ]
          }
        , { date = "04"
          , feasts =
                [ { feast = "Saint John Damascene", activities = [] }
                ]
          }
        , { date = "06"
          , feasts =
                [ { feast = "Saint Nicholas", activities = [] }
                ]
          }
        , { date = "07"
          , feasts =
                [ { feast = "Saint Ambrose", activities = [] }
                ]
          }
        , { date = "08"
          , feasts =
                [ { feast = "Immaculate Conception of the Blessed Virgin Mary", activities = [] }
                ]
          }
        , { date = "09"
          , feasts =
                [ { feast = "Saint Juan Diego", activities = [] }
                ]
          }
        , { date = "10"
          , feasts =
                [ { feast = "Our Lady of Loreto", activities = [] }
                ]
          }
        , { date = "11"
          , feasts =
                [ { feast = "Saint Damasus I", activities = [] }
                ]
          }
        , { date = "12"
          , feasts =
                [ { feast = "Our Lady of Guadalupe", activities = [] }
                ]
          }
        , { date = "13"
          , feasts =
                [ { feast = "Saint Lucy of Syracuse", activities = [] }
                ]
          }
        , { date = "14"
          , feasts =
                [ { feast = "Saint John of the Cross", activities = [] }
                ]
          }
        , { date = "21"
          , feasts =
                [ { feast = "Saint Peter Canisius", activities = [] }
                ]
          }
        , { date = "23"
          , feasts =
                [ { feast = "Saint John of Kanty", activities = [] }
                ]
          }
        , { date = "25"
          , feasts =
                [ { feast = "Nativity of the Lord", activities = [] }
                ]
          }
        , { date = "26"
          , feasts =
                [ { feast = "Saint Stephen", activities = [] }
                ]
          }
        , { date = "27"
          , feasts =
                [ { feast = "Saint John the Apostle and Evangelist", activities = [] }
                ]
          }
        , { date = "28"
          , feasts =
                [ { feast = "Holy Innocents", activities = [] }
                ]
          }
        , { date = "29"
          , feasts =
                [ { feast = "Saint Thomas Becket", activities = [] }
                ]
          }
        , { date = "30"
          , feasts =
                [ { feast = "The Holy Family of Jesus, Mary, and Joseph", activities = [] }
                ]
          }
        , { date = "31"
          , feasts =
                [ { feast = "Saint Sylvester I", activities = [] }
                ]
          }
        ]
    }
