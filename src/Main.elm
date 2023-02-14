module Main exposing (Model, main, view, viewBanner)

import Browser
import Browser.Navigation as Nav
import Footer exposing (viewFooter)
import Header exposing (viewHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.String
import Json.Encode
import Newsroom.Main exposing (viewSignUp)
import Svg.Attributes exposing (d)
import Team.Main exposing (viewPerson)
import Team.Team exposing (fredrick, kelly, noeli, trevor)
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
                    in
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


view : Model -> Browser.Document Msg
view model =
    { title = "Catholic Stories for Children"
    , body =
        [ div
            [ style "background-color" "#FEF7F4"
            ]
            [ viewHeader "Catholic Stories for Children" headerMargin |> Html.String.toHtml
            , viewBody
            , viewFooter |> Html.String.toHtml
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


viewBody : Html.Html msg
viewBody =
    div
        [ class "text-lg leading-loose"
        , class "lg:text-2xl"
        ]
        [ viewIntro
        , viewTeam
        , viewAnimations
        , viewTestimonials
        , viewContact
        , viewNewsletter
        , viewGive
        ]


viewIntro : Html msg
viewIntro =
    viewSection "videos"
        [ class "grid grid-cols-1 lg:grid-cols-2 gap-5"
        , class "max-w-[120rem]"
        , class "my-10"
        ]
        [ div [ class "mb-20" ]
            [ h2
                [ class "mb-7"
                ]
                [ text "Animations for Catholic Children" ]
            , p [ class "leading-10" ]
                [ text "Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts."
                ]
            , div [ class "mt-10" ]
                [ viewSignUp |> Html.String.toHtml
                ]
            ]
        , div
            []
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
                    , src "https://www.youtube-nocookie.com/embed/uxP6KFTER60"
                    , title "About Catholic Stories for Children"
                    , property "frameborder" (Json.Encode.string "0")
                    , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                    , property "allowfullscreen" (Json.Encode.string "true")
                    ]
                    []
                ]
            ]
        ]


viewTeam : Html msg
viewTeam =
    viewSection "team"
        [ class "bg-csc-lightpurple"
        , class "py-20"
        ]
        [ h2 [] [ text "The Team" ]
        , div
            [ class "grid xl:grid-cols-3 gap-5 max-w-[120rem]"
            , class "my-10"
            ]
            [ viewPerson trevor |> Html.String.toHtml
            , viewPerson noeli |> Html.String.toHtml
            , viewPerson kelly |> Html.String.toHtml
            ]
        , a
            [ href "/team"
            , rel "noopener"
            , style "text-decoration" "none"
            , style "padding" "10px"
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
                [ h2
                    [ style "text-align" "center"
                    , style "line-height" "1.2em"
                    , style "font-family" "hvdComicSerifPro"
                    , class "text-4xl md:text-7xl"
                    , class "m-5"
                    ]
                    [ text "Animations" ]
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
                        [ src "https://ik.imagekit.io/catholicstories/HailMaryThumbnail__gib_kTB5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792895348"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Hail Mary Animation"
                        ]
                        []
                    ]
                , a
                    [ href "/animations/guardianangel"
                    , class "hover:scale-105 transition ease-in-out duration-50"
                    , attribute "aria-label" "See the Guardian Angel Animation"
                    ]
                    [ img
                        [ src "https://ik.imagekit.io/catholicstories/GuardianAngelThumbnailWatchNow_BjJTzxGXi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675312385506"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Guardian Angel Animation"
                        ]
                        []
                    ]
                , div
                    [ style "border-radius" "5px"
                    , class "grayscale"
                    , class "hover:cursor-not-allowed"
                    ]
                    [ img
                        [ src "https://ik.imagekit.io/catholicstories/StMichaelThumbnail_NT9bW1h_f.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897722"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "St Michael Animation"
                        ]
                        []
                    ]
                , div
                    [ style "border-radius" "5px"
                    , class "grayscale"
                    , class "hover:cursor-not-allowed"
                    ]
                    [ img
                        [ src "https://ik.imagekit.io/catholicstories/ActOfContritionThumbnail_ZhqDBSv-_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897691"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Act of Contrition Animation"
                        ]
                        []
                    ]
                , div
                    [ style "border-radius" "5px"
                    , class "grayscale"
                    , class "hover:cursor-not-allowed"
                    ]
                    [ img
                        [ src "https://ik.imagekit.io/catholicstories/PrayerBeforeMealsThumbnail_BEdVorQ-U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897552"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "Prayer Before Meals Animation"
                        ]
                        []
                    ]
                , div
                    [ style "border-radius" "5px"
                    , class "grayscale"
                    , class "hover:cursor-not-allowed"
                    ]
                    [ img
                        [ src "https://ik.imagekit.io/catholicstories/StAnthonyThumbnail_zew-tMMcf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897276"
                        , style "border-radius" "5px"
                        , style "width" "-webkit-fill-available"
                        , alt "St Anthony Animation"
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
        [ h2 [ class "mb-10" ] [ text "Testimonials" ]
        , div [ class " md:flex md:overflow-x-auto" ]
            [ div [ class "flex-none w-1/3 min-w-[500px] my-10 mr-20" ] [ viewPerson meganReisterTestimonial |> Html.String.toHtml ]
            , div [ class "flex-none w-1/3 min-w-[500px] my-10 mr-20" ] [ viewPerson ainsleyRawlingsTestimonial |> Html.String.toHtml ]

            -- , div [ class "flex-none w-1/3 min-w-[500px] my-10 mr-20" ] [ viewPerson camSmithTestimonial |> Html.String.toHtml ]
            , div [ class "flex-none w-1/3 min-w-[500px] my-10 mr-20" ] [ viewPerson kellyBriggsTestimonial |> Html.String.toHtml ]
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
        [ h2
            [ style "text-align" "center"
            , style "font-family" "hvdComicSerifPro"
            , style "color" "#333333"
            , class "text-5xl"
            , class "mt-40 mb-5"
            ]
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
        [ h2
            [ style "text-align" "center"
            , class "text-5xl"
            , style "font-family" "hvdComicSerifPro"
            , style "color" "#333333"
            , class "mt-24 mb-5"
            ]
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
            [ a
                [ href "/newsroom"
                , rel "noopener"
                , style "text-decoration" "none"
                , style "padding" "10px"
                , style "display" "inline-block"
                , style "color" "black"
                , style "border" "2px solid #777"
                , style "border-radius" "5px"
                , style "box-shadow" "#777 1px 1px 5px"
                ]
                [ text "Latest News" ]
            , div [ class "mt-10" ]
                [ viewSignUp |> Html.String.toHtml
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
            [ h2
                [ style "text-align" "center"
                , style "font-size" "4rem"
                , style "line-height" "1.2em"
                , style "font-family" "hvdComicSerifPro"
                ]
                [ text "Give" ]
            , p
                [ style "text-align" "center"
                ]
                [ text "All donations are tax deductible" ]
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
                        , style "padding" "20px"
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


viewSection : String -> List (Attribute msg) -> List (Html.Html msg) -> Html.Html msg
viewSection sectionId background body =
    section
        ([ id sectionId
         , class "FortyToEightypadding"
         , class "px-5 sm:pl-[150px] sm:pr-[100px] lg:pr-10"
         , style "transform-style" "preserve-3d"
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
