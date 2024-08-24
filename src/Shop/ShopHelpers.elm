module Shop.ShopHelpers exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)


type alias ShopItem =
    { name : String
    , image : String
    , description : String
    , beehiivLink : String
    , etsyLink : String
    }


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
        [ class "rounded p-7 text-left"
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
            , attribute "width" "100%"
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
    , description = "Get the free guide to help little Catholics through the Sacrament of Reconciliation."
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
