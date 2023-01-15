module Give.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)


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


view : Html Never
view =
    div
        [ -- For parallax
          style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Give" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        []
        [ h1 h1Style [ text "Give" ]
        , donateAbout
        , donateWithPatreon
        , div [ style "margin-bottom" "6em" ] []
        , h2 h2Style [ text "Other ways to give" ]
        , div [ style "margin-bottom" "4em" ] []
        , prayForUs
        , donateWithPaypal
        , donateWithAmazon
        , donateWithVehicle
        , sponsor
        , volunteer
        , wordsOfEncouragement
        ]


donateAbout : Html msg
donateAbout =
    span
        [ style "text-align" "center"
        ]
        [ p
            [ style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            , style "margin-bottom" "1em"
            ]
            [ text "Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏" ]
        , p
            [ style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ text "Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883"
            ]
        , p
            [ style "width" "80%"
            , style "max-width" "650px"
            , style "min-width" "330px"
            , class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center"
            , class "mt-5"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ externalLink "Angel Tier $5"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979093"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/1_NR6oBN9FG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666902853951"
                    , style "width" "320px"
                    ]
                    []
                ]
            , externalLink "Archangel Tier $20"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979095"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/2_TXO1rv_0h-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666903024258"
                    , style "width" "320px"
                    ]
                    []
                ]
            , externalLink "Cherubim Tier $50"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979105"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/3_I-pMvDP6U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666903024249"
                    , style "width" "320px"
                    ]
                    []
                ]
            , externalLink "Seraphim Tier $100"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979107"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/4_2E5sDbBLI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666903024319"
                    , style "width" "320px"
                    ]
                    []
                ]
            ]
        ]


prayForUs : Html msg
prayForUs =
    donateSection "Pray for us"
        (p
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ text "We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏" ]
        )


donateWithPaypal : Html msg
donateWithPaypal =
    donateSection "Donate via Paypal"
        (div
            [ style "margin" "auto"
            , style "width" "200px"
            , style "text-align" "center"
            ]
            [ Html.String.form
                [ action "https://www.paypal.com/donate", method "post", target "_top" ]
                [ input [ type_ "hidden", name "hosted_button_id", value "ZA5YPU8KU6SL8" ] []
                , input
                    [ type_ "image"
                    , src "https://pics.paypal.com/00/s/ODVkNTk0NzktMmNmYy00NGVmLWI3NDMtZGRmMjZmNGNhZTk5/file.PNG"
                    , style "border" "0"
                    , name "submit"
                    , title "PayPal - The safer, easier way to pay online!"
                    , alt "Donate with PayPal button"
                    , style "width" "200px"
                    ]
                    []
                , img
                    [ alt ""
                    , style "border" "0"
                    , src "https://www.paypal.com/en_US/i/scr/pixel.gif"
                    , width 1
                    , height 1
                    ]
                    []
                ]
            ]
        )


donateWithPatreon : Html msg
donateWithPatreon =
    div
        [ style "margin" "auto"
        , style "width" "400px"
        , style "text-align" "center"
        , style "padding" "20px"
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


donateWithAmazon : Html msg
donateWithAmazon =
    donateSection "Donate via Amazon Smile"
        (a
            [ href "https://smile.amazon.com/ch/85-4194883"
            , rel "noopener"
            , target "_blank"
            , style "text-decoration" "none"
            , style "padding" "10px 20px"
            , style "box-shadow" "#777 1px 1px 5px"
            , style "border-radius" "5px"
            ]
            [ text "Amazon Smile" ]
        )


donateWithVehicle : Html msg
donateWithVehicle =
    donateSection "Donate Your Vehicle"
        (a
            [ href "http://www.cars2charities.org/donation?donateto=1585"
            , rel "noopener"
            , target "_blank"
            , style "text-decoration" "none"
            , title "Donate your Vehicle"
            , style "padding" "10px 20px"
            , style "box-shadow" "#777 1px 1px 5px"
            , style "border-radius" "5px"
            ]
            [ text "Cars 2 Charities"
            ]
        )


sponsor : Html msg
sponsor =
    donateSection "Sponsorship"
        (div
            [ style "text-align" "center"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """ Interested in becoming a sponsor? Please send us a message! """ ]
            , Helpers.email
            ]
        )


volunteer : Html msg
volunteer =
    donateSection "Volunteer"
        (div
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """ Interested in volunteering your talents or pro bono work? """ ]
            , p [] [ text """ We could use your help reviewing scripts, storyboards, and animatics. Please let us know! """ ]
            , Helpers.email
            ]
        )


wordsOfEncouragement : Html msg
wordsOfEncouragement =
    donateSection "Words of Encouragement"
        (div
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. """ ]
            , p [] [ text """ "Encourage one another and build one another up." """ ]
            , p [] [ text """ —1 Th 5:11 """ ]
            , Helpers.email
            ]
        )


donateSection : String -> Html msg -> Html msg
donateSection title body =
    div
        [ style "margin-bottom" "100px"
        , style "background-color" "white"
        , style "color" "black"
        , style "width" "80%"
        , style "max-width" "600px"
        , style "margin" "40px auto"
        , style "padding" "40px 20px"
        , style "border-radius" "5px"
        ]
        [ div [ style "padding" "0px 20px" ]
            [ h2 h2Style [ text title ]
            ]
        , div
            [ style "text-align" "center"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ body
            ]
        ]


h1Style : List (Attribute msg)
h1Style =
    titleStyle
        ++ [ style "margin-top" "2em"
           , style "line-height" "1em"
           ]


h2Style : List (Attribute msg)
h2Style =
    titleStyle
        ++ [ style "font-size" "1.4em"
           , style "line-height" "1.1em"
           ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "text-align" "center"
    , style "font-family" "hvdComicSerifPro"
    ]
