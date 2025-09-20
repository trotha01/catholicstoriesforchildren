module Page.Shop.ShopHelpers exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Page.Resources.Helpers exposing (..)


type alias ShopItem =
    { name : String
    , image : String
    , description : String
    , beehiivLink : String
    , etsyLink : String
    , link : String
    }


viewFreeShopItems : Html msg
viewFreeShopItems =
    div [ class "sm:grid sm:grid-cols-2" ]
        (List.map viewShopItem [ massGuide, littleReconciliationBooklet, liturgicalCalendar2024, scripturalRosary ])


viewDiscountShopItems : Html msg
viewDiscountShopItems =
    div [ class "sm:grid sm:grid-cols-2" ]
        (List.map viewShopItem [ firstFriSatDevotion, prayerLetters ])


viewPrintfulShopItems : Html msg
viewPrintfulShopItems =
    viewShopItems
        [ confirmandiHoodie
        , cscWaterBottle
        , redlittleflowertote
        , pinkLittleFlowerTote
        , guardianAngelSpiralNotebook
        , prayedtodayshirt
        , stmichaelholographicsticker
        , stmichaelyouthshirt
        ]


viewShopItems : List ShopItem -> Html msg
viewShopItems shopItems =
    div
        [ class "flex flex-col items-center"
        ]
        [ -- Items
          div [ class "grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 mb-10" ]
            (List.map viewShopItem3 shopItems)

        -- View More Button
        , a
           [ href "https://catholicstoriesforchildren.printful.me/"
           , target "_blank"
           , class "flex flex-col items-center justify-center rounded p-7 text-center bg-[#E95A03] text-white w-full sm:w-96"
           ]
           [ text "View More" ]
        ]


viewShopItem3 : ShopItem -> Html msg
viewShopItem3 item =
    a
        [ class "flex flex-col"
        , href item.link
        , target "_blank"
        ]
        [ img
            [ class "mb-4 rounded"
            , class "rounded bg-[#373c3f]"
            , src item.image
            , alt item.name
            ]
            []
        , div [ class "text-base" ]
            [ text item.name
            ]
        ]


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

            -- , attribute "width" "100%"
            , attribute "width" "480"
            , attribute "height" "150"
            , style "margin" "0"
            , style "border-radius" "5px"
            , style "background-color" "transparent"
            ]
            []

        -- <iframe src="https://blog.catholicstoriesforchildren.com/embed" width="480" height="320" style="border:1px solid #EEE; background:white;" frameborder="0" scrolling="no"></iframe>
        , if resourceGroup.etsyLink /= "" then
            div []
                [ a [ href resourceGroup.etsyLink, target "_blank", class "text-blue-600 underline" ] [ text "Click here to go to Etsy" ]
                , span [] [ text ". Enter email above for coupon code." ]
                ]

          else
            span [] []
        ]


viewShopItem2 : ShopItem -> Html msg
viewShopItem2 resourceGroup =
    div
        [ class "rounded text-left sm:flex"
        ]
        [ div [ class "flex justify-center" ]
            [ img [ src resourceGroup.image, class "max-w-72 max-h-72 object-contain" ] []
            ]
        , div [ class "p-5" ]
            [ div [ class "mb-3" ]
                [ h2 [ class "mb-3 leading-8" ] [ text resourceGroup.name ]
                , p [] [ text resourceGroup.description ]
                ]
            , Html.iframe
                [ src resourceGroup.beehiivLink
                , height 52
                , attribute "frameborder" "0"
                , attribute "scrolling" "no"

                -- , attribute "width" "100%"
                , attribute "width" "480"
                , attribute "height" "150"
                , style "margin" "0"
                , style "border-radius" "5px"
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
        ]


confirmandiHoodie : ShopItem
confirmandiHoodie =
    { name = "Confirmandi Youth Heavy Blend Hoodie"
    , image = "/assets/images/shop/confirmandihoodie.webp"
    , description = "Get your Confirmandi Hoodie here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/confirmandi-youth-heavy-blend-hoodie-durable-comfortable-confirmation-apparel"
    }


cscWaterBottle : ShopItem
cscWaterBottle =
    { name = "Catholic Stories for Children Stainless Steel Water Bottle – 32 oz with Straw Lid"
    , image = "/assets/images/shop/cscwaterbottle.webp"
    , description = "Get your CSC Water Bottle here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/catholic-stories-for-children-stainless-steel-water-bottle-32-oz-with-straw-lid"
    }


redlittleflowertote : ShopItem
redlittleflowertote =
    { name = "Red Little Flower Tote Bag"
    , image = "/assets/images/shop/RedLittleFlowerTote.webp"
    , description = "Get your Red Little Flower Tote Bag here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/little-flower-tote-bag"
    }


pinkLittleFlowerTote : ShopItem
pinkLittleFlowerTote =
    { name = "Pink Little Flower Tote Bag"
    , image = "/assets/images/shop/PinkLittleFlowerTote.webp"
    , description = "Get your Pink Little Flower Tote Bag here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/pink-little-flower-tote-bag"
    }


guardianAngelSpiralNotebook : ShopItem
guardianAngelSpiralNotebook =
    { name = "Guardian Angel Spiral Notebook"
    , image = "/assets/images/shop/guardianangelsspiralnotebook.webp"
    , description = "Get your Guardian Angel Spiral Notebook here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/guardian-angels-spiral-notebook-featuring-the-angel-of-god-prayer-and-the-guardian-angels"
    }


prayedtodayshirt : ShopItem
prayedtodayshirt =
    { name = "Prayed Today? Women’s Short Sleeve T-Shirt"
    , image = "/assets/images/shop/prayedtodayshirt.webp"
    , description = "Get your I Prayed Today Shirt here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/prayed-today-womens-short-sleeve-t-shirt-featuring-daisy-and-sheep"
    }


stmichaelholographicsticker : ShopItem
stmichaelholographicsticker =
    { name = "St. Michael Holographic Sticker"
    , image = "/assets/images/shop/stmichaelholographicsticker.webp"
    , description = "Get your St. Michael Holographic Sticker here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/holographic-stickers-6750c6047592c"
    }


stmichaelyouthshirt : ShopItem
stmichaelyouthshirt =
    { name = "St. Michael Youth T-Shirt"
    , image = "/assets/images/shop/stmichaelyouthshirt.webp"
    , description = "Get your St. Michael Youth T-Shirt here!"
    , beehiivLink = ""
    , etsyLink = ""
    , link = "https://catholicstoriesforchildren.printful.me/product/st-michael-youth-short-sleeve-t-shirt-defend-us-in-battle"
    }


massGuide : ShopItem
massGuide =
    { name = "The Ultimate Mass Guide"
    , image = "/assets/images/shop/1.webp"
    , description = "Get our Mass guide here!"
    , beehiivLink = "https://embeds.beehiiv.com/38ee240f-5dfb-4f17-a6ed-26e1c8f709e9?slim=true"
    , etsyLink = ""
    , link = ""
    }


littleReconciliationBooklet : ShopItem
littleReconciliationBooklet =
    { name = "Little Reconciliation Booklet"
    , image = "/assets/images/shop/2.webp"
    , description = "Get the free guide to help little Catholics through the Sacrament of Reconciliation."
    , beehiivLink = "https://embeds.beehiiv.com/dd054c75-c35e-4456-9bd5-8663c5ad9e52?slim=true"
    , etsyLink = ""
    , link = ""
    }


firstFriSatDevotion : ShopItem
firstFriSatDevotion =
    { name = "First Friday and First Saturday Devotion"
    , image = "/assets/images/shop/3.webp"
    , description = "A devotion to the Sacred Heart of Jesus and the Immaculate Heart of Mary on the first Friday and first Saturday of each month."
    , beehiivLink = "https://embeds.beehiiv.com/ba5bdebd-3c83-4cfd-b44d-9a245d0bb8fd?slim=true"
    , etsyLink = "https://catholicstories.etsy.com/listing/1694029028?etsrc=sdt&coupon=FIRSTSAVE50"
    , link = ""
    }


liturgicalCalendar2024 : ShopItem
liturgicalCalendar2024 =
    { name = "2024 Liturgical Calendar"
    , image = "/assets/images/shop/4.webp"
    , description = "A 2024 Liturgical Calendar, feast days, and coloring page!"
    , beehiivLink = "https://embeds.beehiiv.com/6a652340-c0fe-4f91-ac0b-b1511efa7b0d?slim=true"
    , etsyLink = ""
    , link = ""
    }


liturgicalCalendar2025 : ShopItem
liturgicalCalendar2025 =
    { name = "2025 Liturgical Calendar"
    , image = "/assets/images/shop/5.webp"
    , description = "A 2025 Liturgical Calendar, feast days, and coloring page!"
    , beehiivLink = "https://blog.claritasstudios.com/embed" -- "https://embeds.beehiiv.com/cac1334c-48ed-4cd8-925e-abef2165f888?slim=true"
    , etsyLink = ""
    , link = ""
    }


prayerLetters : ShopItem
prayerLetters =
    { name = "Prayer Cards"
    , image = "/assets/images/shop/5.webp"
    , description = "Printable Prayer Cards your kids can give as gifts to loved ones!"
    , beehiivLink = "https://embeds.beehiiv.com/900aa0a5-aadb-4d19-ba08-649f1519a115?slim=true"
    , etsyLink = "https://catholicstories.etsy.com/listing/1733143755?etsrc=sdt&coupon=FIRSTSAVE50"
    , link = ""
    }


scripturalRosary : ShopItem
scripturalRosary =
    { name = "Scriptural Rosary"
    , image = "/assets/images/shop/6.webp"
    , description = "Aids to help with praying a Scriptural Rosary for each Mystery. Print double-sided."
    , beehiivLink = "https://embeds.beehiiv.com/d7cae3a2-a831-47b1-be2d-2136884926e3?slim=true"
    , etsyLink = ""
    , link = ""
    }


adventColoringBook : ShopItem
adventColoringBook =
    { name = "Advent Coloring Book"
    , image = "/assets/images/shop/7.webp"
    , description = "Prepare for Christmas with Mary and Joseph with our free little Scriptural coloring book."
    , beehiivLink = "https://embeds.beehiiv.com/938df27a-3a99-4f47-901a-b9ffb25d8bad?slim=true"
    , etsyLink = ""
    , link = ""
    }


guardianAngelActivities : ShopItem
guardianAngelActivities =
    { name = "Guardian Angel Activities"
    , image = ""
    , description = ""
    , beehiivLink = ""
    , etsyLink = ""
    , link = ""
    }


hailMaryActivities : ShopItem
hailMaryActivities =
    { name = "Hail Mary Activities"
    , image = ""
    , description = ""
    , beehiivLink = ""
    , etsyLink = ""
    , link = ""
    }
