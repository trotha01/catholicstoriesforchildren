module Footer exposing (..)

import Html.String exposing (..)
import Html.String.Attributes exposing (..)


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"


viewFooter : Html.String.Html Never
viewFooter =
    footer
        [ style "padding" (toPx 30)
        , style "background-color" "black"
        , style "color" "white"
        , style "transform-style" "preserve-3d"
        ]
        [ p [] [ text "Copyright © 2023 Catholic Stories for Children. All rights reserved." ]
        , p [] [ text "Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883" ]
        ]
