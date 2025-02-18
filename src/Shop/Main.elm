module Shop.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)
import Shop.ShopHelpers exposing (viewDiscountShopItems, viewFreeShopItems)
import Signup exposing (..)


type alias Model =
    { signup : Signup.Model
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
        [ h1 [ class "my-10 leading-10" ] [ text "Shop" ]
        , div [ class "mb-20" ] [ viewAboutShopItems ]
        , div
            [ class "grid grid-cols-1 md:grid-cols-2 gap-10"
            , class "m-auto"
            ]
            [ viewEtsyLink
            , viewPrintfulLink
            ]

        -- , viewFreeShopItems
        -- , h2 [ class "mt-20 leading-10" ] [ text "Discount Shop" ]
        -- , div [ class "mt-10" ] [ viewDiscountShopItems ]
        -- , div [ class "my-28" ] [ viewEtsyLink ]
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
    div [ class "flex flex-col gap-4 items-center md:items-start" ]
        [ h2 []
            [ a
                [ href "https://catholicstories.etsy.com"
                , target "_blank"
                ]
                [ text "Etsy Shop"
                ]
            ]
        , a
            [ href "https://catholicstories.etsy.com"
            , target "_blank"
            , class "w-72"
            ]
            [ img
                [ src "/assets/images/shop/etsy.png"
                , alt "Etsy Shop Link"
                , style "border-radius" "5px"
                ]
                []
            , p [] [ text "Visit our Etsy shop for Catholic printables." ]
            ]

        --     img
        --     [ src "/assets/images/EtsyShopLinkBanner.png"
        --     , alt "Etsy Shop Link"
        --     , style "border-radius" "5px"
        --     ]
        --     []
        -- , Html.iframe
        --     [ src "https://embeds.beehiiv.com/d643e967-053b-4332-968e-5d6079cafd62?slim=true"
        --     , height 52
        --     , attribute "frameborder" "0"
        --     , attribute "scrolling" "no"
        --     , style "margin" "0"
        --     , style "border-radius" "0px !important"
        --     , style "background-color" "transparent"
        --     ]
        --     []
        ]


viewPrintfulLink : Html msg
viewPrintfulLink =
    div [ class "flex flex-col gap-4 items-center md:items-start" ]
        [ h2 []
            [ a
                [ href "https://catholicstoriesforchildren.printful.me/"
                , target "_blank"
                ]
                [ text "Printful Shop"
                ]
            ]
        , a
            [ href "https://catholicstoriesforchildren.printful.me/"
            , target "_blank"
            , class "w-72"
            ]
            [ img
                [ src "/assets/images/shop/printful.png"
                , alt "Printful Shop Link"
                , style "border-radius" "5px"
                ]
                []
            , p [] [ text "Visit our Printful shop for Catholic Stories for Children Merch! We have stickers, cups, mugs, shirts, sweatshirts, and more!" ]
            ]
        ]



-- viewCatholicSproutsLink : Html msg
