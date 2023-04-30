module Resources.Books.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import Newsroom.Main exposing (viewSignUp)
import Resources.Helpers exposing (..)


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
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Books" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Books" ]
        , viewAboutBooks
        , div [ class "my-10" ] [ viewSignUp ]
        , viewBooks
        , viewWorkInProgressNotice
        ]


viewAboutBooks : Html Never
viewAboutBooks =
    div []
        [ text "Find books here. It's hard to go wrong with a good Catholic book."
        ]


viewBooks : Html Never
viewBooks =
    div []
        (List.map viewResource
            [ littleSaintStories
            , theotokosKids
            , osvKidsBooks
            , theLittleRoseShop
            , brotherFrancisBooks
            , thyOliveTree
            , lightOfTheSaints
            , firstFaithTreasury
            , tanBooks
            , ewtnKidsBooks
            , diaryOfAGodMan
            , catholicSprouts
            , holyHeroesBooks
            , loyolaPressBooks
            , stPaulCenter
            , cBPSaints
            , paulineBooksAndMediaForKids
            ]
        )


type alias Category =
    { title : String
    , list : List Resource
    }


categories : List Category
categories =
    [ { title = "Children's Bibles", list = [] }
    , { title = "Saints", list = [] }
    ]


thyOliveTree : Resource
thyOliveTree =
    { name = "Thy Olive Tree"
    , link = "https://www.thyolivetree.com/collections/childrens"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/24_ok9wTkcFo.png?updatedAt=1682716507750"
    }


cBPSaints : Resource
cBPSaints =
    { name = "Catholic Book Publishing's Children's Books on Saints"
    , link = "https://catholicbookpublishing.com/browse/childrens-books-on-saints"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/38_oB0pzZnMW8.png?updatedAt=1682716506417"
    }


paulineBooksAndMediaForKids : Resource
paulineBooksAndMediaForKids =
    { name = "Pauline Books and Media"
    , link = "https://paulinestore.com/kids-teens.html"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/37_gMX8cczFD.png?updatedAt=1682716506298"
    }


lightOfTheSaints : Resource
lightOfTheSaints =
    { name = "Light of the Saints"
    , link = "https://bookstore.wordonfire.org/products/light-of-the-saints"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/36_eINHZkemx9.png?updatedAt=1682716506020"
    }


stPaulCenter : Resource
stPaulCenter =
    { name = "St Paul Center Children's Books"
    , link = "https://stpaulcenter.com/product-category/children/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/35_evg05JJAFh.png?updatedAt=1682716506043"
    }


littleSaintStories : Resource
littleSaintStories =
    { name = "Little Saint Stories"
    , link = "https://www.littlesaintstories.com/s/shop"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/34_GtSZ5NI8_8.png?updatedAt=1682716506395"
    }


firstFaithTreasury : Resource
firstFaithTreasury =
    { name = "First Faith Treasury"
    , link = "https://firstfaithtreasury.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/33_v8d9TN1XkY.png?updatedAt=1682716506330"
    }


tanBooks : Resource
tanBooks =
    { name = "Tan Books for Kids"
    , link = "https://tanbooks.com/catholic-kids-books/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/32_22z_5JUPjM.png?updatedAt=1682716506412"
    }


osvKidsBooks : Resource
osvKidsBooks =
    { name = "OSV Kids Books"
    , link = "https://osvkids.com/books/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/3rd_Party_Logos_DxY5MCRoK.png?updatedAt=1682716853025"
    }


ewtnKidsBooks : Resource
ewtnKidsBooks =
    { name = "EWTN Childrens Books"
    , link = "https://www.ewtnreligiouscatalogue.com/Catholic-Childrens-Books"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/30_SPGrEpxn4o.png?updatedAt=1682716506374"
    }


theLittleRoseShop : Resource
theLittleRoseShop =
    { name = "The Little Rose Shop Fabric Books"
    , link = "https://thelittleroseshop.com/collections/baby-kids"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/29_9r_mR-lb6.png?updatedAt=1682716506911"
    }


theotokosKids : Resource
theotokosKids =
    { name = "Theotokos Kids Books"
    , link = "https://theotokoskids.com/collections/books"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/28_INemNiAcr.png?updatedAt=1682716507584"
    }


diaryOfAGodMan : Resource
diaryOfAGodMan =
    { name = "Diary of a God-Man. A fully illustrated children's missal"
    , link = "https://www.diaryofagodman.com/books"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/27_LJ8rjMXH6.png?updatedAt=1682716507484"
    }


catholicSprouts : Resource
catholicSprouts =
    { name = "Catholic Sprouts Books and Materials"
    , link = "https://shop.catholicsprouts.com/collections/all"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/26_2TkstMXTY.png?updatedAt=1682716507634"
    }


holyHeroesBooks : Resource
holyHeroesBooks =
    { name = "Holy Heroes Books"
    , link = "https://holyheroes.com/collections/catholic-childrens-books"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/25_OSP8-2xFJ.png?updatedAt=1682716507604"
    }


brotherFrancisBooks : Resource
brotherFrancisBooks =
    { name = "Brother Francis Books"
    , link = "https://brotherfrancisstore.com/collections/books"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303"
    }


loyolaPressBooks : Resource
loyolaPressBooks =
    { name = "Loyola Press Books"
    , link = "https://www.loyolapress.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/23_UvXPxYgqml.png?updatedAt=1682716507758"
    }


thePursuitOfThePilferedCheese : Resource
thePursuitOfThePilferedCheese =
    { name = "The Pursuit of the Pilfered Cheese by Haley Stewart"
    , link = "https://www.amazon.com/Pursuit-Pilfered-Cheese-Haley-Stewart/dp/0819860514"
    , image = "https://ik.imagekit.io/catholicstories/Books/1_EoJL0GWQs.png?updatedAt=1679069222311"
    }


saintsAroundTheWorld : Resource
saintsAroundTheWorld =
    { name = "Saints Around the World by Meg Hunter-Kilmer"
    , link = "https://saintsaroundtheworld.com"
    , image = "https://ik.imagekit.io/catholicstories/Books/2_YPCg6X-7F.png?updatedAt=1679069222320"
    }


catechismOfTheSevenSacraments : Resource
catechismOfTheSevenSacraments =
    { name = "Catechism of the Seven Sacraments by Mary O'Neill Kevin O'Neill"
    , link = "https://www.amazon.com/Catechism-Seven-Sacraments-ONeill-Kevin/dp/0999508709/ref=sr_1_1?crid=2P68AEP6RA0O8&keywords=catechism+of+the+seven+sacraments&qid=1669329926&sprefix=catechism+of+the+seven+sacraments%2Caps%2C99&sr=8-1"
    , image = "https://ik.imagekit.io/catholicstories/Books/3_ibumLcYAy.png?updatedAt=1679069222330"
    }


childrensBibles : Resource
childrensBibles =
    { name = "Catechism of the Seven Sacraments by Mary O'Neill Kevin O'Neill"
    , link = "https://www.amazon.com/Catechism-Seven-Sacraments-ONeill-Kevin/dp/0999508709/ref=sr_1_1?crid=2P68AEP6RA0O8&keywords=catechism+of+the+seven+sacraments&qid=1669329926&sprefix=catechism+of+the+seven+sacraments%2Caps%2C99&sr=8-1"
    , image = "https://ik.imagekit.io/catholicstories/Books/3_ibumLcYAy.png?updatedAt=1679069222330"
    }
