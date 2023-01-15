module FeastDayActivities.FeastDayHelpers exposing (..)


splitList : List x -> ( List x, List x )
splitList list =
    ( List.take (List.length list // 2) list
    , List.drop (List.length list // 2) list
    )
