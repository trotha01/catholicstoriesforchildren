module Main exposing (Model, main)

import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import Component.Footer exposing (viewFooter)
import Component.Header exposing (viewHeaderWithMenu)
import Html exposing (..)
import Html.Attributes exposing (..)
import Page.About.PrivacyPolicy.Main as PrivacyPolicyPage
import Page.About.TermsAndConditions.Main as TermsPage
import Page.Animations.Helpers.Carousel as Carousel
import Page.Animations.View as AnimationsView
import Page.Contact.View as ContactPage
import Page.FeastDayActivities.Main as FeastsPage
import Page.Give.View as GivePage
import Page.Home.Sections exposing (..)
import Page.Newsroom.ViewPress as ViewPress
import Page.Prayer.Angelus.View as AngelusPage
import Page.Prayers.View as PrayersPage
import Page.Resources.View as ResourcesPage
import Page.Saints.Main as SaintsPage
import Page.Shop.View as ShopPage
import Page.Signup as Signup
import Page.Team.View as TeamPage
import Process
import Task
import Theme.Layout exposing (headerMargin)
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
    | PrivacyPolicy
    | TermsAndConditions
    | Download


type Language
    = English


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
    , menuOpen : Bool
    , sections : Page.Home.Sections.Model
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        ( animationsPageModel, animationsPageCmd ) =
            AnimationsView.init flags url

        ( saintsPageModel, saintsPageCmd ) =
            SaintsPage.init flags url

        ( feastsPageModel, feastsPageCmd ) =
            FeastsPage.init flags url

        initialPage =
            parseUrl url
    in
    if String.startsWith "/animations/actofcontrition" url.path then
        ( { key = key
          , url = url
          , signup = Signup.init
          , page = Productions -- temporary
          , time = Time.millisToPosix 0
          , timezone = Time.utc
          , language = English
          , saintsPageModel = saintsPageModel
          , feastsPageModel = feastsPageModel
          , animationsPageModel = animationsPageModel
          , menuOpen = False
          , sections = Page.Home.Sections.init
          }
        , Nav.pushUrl key "/animations/prayertimewithangels/1/actofcontritionprayer"
        )

    else
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
          , menuOpen = False
          , sections = Page.Home.Sections.init
          }
        , Cmd.batch
            [ Task.perform NewTime Time.now
            , Task.perform NewZone Time.here
            , if initialPage == Productions then
                Cmd.map ProductionsMsg animationsPageCmd

              else
                Cmd.none
            , if initialPage == Saints then
                Cmd.map SaintsMsg saintsPageCmd

              else
                Cmd.none
            , if initialPage == Feasts then
                Cmd.map FeastsMsg feastsPageCmd

              else
                Cmd.none
            ]
        )



-- Detect downloadable content by file extension


isDownloadable : String -> Bool
isDownloadable path =
    let
        fileExtensions =
            [ ".pdf", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".doc", ".docx" ]
    in
    List.any (\ext -> String.endsWith ext path) fileExtensions



-- Route parser for SPA and downloadable content


parseUrl : Url.Url -> Page
parseUrl url =
    let
        path =
            url.path

        urlString =
            Url.toString url
    in
    if isDownloadable path then
        Download

    else if String.contains "animations" urlString then
        Productions

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

    else if String.contains "about/privacy-policy" urlString then
        PrivacyPolicy

    else if String.contains "about/terms-and-conditions" urlString then
        TermsAndConditions

    else if String.contains "feastdayactivities" urlString then
        Feasts

    else
        Home


scrollToTopCmd : Cmd Msg
scrollToTopCmd =
    Process.sleep 0 |> Task.andThen (\_ -> Dom.setViewport 0 0) |> Task.perform (\_ -> NoOp)


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | NewTime Time.Posix
    | NewZone Time.Zone
    | SaintsMsg SaintsPage.Msg
    | FeastsMsg FeastsPage.Msg
    | ProductionsMsg AnimationsView.Msg
    | SectionsMsg Page.Home.Sections.Msg
    | ToggleMenu
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SectionsMsg sectionsMsg ->
            let
                ( updated, sectionsCmd ) =
                    Page.Home.Sections.update sectionsMsg model.sections
            in
            ( { model | sections = updated }, Cmd.map SectionsMsg sectionsCmd )

        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    updatePage model url

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            let
                urlString =
                    Url.toString url

                pathChanged =
                    model.url.path /= url.path
            in
            if String.startsWith "/animations/actofcontrition" url.path then
                ( model, Nav.pushUrl model.key "/animations/prayertimewithangels/1/actofcontritionprayer" )
            else
                let
                    newPage =
                        parseUrl url
                in
                case newPage of
                Download ->
                    ( model, Nav.load urlString )

                Productions ->
                    let
                        ( updatedAnimationsModel, animCmd ) =
                            AnimationsView.update model.key (AnimationsView.UrlChanged url) model.animationsPageModel
                    in
                    ( { model
                        | url = url
                        , page = newPage
                        , menuOpen = False
                        , animationsPageModel = updatedAnimationsModel
                      }
                    , if pathChanged then
                        Cmd.batch [ Cmd.map ProductionsMsg animCmd, scrollToTopCmd ]

                      else
                        Cmd.map ProductionsMsg animCmd
                    )

                _ ->
                    ( { model | url = url, page = newPage, menuOpen = False }
                    , if pathChanged then
                        scrollToTopCmd

                      else
                        Cmd.none
                    )

        NewTime t ->
            ( { model | time = t }, Cmd.none )

        NewZone z ->
            ( { model | timezone = z }, Cmd.none )

        SaintsMsg saintsMsg ->
            let
                ( updatedSaintsModel, cmd ) =
                    SaintsPage.update model.key saintsMsg model.saintsPageModel
            in
            ( { model | saintsPageModel = updatedSaintsModel }, Cmd.map SaintsMsg cmd )

        FeastsMsg feastsMsg ->
            let
                ( updatedFeastsModel, cmd ) =
                    FeastsPage.update feastsMsg model.feastsPageModel
            in
            ( { model | feastsPageModel = updatedFeastsModel }, Cmd.map FeastsMsg cmd )

        ProductionsMsg productionsMsg ->
            let
                ( updatedProductionsModel, cmd ) =
                    AnimationsView.update model.key productionsMsg model.animationsPageModel
            in
            ( { model | animationsPageModel = updatedProductionsModel }, Cmd.map ProductionsMsg cmd )

        ToggleMenu ->
            ( { model | menuOpen = not model.menuOpen }, Cmd.none )

        NoOp ->
            ( model, Cmd.none )


updatePage : Model -> Url.Url -> ( Model, Cmd Msg )
updatePage model url =
    let
        urlString =
            Url.toString url

        isFileLink =
            let
                fileExtensions =
                    [ ".pdf", ".jpg", ".jpeg", ".png", ".webp", ".svg", ".mp4", ".doc", ".docx" ]
            in
            List.any (\ext -> String.endsWith ext urlString) fileExtensions
    in
    if isFileLink then
        ( { model | menuOpen = False }, Cmd.batch [ Nav.pushUrl model.key urlString ] )

    else if String.contains "animations" urlString then
        ( { model | url = url, page = Productions, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString ]
        )

    else if String.contains "give" urlString then
        ( { model | url = url, page = Give, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "contact" urlString then
        ( { model | url = url, page = Contact, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "team" urlString then
        ( { model | url = url, page = AboutUs, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "resources" urlString then
        ( { model | url = url, page = Resources, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "prayers" urlString then
        ( { model | url = url, page = Prayers, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "angelus" urlString then
        ( { model | url = url, page = Angelus, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "shop" urlString then
        ( { model | url = url, page = Shop, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "saints" urlString then
        ( { model | url = url, page = Saints, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "press" urlString then
        ( { model | url = url, page = Press, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "about/privacy-policy" urlString then
        ( { model | url = url, page = PrivacyPolicy, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "about/terms-and-conditions" urlString then
        ( { model | url = url, page = TermsAndConditions, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if String.contains "feastdayactivities" urlString then
        ( { model | url = url, page = Feasts, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else if url.path == "/" then
        ( { model | url = url, page = Home, menuOpen = False }
        , Cmd.batch [ Nav.pushUrl model.key urlString, scrollToTopCmd ]
        )

    else
        ( model, Cmd.none )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    case model.page of
        Home ->
            Sub.batch
                [ Time.every 6000 (\_ -> SectionsMsg NextAuto)
                , Sub.map SectionsMsg (Page.Home.Sections.subscriptions model.sections)
                ]

        _ ->
            Sub.batch [ ]



-- VIEW


view : Model -> Browser.Document Msg
view model =
    let
        { title, body } =
            case model.page of
                Home ->
                    viewHome model

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
                        saintPageModel =
                            model.saintsPageModel

                        document =
                            SaintsPage.view { saintPageModel | url = model.url }
                    in
                    { title = document.title, body = document.body |> List.map (Html.map SaintsMsg) }

                Feasts ->
                    let
                        feastModel =
                            model.feastsPageModel

                        document =
                            FeastsPage.view { feastModel | url = model.url }
                    in
                    { title = document.title, body = document.body |> List.map (Html.map FeastsMsg) }

                Productions ->
                    let
                        document =
                            AnimationsView.view model.url model.animationsPageModel
                    in
                    { title = document.title, body = document.body |> List.map (Html.map ProductionsMsg) }

                PrivacyPolicy ->
                    { title = "Privacy Policy"
                    , body = [ Html.map (\_ -> NoOp) PrivacyPolicyPage.view ]
                    }

                TermsAndConditions ->
                    { title = "Terms & Conditions"
                    , body = [ Html.map (\_ -> NoOp) TermsPage.view ]
                    }

                Press ->
                    { title = "Angelus", body = [ ViewPress.view ] }

                Download ->
                    { title = "Download", body = [ div [ class "p-10 text-center" ] [ text "This is a downloadable file. If it does not open automatically, please check your browser's download bar or try the direct link again." ] ] }
    in
    { title = title
    , body =
        [ div [ class "bg-black text-white" ]
            -- We don't show the header on the Donate page
            (if title == "Donate" then
                body

             else
                viewHeaderWithMenu title headerMargin model.menuOpen ToggleMenu
                    :: body
            )
        ]
    }


viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Claritas Studios"
    , body =
        [ div
            [ class "bg-black text-white"
            ]
            [ viewHeaderWithMenu "Claritas Studios" headerMargin model.menuOpen ToggleMenu
            , viewBody model
            , viewFooter
            ]
        ]
    }


viewBody : Model -> Html.Html Msg
viewBody model =
    div
        [ class "min-h-screen" ]
        [ Carousel.viewSlides model.animationsPageModel.slideshow AnimationsView.NextSlide AnimationsView.PrevSlide
            |> Html.map ProductionsMsg
        , section
            [ class "flex justify-center items-center py-48 px-10 bg-black" ]
            [ a
                [ href "/animations"
                , class "inline-block bg-white text-black text-lg font-medium tracking-wide px-11 py-4 rounded-full hover:opacity-85 transition-opacity duration-200"
                ]
                [ text "Watch Animations" ]
            ]
        , viewMission
        , viewWhatPeopleSaying model.sections |> Html.map SectionsMsg
        , viewStayConnected model.sections |> Html.map SectionsMsg
        , viewSupportMission
        ]

