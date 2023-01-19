module Main exposing (Model, main, view, viewBanner)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Json.Encode



-- MAIN


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
                    |> toString 0
                    |> text
                    |> toHtml
        , update = \_ -> \model -> model
        }



-- VIEW


view : Html.String.Html Never
view =
    div
        [ -- For parallax
          style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        ]
        [ viewHeader "Catholic Stories for Children" headerMargin
        , viewBody
        , viewFooter
        ]


section1Background : List (Attribute Never)
section1Background =
    [ style "background" "#fff" ]


section2Background : List (Attribute Never)
section2Background =
    [ style "background" "#fff" ]


section3Background : List (Attribute Never)
section3Background =
    [ style "background" "#EBD7F2" ]


section4Background : List (Attribute Never)
section4Background =
    [ style "background" "#FEF7F4" ]


viewBody : Html.String.Html Never
viewBody =
    div
        [ class "text-lg leading-loose"
        , class "lg:text-2xl"
        ]
        [ viewSection "videos"
            section1Background
            [ div
                []
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
                    , style "margin-top" "80px"
                    ]
                    [ iframe
                        [ style "position" "absolute"
                        , style "width" "100%"
                        , style "height" "100%"
                        , style "top" "0"
                        , style "left" "0"
                        , src "https://www.youtube.com/embed/uxP6KFTER60"
                        , title "About Catholic Stories for Children"
                        , property "frameborder" (Json.Encode.string "0")
                        , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                        , property "allowfullscreen" (Json.Encode.string "true")
                        ]
                        []
                    ]
                , div
                    [ class "mt-32 lg:mt-48"
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
                        , class "max-w-7xl"
                        , class "m-auto"
                        ]
                        [ a
                            [ href "/animations/hailmary"
                            , class "hover:scale-105 transition ease-in-out duration-50"
                            ]
                            [ img
                                [ src "https://ik.imagekit.io/catholicstories/HailMaryThumbnail__gib_kTB5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792895348"
                                , style "border-radius" "5px"
                                , style "width" "-webkit-fill-available"
                                ]
                                []
                            ]
                        , div
                            [ style "border-radius" "5px"
                            , class "grayscale"
                            , class "hover:cursor-not-allowed"
                            ]
                            [ img
                                [ src "https://ik.imagekit.io/catholicstories/GuardianAngelThumbnail_8kiHWq1pu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673792897611"
                                , style "border-radius" "5px"
                                , style "width" "-webkit-fill-available"
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
            ]
        , viewSection "about"
            section2Background
            [ div
                [ style "max-width" "800px"
                , style "margin" "auto"
                , style "font-weight" "400"
                , style "line-height" "1.7em"
                , cornerBorder
                ]
                [ h2
                    [ style "color" "#325164"
                    , style "text-align" "center"
                    , style "line-height" "1.2em"
                    , style "font-family" "hvdComicSerifPro"
                    , class "text-4xl md:text-7xl"
                    , class "m-5"
                    ]
                    [ text "About" ]
                , p [ class "mb-4" ]
                    [ text """Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts."""
                    ]
                , p []
                    [ text """Many kids today are growing up without knowing the core concepts of our faith. Many are learning the prayers without understanding the words they are saying. We hope to help bridge this gap with enjoyable stories, animations and songs. We hope to help kids grow with a strong love of neighbor and God."""
                    ]
                ]
            , div
                [ style "text-align" "center"
                , class "m-8"
                ]
                [ a
                    [ href "/team"
                    , rel "noopener"
                    , style "text-decoration" "none"
                    , style "padding" "20px"
                    , style "display" "inline-block"
                    , style "color" "black"
                    , style "border" "2px solid #777"
                    , style "border-radius" "5px"
                    , style "box-shadow" "#777 1px 1px 5px"
                    ]
                    [ text "Meet the team" ]
                ]
            ]
        , viewSection "contact"
            section3Background
            [ div
                [ style "font-weight" "400"
                , style "line-height" "1.7em"
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
            ]
        , viewSection "newsletter"
            section4Background
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
                    [ href "https://catholicstoriesforchildren.com/newsroom"
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
                , p
                    [ style "margin-top" "80px"
                    , class "pb-5"
                    ]
                    [ text "Sign up for our email list to get updates!" ]
                , a
                    [ href "https://signup.catholicstoriesforchildren.com"
                    , rel "noopener"
                    , target "_blank"
                    , style "text-decoration" "none"
                    , style "padding" "10px"
                    , style "display" "inline-block"
                    , style "color" "black"
                    , style "border" "2px solid #777"
                    , style "border-radius" "5px"
                    , style "box-shadow" "#777 1px 1px 5px"
                    ]
                    [ text "Sign Up" ]
                ]
            ]
        , viewSection "give"
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
                            , style "background-color" "#FF424D"
                            ]
                            [ text "Become a patron"
                            ]
                        ]
                    , div
                        [ style "text-align" "center"
                        , style "border-radius" "5px"
                        , style "padding" "20px"
                        , style "max-width" "400px"
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
        ]


viewSection : String -> List (Attribute Never) -> List (Html.String.Html Never) -> Html.String.Html Never
viewSection sectionId background body =
    section
        ([ id sectionId
         , class "FortyToEightypadding"
         , class "px-5 py-5 md:px-10"
         , class "pb-48"
         , style "transform-style" "preserve-3d"
         , style "min-height" "100vh"
         ]
            ++ background
        )
        body


viewBanner : String -> String -> String -> Html.String.Html Never
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
