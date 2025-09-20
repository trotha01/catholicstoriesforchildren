module Main exposing (Model, main, view)

import Page.Animations.Helpers.Carousel as Carousel
import Page.Animations.View as AnimationsView
import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import Page.Contact.View as ContactPage
import Page.FeastDayActivities.Main as FeastsPage
import Component.Footer exposing (viewFooter)
import Page.Give.View as GivePage
import Component.Header exposing (viewHeader)
import Theme.Layout exposing (headerMargin)
import Page.Home.Sections exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Component.Navigation.View as NavigationPage
import Page.Newsroom.ViewPress as ViewPress exposing (..)
import Page.NotFound.Main as NotFoundPage
import Page.Prayer.Angelus.View as AngelusPage
import Page.Prayers.View as PrayersPage
import Page.Resources.Helpers exposing (ResourceGroup)
import Page.Resources.View as ResourcesPage
import Page.Saints.Main as SaintsPage
import Page.Shop.View as ShopPage
import Page.Signup as Signup
import Task
import Page.Team.View as TeamPage
import Time
import Url


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


type Page
    = Home
    | Navigation
    | Productions
    | Give
    | AboutUs
    | Resources
    | Contact
    | Prayers
    | Angelus
    | Shop
    | Feasts
    | Saints
    | Press
    | Download
    | NotFound


type Language
    = English
    | Spanish
    | Urdu
    | Asl


type alias Model =
    { key : Nav.Key -- a navigation key is needed when manipulating the url.
    , url : Url.Url
    , signup : Signup.Model
    , page : Page
    , time : Time.Posix
    , timezone : Time.Zone
    , language : Language
    , feastsPageModel : FeastsPage.Model
    , saintsPageModel : SaintsPage.Model
    , animationsPageModel : AnimationsView.Model
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        ( animationsPageModel, animationsPageCmd ) =
            AnimationsView.init flags url key

        ( saintsPageModel, saintsPageCmd ) =
            SaintsPage.init flags url key

        ( feastsPageModel, feastsPageCmd ) =
            FeastsPage.init flags url key

        initialPage =
            parseUrl url
    in
        ( { key = key
          , url = url
          , signup = Signup.init
          , page = initialPage
          , time = Time.millisToPosix 0
          , timezone = Time.utc
          , language = English
          , saintsPageModel = saintsPageModel
          , feastsPageModel = feastsPageModel
          , animationsPageModel = animationsPageModel
          }
        , Cmd.batch
            [ Task.perform NewTime Time.now
            , Task.perform NewZone Time.here
            , (if initialPage == Productions then Cmd.map ProductionsMsg animationsPageCmd else Cmd.none)
            , (if initialPage == Saints then Cmd.map SaintsMsg saintsPageCmd else Cmd.none)
            , (if initialPage == Feasts then Cmd.map FeastsMsg feastsPageCmd else Cmd.none)
            ]
        )
-- Detect downloadable content by file extension
isDownloadable : String -> Bool
isDownloadable path =
    let
        fileExtensions = [ ".pdf", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".doc", ".docx" ]
    in
    List.any (\ext -> String.endsWith ext path) fileExtensions

-- Route parser for SPA and downloadable content
parseUrl : Url.Url -> Page
parseUrl url =
    let
        path = url.path
        urlString = Url.toString url
    in
    if isDownloadable path then
        Download
    else if String.contains "animations" urlString then
        Productions
    else if String.contains "navigation" urlString then
        Navigation
    else if String.contains "give" urlString then
        Give
    else if String.contains "contact" urlString then
        Contact
    else if String.contains "team" urlString then
        AboutUs
    else if String.contains "resources" urlString then
        Resources
    else if String.contains "prayers" urlString then
        Prayers
    else if String.contains "angelus" urlString then
        Angelus
    else if String.contains "shop" urlString then
        Shop
    else if String.contains "saints" urlString then
        Saints
    else if String.contains "press" urlString then
        Press
    else
        Home



scrollToTopCmd : Cmd Msg
scrollToTopCmd =
    Dom.setViewport 0 0
    |> Task.perform (\_ -> NoOp)

type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg
    | NewTime Time.Posix
    | NewZone Time.Zone
    | LanguageChange Language
    | SaintsMsg SaintsPage.Msg
    | FeastsMsg FeastsPage.Msg
    | ProductionsMsg AnimationsView.Msg
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    updatePage model url
                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            let
                newPage = parseUrl url
                urlString = Url.toString url
            in
                case newPage of
                    Download ->
                        ( model, Nav.load urlString )
                    _ ->
                        ( { model | url = url, page = newPage }
                        , scrollToTopCmd
                        )

        SignupMsg signupMsg ->
            let
                ( updatedSignup, cmd ) = Signup.update signupMsg model.signup
            in
                ( { model | signup = updatedSignup }, Cmd.map SignupMsg cmd )

        NewTime t ->
            ( { model | time = t }, Cmd.none )

        NewZone z ->
            ( { model | timezone = z }, Cmd.none )

        LanguageChange language ->
            ( { model | language = language }, Cmd.none )

        SaintsMsg saintsMsg ->
            let
                ( updatedSaintsModel, cmd ) = SaintsPage.update saintsMsg model.saintsPageModel
            in
                ( { model | saintsPageModel = updatedSaintsModel }, Cmd.map SaintsMsg cmd )

        FeastsMsg feastsMsg ->
            let
                ( updatedFeastsModel, cmd ) = FeastsPage.update feastsMsg model.feastsPageModel
            in
                ( { model | feastsPageModel = updatedFeastsModel }, Cmd.map FeastsMsg cmd )

        ProductionsMsg productionsMsg ->
            let
                ( updatedProductionsModel, cmd ) = AnimationsView.update productionsMsg model.animationsPageModel
            in
                ( { model | animationsPageModel = updatedProductionsModel }, Cmd.map ProductionsMsg cmd )

        NoOp ->
            ( model, Cmd.none )

updatePage : Model -> Url.Url -> ( Model, Cmd Msg )
updatePage model url =
    let
        urlString =
            Url.toString url
        isFileLink =
            let
                fileExtensions = [ ".pdf", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".doc", ".docx" ]
            in
            List.any (\ext -> String.endsWith ext urlString) fileExtensions
    in
    if isFileLink then
        ( model, Cmd.batch [ Nav.pushUrl model.key (Url.toString url) ]) 
    else if String.contains "animations" urlString then
        ( { model | url = url, page = Productions }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "navigation" urlString then
        ( { model | url = url, page = Navigation }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "give" urlString then
        ( { model | url = url, page = Give }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "contact" urlString then
        ( { model | url = url, page = Contact }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "team" urlString then
        ( { model | url = url, page = AboutUs }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "resources" urlString then
        ( { model | url = url, page = Resources }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "prayers" urlString then
        ( { model | url = url, page = Prayers }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "angelus" urlString then
        ( { model | url = url, page = Angelus }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "shop" urlString then
        ( { model | url = url, page = Shop }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "saints" urlString then
        ( { model | url = url, page = Saints }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if String.contains "press" urlString then
        ( { model | url = url, page = Press }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else if url.path == "/" then
        ( { model | url = url, page = Home }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )
    else
        ( model, Cmd.none )




-- SUBSCRIPTIONS
-- We are not using Elm subscriptions yet. Subscriptions are used for things like websockets.


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        { title, body } =
            case model.page of
                Home ->
                    viewHome model
                Navigation ->
                    { title = "Navigation", body = [ NavigationPage.view ] }
                Give ->
                    { title = "Donate", body = [ GivePage.view ] }
                Contact ->
                    { title = "Contact Us", body = [ ContactPage.view ] }
                AboutUs ->
                    { title = "About Us", body = [ TeamPage.view ] }
                Shop ->
                    { title = "Shop", body = [ ShopPage.view ] }
                Resources ->
                    { title = "Resources", body = [ ResourcesPage.view model.url ] }
                Prayers ->
                    { title = "Prayers", body = [ PrayersPage.view ] }
                Angelus ->
                    { title = "Angelus", body = [ AngelusPage.view ] }
                Saints ->
                    let
                        saintPageModel = model.saintsPageModel
                        document = SaintsPage.view { saintPageModel | url = model.url }
                    in
                    { title = document.title, body = document.body |> List.map (Html.map SaintsMsg) }
                Feasts ->
                    let
                        document = FeastsPage.view model.feastsPageModel
                    in
                    { title = document.title, body = document.body |> List.map (Html.map FeastsMsg) }
                Productions ->
                    let
                        document = AnimationsView.view model.url model.animationsPageModel
                    in
                    { title = document.title, body = document.body |> List.map (Html.map ProductionsMsg) }
                Press ->
                    { title = "Angelus", body = [ ViewPress.view ] }
                Download ->
                    { title = "Download", body = [ div [ class "p-10 text-center" ] [ text "This is a downloadable file. If it does not open automatically, please check your browser's download bar or try the direct link again." ] ] }
                NotFound ->
                    let
                        document = NotFoundPage.view
                    in
                    { title = "Tony Help, Page Not Found", body = [ Html.map (\_ -> NoOp) document ] }
    in
    { title = title, body = body }


viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Claritas Studios"
    , body =
        [ div
            [ style "background-color" "#FEF7F4"
            ]
            [ viewHeader "Claritas Studios" headerMargin
            , viewBody model
            , viewFooter
            ]
        ]
    }


viewBody : Model -> Html.Html Msg
viewBody model =
    div
        [ class "text-lg leading-loose"
        , class "lg:text-2xl"
        ]
        [ viewSlideshow model
        , viewClaritasStudios
        , viewMission
        , viewSanctifyScreenTime
        , viewTechnologyArtCollide
        , viewWhatPeopleSaying
        , viewSupportMission
        ]


viewSlideshow : Model -> Html.Html Msg
viewSlideshow model =
    div
        [ class "logo-section-bg"
        ]
        [ Carousel.viewSlides model.animationsPageModel.slideshow AnimationsView.NextSlide AnimationsView.PrevSlide
            |> Html.map ProductionsMsg
        ]