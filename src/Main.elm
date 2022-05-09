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
    [ style "background" "#ecd7f2" ]


section3Background : List (Attribute Never)
section3Background =
    [ style "background" "#6c93b2" ]


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
                [ div
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
                        , src "https://player.vimeo.com/video/702301712?h=d6ef012bb2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
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
                [ style "border-top" "#ddd solid 1px"
                ]
                [ h2
                    [ style "color" "#325164"
                    , style "text-align" "center"
                    , style "font-size" "4rem"
                    , style "font-family" "hvdComicSerifPro"
                    ]
                    [ text "About" ]
                , p []
                    [ text """Catholic Stories for Children is made with the vision that all Catholics have a strong love of God and neighbor."""
                    ]
                , p []
                    [ text """Our hope is to help others along this journey with joyful stories."""
                    ]
                , blockquote []
                    [ p [ style "font-style" "italic" ] [ text """Truth, naked and cold, had been turned away from every door in the village. Her nakedness frightened the people. When Parable found her she was huddled in a corner, shivering and hungry. Taking pity on her, Parable gathered her up and took her home. There, she dressed Truth in story, warmed her and sent her out again. Clothed in story, Truth knocked again at the doors and was readily welcomed into the villagers’ houses. They invited her to eat at their tables and warm herself by their fires.""" ]
                    , footer [] [ text "— Jewish Teaching Story" ]
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
                    , style "background" "#f44034d9"
                    , style "color" "white"
                    , style "padding" "20px"
                    , style "display" "inline-block"
                    , style "border-radius" "5px"
                    ]
                    [ text "Meet the team" ]
                ]
            ]
        , viewSection "contact"
            (section3Background
             -- ++ [ style "background-image" "url('https://ik.imagekit.io/catholicstories/Paper_Airplane_1__gqjCqhabZ.png')"
             --    ]
            )
            (clouds
                ++ [ div
                        [ -- reducing font size since it goes past the height of the section background
                          -- on mobile
                          style "font-size" "0.7em"
                        ]
                        [ h2
                            [ style "text-align" "center"
                            , style "font-size" "4rem"
                            , style "font-family" "hvdComicSerifPro"
                            , style "color" "#333333"
                            ]
                            [ text "Contact" ]
                        , div
                            [ style "width" "fit-content"
                            , style "margin-left" "auto"
                            , style "margin-right" "auto"
                            , style "background" "#ffffff82"
                            , style "border-radius" "5px"
                            , style "padding" "20px"
                            , style "max-width" "700px"
                            ]
                            [ p
                                []
                                [ text "Please reach out! I love to hear from you!" ]
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
                            , p []
                                [ img [ height 16, width 16, src "https://www.facebook.com/favicon.ico", attribute "ariaHidden" "true" ] []
                                , span [] [ text " " ]
                                , a
                                    [ href "https://www.facebook.com/Catholic-Stories-for-Children-120657933116228"
                                    , rel "noopener"
                                    , target "_blank"
                                    , style "text-decoration" "underline"
                                    , style "color" "black"
                                    ]
                                    [ text "Facebook" ]
                                ]
                            , p []
                                [ img [ height 16, width 16, src "https://www.instagram.com/favicon.ico", attribute "ariaHidden" "true" ] []
                                , span [] [ text " " ]
                                , a
                                    [ href "https://www.instagram.com/catholicstoriesforchildren"
                                    , rel "noopener"
                                    , target "_blank"
                                    , style "text-decoration" "underline"
                                    , style "color" "black"
                                    ]
                                    [ text "Instagram" ]
                                ]
                            , p []
                                [ img [ height 16, width 16, src "https://www.twitter.com/favicon.ico", attribute "ariaHidden" "true" ] []
                                , span [] [ text " " ]
                                , a
                                    [ href "https://twitter.com/StoriesCatholic"
                                    , rel "noopener"
                                    , target "_blank"
                                    , style "text-decoration" "underline"
                                    , style "color" "black"
                                    ]
                                    [ text "Twitter" ]
                                ]
                            ]
                        , div
                            [ style "width" "fit-content"
                            , style "margin-left" "auto"
                            , style "margin-right" "auto"
                            , style "background" "#ffffff82"
                            , style "border-radius" "5px"
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
                                , style "background" "#f44034d9"
                                , style "color" "white"
                                , style "padding" "20px"
                                , style "display" "inline-block"
                                , style "border-radius" "5px"
                                ]
                                [ text "Sign Up" ]
                            ]
                        ]
                   ]
            )
        , viewSection "give"
            [ -- style "background" "#9DE2EA"
              style "min-height" "100vh"
            , style "position" "relative"
            , style "background-position" "top"
            , style "text-align" "center"
            , style "text-align" "-webkit-center"
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
            , hearts
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
                    , style "font-family" "hvdComicSerifPro"
                    ]
                    [ text "Give" ]
                , p
                    [ style "text-align" "center"
                    , style "color" "#f0f"
                    ]
                    [ text "All donations are tax deductible" ]
                , p [ style "text-align" "center" ]
                    [ div
                        [ style "margin-bottom" "30px"
                        , style "text-align" "center"
                        , style "background" "#ffffff82"
                        , style "border-radius" "5px"
                        , style "padding" "20px"
                        , style "max-width" "300px"
                        ]
                        [ div [ style "margin-bottom" "20px" ]
                            [ text "Give via Paypal" ]
                        , Html.String.form
                            [ action "https://www.paypal.com/donate", method "post", target "_top" ]
                            [ input [ type_ "hidden", name "hosted_button_id", value "ZA5YPU8KU6SL8" ] []
                            , input [ type_ "image", src "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif", style "border" "0", name "submit", title "PayPal - The safer, easier way to pay online!", alt "Donate with PayPal button" ] []
                            , img [ alt "", style "border" "0", src "https://www.paypal.com/en_US/i/scr/pixel.gif", width 1, height 1 ] []
                            ]
                        ]
                    , div
                        [ style "text-align" "center"
                        , style "background" "#ffffff82"
                        , style "border-radius" "5px"
                        , style "padding" "20px"
                        , style "max-width" "300px"
                        ]
                        [ div
                            [ style "text-align" "center"
                            , style "margin-bottom" "30px"
                            ]
                            [ text "Or donate with Patreon!" ]
                        , a
                            [ href "https://www.patreon.com/catholicstoriesforchildren"
                            , rel "noopener"
                            , target "_blank"
                            , style "text-decoration" "none"
                            , style "background-color" "#e6000f"
                            , style "color" "white"
                            , style "padding" "5px 20px"
                            , style "box-shadow" "#717171 0px 0px 1px 0px"
                            ]
                            [ text "Patreon" ]
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


clouds : List (Html.String.Html msg)
clouds =
    [ img
        [ style "position" "absolute"
        , style "top" "0"
        , style "left" "50%"
        , style "right" "0"
        , style "bottom" "0"
        , style "transform" "translate(-400px, 380px)"
        , src "/assets/cloud.svg"
        , alt ""
        , attribute "ariaHidden" "true"
        , width 200
        ]
        []
    , img
        [ style "position" "absolute"
        , style "top" "0"
        , style "left" "50%"
        , style "right" "0"
        , style "bottom" "0"
        , style "transform" "translate(200px, 200px)"
        , src "/assets/cloud.svg"
        , alt ""
        , attribute "ariaHidden" "true"
        , width 200
        ]
        []
    , img
        [ style "position" "absolute"
        , style "top" "0"
        , style "left" "50%"
        , style "right" "0"
        , style "bottom" "0"
        , style "transform" "translate(-330px, 20px)"
        , src "/assets/cloud.svg"
        , alt ""
        , attribute "ariaHidden" "true3"
        , width 200
        ]
        []
    ]


hearts : Html.String.Html Never
hearts =
    div [ style "transform-style" "preserve-3d" ]
        [ img
            [ style "position" "absolute"
            , style "top" "0"
            , style "left" "50%"
            , style "right" "0"
            , style "bottom" "0"
            , style "transform" "translate3d(-350px, 0px, -50px) scale(0.7)"

            -- Allow user to click through if content is underneath
            -- but hopefully the hearts don't block any content
            , style "pointer-events" "none"
            , src "/assets/heart.svg"
            , alt ""
            , attribute "ariaHidden" "true"
            , width 200
            ]
            []
        , img
            [ style "position" "absolute"
            , style "top" "0"
            , style "left" "50%"
            , style "right" "0"
            , style "bottom" "0"
            , style "transform" "translate3d(160px, 360px, -50px) scale(0.5)"
            , src "/assets/heart.svg"
            , alt ""
            , attribute "ariaHidden" "true"
            , width 200
            ]
            []

        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "50px"
        --     , style "animation-name" "heart1"
        --     , style "animation-duration" "40s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "90px"
        --     , style "animation-name" "heart2"
        --     , style "animation-duration" "55s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "90px"
        --     , style "animation-name" "heart3"
        --     , style "animation-duration" "60s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "70px"
        --     , style "animation-name" "heart4"
        --     , style "animation-duration" "50s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "30px"
        --     , style "animation-name" "heart5"
        --     , style "animation-duration" "40s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
        -- , img
        --     [ src "/assets/heart.svg"
        --     , attribute "ariaHidden" "true"
        --     , alt ""
        --     , style "width" "30px"
        --     , style "animation-name" "heart6"
        --     , style "animation-duration" "42s"
        --     , style "animation-iteration-count" "infinite"
        --     , style "animation-timing-function" "linear"
        --     ]
        --     []
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
