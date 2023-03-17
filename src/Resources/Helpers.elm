module Resources.Helpers exposing (..)

import Html.String exposing (..)
import Html.String.Attributes exposing (..)


type alias Resource =
    { name : String
    , link : String
    , image : String
    }


viewResource : Resource -> Html msg
viewResource resource =
    a
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded py-7"
        , target "_blank"
        , attribute "aria-label" resource.name
        , href resource.link
        ]
        [ div []
            [ img [ src resource.image, class "w-20 h-20 object-cover" ] []
            ]
        , div []
            [ h2 [] [ text resource.name ]

            -- , p [] [ text resourceGroup.description ]
            ]
        ]


viewWorkInProgressNotice : Html msg
viewWorkInProgressNotice =
    div
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded py-7"
        ]
        [ div []
            [ img [ src "https://ik.imagekit.io/catholicstories/Construction_Cone_vLoPMhMZBm.png?updatedAt=1679070884463", class "w-20 h-20 object-cover" ] []
            ]
        , div []
            [ p [] [ text "This page is a work-in-progress. We are working hard on adding resources this page for you." ]
            ]
        ]
