module Footer exposing (..)

import Html.String exposing (..)
import Html.String.Attributes exposing (..)


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"


viewFooter : Html.String.Html msg
viewFooter =
    footer
        [ style "padding" (toPx 30)
        , style "background-color" "black"
        , style "color" "white"
        , style "transform-style" "preserve-3d"
        ]
        [ div [ class "flex items-center gap-2.5" ]
            [ span [] [ text "Follow us on" ]
            , a
                [ href "https://www.facebook.com/catholicstoriesforchildren"
                , attribute "aria-label" "CSC Facebook Page"
                , target "_blank"
                ]
                [ img
                    [ class "w-10 h-10"
                    , src "https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"
                    , alt "Facebook"
                    ]
                    []
                ]
            , a
                [ href "https://www.instagram.com/catholicstoriesforchildren/"
                , attribute "aria-label" "CSC Instagram Page"
                , target "_blank"
                ]
                [ img
                    [ class "w-10 h-10"
                    , src "https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"
                    , alt "Instagram"
                    ]
                    []
                ]
            ]
        , p [] [ text "Copyright © 2023 Catholic Stories for Children. All rights reserved." ]
        , p [] [ text "Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883" ]
        ]
