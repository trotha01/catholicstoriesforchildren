module FeastDayActivities.Main exposing (..)

-- import Html.String exposing (..)
-- import Html.String.Attributes exposing (..)

import Browser
import Browser.Navigation as Nav
import FeastDayActivities.FeastDayHelpers exposing (splitList)
import FeastDayActivities.FeastDays exposing (..)
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Url
import Url.Parser exposing ((</>), parse)



-- type alias Model =
--     {}
-- main : Program () Model Never
-- main =
--     Browser.sandbox
--         { init = {}
--         , view =
--             \_ ->
--                 view
--                     |> toString 0
--                     |> text
--                     |> toHtml
--         , update = \_ -> \model -> model
--         }


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


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        urlString =
                            Url.toString url

                        isMonth =
                            List.any (\month -> String.contains month urlString) months
                    in
                    if isMonth then
                        ( model, Nav.pushUrl model.key (Url.toString url) )

                    else
                        ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW
-- view : Model -> Browser.Document Msg
-- view model =
--     { title = "Feast Day Activities - Catholic Stories for Children"
--     , body =
--         [ text "The current URL is: "
--         , b [] [ text (Url.toString model.url) ]
--         , ul []
--             [ viewLink "/feastdayactivities/jan"
--             , viewLink "/feastdayactivities/feb"
--             , viewLink "/feastdayactivities/mar"
--             , viewLink "/"
--             , viewLink "/reviews/shah-of-shahs"
--             ]
--         ]
--     }
-- view : Html Never


parseMonthFromUrl : Url.Url -> Maybe String
parseMonthFromUrl url =
    parse urlMonthParser url


urlMonthParser : Url.Parser.Parser (String -> a) a
urlMonthParser =
    Url.Parser.s "feastdayactivities" </> Url.Parser.string


view : Model -> Browser.Document Msg
view model =
    let
        defaultMonth =
            months
                |> List.head
                |> Maybe.withDefault "jan"

        month =
            parseMonthFromUrl model.url
                |> Maybe.withDefault defaultMonth
    in
    { title = "Feast Day Activities - Catholic Stories for Children"
    , body =
        [ div
            [ -- For parallax
              style "height" "100vh"
            , style "overflow-x" "hidden"
            , style "overflow-y" "auto"
            , style "perspective" "300px"
            , style "scroll-behavior" "smooth"
            , style "background-color" "#FEF7F4"
            ]
            [ -- viewSubpageHeader "Feast Day Activities" headerMargin
              viewBody month

            -- , viewFooter
            ]
        ]
    }


viewLink : String -> Html Msg
viewLink path =
    li [] [ a [ href path ] [ text path ] ]


dateWidth : String
dateWidth =
    "50px"


dateHR : Html Msg
dateHR =
    hr
        [ style "width" dateWidth
        , style "margin-left" "0px"
        , style "border-top" "4px solid #415c71"
        ]
        []


viewFeastDay : { a | date : String, feasts : List String } -> Html Msg
viewFeastDay feastDay =
    let
        link =
            feastDay.date
    in
    div
        []
        [ dateHR
        , a
            [ style "color" "black"
            , href link
            , class "grid grid-cols-calendar gap-3 items-center justify-items-center"
            , class "hover:bg-csc-lightpurple"
            , class "rounded"
            ]
            [ div
                [ class "my-3"
                , class "text-3xl"
                ]
                [ text feastDay.date ]
            , div
                [ class "justify-self-start"
                ]
                (List.map viewFeast feastDay.feasts)
            ]
        ]


viewFeast : String -> Html Msg
viewFeast feast =
    div [] [ text feast ]


viewFeastDayHeader : String -> String -> Html Msg
viewFeastDayHeader color month =
    h2
        [ class "text-center"
        , class "col-span-2"
        , class "grid"
        , class "content-center"
        , class "uppercase"
        , class "text-5xl"
        , style "font-family" "hvdComicSerifPro"
        , style "background-color" color
        , style "border-top" "3px solid black"
        , style "border-bottom" "3px solid black"
        , style "height" "2.5em"
        ]
        [ text month
        ]


viewFeastDays : List { a | date : String, feasts : List String } -> Html Msg
viewFeastDays list =
    div
        [ class "col-span-1" ]
        (List.map viewFeastDay list
            ++ [ dateHR ]
        )


viewMonthPillBox : String -> Html msg
viewMonthPillBox month =
    -- TODO: use nav html elements?
    a
        [ class "col-span-1"
        , class "hover:bg-csc-lightblue"
        , class "rounded"
        , class "p-2"
        , class "cursor-pointer"
        , class "capitalize"
        , href ("./" ++ month)
        ]
        [ text month ]


viewBody : String -> Html Msg
viewBody month =
    feastDays
        |> List.filter (\feastDay -> String.toLower feastDay.key == String.toLower month)
        |> List.head
        |> Maybe.withDefault january
        |> viewMonth


viewMonth : FeastMonth -> Html Msg
viewMonth feastMonth =
    let
        ( firstHalf, secondHalf ) =
            splitList feastMonth.feasts
    in
    div
        []
        [ h1 [] [ text "Feast Day Activities" ]
        , div
            [ class "grid grid-cols-12"
            , class "text-base md:text-3xl lg:text-3xl"
            , class "mt-6"
            , class "text-center"
            , style "max-width" "800px"
            , class "hcenter"
            ]
            (List.map viewMonthPillBox months)
        , div
            [ style "width" "100vw"
            , style "max-width" "800px"
            , class "hcenter"
            , style "position" "relative"
            , style "font-size" "20px"
            , style "margin-top" "50px"
            , class "grid grid-cols-2"
            ]
            [ viewFeastDayHeader feastMonth.color feastMonth.month
            , div
                [ class "grid grid-cols-1 md:grid-cols-2"
                , class "col-span-2"
                , style "background-color" "white"
                , style "padding" "50px"
                ]
                [ viewFeastDays firstHalf
                , viewFeastDays secondHalf
                ]
            ]
        ]
