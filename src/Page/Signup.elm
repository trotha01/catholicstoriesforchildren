port module Page.Signup exposing (..)

import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Http


type alias Model =
    { email : String
    , message : String
    , isLoading : Bool
    }


init : Model
init =
    { email = ""
    , message = ""
    , isLoading = False
    }


type Msg
    = FormSubmitted (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FormSubmitted (Ok _) ->
            ( { model
                | isLoading = False

                -- , message = response
                , message = "Email sent!"
              }
            , Cmd.batch [ gtagReportConversion "", Nav.load "/thankyou" ]
            )

        FormSubmitted (Err _) ->
            -- TODO: give more specific error
            ( { model
                | isLoading = False
                , message = "Error: please try again later"
              }
            , Cmd.none
            )


view2 : Html msg
view2 =
    div
        [ class "mb-5 bg-white text-black" ]
        [ p
            [ class "pb-2 pt-4 pl-1 m-auto text-center max-w-7xl"
            ]
            [ text "Receive free animations, activities, resources, and more!" ]
        , Html.iframe
            [ src "https://blog.claritasstudios.com/embed"
            , height 150
            , class "w-screen"
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , style "margin" "0"
            , style "border-radius" "5px !important"
            , style "background-color" "transparent"
            ]
            []
        ]


view4 : Html msg
view4 =
    div
        [ class "flex justify-center py-3 text-black"
        ]
        -- [ div [ class "max-w-3xl" ] [ viewShopItem2 liturgicalCalendar2025 ]
        [ div [ class "text-center grid justify-center mb-10" ] [ view2 ]
        ]


port gtagReportConversion : String -> Cmd msg
