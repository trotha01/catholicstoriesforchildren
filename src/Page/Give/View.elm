module Page.Give.View exposing (..)

import Component.Footer exposing (viewFooter)
import Component.Social exposing (email)
import Html exposing (..)
import Html.Attributes exposing (..)


view : Html msg
view =
    div
        [ class "bg-black text-white"
        ]
        [ -- It is recommended to not have the header on the give page
          -- viewSubpageHeader "Donate" headerMargin
          viewBody
        , viewFooter
        ]


viewBody : Html msg
viewBody =
    div []
        [ div [ class "h-80 bg-[url(/assets/images/home/support-mission-bg.webp)] bg-cover bg-bottom" ]
            [-- img [ src "/assets/images/home/support-mission-bg.webp", alt "Joseph in the desert" ] []
            ]
        , div [ class "max-w-7xl mb-20 px-20 m-auto" ]
            [ h1 [ class "my-10" ] [ text "Donate" ]
            , donateAbout

            -- , a
            --     [ href "/animations/actofcontrition"
            --     , class "hover:scale-105 transition ease-in-out duration-50"
            --     , attribute "aria-label" "Act of Contrition Animation Coming Soon"
            --     , class "block mt-20 mb-2"
            --     ]
            --     [ img
            --         [ src "/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"
            --         , style "border-radius" "5px"
            --         , style "width" "-webkit-fill-available"
            --         , alt "Act of Contrition Animation"
            --         ]
            --         []
            --     ]
            -- , donateWithPatreon
            , div [ class "mb-10" ] [ donateWithZeffy ]
            , div [ class "mb-10" ] [ supportNextAnimation ]

            -- , div [ class "mb-10" ] [ supportSpecificCause ]
            -- , div [ class "mb-10" ] [ dASChristmasImage ]
            , h2 [ class "text-center mt-20 mb-10" ] [ text "Other ways to give" ]
            , div [ class "text-center grid justify-center" ]
                [ prayForUs

                -- , donateWithPaypal
                , donateWithVehicle
                , sponsor
                , volunteer
                , wordsOfEncouragement
                ]
            ]
        ]


donateAbout : Html msg
donateAbout =
    div
        [ class "text-xl mb-10" ]
        [ p
            [ style "margin-bottom" "1em"
            ]
            -- [ text "Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏" ]
            [ text "Here at Claritas Studios, we are passionate Catholic educators dedicated to helping children grow in their love for God and neighbor. Through creative, faith-based animations, we make Catholic teachings come alive in a fun and meaningful way for kids. Every child deserves the chance to learn and deepen their faith." ]
        , p [ style "margin-bottom" "1em" ] [ text "With your support, we can keep these animations FREE for families everywhere. Every donation helps us nurture the faith of the next generation. Let's continue making a difference, together!" ]
        , p [] [ text "Claritas Studios is a 501(c)(3) non-profit recognized by the IRS. Contributions to Claritas Studios are tax-deductible to the extent permitted by law. Tax ID Number: 85-4194883" ]
        ]


prayForUs : Html msg
prayForUs =
    donateSection "Pray for us"
        ""
        (p
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ text "We believe in the power of prayer. Please pray for us in this work. We are praying for you. 🙏" ]
        )


donateWithZeffy : Html msg
donateWithZeffy =
    div
        [ style "position" "relative"
        , style "overflow" "hidden"
        , style "width" "100%"
        ]
        [ a
            [ class "dbox-donation-page-button m-auto"
            , href "https://www.zeffy.com/en-US/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e"
            , target "_blank"
            , style "background" "rgb(254, 189, 17)"
            , style "color" "rgb(0, 0, 0)"
            , style "text-decoration" "none"
            , style "font-family" "Verdana, sans-serif"
            , style "display" "flex"
            , style "font-size" "18px"
            , style "padding" "14px 34px"
            , style "border-radius" "5px"
            , style "gap" "8px"
            , style "width" "fit-content"
            , style "line-height" "24px"
            ]
            [ text "DONATE"
            ]
        ]


supportNextAnimation : Html msg
supportNextAnimation =
    div []
        [ img [ src "/assets/images/AnimationImageLinks/SotsJoseph.png", alt "Saint Joseph Image" ] []
        , div
            [ style "position" "relative"
            , style "overflow" "hidden"
            , style "width" "100%"
            , style "padding-top" "120px"
            ]
            [ a
                [ class "dbox-donation-page-button m-auto"

                -- , href "https://www.zeffy.com/en-US/fundraisingV2/support-the-st-joseph-animation"
                , href "https://www.kickstarter.com/projects/catholicstories/saint-joseph-animation"
                , target "_blank"
                , style "background" "rgb(254, 189, 17)"
                , style "color" "rgb(0, 0, 0)"
                , style "text-decoration" "none"
                , style "font-family" "Verdana, sans-serif"
                , style "display" "flex"
                , style "font-size" "18px"
                , style "padding" "14px 34px"
                , style "border-radius" "5px"
                , style "gap" "8px"
                , style "width" "fit-content"
                , style "line-height" "24px"
                ]
                [ text "Support Our Next Animation"
                ]

            -- , iframe
            --     [ attribute "title" "Donation form powered by Zeffy"
            --     , style "position" "absolute"
            --     , style "border" "0"
            --     , style "top" "0"
            --     , style "left" "0"
            --     , style "bottom" "0"
            --     , style "right" "0"
            --     , style "width" "100%"
            --     , style "height" "120px"
            --     , attribute "src" "https://www.zeffy.com/embed/thermometer/support-the-st-joseph-animation"
            --     , attribute "allowTransparency" "true"
            --     ]
            --     []
            -- zeffy-form-link="https://www.zeffy.com/embed/donation-form/support-the-st-joseph-animation?modal=true"
            ]
        ]


donateWithVehicle : Html msg
donateWithVehicle =
    donateSection "Donate Your Vehicle"
        "/assets/images/vehicles.png"
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
        ""
        (div
            [ style "text-align" "center"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """ Interested in becoming a sponsor? Please send us a message! """ ]
            , email
            ]
        )


volunteer : Html msg
volunteer =
    donateSection "Volunteer"
        ""
        (div
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """ Interested in volunteering your talents or pro bono work? """ ]
            , p [] [ text """ We could use your help reviewing scripts, storyboards, and animatics. Please let us know! """ ]
            , email
            ]
        )


wordsOfEncouragement : Html msg
wordsOfEncouragement =
    donateSection "Words of Encouragement"
        ""
        (div
            [ style "text-align" "center"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ p [] [ text """Sending words of encouragement are greatly appreciated. Let us build each other up in the faith. """ ]
            , p [ class "mt-5" ] [ text """ "Encourage one another and build one another up." """ ]
            , p [ class "mb-5" ] [ text """1 Th 5:11""" ]
            , email
            ]
        )


donateSection : String -> String -> Html msg -> Html msg
donateSection title imageSrc body =
    div
        [ style "margin-bottom" "100px"
        , style "background-color" "white"
        , style "color" "black"
        , style "border-radius" "5px"
        , class "p-5 max-w-2xl shadow"
        ]
        [ div [ class "flex justify-center" ]
            [ if imageSrc == "" then
                span [] []

              else
                img [ class "rounded max-w-[16rem] text-center", src imageSrc ] []
            ]
        , div
            [ class "pb-5 m-1"
            ]
            [ h3 [ class "text-center text-xl" ] [ text title ]
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
