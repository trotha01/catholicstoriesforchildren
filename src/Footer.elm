module Footer exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Signup


toPx : Int -> String
toPx x =
    String.fromInt x ++ "px"


viewFooter : Html msg
viewFooter =
    footer [ style "padding" (toPx 30) ]
        [ div [ class "text-center mb-5" ]
            [ div []
                [ div [] [ h2 [ class "mb-7" ] [ text "Access Free Animations" ] ]
                , div [ class "text-center grid justify-center mb-10" ] [ Signup.view2 ]
                ]
            , div [ class "md:grid md:grid-cols-3 md:justify-items-center" ]
                [ div [ class "text-left" ]
                    [ div [] [ h3 [ class "font-bold text-lg" ] [ text "About Us" ] ]
                    , div [ class "mb-3" ] [ text "Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help parents teach Catholic prayers, about Catholic saints, and other Catholic concepts." ]
                    ]
                , div [ class "md:mx-5" ]
                    [ img [ class "rounded max-w-[16rem]", src "/assets/FullTitle_900x900_NoBackground.png" ] []
                    ]
                , div [ class "text-left" ]
                    [ div [] [ h3 [ class "font-bold text-lg mb-3" ] [ text "Follow Us" ] ]
                    , div []
                        [ instagram
                        , facebook
                        ]
                    ]
                ]
            ]
        , div [ class "text-xs" ]
            [ p [] [ text "Copyright © 2024 Catholic Stories for Children. All rights reserved." ]
            , p [] [ text "Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law.  Tax ID Number: 85-4194883" ]
            , p []
                [ a [ href "/about/privacy-policy", class "underline" ] [ text "Privacy Policy" ]
                , span [] [ text " | " ]
                , a [ href "/about/terms-and-conditions", class "underline" ] [ text "Terms & Conditions" ]
                ]
            ]
        ]


facebook : Html msg
facebook =
    socialLink
        "https://www.facebook.com/catholicstoriesforchildren"
        "CSC Facebook Page"
        "https://ik.imagekit.io/catholicstories/f_logo_RGB-Blue_250_3vs-yhXer.png?updatedAt=1684277030198"
        "Facebook"
        "Facebook"


instagram : Html msg
instagram =
    socialLink
        "https://www.instagram.com/catholicstoriesforchildren/"
        "CSC Instagram Page"
        "https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"
        "Instagram"
        "Instagram"



-- linkedIn : Html msg
-- linkedIn =
--     socialLink
--         "https://www.linkedin.com/company/catholic-stories-for-children"
--         "CSC LinkedIn Page"
--         "https://ik.imagekit.io/catholicstories/Instagram_Glyph_Gradient_kFoMs9jIr.png?updatedAt=1684277127293"
--         "LinkedIn"
--         "LinkedIn"


socialLink : String -> String -> String -> String -> String -> Html msg
socialLink link label imgSrc imgAlt txt =
    div [ class "flex align-center" ]
        [ a
            [ href link
            , attribute "aria-label" label
            , target "_blank"
            , class "mb-5"
            ]
            [ img
                [ class "w-5 h-5 inline-block"
                , src imgSrc
                , alt imgAlt
                ]
                []
            , span [ class "ml-3" ] [ text txt ]
            ]
        ]
