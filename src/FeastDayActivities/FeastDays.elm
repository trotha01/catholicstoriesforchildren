module FeastDayActivities.FeastDays exposing (..)


months : List String
months =
    List.map .key feastDays


type alias FeastDay =
    { date : String, feasts : List String }


type alias FeastMonth =
    { key : String
    , month : String
    , feasts : List FeastDay
    , color : String
    }


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
                [ "Mary, Mother of God"
                ]
          }
        , { date = "02"
          , feasts =
                [ "Saint Basil"
                ]
          }
        , { date = "03"
          , feasts =
                [ "The Most Holy Name of Jesus"
                ]
          }
        , { date = "04"
          , feasts =
                [ "Saint Elizabeth Ann Seton"
                ]
          }
        , { date = "05"
          , feasts =
                [ "Saint John Newmann"
                ]
          }
        , { date = "06"
          , feasts =
                [ "Saint André Bessette"
                ]
          }
        , { date = "07"
          , feasts =
                [ "Saint Raymond of Penyafort"
                ]
          }
        , { date = "08"
          , feasts =
                [ "Epiphany of the Lord"
                ]
          }
        , { date = "09"
          , feasts =
                [ "Baptism of the Lord"
                ]
          }
        , { date = "13"
          , feasts =
                [ "Saint Hilary of Poitiers"
                ]
          }
        , { date = "17"
          , feasts =
                [ "Saint Anthony of Egypt"
                ]
          }
        , { date = "20"
          , feasts =
                [ "Saint Fabian"
                , "Saint Sebastian"
                ]
          }
        , { date = "21"
          , feasts =
                [ "Saint Agnes"
                ]
          }
        , { date = "23"
          , feasts =
                [ "Saint Vincent (US)"
                , "Saint Marianne Cope"
                , "Day of Prayer for the Legal Protection of Unborn Children"
                ]
          }
        , { date = "24"
          , feasts =
                [ "Saint Francis de Sales"
                ]
          }
        , { date = "25"
          , feasts =
                [ "The Conversion of Saint Paul"
                ]
          }
        , { date = "26"
          , feasts =
                [ "Saint Timothy and Titus"
                ]
          }
        , { date = "27"
          , feasts =
                [ "Saint Angela Merici"
                ]
          }
        , { date = "28"
          , feasts =
                [ "Saint Thomas Aquinas"
                ]
          }
        , { date = "31"
          , feasts =
                [ "Saint John Bosco"
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
                [ "Saint John Bosco"
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
