port module Signup exposing (..)

import Browser.Navigation as Nav
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Encode as Encode
import Regex exposing (find)
import Shop.ShopHelpers exposing (littleReconciliationBooklet, viewShopItem)
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
            , Cmd.batch [ gtagReportConversion "", Nav.load "/thankyou" ]
            )

        FormSubmitted (Err error) ->
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
        [ class "mb-5" ]
        [ p
            [ class "pb-2 pl-1 text-left"
            ]
            [ text "Receive free animations, activities, resources, and more!" ]
        , Html.iframe
            [ src "https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"
            , height 52
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , style "margin" "0"
            , style "border-radius" "0px !important"
            , style "background-color" "transparent"
            ]
            []
        ]


view3 : Html msg
view3 =
    div
        [ class "p-3 rounded-md border-4 border-solid border-[#460156] bg-[#ffc7c7]"
        ]
        [ viewShopItem littleReconciliationBooklet ]


view : Model -> Html Msg
view model =
    div
        [ class "p-3 rounded-md border-4 border-solid border-[#460156] bg-[#ffc7c7]"
        ]
        [ viewShopItem littleReconciliationBooklet ]



-- div []
-- [ div
--     [ class "mb-5" ]
--     [ span [ class "font-bold" ] [ text "Access Free Animations" ]
--     , p
--         [ class "pb-2 text-left"
--         ]
--         -- [ text "Having trouble with kids in Mass? Get our guide!" ]
--         [ text "Receive free animations, activities, resources, and more!" ]
--     , Html.iframe
--         [ src "https://embeds.beehiiv.com/d8e1c428-bdfc-437f-a685-0148bd0cf084?slim=true"
--         , height 52
--         , attribute "frameborder" "0"
--         , attribute "scrolling" "no"
--         , style "margin" "0"
--         , style "border-radius" "0px !important"
--         , style "background-color" "transparent"
--         ]
--         []
-- , div
--     []
--     [ input
--         [ type_ "text"
--         , placeholder "First Name"
--         , attribute "aria-hidden" "true"
--         , style "display" "none"
--         ]
--         []
--     , input
--         [ type_ "email"
--         , placeholder "Email"
--         , value model.email
--         , onInput Email
--         , onEnter Submit
--         , attribute "required" "true"
--         , style "padding" "10px 20px"
--         , style "border-radius" "5px 0px 0px 5px"
--         , style "box-shadow" "#777 1px 1px 5px"
--         , class "w-[172px] md:w-[230px] h-[56px] text-lg"
--         ]
--         []
--     , viewSubmitButton model
--     , viewMessage model
-- ]
-- ]
-- , div [ class "text-left text-base col-span-2 marker:content-['🌟️']" ]
--     [ p [ class "mb-2" ] [ text "Enter your email to receive our FREE Ultimate Guide for Bringing Kids to Mass." ]
--     , p [] [ text "Get inspired:" ]
--     , ul [ class "ml-4" ]
--         [ li [ class "pl-1" ] [ text " Top tips from parents on bringing kids to Mass." ]
--         , li [ class "pl-1" ] [ text " Best strategies on preparing kids for a heavenly Mass experience." ]
--         , li [ class "pl-1" ] [ text " Faith-based techniques to get kids engaged in Mass." ]
--         , li [ class "pl-1" ] [ text " It's FREE! Empower kids to love Mass this week!" ]
--         ]
--     , p [ class "pt-4" ] [ text "We will also send you:" ]
--     , ul [ class "ml-4" ]
--         [ li [ class "pl-1" ] [ text " Updates on the animations." ]
--         , li [ class "pl-1" ] [ text " Future freebies!" ]
--         ]
--     ]
-- ]
-- , div [] [ viewSampleImage ]
-- ]


viewSampleImage : Html msg
viewSampleImage =
    div [ class "flex justify-center" ]
        [ img
            [ class "rounded w-full max-w-[330px]"
            , src "https://ik.imagekit.io/catholicstories/Free_Mass_Guide_v3_1__E6fGtEQBXY.png?updatedAt=1688592154908"
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
    div [ class color, class "text-left pl-1" ]
        [ text model.message
        ]


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
