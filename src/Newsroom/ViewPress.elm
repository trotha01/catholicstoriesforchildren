module Newsroom.ViewPress exposing (..)

import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers
import Team.Team exposing (viewPerson)
import Team.Testimonials exposing (ainsleyRawlingsTestimonial, camSmithTestimonial, kellyBriggsTestimonial, meganReisterTestimonial)
import Team.View exposing (cfnLive, christianChannel, inHisImage, makeJoyNormal, ocCatholic, spiritFilledMedia)


view : Html msg
view =
    div
        []
        [ viewSubpageHeader "Prayers" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html msg
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "p-10"
        ]
        [ viewTestimonials
        ]


viewTestimonials : Html msg
viewTestimonials =
    div
        [ class "py-20 bg-[#FEF7F4]"
        ]
        [ div [ class "w-full max-w-7xl mx-auto mb-20 px-4 sm:px-10 lg:px-20" ]
            [ h2 [ class "mb-10 text-3xl sm:text-5xl lg:text-7xl" ] [ text "Testimonials" ]
            , div
                [ class "grid gap-5"
                ]
                [ viewPerson ainsleyRawlingsTestimonial
                , viewPerson camSmithTestimonial
                , viewPerson meganReisterTestimonial
                , viewPerson kellyBriggsTestimonial
                ]
            , h3 [ class "mt-20 mb-10 text-5xl" ] [ text "In the Media" ]
            , div
                [ class "grid gap-5 grid-cols-3 lg:grid-cols-6" ]
                (List.map Resources.Helpers.viewResourceImages
                    [ spiritFilledMedia
                    , makeJoyNormal
                    , christianChannel
                    , ocCatholic
                    , inHisImage
                    , cfnLive
                    ]
                )
            ]
        ]
