module Main exposing (Model, main, view, viewBanner)

import Animations.ActOfContrition.Main exposing (donationButton, progressBar)
import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Json.Encode
import Newsroom.Main exposing (viewSignUp)
import Resources.Helpers exposing (ResourceGroup)
import Signup exposing (..)
import Svg.Attributes exposing (d)
import Team.Team exposing (carlos, kelly, trevor, viewPerson)
import Team.Testimonials exposing (ainsleyRawlingsTestimonial, camSmithTestimonial, kellyBriggsTestimonial, meganReisterTestimonial)
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


type alias Model =
    { key : Nav.Key
    , url : Url.Url
    , signup : Signup.Model
    }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    ( { key = key
      , url = url
      , signup = Signup.init
      }
    , Cmd.none
    )


type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url.Url
    | SignupMsg Signup.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    let
                        urlString =
                            Url.toString url
                    in
                    ( model, Nav.load (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UrlChanged url ->
            ( { model | url = url }
            , Cmd.none
            )

        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- VIEW


view : Model -> Browser.Document Msg
view model =
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


section1Background : List (Attribute msg)
section1Background =
    [ style "background" "#fff" ]


section2Background : List (Attribute msg)
section2Background =
    [ style "background" "#fff" ]


section3Background : List (Attribute msg)
section3Background =
    [ style "background" "#EBD7F2" ]


section4Background : List (Attribute msg)
section4Background =
    [ style "background" "#FEF7F4" ]


viewBody : Model -> Html.Html Msg
viewBody model =
    div
        [ class "text-lg leading-loose"
        , class "lg:text-2xl"
        ]
        [ viewIntro model
        , viewAnimations
        , div [ class "px-11 sm:pl-[150px] sm:pr-[100px]" ] [ viewTestimonials ]
        , div [ class "px-11 sm:pl-[150px] sm:pr-[100px]" ] [ viewTeam ]
        , viewContact
        , viewNewsletter
        , viewGive
        , div [ class "px-11 sm:pl-[150px] sm:pr-[100px]" ] [ viewResources ]
        ]


viewIntro : Model -> Html Msg
viewIntro model =
    viewSection "intro"
        [ class "my-10"
        ]
        [ div []
            [ div [ class "mb-10 max-w-5xl m-auto" ]
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
            [ --     div
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
              div
                [ style "position" "relative"
                , style "padding-bottom" "56.25%"
                , height 0
                , style "overflow" "hidden"
                , style "max-width" "100%"
                , style "border-radius" "5px"
                ]
                [ iframe
                    [ style "position" "absolute"
                    , style "width" "100%"
                    , style "height" "100%"
                    , style "top" "0"
                    , style "left" "0"
                    , src "https://www.youtube-nocookie.com/embed/ppNG8UFgUdo"
                    , title "About Catholic Stories for Children"
                    , property "frameborder" (Json.Encode.string "0")
                    , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                    , property "allowfullscreen" (Json.Encode.string "true")
                    ]
                    []
                ]
            ]

        -- , div [ class "mt-10" ] [ progressBar ]
        -- , a
        --     [ style "padding" "10px 10px"
        --     , style "display" "inline-block"
        --     , style "border-radius" "5px"
        --     , style "border-radius" "5px"
        --     , style "box-shadow" "#777 1px 1px 5px"
        --     , class "text-lg"
        --     -- , class "bg-[#9200B3]"
        --     , href "/animations/actofcontrition"
        --     , attribute "aria-label" "Check out our upcoming animation"
        --     , class "bg-csc-yellow"
        --     , class "font-bold"
        --     ]
        --     [ text "Check out our upcoming animation!" ]
        ]


viewTeam : Html msg
viewTeam =
    viewSection "team"
        [ class "bg-[#FEF7F4]"
        , class "py-20"
        ]
        [ h2 subHeaderStyle
            [ text "The Team" ]
        , div
            [ class "grid xl:grid-cols-3 gap-5 max-w-[120rem]"
            , class "my-10"
            ]
            [ viewPerson trevor
            , viewPerson carlos
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


viewAnimations : Html msg
viewAnimations =
    viewSection "animations"
        [ class "pb-20 bg-white" ]
        [ div
            [ class "pt-32 lg:pt-48"
            ]
            [ div []
                [ h2 subHeaderStyle
                    [ text "Animations" ]
                ]
            , p [ class "text-center pb-3 px-10" ]
                [ text "These animations are made to help kids learn the Hail Mary prayer, the prayer to their guardian angel, and more!"
                ]
            , div
                [ class "w-full"
                , class "grid grid-cols-1 lg:grid-cols-2"
                , class "max-w-[120rem]"
                , class "m-auto"
                ]
                [ a
                    [ href "/animations/hailmary"
                    , class "hover:scale-105 transition ease-in-out duration-50"
                    , attribute "aria-label" "See the Hail Mary Animation"
                    ]
                    [ img
                        [ src "/assets/images/AnimationImageLinks/HailMary.png"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Hail Mary Animation"
                        ]
                        []
                    ]
                , a
                    [ href "/animations/prayertimewithangels"
                    , class "hover:scale-105 transition ease-in-out duration-50"
                    , attribute "aria-label" "See the Prayer Time with Angels animation"
                    ]
                    [ img
                        [ src "/assets/images/AnimationImageLinks/PrayerTimeWithAngels.png"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Prayer Time with Angels animations"
                        ]
                        []
                    ]
                , a
                    [ href "/animations/daisyandsheep"
                    , class "hover:scale-105 transition ease-in-out duration-50"
                    , attribute "aria-label" "Daisy and Sheep animations"
                    ]
                    [ img
                        [ src "/assets/images/AnimationImageLinks/DaisyAndSheep.png"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Daisy and Sheep Animations"
                        ]
                        []
                    ]
                , div
                    [ style "clear" "both"
                    , style "width" "1px"
                    ]
                    []
                ]
            ]
        ]


viewTestimonials : Html msg
viewTestimonials =
    viewSection "testimonials"
        [ class "py-20 bg-[#FEF7F4] w-screen"
        ]
        [ h2 subHeaderStyle [ text "Testimonials" ]
        , div [ class " md:flex md:overflow-x-auto" ]
            [ div [ class "flex-none md:w-1/3 min-w-[325px] my-10 md:mr-20" ] [ viewPerson ainsleyRawlingsTestimonial ]
            , div [ class "flex-none md:w-1/3 min-w-[325px] my-10 md:mr-20" ] [ viewPerson camSmithTestimonial ]
            , div [ class "flex-none md:w-1/3 min-w-[325px] my-10 md:mr-20" ] [ viewPerson meganReisterTestimonial ]
            , div [ class "flex-none md:w-1/3 min-w-[325px] my-10 md:mr-20" ] [ viewPerson kellyBriggsTestimonial ]
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
        [ style "min-height" "100vh"
        , style "position" "relative"
        , style "background-position" "top"
        , style "text-align" "center"
        , style "text-align" "-webkit-center"
        , style "font-weight" "400"
        , style "line-height" "1.7"
        , style "background" "#9DE2EA80"
        , class "py-20 md:py-40"
        ]
        [ div
            []
            [ h2 subHeaderStyle
                [ text "Give" ]
            , p
                [ style "text-align" "center"
                ]
                [ text "Help us create Catholic animations and resources" ]
            , p
                [ style "text-align" "center"
                ]
                [ text "for you." ]
            , p [ style "text-align" "center" ]
                [ div
                    [ style "margin-bottom" "30px"
                    , class "p-3"
                    , class "flex justify-center"
                    ]
                    [ a
                        [ href "https://www.patreon.com/catholicstoriesforchildren?fan_landing=true"
                        , rel "noopener"
                        , target "_blank"
                        , style "text-decoration" "none"
                        , style "padding" "10px 20px"
                        , style "box-shadow" "#777 1px 1px 5px"
                        , style "border-radius" "5px"
                        , style "color" "white"
                        , style "background-color" "#9200B3"
                        ]
                        [ text "Become a patron"
                        ]
                    ]
                , div
                    [ style "text-align" "center"
                    , style "border-radius" "5px"
                    , style "padding" "20px"
                    , class "flex justify-center"
                    ]
                    [ a
                        [ href "/give"
                        , rel "noopener"
                        , style "text-decoration" "none"
                        , style "padding" "10px 20px"
                        , style "color" "black"
                        , style "border" "2px solid #777"
                        , style "border-radius" "5px"
                        , style "box-shadow" "#777 1px 1px 5px"
                        ]
                        [ text "More ways to donate" ]
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
        [ style "min-height" "100vh"
        , style "position" "relative"
        , style "background-position" "top"
        , style "font-weight" "400"
        , style "line-height" "1.7"
        , style "background" "#FEF7F4"
        , class "py-20 md:py-40"
        ]
        [ div
            []
            [ h2 subHeaderStyle
                [ text "Resources" ]
            , viewResourceGroups
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
    }


prayers : ResourceGroup
prayers =
    { name = "Prayers"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/6_qYAX4yqV6.png?updatedAt=1682454350004"
    , description = "Find prayers resources and information here."
    , link = "resources/prayer"
    }


more : ResourceGroup
more =
    { name = "More Resources"
    , image = "https://ik.imagekit.io/catholicstories/Resources_Icons/5_siQ_tckr-C.png?updatedAt=1682454350018"
    , description = "Find more resources here."
    , link = "resources"
    }


viewSection : String -> List (Attribute msg) -> List (Html.Html msg) -> Html.Html msg
viewSection sectionId background body =
    section
        ([ id sectionId
         , style "min-height" "80vh"
         ]
            ++ background
        )
        body


viewBanner : String -> String -> String -> Html.Html msg
viewBanner url title pageUrl =
    a
        [ style "background" ("linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))," ++ "url('" ++ url ++ "')")
        , style "width" "100vw"
        , style "height" "100vh"
        , style "background-position" "center"
        , style "background-repeat" "no-repeat"
        , style "background-size" "cover"
        , style "text-align" "center"
        , style "cursor" "pointer"
        , style "display" "flex"
        , style "align-items" "center"
        , style "opacity" "0.6"
        , href pageUrl
        ]
        [ h2
            [ style "color" "white"
            , style "font-size" "3.5rem"
            , style "position" "absolute"
            , style "width" "100%"
            , style "text-align" "center"
            ]
            [ text title ]
        ]


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
