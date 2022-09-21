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
        [ viewHeader "home" headerMargin
        , viewBody
        , viewFooter
        ]


section1Background : List (Attribute Never)
section1Background =
    [ style "background" "#3d5d75" ]


section2Background : List (Attribute Never)
section2Background =
    -- [ style "background" "#ecd7f2" ]
    [ style "background" "#FEF7F4" ]


section3Background : List (Attribute Never)
section3Background =
    -- [ style "background" "#6c93b2" ]
    -- [ style "background" "#FEF7F4" ]
    [ style "background" "#EBD7F2" ]


section4Background : List (Attribute Never)
section4Background =
    -- [ style "background" "#6c93b2" ]
    -- [ style "background" "#FEF7F4" ]
    [ style "background" "#FEF7F4" ]



-- [ style "background" "#ecd7f2" ]


viewBody : Html.String.Html Never
viewBody =
    div
        [ -- for parallax
          style "transform-style" "preserve-3d"
        ]
        [ viewSection "videos"
            section1Background
            [ -- h2
              -- [ style "color" "white"
              -- , style "font-family" "hvdComicSerifPro"
              -- , style "font-size" "3em"
              -- , style "text-align" "center"
              -- , style "margin-bottom" "70px"
              -- ]
              -- [ text "Videos" ]
              div
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
                        , src "https://www.youtube.com/embed/HW0DzGEoa1Y"
                        , title "Hail Mary, Full of Grace Video"
                        , property "frameborder" (Json.Encode.string "0")
                        , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
                        , property "allowfullscreen" (Json.Encode.string "true")
                        ]
                        []
                    ]
                , div
                    [ style "position" "relative"
                    , height 0
                    , style "overflow" "hidden"
                    , style "max-width" "100%"
                    , style "background-color" "#293942"
                    , style "color" "white"
                    , style "margin-top" "80px"
                    , style "text-align" "center"
                    , style "padding" "20px"
                    , style "font-family" "hvdComicSerifPro"
                    , style "border-radius" "5px"
                    ]
                    [ div
                        [ style "font-family" "hvdComicSerifPro"
                        , style "font-size" "2em"
                        , style "line-height" "1em"
                        ]
                        [ text "Guardian Angel Prayer" ]
                    , img
                        [ src "https://ik.imagekit.io/catholicstories/Guardian_Angel_aMVg7CuOx.png"
                        , style "width" "32vw"
                        , attribute "ariaHidden" "true"
                        , alt "Guardian angel with construction hat and cone"
                        ]
                        []
                    , div [] [ text "Animation under construction" ]
                    ]
                , div
                    [ style "position" "relative"
                    , height 0
                    , style "overflow" "hidden"
                    , style "max-width" "100%"
                    , style "background-color" "#293942"
                    , style "color" "white"
                    , style "margin-top" "80px"
                    , style "text-align" "center"
                    , style "padding" "20px"
                    , style "font-family" "hvdComicSerifPro"
                    , style "border-radius" "5px"
                    ]
                    [ div
                        [ style "font-size" "2em"
                        , style "line-height" "1em"
                        ]
                        [ text "St. Michael the Archangel Prayer" ]
                    , img
                        [ src "https://ik.imagekit.io/catholicstories/St_Michael_jLl2AjYst.png"
                        , style "width" "32vw"
                        , attribute "ariaHidden" "true"
                        , alt "St. Michael with construction hat and cone"
                        ]
                        []
                    , div [] [ text "Animation under construction" ]
                    ]
                ]

            -- , p
            --     [ style "text-align" "center"
            --     , style "color" "white"
            --     , style "margin-top" "100px"
            --     , style "margin-bottom" "100px"
            --     , style "font-size" "40px"
            --     , style "line-height" "40px"
            --     ]
            --     [ text "Visit our "
            --     , a
            --         [ href "https://www.youtube.com/channel/UC0zQzY08mRAOpb--FawZbYw/"
            --         , rel "noopener"
            --         , target "_blank"
            --         , style "color" "white"
            --         ]
            --         [ text "YouTube Channel" ]
            --     , text "!"
            --     ]
            ]
        , viewSection "about"
            section2Background
            [ div
                [ style "max-width" "800px"
                , style "margin" "auto"
                , style "font-weight" "400"
                , style "line-height" "1.7em"
                ]
                [ h2
                    [ style "color" "#325164"
                    , style "text-align" "center"
                    , style "font-size" "4rem"
                    , style "line-height" "1.2em"
                    , style "font-family" "hvdComicSerifPro"
                    ]
                    [ text "About" ]
                , p []
                    [ text """Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts."""
                    ]
                , p []
                    [ text """Many kids today are growing up without knowing the core concepts of our faith. Many are learning the prayers without understanding the words they are saying. We hope to help bridge this gap with enjoyable stories, animations and songs. We hope to help kids grow with a strong love of neighbor and God."""
                    ]
                ]
            , div
                [ style "text-align" "center"
                ]
                [ a
                    [ href "/team"
                    , rel "noopener"
                    , target "_blank"
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
            (section3Background
             -- ++ [ style "background-image" "url('https://ik.imagekit.io/catholicstories/Paper_Airplane_1__gqjCqhabZ.png')"
             --    ]
            )
            [ div
                [ -- reducing font size since it goes past the height of the section background
                  -- on mobile
                  --   style "font-size" "0.7em"
                  style "font-weight" "400"
                , style "line-height" "1.7em"
                ]
                [ h2
                    [ style "text-align" "center"
                    , style "font-size" "4rem"
                    , style "line-height" "1.2em"
                    , style "font-family" "hvdComicSerifPro"
                    , style "color" "#333333"
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
                        ]
                        [ span [ attribute "ariaHidden" "true" ] [ text "📫 " ]
                        , span [ style "display" "inline-block" ]
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
                , style "font-size" "4rem"
                , style "line-height" "1.2em"
                , style "font-family" "hvdComicSerifPro"
                , style "color" "#333333"
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
                [ p
                    []
                    [ text "Sign up for our email list to get updates!" ]
                , a
                    [ href "https://signup.catholicstoriesforchildren.com"
                    , rel "noopener"
                    , target "_blank"
                    , style "text-decoration" "none"
                    , style "padding" "20px"
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
            ]
            [ div
                [ style "transform" "translateZ(0px)"
                , style "position" "absolute"
                , style "top" "0"
                , style "left" "0"
                , style "right" "0"
                , style "bottom" "0"
                , style "background" "#9DE2EA80"
                , style "mix-blend-mode" "normal"
                ]
                []
            , div
                [ style "position" "absolute"
                , style "top" "100px"
                , style "left" "0"
                , style "right" "0"
                , style "bottom" "0"
                ]
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
                        , style "text-align" "center"
                        , style "max-width" "400px"
                        ]
                        [ Html.String.form
                            [ action "https://www.paypal.com/donate", method "post", target "_top" ]
                            [ input [ type_ "hidden", name "hosted_button_id", value "ZA5YPU8KU6SL8" ] []
                            , input [ type_ "image", src "https://pics.paypal.com/00/s/ODVkNTk0NzktMmNmYy00NGVmLWI3NDMtZGRmMjZmNGNhZTk5/file.PNG", style "border" "0", name "submit", title "PayPal - The safer, easier way to pay online!", alt "Donate with PayPal button" ] []
                            , img [ alt "", style "border" "0", src "https://www.paypal.com/en_US/i/scr/pixel.gif", width 1, height 1 ] []
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
