module Main exposing (Model, main, view, viewBanner)

import Browser
import Header exposing (viewHeader)
import Html
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Icons
import Json.Encode exposing (string)
import Platform.Sub exposing (none)
import Settings exposing (rootPrefix)



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


pageLeftMargin : Int
pageLeftMargin =
    20


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"


view : Html.String.Html Never
view =
    div []
        [ viewHeader "home" pageLeftMargin
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
    [ style "background" "#3d5d75" ]


viewBody : Html.String.Html Never
viewBody =
    div []
        [ div
            [ style "min-height" "100vh"
            , style "background-color" "#9de2ea"
            ]
            [ img
                [ src "https://ik.imagekit.io/catholicstories/CS4C_FS_CZU-WX8Dy.png"
                , style "width" "100vw"
                , alt "Catholic Stories for Children"
                ]
                []
            ]
        , viewSection "videos"
            section1Background
            [ h2
                [ style "color" "white"
                , style "font-family" "hvdComicSerifPro"
                , style "font-size" "3em"
                , style "text-align" "center"
                ]
                [ text "Videos" ]
            , div
                [ style "position" "relative"
                , style "padding-bottom" "56.25%"
                , height 0
                , style "overflow" "hidden"
                , style "max-width" "100%"
                ]
                [ iframe
                    [ style "position" "absolute"
                    , style "width" "100%"
                    , style "height" "100%"
                    , style "top" "0"
                    , style "left" "0"

                    -- TODO: replace title name and src
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
                , style "background-color" "#6c8fa5"
                , style "color" "white"
                , style "margin-top" "80px"
                , style "text-align" "center"
                , style "padding" "20px"
                , style "font-family" "hvdComicSerifPro"
                ]
                [ div [ style "font-family" "hvdComicSerifPro" ] [ text "Guardian Angel Prayer" ]
                , img
                    [ src "https://ik.imagekit.io/catholicstories/Guardian_Angel_aMVg7CuOx.png"
                    , style "width" "32vw"
                    ]
                    []
                , div [] [ text "Animation under construction" ]
                ]
            , div
                [ style "position" "relative"
                , height 0
                , style "overflow" "hidden"
                , style "max-width" "100%"
                , style "background-color" "#6c8fa5"
                , style "color" "white"
                , style "margin-top" "80px"
                , style "text-align" "center"
                , style "padding" "20px"
                , style "font-family" "hvdComicSerifPro"
                ]
                [ div [] [ text "St. Michael the Archangel Prayer" ]
                , img
                    [ src "https://ik.imagekit.io/catholicstories/St_Michael_jLl2AjYst.png"
                    , style "width" "32vw"
                    , attribute "ariaHidden" "true"
                    ]
                    []
                , div [] [ text "Animation under construction" ]
                ]
            , p
                [ style "text-align" "center"
                , style "color" "white"
                , style "margin" "100px"
                , style "font-size" "40px"
                ]
                [ text "Visit our "
                , a
                    [ href "https://www.youtube.com/channel/UC0zQzY08mRAOpb--FawZbYw/"
                    , rel "noopener"
                    , target "_blank"
                    , style "color" "white"
                    ]
                    [ text "YouTube Channel!" ]
                ]
            ]
        , viewSection "about"
            section2Background
            [ div
                [ style "border-top" "#ddd solid 1px"
                ]
                [ h2
                    [ style "color" "#325164"
                    , style "text-align" "center"
                    , style "font-size" "3em"
                    , style "font-family" "hvdComicSerifPro"
                    ]
                    [ text "About" ]
                , p []
                    [ text """Catholic Stories for Children is made with the vision that all Catholics have a strong love of neighbor and God."""
                    ]
                , p []
                    [ text """Our hope is to help others along this journey with joyful stories."""
                    ]
                , blockquote []
                    [ p [ style "font-style" "italic" ] [ text """Truth, naked and cold, had been turned away from every door in the village. Her nakedness frightened the people. When Parable found her she was huddled in a corner, shivering and hungry. Taking pity on her, Parable gathered her up and took her home. There, she dressed Truth in story, warmed her and sent her out again. Clothed in story, Truth knocked again at the doors and was readily welcomed into the villagers’ houses. They invited her to eat at their tables and warm herself by their fires.""" ]
                    , footer [] [ text "— Jewish Teaching Story" ]
                    ]
                ]
            ]
        , viewSection "contact"
            (section3Background
                ++ [ style "background-image" "url('https://ik.imagekit.io/catholicstories/Paper_Airplane_1__gqjCqhabZ.png')"
                   , style "background-blend-mode" "difference"
                   ]
            )
            [ h2
                [ style "text-align" "center"
                , style "font-size" "3em"
                , style "font-family" "hvdComicSerifPro"
                , style "color" "white"
                ]
                [ text "Contact" ]
            , div
                [ style "width" "fit-content"
                , style "margin-left" "auto"
                , style "margin-right" "auto"
                ]
                [ p
                    [ style "color" "white"
                    ]
                    [ text "Please reach out! I love to hear from you!" ]
                , p
                    [ style "overflow-wrap" "anywhere"
                    , style "color" "white"
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
                        , style "color" "white"
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
                        , style "color" "white"
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
                        , style "color" "white"
                        ]
                        [ text "Twitter" ]
                    ]
                ]
            ]
        , viewSection "give"
            [ style "background" "#9DE2EA"
            , style "min-height" "100vh"
            , style "position" "relative"
            , style "background-image" "url('https://ik.imagekit.io/catholicstories/Donate_Box_2_h1wVXNnXz.png')"
            , style "background-position" "top"
            ]
            [ h2
                [ style "text-align" "center"
                , style "font-size" "3em"
                , style "font-family" "hvdComicSerifPro"
                ]
                [ text "Give" ]
            , p [ style "text-align" "center" ]
                [ div
                    [ style "margin-bottom" "30px"
                    , style "text-align" "center"
                    ]
                    [ div [ style "margin" "20px" ]
                        [ text "Give via Paypal" ]
                    , Html.String.form
                        [ action "https://www.paypal.com/donate", method "post", target "_top" ]
                        [ input [ type_ "hidden", name "hosted_button_id", value "ZA5YPU8KU6SL8" ] []
                        , input [ type_ "image", src "https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif", style "border" "0", name "submit", title "PayPal - The safer, easier way to pay online!", alt "Donate with PayPal button" ] []
                        , img [ alt "", style "border" "0", src "https://www.paypal.com/en_US/i/scr/pixel.gif", width 1, height 1 ] []
                        ]
                    ]
                , div
                    [ style "text-align" "center" ]
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
                        , style "background-color" "#ff424e"
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


viewSection : String -> List (Attribute Never) -> List (Html.String.Html Never) -> Html.String.Html Never
viewSection sectionId background body =
    section
        ([ id sectionId
         , style "padding" (toPx pageLeftMargin)
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


viewFooter : Html.String.Html Never
viewFooter =
    footer [ style "padding" (toPx pageLeftMargin), style "background-color" "black", style "color" "white" ]
        [ span [] [ text "Copyright © 2020 Catholic Stories for Children. All rights reserved." ]

        -- , text Icons.youtube
        ]
