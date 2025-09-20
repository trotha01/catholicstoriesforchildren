module Page.FeastDayActivities.FeastDays exposing (..)

import Page.FeastDayActivities.FeastDayHelpers exposing (..)
import Page.FeastDayActivities.FeastDays.M01Jan exposing (january)
import Page.FeastDayActivities.FeastDays.M02Feb exposing (february)
import Page.FeastDayActivities.FeastDays.M03Mar exposing (march)
import Page.FeastDayActivities.FeastDays.M04Apr exposing (april)
import Page.FeastDayActivities.FeastDays.M05May exposing (may)
import Page.FeastDayActivities.FeastDays.M06Jun exposing (june)
import Page.FeastDayActivities.FeastDays.M07Jul exposing (july)
import Page.FeastDayActivities.FeastDays.M08Aug exposing (august)
import Page.FeastDayActivities.FeastDays.M09Sep exposing (september)
import Page.FeastDayActivities.FeastDays.M10Oct exposing (october)
import Page.FeastDayActivities.FeastDays.M11Nov exposing (november)
import Page.FeastDayActivities.FeastDays.M12Dec exposing (december)


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
