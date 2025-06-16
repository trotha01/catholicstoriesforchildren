module Give.View exposing (..)

import Footer exposing (viewFooter)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup exposing (..)


view : Html msg
view =
    div
        [ class "bg-[#fef7f4]"
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


dASChristmasImage : Html msg
dASChristmasImage =
    div [ class "flex justify-center" ]
        [ img [ class "rounded max-w-[16rem] text-center", src "/assets/images/DASWinter.png" ] []
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


h3Style : String
h3Style =
    "text-xl font-bold mt-10"


supportSpecificCause : Html msg
supportSpecificCause =
    div []
        [ h2 [ class "mb-10" ] [ text "Support a Specific Cause" ]

        -- Domain and Hosting
        , h3 [ class h3Style ] [ text "Domain and Hosting ($14 / year)" ]
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center" ]
            [ div
                [ class "flex items-center text-lg"
                , style "width" "100%"
                ]
                [ text "Cover our website hosting and domain costs for the year."
                ]
            , div [ class "justify-self-end" ]
                [ div [] [ donationButton "Support Our Website" ]

                -- , domainThermometer
                ]
            ]

        -- Buy us a coffee
        , h3 [ class h3Style ] [ text "Caffination" ]
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center" ]
            [ div
                [ class "flex items-center text-lg"
                , style "width" "100%"
                ]
                [ text "Give us the energy we need to keep creating these animations. ☕"
                ]
            , div [ class "justify-self-end" ]
                [ div [] [ donationButton "Caffinate Us" ]

                -- , domainThermometer
                ]
            ]

        -- Mail
        , h3 [ class h3Style ] [ text "Mailbox" ]
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center" ]
            [ div
                [ class "flex items-center text-lg"
                , style "width" "100%"
                ]
                [ text "Every nonprofit is required to have a mailbox. Cover our mailbox costs each month."
                ]
            , div [ class "justify-self-end" ]
                [ div [] [ donationButton "Cover our mail costs" ]

                -- , domainThermometer
                ]
            ]

        -- Clickup
        , h3 [ class h3Style ] [ text "Project Management" ]
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center" ]
            [ div
                [ class "flex items-center text-lg"
                , style "width" "100%"
                ]
                [ text "Cover the costs for our project management, team communication, and related software."
                ]
            , div [ class "justify-self-end" ]
                [ div [] [ donationButton "Cover our software needs" ]

                -- , domainThermometer
                ]
            ]

        -- Shopify
        -- Marketing
        , h3 [ class h3Style ] [ text "Social Media" ]
        , div [ class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center" ]
            [ div
                [ class "flex items-center text-lg"
                , style "width" "100%"
                ]
                [ text "Cover our costs for creating our social media posts."
                ]
            , div [ class "justify-self-end" ]
                [ div [] [ donationButton "Support Our Social Media Posts" ]

                -- , domainThermometer
                ]
            ]
        ]


donationButton : String -> Html msg
donationButton str =
    a
        [ class "dbox-donation-page-button m-auto mt-10 bg-pink-600 no-underline font-sans flex text-lg px-8 py-4 rounded gap-2 w-fit leading-6 text-white"
        , class "shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl"
        , class "p-[16px]" -- padding to match the thermometer width

        -- , href "https://www.zeffy.com/en-US/fundraisingV2/support-the-st-joseph-animation"
        , href "https://www.zeffy.com/donation-form/126e804d-c7a8-4029-b41b-7d0a594a220e"
        , target "_blank"
        ]
        [ text str
        ]



-- filepath: /Users/trevor/src/catholicstoriesforchildren/src/Give/Main.elm


domainThermometer : Html msg
domainThermometer =
    div
        [ class "relative overflow-hidden w-full h-[50px]" ]
        [ iframe
            [ attribute "title" "Donation form powered by Zeffy"
            , class "absolute border-0 top-0 left-0 bottom-0 right-0 w-full h-[50px]"
            , attribute "src" "https://www.zeffy.com/embed/thermometer/pay-for-our-website"
            , attribute "allowTransparency" "true"
            ]
            []
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


donateWithDonorbox : Html msg
donateWithDonorbox =
    donateSection "Donate"
        ""
        (div [ class "w-52 m-auto" ]
            [ a
                [ class "dbox-donation-page-button m-auto"
                , href "https://donorbox.org/catholic-stories-for-children?default_interval=m"
                , style "background" "rgb(254, 189, 17)"
                , style "color" "rgb(0, 0, 0)"
                , style "text-decoration" "none"
                , style "font-family" "Verdana, sans-serif"
                , style "display" "flex"
                , style "font-size" "16px"
                , style "padding" "8px 24px"
                , style "border-radius" "5px"
                , style "gap" "8px"
                , style "width" "fit-content"
                , style "line-height" "24px"
                ]
                [ img [ src "https://donorbox.org/images/white_logo.svg", style "width" "20px" ] []
                , text "Donate"
                ]
            ]
        )


donateWithPaypal : Html msg
donateWithPaypal =
    donateSection "Donate via Paypal"
        ""
        (div
            [ style "margin" "auto"
            , style "width" "200px"
            , style "text-align" "center"
            ]
            [ Html.form
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
    div []
        [ div
            [ style "width" "80%"
            , style "max-width" "650px"
            , style "min-width" "330px"
            , class "grid grid-cols-1 md:grid-cols-2 gap-2 justify-items-center"
            , class "my-5"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ externalLink "Angel Tier $5"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979093"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/1_NR6oBN9FG.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666902853951"

                    -- , style "width" "320px"
                    , width 320
                    , height 380
                    , alt "$5 per month"
                    ]
                    []
                ]
            , externalLink "Archangel Tier $20"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979095"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/2_cawJTPT63.png?ik-sdk-version=javascript-1.4.3&updatedAt=1677531665328"
                    , style "width" "320px"
                    , alt "$20 per month"
                    ]
                    []
                ]
            , externalLink "Cherubim Tier $50"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979105"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/3_I-pMvDP6U.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666903024249"
                    , style "width" "320px"
                    , alt "$50 per month"
                    ]
                    []
                ]
            , externalLink "Seraphim Tier $100"
                "https://www.patreon.com/join/catholicstoriesforchildren/checkout?rid=5979107"
                [ img
                    [ src "https://ik.imagekit.io/catholicstories/Patreon_Graphics_for_Websites/4_2E5sDbBLI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666903024319"
                    , style "width" "320px"
                    , alt "$100 per month"
                    ]
                    []
                ]
            ]
        , div
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
                , style "background-color" "#9200B3"
                ]
                [ text "Become a patron"
                ]
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
            , Helpers.email
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
            , Helpers.email
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
            , Helpers.email
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
