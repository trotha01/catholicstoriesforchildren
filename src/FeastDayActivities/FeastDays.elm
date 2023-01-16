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
    { date : String, feasts : List FeastActivities }


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


type Activity
    = Video VideoActivity
    | Reading ReadingActivity
    | Printout PrintoutActivity


type alias VideoActivity =
    { title : String, link : String }


type alias ReadingActivity =
    { title : String, image : String, link : String }


type alias PrintoutActivity =
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
                [ { feast = "Saint Fabian", activities = [] }
                , { feast = "Saint Sebastian", activities = [] }
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
                [ { feast = "Saint Thomas Aquinas", activities = [] }
                ]
          }
        , { date = "31"
          , feasts =
                [ { feast = "Saint John Bosco", activities = [] }
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
        [ { date = "01"
          , feasts =
                [ { feast = "Saint John Bosco", activities = [] }
                ]
          }
        ]
    }


march : FeastMonth
march =
    { key = "mar"
    , month = "March"
    , color = "#b99eda"
    , feasts = []
    }


april : FeastMonth
april =
    { key = "apr"
    , month = "April"
    , color = "#ebdf72"
    , feasts = []
    }


may : FeastMonth
may =
    { key = "may"
    , month = "May"
    , color = "#9de3ec"
    , feasts = []
    }


june : FeastMonth
june =
    { key = "jun"
    , month = "June"
    , color = "#395d73"
    , feasts = []
    }


july : FeastMonth
july =
    { key = "jul"
    , month = "July"
    , color = "#b99eda"
    , feasts = []
    }


august : FeastMonth
august =
    { key = "aug"
    , month = "August"
    , color = "#ebdf72"
    , feasts = []
    }


september : FeastMonth
september =
    { key = "sep"
    , month = "September"
    , color = "#9de3ec"
    , feasts = []
    }


october : FeastMonth
october =
    { key = "oct"
    , month = "October"
    , color = "#395d73"
    , feasts = []
    }


november : FeastMonth
november =
    { key = "nov"
    , month = "November"
    , color = "#b99eda"
    , feasts = []
    }


december : FeastMonth
december =
    { key = "dec"
    , month = "December"
    , color = "#ebdf72"
    , feasts = []
    }
