module FeastDayActivities.FeastDays exposing (..)

import FeastDayActivities.FeastDayHelpers exposing (..)
import FeastDayActivities.FeastDays.M01Jan exposing (january)
import FeastDayActivities.FeastDays.M02Feb exposing (february)
import FeastDayActivities.FeastDays.M03Mar exposing (march)
import FeastDayActivities.FeastDays.M04Apr exposing (april)
import FeastDayActivities.FeastDays.M05May exposing (may)
import FeastDayActivities.FeastDays.M06Jun exposing (june)
import FeastDayActivities.FeastDays.M07Jul exposing (july)
import FeastDayActivities.FeastDays.M08Aug exposing (august)
import FeastDayActivities.FeastDays.M09Sep exposing (september)
import FeastDayActivities.FeastDays.M10Oct exposing (october)
import FeastDayActivities.FeastDays.M11Nov exposing (november)
import FeastDayActivities.FeastDays.M12Dec exposing (december)


months : List String
months =
    List.map .key feastDays


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
