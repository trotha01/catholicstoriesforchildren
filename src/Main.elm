module Main exposing (Model, main, view)

import Animations.Helpers.Carousel as Carousel
import Animations.View
import Browser
import Browser.Dom as Dom
import Browser.Navigation as Nav
import Contact.View as ContactPage
import FeastDayActivities.Main as FeastsPage
import Footer exposing (viewFooter)
import Give.View as GivePage
import Header exposing (viewHeader)
import Helpers exposing (..)
import Home.Sections exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode
import Navigation.View as NavigationPage
import Newsroom.View exposing (viewSignUp)
import Newsroom.ViewPress as ViewPress exposing (..)
import NotFound.Main
import Prayer.Angelus.View as AngelusPage
import Prayers.View as PrayersPage
import Resources.Helpers exposing (ResourceGroup)
import Resources.View as ResourcesPage
import Saints.Main as SaintsPage
import Shop.ShopHelpers exposing (viewPrintfulShopItems)
import Shop.View as ShopPage
import Signup exposing (..)
import Task
import Team.Team exposing (kelly, lindsey, trevor, viewPerson)
import Team.Testimonials exposing (ainsleyRawlingsTestimonial, camSmithTestimonial, kellyBriggsTestimonial, meganReisterTestimonial)
import Team.View as TeamPage exposing (cfnLive, christianChannel, inHisImage, makeJoyNormal, ocCatholic, spiritFilledMedia)
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
    , animationsPageModel : Animations.View.Model
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        ( animationsPageModel, animationsPageCmd ) =
            Animations.View.init flags url key

        ( saintsPageModel, saintsPageCmd ) =
            SaintsPage.init flags url key

        ( feastsPageModel, feastsPageCmd ) =
            FeastsPage.init flags url key

        ( isRedirectedUrl, newPath, redirectedUrl ) =
            -- we use redirectUrl for github. We won't need this when we switch to netlify
            redirectUrl url

        urlString =
            Url.toString url

        initialPage =
            if String.contains "animations" urlString then
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
                -- --
                -- Need to wait until netlify to add feastdayactivities to the SPA. The github 404 redirect doesn't current work with url queries
                -- else if String.contains "feastdayactivities" urlString then
                --     ( { model | url = url, page = Feasts }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )

            else if String.contains "saints" urlString then
                Saints

            else if String.contains "press" urlString then
                Press

            else
                Home

        initModel =
            { key = key
            , url = redirectedUrl
            , signup = Signup.init
            , page =
                initialPage
            , time = Time.millisToPosix 0
            , timezone = Time.utc
            , language = English
            , saintsPageModel = saintsPageModel
            , feastsPageModel = feastsPageModel
            , animationsPageModel = animationsPageModel
            }

        ( redirectedModel, redirectedMsg ) =
            if isRedirectedUrl then
                update (LinkClicked (Browser.Internal redirectedUrl)) initModel

            else
                ( initModel, Cmd.none )
    in
    ( redirectedModel
    , Cmd.batch
        [ Task.perform NewTime Time.now
        , Task.perform NewZone Time.here
        , Cmd.map ProductionsMsg animationsPageCmd
        , Cmd.map SaintsMsg saintsPageCmd
        , Cmd.map FeastsMsg feastsPageCmd
        , redirectedMsg
        ]
    )


redirectUrl : Url.Url -> ( Bool, String, Url.Url )
redirectUrl url =
    case url.query of
        Just q ->
            if String.contains "redirect" q then
                let
                    newPath =
                        String.dropLeft 9 q
                in
                ( True, newPath, { url | path = newPath, query = Nothing } )

            else
                ( False, "", url )

        Nothing ->
            ( False, "", url )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg
    | NewTime Time.Posix
    | NewZone Time.Zone
    | LanguageChange Language
    | SaintsMsg SaintsPage.Msg
    | FeastsMsg FeastsPage.Msg
    | ProductionsMsg Animations.View.Msg
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
            loadPage model url

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )

        NewTime t ->
            ( { model | time = t }, Cmd.none )

        NewZone z ->
            ( { model | timezone = z }, Cmd.none )

        LanguageChange language ->
            ( { model | language = language }, Cmd.none )

        SaintsMsg saintsMsg ->
            let
                ( updatedSaintsModel, cmd ) =
                    SaintsPage.update saintsMsg model.saintsPageModel
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
                    Animations.View.update productionsMsg model.animationsPageModel
            in
            ( { model | animationsPageModel = updatedProductionsModel }, Cmd.map ProductionsMsg cmd )

        NoOp ->
            ( model, Cmd.none )


scrollToTopCmd : Cmd Msg
scrollToTopCmd =
    Dom.setViewport 0 0
        |> Task.perform (\_ -> NoOp)


updatePage : Model -> Url.Url -> ( Model, Cmd Msg )
updatePage model url =
    let
        urlString =
            Url.toString url
    in
    if String.contains "joseph" urlString then
        ( model, Nav.load "https://www.kickstarter.com/projects/catholicstories/saint-joseph-animation" )

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
        -- --
        -- Need to wait until netlify. The github 404 redirect doesn't current work with url queries
        -- else if String.contains "feastdayactivities" urlString then
        --     ( { model | url = url, page = Feasts }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )

    else if String.contains "saints" urlString then
        ( { model | url = url, page = Saints }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )

    else if String.contains "press" urlString then
        ( { model | url = url, page = Press }, Cmd.batch [ Nav.pushUrl model.key (Url.toString url), scrollToTopCmd ] )

    else
        ( model, Nav.load (Url.toString url) )


loadPage : Model -> Url.Url -> ( Model, Cmd Msg )
loadPage model url =
    -- Used by URLChanged to ensure forward/back navigation works
    let
        urlString =
            Url.toString url
    in
    if String.contains "joseph" urlString then
        ( model, Nav.load "https://www.kickstarter.com/projects/catholicstories/saint-joseph-animation" )

    else if String.contains "animations" urlString then
        ( { model | url = url, page = Productions }, scrollToTopCmd )

    else if String.contains "navigation" urlString then
        ( { model | url = url, page = Navigation }, scrollToTopCmd )

    else if String.contains "give" urlString then
        ( { model | url = url, page = Give }, scrollToTopCmd )

    else if String.contains "contact" urlString then
        ( { model | url = url, page = Contact }, scrollToTopCmd )

    else if String.contains "team" urlString then
        ( { model | url = url, page = AboutUs }, scrollToTopCmd )

    else if String.contains "resources" urlString then
        ( { model | url = url, page = Resources }, scrollToTopCmd )

    else if String.contains "prayers" urlString then
        ( { model | url = url, page = Prayers }, scrollToTopCmd )

    else if String.contains "angelus" urlString then
        ( { model | url = url, page = Angelus }, scrollToTopCmd )

    else if String.contains "shop" urlString then
        ( { model | url = url, page = Shop }, scrollToTopCmd )
        -- --
        -- Need to wait until netlify. The github 404 redirect doesn't current work with url queries
        -- else if String.contains "feastdayactivities" urlString then
        --     ( { model | url = url, page = Feasts }, scrollToTopCmd )

    else if String.contains "saints" urlString then
        ( { model | url = url, page = Saints }, scrollToTopCmd )

    else if String.contains "press" urlString then
        ( { model | url = url, page = Press }, scrollToTopCmd )

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
                        saintPageModel =
                            model.saintsPageModel

                        document =
                            SaintsPage.view { saintPageModel | url = model.url }
                    in
                    { title = document.title, body = document.body |> List.map (Html.map SaintsMsg) }

                Feasts ->
                    let
                        document =
                            FeastsPage.view model.feastsPageModel
                    in
                    { title = document.title, body = document.body |> List.map (Html.map FeastsMsg) }

                Productions ->
                    let
                        document =
                            Animations.View.view model.url model.animationsPageModel
                    in
                    { title = document.title, body = document.body |> List.map (Html.map ProductionsMsg) }

                Press ->
                    { title = "Angelus", body = [ ViewPress.view ] }

                NotFound ->
                    let
                        document =
                            NotFound.Main.view
                    in
                    { title = "Tony Help, Page Not Found", body = [ Html.map (\_ -> NoOp) document ] }
    in
    { title = title, body = body }


viewHome : Model -> Browser.Document Msg
viewHome model =
    { title = "Catholic Stories for Children"
    , body =
        [ div
            [ style "background-color" "#FEF7F4"
            ]
            [ viewHeader "Catholic Stories for Children" headerMargin
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

        -- , viewIntro model
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
        [ Carousel.viewSlides model.animationsPageModel.slideshow Animations.View.NextSlide Animations.View.PrevSlide
            |> Html.map ProductionsMsg
        ]


viewIntro : Model -> Html Msg
viewIntro model =
    viewSection "intro"
        [ class "my-10"
        ]
        [ div []
            [ div [ class "mb-10 max-w-5xl m-auto  px-11 lg:px-0" ]
                [ h2
                    [ class "mb-7 leading-10"
                    ]
                    [ text "Start teaching your children with Catholic animations" ]
                , p [ class "leading-10" ]
                    [ text "Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts."
                    ]
                ]
            , div [ class "mt-2 mb-20" ]
                [ Signup.view4 |> Html.map SignupMsg ]
            ]
        , div
            [ class "max-w-5xl m-auto" ]
            -- INTRO VIDEO
            [--     div
             --     [ style "position" "relative"
             --     , style "padding-bottom" "56.25%"
             --     , height 0
             --     , style "overflow" "hidden"
             --     , style "max-width" "100%"
             --     , style "border-radius" "5px"
             --     ]
             --     [ iframe
             --         [ style "position" "absolute"
             --         , style "width" "100%"
             --         , style "height" "100%"
             --         , style "top" "0"
             --         , style "left" "0"
             --         , src "https://player.vimeo.com/video/702301712?h=d6ef012bb2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
             --         , title "About Catholic Stories for Children"
             --         , property "frameborder" (Json.Encode.string "0")
             --         , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
             --         , property "allowfullscreen" (Json.Encode.string "true")
             --         ]
             --         []
             --     ]
             -- ,
             -- Coming Soon Video
             --   div
             --     [ style "position" "relative"
             --     , style "padding-bottom" "56.25%"
             --     , height 0
             --     , style "overflow" "hidden"
             --     , style "max-width" "100%"
             --     , style "border-radius" "5px"
             --     ]
             --     [ iframe
             --         [ style "position" "absolute"
             --         , style "width" "100%"
             --         , style "height" "100%"
             --         , style "top" "0"
             --         , style "left" "0"
             --         , src "https://www.youtube-nocookie.com/embed/ppNG8UFgUdo"
             --         , title "About Catholic Stories for Children"
             --         , property "frameborder" (Json.Encode.string "0")
             --         , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
             --         , property "allowfullscreen" (Json.Encode.string "true")
             --         ]
             --         []
             --     ]
            ]
        ]


viewTeam : Html msg
viewTeam =
    viewSection "team"
        [ class "py-20 bg-[#FEF7F4]"
        ]
        [ div [ class "w-full max-w-7xl mx-auto mb-20 px-4 sm:px-10 lg:px-20" ]
            [ h2 [ class "mb-10 text-3xl sm:text-5xl lg:text-7xl" ] [ text "The Team" ]
            , div
                [ class "grid xl:grid-cols-3 gap-5"
                , class "my-10"
                ]
                [ viewPerson trevor
                , viewPerson lindsey
                , viewPerson kelly
                ]
            , a
                [ href "/team"
                , rel "noopener"
                , style "text-decoration" "none"
                , style "padding" "10px 20px"
                , style "display" "inline-block"
                , style "color" "black"
                , style "border" "2px solid #777"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                ]
                [ text "Meet the Team" ]
            ]
        ]


viewAnimations : Model -> Html Msg
viewAnimations model =
    viewSection "animations"
        [ class "py-20 bg-[#282c2e] text-white"
        ]
        [ Animations.View.viewProductions model.animationsPageModel |> Html.map ProductionsMsg
        ]


viewTestimonials : Html msg
viewTestimonials =
    viewSection "testimonials"
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


viewShop : Html msg
viewShop =
    viewSection "shop"
        [ class "py-20 bg-[#282c2e] text-white"
        ]
        [ div [ class "w-full max-w-7xl m-auto mb-20 px-20" ]
            [ h2 [ class "mb-10 text-7xl" ] [ text "Shop" ]
            , viewPrintfulShopItems
            ]
        ]


viewContact : Html msg
viewContact =
    viewSection "contact"
        [ style "background" "#EBD7F2"
        , style "font-weight" "400"
        , style "line-height" "1.7em"
        , class "py-64"
        ]
        [ h2 subHeaderStyle
            [ text "Contact Us!" ]
        , div
            [ style "width" "fit-content"
            , style "margin-left" "auto"
            , style "margin-right" "auto"
            , style "max-width" "700px"
            ]
            [ p
                [ style "text-align" "center" ]
                [ text "Please reach out!"
                , br [] []
                , text "I love to hear from you!"
                ]
            , p
                [ style "overflow-wrap" "anywhere"
                , class "text-base lg:text-3xl"
                , class "mt-3 lg:mt-5"
                ]
                [ -- span [ attribute "ariaHidden" "true" ] [ text "📫 " ]
                  span [ style "display" "inline-block" ]
                    [ text "trevor"
                    , span [] [ text "@" ]
                    ]
                , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "🍯") ] []
                , span [ attribute "ariaHidden" "true", property "innerHTML" (Json.Encode.string "spam@catholicstoriesforchildren.com") ] []
                , span [ height 0, width 0, style "display" "none", hidden True ] [ text "spam@catholicstoriesforchildren.com" ]
                , span []
                    [ text "catholicstoriesforchildren"
                    , span []
                        [ text "."
                        , span [] [ text "com" ]
                        ]
                    ]
                ]

            -- if the email starts getting spammed, we can update to use a form
            -- , Html.String.form [ action "https://formspree.io/f/xzbkgowy", method "POST", target "my-iframe" ]
            --     [ label [] [ text "email", input [ type_ "email", name "_replyto" ] [] ]
            --     , label [] [ text "message", textarea [ type_ "message", name "message" ] [] ]
            --     , button [ type_ "submit" ] [ text "send" ]
            --     ]
            -- , iframe [ name "my-iframe", height 0, width 0 ] []
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.facebook.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://www.facebook.com/Catholic-Stories-for-Children-120657933116228"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Facebook" ]
            --     ]
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.instagram.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://www.instagram.com/catholicstoriesforchildren"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Instagram" ]
            --     ]
            -- , p []
            --     [ img [ height 16, width 16, src "https://www.twitter.com/favicon.ico", attribute "ariaHidden" "true" ] []
            --     , span [] [ text " " ]
            --     , a
            --         [ href "https://twitter.com/StoriesCatholic"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "underline"
            --         , style "color" "black"
            --         ]
            --         [ text "Twitter" ]
            --     ]
            ]
        ]


viewNewsletter : Html msg
viewNewsletter =
    viewSection "newsletter"
        [ style "background" "#FEF7F4"
        , class "py-20"
        ]
        [ h2 subHeaderStyle
            [ text "Stay Updated!" ]
        , div
            [ style "width" "fit-content"
            , style "margin-left" "auto"
            , style "margin-right" "auto"
            , style "padding" "20px"
            , style "max-width" "700px"
            , style "text-align" "center"
            , style "margin-top" "50px"
            ]
            [ p [ class "mb-5" ] [ text "See our latest animation news." ]
            , a
                [ href "/newsroom"
                , rel "noopener"
                , style "text-decoration" "none"
                , style "padding" "10px 20px"
                , style "display" "inline-block"
                , style "color" "black"
                , style "border" "2px solid #777"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                ]
                [ text "Latest News" ]
            , div [ class "mt-10" ]
                [ viewSignUp
                ]
            ]
        ]


viewGive : Html msg
viewGive =
    viewSection "give"
        [ class "bg-[#9101b3] text-white" ]
        [ div [ class "w-full max-w-7xl m-auto p-20" ]
            [ h2 [ class "my-10 text-7xl" ] [ text "Give" ]
            , div [ class "flex flex-col" ]
                [ p [] [ text "Want more Catholic animations? Find out ways you can help us!" ]
                , a
                    [ href "/give"
                    , target "_blank"
                    , class "flex flex-col items-center justify-center rounded p-7 text-center bg-white text-black w-full sm:w-96 my-10"
                    ]
                    [ text "Learn More"
                    ]
                ]

            -- , p []
            --     [ text "Support our next video with "
            --     , a
            --         [ href "https://www.gofundme.com/f/catholicstoriesforchildren"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "text-decoration" "none"
            --         ]
            --         [ text "GoFundMe" ]
            --     , text "!"
            --     ]
            ]
        ]


viewResources : Html msg
viewResources =
    viewSection "resources"
        [ class "bg-[#FEF7F4]"
        ]
        [ div [ class "w-full max-w-7xl m-auto my-20 px-20" ]
            [ h2 [ class "mb-10 text-4xl sm:text-7xl" ] [ text "Resources" ]
            , div [ class "flex flex-col" ]
                [ viewResourceGroups
                ]
            ]
        ]


viewResourceGroups : Html msg
viewResourceGroups =
    div []
        (List.map viewResourceGroup [ saints, prayers, more ])


viewResourceGroup : ResourceGroup -> Html msg
viewResourceGroup resourceGroup =
    a
        [ class "grid grid-cols-[100px_1fr] hover:bg-csc-lightpurple rounded p-7"
        , href ("/" ++ resourceGroup.link)
        , attribute "aria-label" resourceGroup.name
        ]
        [ div []
            [ img [ src resourceGroup.image, class "w-20 h-20 object-cover" ] []
            ]
        , div []
            [ h2 [] [ text resourceGroup.name ]
            , p [] [ text resourceGroup.description ]
            ]
        ]


saints : ResourceGroup
saints =
    { name = "Saints"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/7_nqDiNpO9Q.png?updatedAt=1682454350040"
    , description = "Find a list of saints here."
    , link = "saints"
    , resources = []
    }


prayers : ResourceGroup
prayers =
    { name = "Prayers"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/6_qYAX4yqV6.png?updatedAt=1682454350004"
    , description = "Find prayers resources and information here."
    , link = "resources/prayer"
    , resources = []
    }


more : ResourceGroup
more =
    { name = "More Resources"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/5_siQ_tckr-C.png?updatedAt=1682454350018"
    , description = "Find more resources here."
    , link = "resources"
    , resources = []
    }


viewSection : String -> List (Attribute msg) -> List (Html.Html msg) -> Html.Html msg
viewSection sectionId background body =
    section
        (id sectionId
            :: background
        )
        body


cornerBorder : Attribute msg
cornerBorder =
    class
        ("before:absolute before:w-56 md:before:w-80 lg:before:w-96 before:h-4 before:top-0"
            ++ " before:border-t-4 before:border-l-4 before:border-solid before:border-csc-lightblue before:rounded"
        )


subHeaderStyle : List (Attribute msg)
subHeaderStyle =
    [ style "text-align" "center"
    , style "line-height" "1.2em"
    , style "font-family" "hvdComicSerifPro"
    , class "text-4xl md:text-7xl"
    , style "color" "#333333"
    , class "m-5"
    ]
