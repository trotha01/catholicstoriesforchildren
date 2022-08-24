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
        , style "background-image" ("linear-gradient(130deg, " ++ darkBlue ++ " 70%, #8c6897)")
        ]
        [ viewSubpageHeader "home" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        []
        [ h1 h1Style [ text "Give" ]
        , donateAbout
        , prayForUs
        , donateWithPaypal
        , donateWithPatreon
        , donateWithAmazon
        , donateWithVehicle
        , sponsor
        , wordsOfEncouragement
        ]


donateAbout : Html msg
donateAbout =
    span
        [ style "text-align" "center"
        , style "color" "white"
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
            , style "margin-bottom" "6em"
            ]
            [ text "Catholic Stories for Children is a 501(c)(3) non-profit recognized by the IRS. Contributions to Catholic Stories for Children are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883"
            ]
        ]


prayForUs : Html msg
prayForUs =
    donateSection "Pray for us"
        (p
            [ style "text-align" "center"
            , style "color" "white"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            , style "margin-bottom" "6em"
            ]
            [ text "We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏" ]
        )


donateWithPaypal : Html msg
donateWithPaypal =
    donateSection "Donate via Paypal"
        (Html.String.form
            [ action "https://www.paypal.com/donate", method "post", target "_top" ]
            [ input [ type_ "hidden", name "hosted_button_id", value "ZA5YPU8KU6SL8" ] []
            , input
                [ type_ "image"
                , src "https://pics.paypal.com/00/s/ODVkNTk0NzktMmNmYy00NGVmLWI3NDMtZGRmMjZmNGNhZTk5/file.PNG"
                , style "border" "0"
                , name "submit"
                , title "PayPal - The safer, easier way to pay online!"
                , alt "Donate with PayPal button"
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
        )


donateWithPatreon : Html msg
donateWithPatreon =
    donateSection "Donate via Patreon"
        (a
            [ href "https://www.patreon.com/catholicstoriesforchildren"
            , rel "noopener"
            , target "_blank"
            , style "text-decoration" "none"
            , style "background-color" "#e6000f"
            , style "color" "white"
            , style "padding" "10px 20px"
            , style "box-shadow" "#717171 0px 0px 1px 0px"
            , style "border-radius" "5px"
            ]
            [ text "Patreon" ]
        )


donateWithAmazon : Html msg
donateWithAmazon =
    donateSection "Donate via Amazon Smile"
        (a
            [ href "https://smile.amazon.com/ch/85-4194883"
            , rel "noopener"
            , target "_blank"
            , style "text-decoration" "none"
            , style "background-color" "#e6000f"
            , style "color" "white"
            , style "padding" "10px 20px"
            , style "box-shadow" "#717171 0px 0px 1px 0px"
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
            ]
            [ img [ src "http://www.cars2charities.org/banners/336x280.jpg" ] []
            ]
        )


sponsor : Html msg
sponsor =
    donateSection "Sponsorship"
        (div
            [ style "text-align" "center"
            , style "color" "white"
            , style "width" "80%"
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
            , style "color" "white"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """ Interested in volunteering your talents or pro bono work? Please let us know! """ ]
            , Helpers.email
            ]
        )


wordsOfEncouragement : Html msg
wordsOfEncouragement =
    donateSection "Words of Encouragement"
        (div
            [ style "text-align" "center"
            , style "color" "white"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            , style "margin-bottom" "6em"
            ]
            [ p [] [ text """Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. """ ]
            , p [] [ text """ "Encourage one another and build one another up" —1 Th 5:11. """ ]
            , Helpers.email
            ]
        )


donateSection : String -> Html msg -> Html msg
donateSection title body =
    div [ style "margin-bottom" "100px" ]
        [ h2 titleStyle [ text title ]
        , div
            [ style "text-align" "center"
            , style "color" "white"
            , style "width" "80%"
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
           , style "font-size" "3em"
           , style "line-height" "1em"
           ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "text-align" "center"
    , style "color" "white"
    , style "font-family" "hvdComicSerifPro"
    ]
