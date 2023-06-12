port module ThankYou.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Html.String
import Url



-- MAIN


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( Model key url, Cmd.none )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | GoBack


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    -- ( model, Nav.pushUrl model.key (Url.toString url) )
                    ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Nav.load (Url.toString url)
            )

        GoBack ->
            ( model, goBack "" )


view : Model -> Browser.Document Msg
view model =
    { title = "URL Interceptor"
    , body =
        [ div
            []
            [ viewSubpageHeader "Thank You" headerMargin |> Html.String.toHtml
            , viewBody
            , viewFooter |> Html.String.toHtml
            ]
        ]
    }


viewBody : Html Msg
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "p-10"
        ]
        [ button
            [ style "box-shadow" "#777 1px 1px 5px"
            , class "inline-block text-lg rounded p-3 bg-[#9200B3] text-white cursor-pointer"
            , class "hover:scale-105 transition ease-in-out"
            , attribute "aria-label" "back button"
            , onClick GoBack
            ]
            [ text "Go Back"
            ]
        , h1
            [ class "text-center"
            , class "my-10"
            ]
            [ text "Thank You!" ]
        , viewThankYou
        ]


viewThankYou : Html Msg
viewThankYou =
    div
        []
        [ p [ class "m-4" ]
            [ text "Thank you so much for joining our mailing list! We are thrilled to have you on board. Look out for an email containing your free printable. We will keep you in the loop with our latest animations and updates. Stay tuned for more fun content coming your way!"
            ]
        , p [ class "m-4" ]
            [ text "Here at Catholic Stories for Children, we are dedicated to creating valuable resources for parents, grandparents, and Catholics like you. I deeply value your thoughts and opinions, as they play a crucial role in shaping the content we develop. I would be love to have a conversation with you."
            ]
        , p [ class "m-4" ]
            [ text "To make it easy for you, I included a calendar signup below. Schedule a time that works best for you. During our talk, I would love to hear your feedback, suggestions, and any specific topics or themes you would like us to explore further."
            ]
        , p [ class "m-4" ]
            [ text "Your input will directly contribute to the creation of resources that resonate with Catholic families and provide an enjoyable and faithful experience for children. I look forward to connecting with you soon. Thank you for being an essential part of our community at Catholic Stories for Children."
            ]
        , div
            [ class "calendly-inline-widget"
            , style "min-width" "320px"
            , style "height" "700px"
            , attribute "data-url" "https://calendly.com/csc-trevor/30min"
            ]
            []
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


port goBack : String -> Cmd msg
