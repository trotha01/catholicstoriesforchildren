module Resources.Books.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)
import Resources.Helpers exposing (..)


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Books" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Books" ]
        , viewAboutBooks
        , div [ class "my-10" ] [ viewSignUp ]
        , viewBooks
        , viewWorkInProgressNotice
        ]


viewAboutBooks : Html Never
viewAboutBooks =
    div []
        [ text "Find books here. It's hard to go wrong with a good Catholic book."
        ]


viewBooks : Html Never
viewBooks =
    div []
        (List.map viewResource
            [ thePursuitOfThePilferedCheese
            , saintsAroundTheWorld
            , catechismOfTheSevenSacraments
            ]
        )


thePursuitOfThePilferedCheese : Resource
thePursuitOfThePilferedCheese =
    { name = "The Pursuit of the Pilfered Cheese by Haley Stewart"
    , link = "https://www.amazon.com/Pursuit-Pilfered-Cheese-Haley-Stewart/dp/0819860514"
    , image = "https://ik.imagekit.io/catholicstories/Books/1_EoJL0GWQs.png?updatedAt=1679069222311"
    }


saintsAroundTheWorld : Resource
saintsAroundTheWorld =
    { name = "Saints Around the World by Meg Hunter-Kilmer"
    , link = "https://saintsaroundtheworld.com"
    , image = "https://ik.imagekit.io/catholicstories/Books/2_YPCg6X-7F.png?updatedAt=1679069222320"
    }


catechismOfTheSevenSacraments : Resource
catechismOfTheSevenSacraments =
    { name = "Catechism of the Seven Sacraments by Mary O'Neill Kevin O'Neill"
    , link = "https://www.amazon.com/Catechism-Seven-Sacraments-ONeill-Kevin/dp/0999508709/ref=sr_1_1?crid=2P68AEP6RA0O8&keywords=catechism+of+the+seven+sacraments&qid=1669329926&sprefix=catechism+of+the+seven+sacraments%2Caps%2C99&sr=8-1"
    , image = "https://ik.imagekit.io/catholicstories/Books/3_ibumLcYAy.png?updatedAt=1679069222330"
    }
