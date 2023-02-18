module SignupForm exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode
import Json.Encode
import Svg exposing (circle, path, svg)
import Svg.Attributes exposing (cx, cy, d, fill, r, stroke, strokeWidth, viewBox)


type Msg
    = SubmitContact
    | GotContactJobId (Result Http.Error String)
    | SetEmail String


type alias Model =
    { email : String

    -- SendGrid jobId associated with the request
    , jobId : String
    , addContactRequest : AddContactRequest
    }


type AddContactRequest
    = None
    | Failure String
    | Loading
    | Success String


isError : AddContactRequest -> Bool
isError request =
    case request of
        Failure f ->
            True

        _ ->
            False


isSuccess : AddContactRequest -> Bool
isSuccess request =
    case request of
        Success s ->
            True

        _ ->
            False


init : Model
init =
    { email = ""
    , jobId = ""
    , addContactRequest = None
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case Debug.log "msg" msg of
        SetEmail email ->
            ( { model | email = email }, Cmd.none )

        SubmitContact ->
            ( { model | addContactRequest = Loading }
            , Http.request
                { method = "POST"

                -- , headers = []
                -- TODO: check api access to see if this is safe
                -- TODO: add header
                , headers =
                    [ Http.header "Authorization" "Bearer <key here>"
                    ]
                , body =
                    Http.jsonBody
                        (Json.Encode.object
                            [ ( "contacts"
                              , Json.Encode.list
                                    Json.Encode.object
                                    [ [ ( "email", Json.Encode.string model.email ) ]
                                    ]
                              )
                            ]
                        )
                , url = "https://api.sendgrid.com/v3/marketing/contacts"
                , expect = Http.expectJson GotContactJobId jobIdDecoder
                , timeout = Nothing
                , tracker = Nothing
                }
            )

        GotContactJobId result ->
            case Debug.log "result" result of
                Ok jobId ->
                    -- TODO: route to new page
                    ( { model | jobId = jobId, addContactRequest = None }, Cmd.none )

                Err _ ->
                    ( { model | addContactRequest = Failure "Error. Please try again later." }, Cmd.none )


jobIdDecoder : Json.Decode.Decoder String
jobIdDecoder =
    Json.Decode.field "jobId" Json.Decode.string


view : Model -> Html Msg
view model =
    div []
        [ p
            [ class "pb-5"
            ]
            [ text "Get our animations, tips, and free resources for you and your kids!" ]
        , if isSuccess model.addContactRequest then
            viewSignupSuccess

          else
            viewSignupForm model
        ]


viewSignupSuccess : Html msg
viewSignupSuccess =
    div [ class "text-green-500" ]
        [ text "Success! You will an email from us within a few minutes."
        ]


viewSignupForm : Model -> Html Msg
viewSignupForm model =
    div []
        [ Html.form
            [ onSubmit SubmitContact ]
            [ input
                [ id "email"
                , type_ "email"
                , name "email"
                , placeholder "Enter Email."
                , required True
                , onInput SetEmail
                , disabled (model.addContactRequest == Loading)
                , class "h-14 pl-4 mr-5 rounded border-2 "
                , class
                    (if isError model.addContactRequest then
                        "border-red-500"

                     else
                        "border-gray-800"
                    )
                ]
                []
            , button
                [ type_ "submit"
                , value "Get Access"
                , style "box-shadow" "#777 1px 1px 5px"
                , style "color" "white"
                , class "h-14 w-36 rounded"
                , class "bg-[#9200B3]"
                , disabled (model.addContactRequest == Loading)
                ]
                [ if model.addContactRequest == Loading then
                    loader

                  else
                    text "Get Access"
                ]
            ]
        , span
            [ class "text-red-500"
            ]
            [ case model.addContactRequest of
                Failure err ->
                    text err

                _ ->
                    text ""
            ]

        -- , Html.form
        --     [ id ""
        --     , onSubmit "return false;"
        --     , href "https://signup.catholicstoriesforchildren.com"
        --     , rel "noopener"
        --     , target "_blank"
        --     , style "text-decoration" "none"
        --     , style "padding" "10px 20px"
        --     , style "display" "inline-block"
        --     , style "border-radius" "5px"
        --     , style "box-shadow" "#777 1px 1px 5px"
        --     , style "color" "white"
        --     , style "background-color" "#9200B3"
        --     ]
        --     [ text "Sign Up" ]
        ]


loader : Svg.Svg msg
loader =
    svg
        [ Svg.Attributes.class "animate-spin h-6 w-6 text-white m-auto"
        , fill "none"
        , viewBox "0 0 24 24"
        ]
        [ circle
            [ Svg.Attributes.class "opacity-25"
            , cx "12"
            , cy "12"
            , r "10"
            , stroke "currentColor"
            , strokeWidth "4"
            ]
            []
        , path
            [ Svg.Attributes.class "opacity-75"
            , fill "currentColor"
            , d "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ]
            []
        ]
