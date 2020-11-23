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



-- "hsl(92deg 33% 65%)"


section1Background : List (Attribute Never)
section1Background =
    [ style "background" "radial-gradient(circle, white 10%, transparent 10%), radial-gradient(circle, white 10%, hsl(92deg 33% 65%) 10%) 50px 50px; background-size:100px 100px;" ]



-- [style "background" "hsl(40deg 78% 77%)"]


section2Background : List (Attribute Never)
section2Background =
    [ style "background"
        """linear-gradient(135deg, hsl(40deg 78% 77%) 25%, hsl(40deg 78% 77% / 50%) 25%) -50px 0,
  linear-gradient(225deg, hsl(40deg 78% 77%) 25%, hsl(40deg 78% 77% / 50%) 25%) -50px 0,
  linear-gradient(315deg, hsl(40deg 78% 77%) 25%, hsl(40deg 78% 77% / 50%) 25%),
  linear-gradient(45deg, hsl(40deg 78% 77%) 25%, hsl(40deg 78% 77% / 50%) 25%)"""
    , style "background-size" "20px 20px"
    , style "background-color" "#232323"
    ]



-- "hsl(199deg 58% 75%)"


section3Color1 : String
section3Color1 =
    "hsl(199deg 58% 75% / 85%)"


section3Color2 : String
section3Color2 =
    "hsl(199deg 58% 75%)"


section3Background : List (Attribute Never)
section3Background =
    [ style "background" ("""
      linear-gradient(135deg, """ ++ section3Color2 ++ """ 0.3em, rgba(232, 58, 37, 0) 0.3em) 0 1em,
      linear-gradient(-135deg, """ ++ section3Color2 ++ """ 0.3em, rgba(232, 58, 37, 0) 0.3em) 0 1em,
      radial-gradient(circle at 1.79em 1.85em,
                      """ ++ section3Color2 ++ """ 0.255em,
                      rgba(232, 58, 37, 0) 0.261em
                     ) 0 -1em,
      radial-gradient(circle at 0.21em 1.85em,
                      """ ++ section3Color2 ++ """ 0.255em,
                      rgba(232, 58, 37, 0) 0.261em
                      ) 0 -1em,
      linear-gradient(135deg, """ ++ section3Color2 ++ """ 0.3em, rgba(152, 204, 150, 0) 0.3em) 1em 0,
      linear-gradient(-135deg, """ ++ section3Color2 ++ """ 0.3em, rgba(152, 204, 150, 0) 0.3em) 1em 0,
      radial-gradient(circle at 1.79em 1.85em,
                      """ ++ section3Color2 ++ """ 0.255em,
                      rgba(152, 204, 150, 0) 0.261em
                      ) 1em 0,
      radial-gradient(circle at 0.21em 1.85em,
                      """ ++ section3Color2 ++ """ 0.255em,
                      rgba(152, 204, 150, 0) 0.261em
                      ) 1em 0""")
    , style "background-size" "48px 48px"
    , style "background-color" section3Color1
    , style "background-repeat" "repeat"
    ]



-- [ style "background-color" "#DFDBE5", style "background-image" """url(data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E)"""]


viewBody : Html.String.Html Never
viewBody =
    div []
        [ viewSection "videos"
            section1Background
            -- "hsl(92deg 33% 65%)"
            [ h2 [] [ text "Videos" ]
            , p [ style "font-style" "italic" ]
                [ text "videos coming soon"
                ]

            -- , div
            --     [ style "position" "relative"
            --     , style "padding-bottom" "56.25%"
            --     , height 0
            --     , style "overflow" "hidden"
            --     , style "max-width" "100%"
            --     ]
            --     [ iframe
            --         [ style "position" "absolute"
            --         , style "width" "100%"
            --         , style "height" "100%"
            --         , style "top" "0"
            --         , style "left" "0"
            --         -- TODO: replace title name and src
            --         , src "https://www.youtube.com/embed/oGsI6C4w-UU"
            --         , title "Youtube Video"
            --         , property "frameborder" (Json.Encode.string "0")
            --         , property "allow" (Json.Encode.string "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")
            --         , property "allowfullscreen" (Json.Encode.string "true")
            --         ]
            --         []
            --     ]
            , p []
                [ a
                    [ href "https://www.youtube.com/channel/UC0zQzY08mRAOpb--FawZbYw/"
                    , rel "noopener"
                    , target "_blank"
                    ]
                    [ text "YouTube Channel" ]
                ]
            ]
        , viewSection "about"
            section2Background
            -- [style "background" "hsl(40deg 78% 77%)"]
            [ h2 [] [ text "About" ]
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
        , viewSection "contact"
            section3Background
            -- "hsl(199deg 58% 75%)"
            [ h2 [] [ text "Contact" ]
            , p []
                [ text "Please reach out! I love to hear from you!" ]
            , p []
                [ span [ attribute "ariaHidden" "true" ] [ text "📫 " ]
                , span []
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
                    , style "text-decoration" "none"
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
                    , style "text-decoration" "none"
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
                    , style "text-decoration" "none"
                    ]
                    [ text "Twitter" ]
                ]
            ]
        , viewSection "support"
            [ style "background" "hsl(40deg 78% 77%)" ]
            [ h2 [] [ text "Support Us" ]
            , p []
                [ text "Be a monthly giver with "
                , a
                    [ href "http://www.patreon.com/catholicstoriesforchildren"
                    , rel "noopener"
                    , target "_blank"
                    , style "text-decoration" "none"
                    ]
                    [ text "Patreon" ]
                , text "!"
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

         -- , style "background" backgroundColor
         -- , backgroundColor
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
