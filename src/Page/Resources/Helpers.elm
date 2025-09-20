module Page.Resources.Helpers exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


type alias Resource =
    { name : String
    , link : String
    , image : String
    }


type alias ResourceGroup =
    { name : String
    , image : String
    , description : String
    , link : String
    , resources : List Resource
    }


viewResource : Resource -> Html msg
viewResource resource =
    a
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"
        , target "_blank"
        , attribute "aria-label" resource.name
        , href resource.link
        ]
        [ div []
            [ img [ src resource.image, class "w-20 h-20 object-cover" ] []
            ]
        , div []
            [ h2 [ class "leading-10" ] [ text resource.name ]

            -- , p [] [ text resourceGroup.description ]
            ]
        ]


viewResourceImages : Resource -> Html msg
viewResourceImages resource =
    a
        [ class "rounded"
        , target "_blank"
        , attribute "aria-label" resource.name
        , href resource.link
        ]
        [ div []
            [ img [ src resource.image, class "w-24 h-24 sm:w-40 sm:h-40 object-cover" ] []
            ]
        ]
