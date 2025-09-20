module Theme.Layout exposing (headerMargin, pageLeftMargin, pageTopMargin, toPx)

import String


headerMargin : Int
headerMargin =
    10


pageLeftMargin : Int
pageLeftMargin =
    40


pageTopMargin : Int
pageTopMargin =
    40


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"
