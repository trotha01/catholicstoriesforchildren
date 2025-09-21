module Theme.Typography exposing (h1Style, h2Style, titleStyle)

import Html exposing (Attribute)
import Html.Attributes exposing (style)


h1Style : List (Attribute msg)
h1Style =
    titleStyle
        ++ [ style "margin-top" "2em"
           , style "line-height" "1em"
           ]


h2Style : List (Attribute msg)
h2Style =
    titleStyle
        ++ [ style "line-height" "1.1em"
           ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "text-align" "center"
    , style "font-family" "hvdComicSerifPro"
    ]
