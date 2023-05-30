module Saints.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Saints.SaintList exposing (Saint, saints)



-- MAIN


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        []
        [ viewSubpageHeader "Contact" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "p-10"
        ]
        [ h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "List of Saints and Blesseds" ]
        , viewSaints
        ]


viewSaints : Html Never
viewSaints =
    div []
        [ div [ class "mb-10" ]
            [ p [] [ text "This is an extensive but not exhaustive list of the saints and blesseds recognized by the Catholic Church." ]
            , p []
                [ span [] [ text "Information about these saints can be found at " ]
                , a
                    [ href "https://www.catholic.org/saints/stindex.php"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "Catholic Online"
                    ]
                    [ text "Catholic Online" ]
                , span [] [ text ", " ]
                , a
                    [ href "https://mycatholic.life/saints/"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "My Catholic Lif"
                    ]
                    [ text "My Catholic Life" ]
                , span [] [ text ", or " ]
                , a
                    [ href "https://catholicsaints.info/"
                    , rel "noopener"
                    , target "_blank"
                    , class "underline"
                    , attribute "aria-label" "Catholic Saints Info"
                    ]
                    [ text "Catholic Saints Info" ]
                ]
            ]
        , div [] (List.map viewSaint saints)
        ]


viewSaint : Saint -> Html msg
viewSaint saint =
    div []
        [ a
            [ href saint.catholicSaintsLink
            , attribute "aria-label" saint.name
            , target "_blank"
            ]
            [ text saint.name ]
        ]
