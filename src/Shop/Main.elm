module Shop.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)
import Signup exposing (..)


type alias Model =
    { signup : Signup.Model
    }


type alias ShopItem =
    { name : String
    , image : String
    , description : String
    , beehiivLink : String
    , etsyLink : String
    }


type Msg
    = SignupMsg Signup.Msg


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( { signup = Signup.init }, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )


view : Model -> Html Msg
view model =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Shop" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Free Shop" ]
        , viewAboutShopItems
        , viewFreeShopItems
        , h2 [ class "mt-20 leading-10" ] [ text "Discount Shop" ]
        , div [ class "mt-10" ] [ viewDiscountShopItems ]
        , div [ class "my-28" ] [ viewEtsyLink ]

        -- , viewCatholicSproutsLink
        -- , viewOtherAffiliateLinks
        -- , viewWorkInProgressNotice
        ]


viewAboutShopItems : Html msg
viewAboutShopItems =
    div []
        [ p [] [ text "Get Catholic resources to help your little Catholics learn to love God and neighbor." ]
        ]


viewEtsyLink : Html msg
viewEtsyLink =
    div []
        [ img
            [ src "/assets/images/EtsyShopLinkBanner.png"
            , alt "Etsy Shop Link"
            , style "border-radius" "5px"
            ]
            []
        , Html.iframe
            [ src "https://embeds.beehiiv.com/d643e967-053b-4332-968e-5d6079cafd62?slim=true"
            , height 52
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , style "margin" "0"
            , style "border-radius" "0px !important"
            , style "background-color" "transparent"
            ]
            []
        ]



-- viewCatholicSproutsLink : Html msg


viewFreeShopItems : Html msg
viewFreeShopItems =
    div [ class "sm:grid sm:grid-cols-2" ]
        (List.map viewShopItem [ massGuide, littleReconciliationBooklet, liturgicalCalendar2024, scripturalRosary ])


viewDiscountShopItems : Html msg
viewDiscountShopItems =
    div [ class "sm:grid sm:grid-cols-2" ]
        (List.map viewShopItem [ firstFriSatDevotion, prayerLetters ])


viewShopItem : ShopItem -> Html msg
viewShopItem resourceGroup =
    div
        [ class "rounded p-7"
        ]
        [ div []
            [ img [ src resourceGroup.image, class "w-72 h-72 object-fit" ] []
            ]
        , div [ class "mb-3" ]
            [ h2 [ class "mb-3 leading-8" ] [ text resourceGroup.name ]
            , p [] [ text resourceGroup.description ]
            ]
        , Html.iframe
            [ src resourceGroup.beehiivLink
            , height 52
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , style "margin" "0"
            , style "border-radius" "0px !important"
            , style "background-color" "transparent"
            ]
            []
        , if resourceGroup.etsyLink /= "" then
            div []
                [ a [ href resourceGroup.etsyLink, target "_blank", class "text-blue-600 underline" ] [ text "Click here to go to Etsy" ]
                , span [] [ text ". Enter email above for coupon code." ]
                ]

          else
            span [] []
        ]


massGuide : ShopItem
massGuide =
    { name = "The Ultimate Mass Guide"
    , image = "/assets/images/shop/1.png"
    , description = "Get our Mass guide here!"
    , beehiivLink = "https://embeds.beehiiv.com/38ee240f-5dfb-4f17-a6ed-26e1c8f709e9?slim=true"
    , etsyLink = ""
    }


littleReconciliationBooklet : ShopItem
littleReconciliationBooklet =
    { name = "Little Reconciliation Booklet"
    , image = "/assets/images/shop/2.png"
    , description = "A guide to help little Catholics through the Sacrament of Reconciliation. Print double-sided with flip on the short side."
    , beehiivLink = "https://embeds.beehiiv.com/dd054c75-c35e-4456-9bd5-8663c5ad9e52?slim=true"
    , etsyLink = ""
    }


firstFriSatDevotion : ShopItem
firstFriSatDevotion =
    { name = "First Friday and First Saturday Devotion"
    , image = "/assets/images/shop/3.png"
    , description = "A devotion to the Sacred Heart of Jesus and the Immaculate Heart of Mary on the first Friday and first Saturday of each month."
    , beehiivLink = "https://embeds.beehiiv.com/ba5bdebd-3c83-4cfd-b44d-9a245d0bb8fd?slim=true"
    , etsyLink = "https://catholicstories.etsy.com/listing/1694029028?etsrc=sdt&coupon=FIRSTSAVE50"
    }


liturgicalCalendar2024 : ShopItem
liturgicalCalendar2024 =
    { name = "2024 Liturgical Calendar"
    , image = "/assets/images/shop/4.png"
    , description = "A 2024 Liturgical Calendar, feast days, and coloring page!"
    , beehiivLink = "https://embeds.beehiiv.com/6a652340-c0fe-4f91-ac0b-b1511efa7b0d?slim=true"
    , etsyLink = ""
    }


prayerLetters : ShopItem
prayerLetters =
    { name = "Prayer Cards"
    , image = "/assets/images/shop/5.png"
    , description = "Printable Prayer Cards your kids can give as gifts to loved ones!"
    , beehiivLink = "https://embeds.beehiiv.com/900aa0a5-aadb-4d19-ba08-649f1519a115?slim=true"
    , etsyLink = "https://catholicstories.etsy.com/listing/1733143755?etsrc=sdt&coupon=FIRSTSAVE50"
    }


scripturalRosary : ShopItem
scripturalRosary =
    { name = "Scriptural Rosary"
    , image = "/assets/images/shop/6.png"
    , description = "Aids to help with praying a Scriptural Rosary for each Mystery. Print double-sided."
    , beehiivLink = "https://embeds.beehiiv.com/d7cae3a2-a831-47b1-be2d-2136884926e3?slim=true"
    , etsyLink = ""
    }


guardianAngelActivities : ShopItem
guardianAngelActivities =
    { name = "Guardian Angel Activities"
    , image = ""
    , description = ""
    , beehiivLink = ""
    , etsyLink = ""
    }


hailMaryActivities : ShopItem
hailMaryActivities =
    { name = "Hail Mary Activities"
    , image = ""
    , description = ""
    , beehiivLink = ""
    , etsyLink = ""
    }
