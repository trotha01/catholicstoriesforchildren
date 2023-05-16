port module Signup exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (keyCode, on, onClick, onInput)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Regex exposing (find)
import Spinner
import String exposing (length)


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
    = Email String
    | Submit
    | FormSubmitted (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Email email ->
            ( { model | email = email }, Cmd.none )

        Submit ->
            if isValidEmail model.email then
                let
                    body =
                        Encode.object [ ( "email", Encode.string model.email ) ]
                in
                ( { model | message = "Your request is being processed...", isLoading = True }
                , Http.post
                    { url = "https://api.catholicstoriesforchildren.com/add-contact"
                    , body = Http.jsonBody body
                    , expect = Http.expectString FormSubmitted
                    }
                )

            else
                ( { model | message = "Error: Please enter a valid email" }, Cmd.none )

        FormSubmitted (Ok response) ->
            ( { model
                | isLoading = False

                -- , message = response
                , message = "Email sent!"
              }
            , gtagReportConversion ""
            )

        FormSubmitted (Err error) ->
            -- TODO: give more specific error
            ( { model
                | isLoading = False
                , message = "Error: please try again later"
              }
            , Cmd.none
            )


view : Model -> Html Msg
view model =
    div
        [ class "border-4 border-solid border-[#460156] p-3 rounded-md bg-[#ffc7c7]"
        ]
        [ viewSampleImage
        , div
            [ class "text-center" ]
            [ p
                [ class "pb-5"
                ]
                [ text "Join our mail list and get our FREE printable reconciliation booklet for kids!" ]
            , div
                []
                [ input
                    [ type_ "text"
                    , placeholder "First Name"
                    , attribute "aria-hidden" "true"
                    , style "display" "none"
                    ]
                    []
                , input
                    [ type_ "email"
                    , placeholder "Email"
                    , value model.email
                    , onInput Email
                    , onEnter Submit
                    , attribute "required" "true"
                    , style "padding" "10px 20px"
                    , style "border-radius" "5px 0px 0px 5px"
                    , style "box-shadow" "#777 1px 1px 5px"
                    , class "w-[188px] sm:w-[240px] h-[56px] text-lg"
                    ]
                    []
                , viewSubmitButton model
                , viewMessage model
                ]
            ]
        ]


viewSampleImage : Html msg
viewSampleImage =
    div [ class "flex justify-center" ]
        [ img
            [ class "mb-2 rounded max-w-[250px]"
            , src "https://ik.imagekit.io/catholicstories/FREE_Reconciliation_Booklet__1080___1080_px__P4HOL51vg.png?updatedAt=1684270935614"
            ]
            []
        ]


viewSubmitButton : Model -> Html Msg
viewSubmitButton model =
    let
        spinner =
            Spinner.spinner [ width 10 ]

        ( buttonStatusClass, buttonContent, isDisabled ) =
            if model.isLoading then
                ( "bg-[#8a4f97]", spinner, True )

            else
                ( "bg-[#9200B3]", text "Sign Me Up", False )
    in
    button
        [ style "padding" "10px 10px"
        , style "display" "inline-block"
        , style "border-radius" "5px"
        , style "border-radius" "0px 5px 5px 0px"
        , style "box-shadow" "#777 1px 1px 5px"
        , style "color" "white"
        , class "w-[115px] h-[56px] text-lg"
        , class buttonStatusClass
        , onClick Submit
        , disabled isDisabled
        ]
        [ buttonContent ]


viewMessage : Model -> Html msg
viewMessage model =
    let
        color =
            if String.contains "Error" model.message then
                "text-rose-600"

            else
                "text-emerald-500"
    in
    div [ class color ]
        [ text model.message
        ]


onEnter : Msg -> Attribute Msg
onEnter msg =
    let
        isEnter code =
            if code == 13 then
                Decode.succeed msg

            else
                Decode.fail "not ENTER"
    in
    on "keydown" (Decode.andThen isEnter keyCode)


isValidEmail : String -> Bool
isValidEmail email =
    let
        regex =
            -- Regex.fromString "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            Regex.fromString """^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)$"""
                |> Maybe.withDefault Regex.never

        matches =
            find regex email

        validLength =
            length email <= 256
    in
    List.length matches > 0 && validLength


port gtagReportConversion : String -> Cmd msg
