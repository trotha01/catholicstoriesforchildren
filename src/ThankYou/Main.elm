port module ThankYou.Main exposing (..)

import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Team.Team exposing (trevor, viewPersonImage)
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
    { title = "Thank You"
    , body =
        [ div
            []
            [ viewSubpageHeader "Thank You" headerMargin
            , viewBody
            , viewFooter
            ]
        ]
    }


viewBody : Html Msg
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        ]
        [ div [ class "max-w-5xl m-auto p-10" ]
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
                [ text "Thank you for connecting with Catholic Stories for Children!" ]
            , viewThankYou
            ]
        ]


viewThankYou : Html Msg
viewThankYou =
    div
        []
        [ p [ class "my-4" ]
            [ text "Hello, I am Trevor Rothaus, founder of Catholic Stories for Children. I want to personally thank you for connecting with us! We are thrilled to have you on board."
            ]
        , p [ class "my-4" ]
            [ text "In the coming minutes, look out for an email containing your free printable. Also, I would like to keep you in the loop regarding our latest animations and updates. We have so many exciting projects coming up to teach the Catholic faith to young people!"
            ]
        , p [ class "my-4" ]
            [ span [ class "font-bold" ] [ text "Here at Catholic Stories for Children, we are dedicated to creating valuable resources for parents, grandparents, and Catholics like you." ]
            , span [] [ text " I deeply value your thoughts and opinions, as they play a crucial role in shaping the content we develop." ]
            ]
        , p [ class "my-4" ]
            [ span [ class "font-bold underline" ] [ text "That being said, I would enjoy having a conversation with you." ]
            , span [] [ text " You will find below my calendar. Please schedule a time that works best for you. During our talk, I would love to hear your feedback, suggestions, resources that you would like, and any specific topics or themes you would like us to explore further." ]
            ]
        , p [ class "my-4" ]
            [ text "Your input will directly contribute to the creation of animations and resources that resonate with Catholic families and provide an enjoyable and faithful experience for children. I look forward to connecting with you soon. Thank you for being an essential part of our community at Catholic Stories for Children."
            ]
        , p [ class "my-4" ]
            [ span [ class "block" ] [ text "Thank you and may God bless you," ]
            , span [ class "block" ] [ text "Trevor Rothaus" ]
            , span [ class "block" ] [ text "CEO - Catholic Stories for Children" ]
            , div []
                [ viewPersonImage trevor
                ]
            ]

        -- , div
        --     [ class "calendly-inline-widget"
        --     , style "min-width" "320px"
        --     , style "height" "900px"
        --     , attribute "data-url" "https://calendly.com/csc-trevor/30min"
        --     ]
        --     []
        , div
            [ class "bg-white rounded"
            ]
            [ iframe
                [ src "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1q_LityalnFrAKQ20-YIKG1HeQAv2DK8ExvFS1QacsSAj_HfKe-aZlqQAGpWvNWWJro6D6ynkV?gv=true"
                , style "border" "0"
                , style "width" "100%"
                , height 600
                , attribute "frameborder" "0"
                ]
                []
            ]
        ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


port goBack : String -> Cmd msg
