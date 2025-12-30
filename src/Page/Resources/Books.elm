module Page.Resources.Books exposing (..)

import Page.Resources.Helpers exposing (..)


books : List Resource
books =
    [ littleSaintStories
    , theotokosKids
    , osvKidsBooks
    , theLittleRoseShop
    , brotherFrancisBooks
    , thyOliveTree
    , lightOfTheSaints
    , firstFaithTreasury
    , tanBooks
    , ctsBooks
    , ewtnKidsBooks
    , diaryOfAGodMan
    , catholicSprouts
    , holyHeroesBooks
    , jennaEpkey
    , loyolaPressBooks
    , stPaulCenter
    , cBPSaints
    , paulineBooksAndMediaForKids
    , ctbBooks
    ]


thyOliveTree : Resource
thyOliveTree =
    { name = "Thy Olive Tree"
    , link = "https://www.thyolivetree.com/collections/childrens"
    , image = "/assets/images/imagekit/24_ok9wTkcFo.png"
    }


cBPSaints : Resource
cBPSaints =
    { name = "Catholic Book Publishing's Children's Books on Saints"
    , link = "https://catholicbookpublishing.com/browse/childrens-books-on-saints"
    , image = "/assets/images/imagekit/38_oB0pzZnMW8.png"
    }


paulineBooksAndMediaForKids : Resource
paulineBooksAndMediaForKids =
    { name = "Pauline Books and Media"
    , link = "https://paulinestore.com/kids-teens.html"
    , image = "/assets/images/imagekit/37_gMX8cczFD.png"
    }


lightOfTheSaints : Resource
lightOfTheSaints =
    { name = "Light of the Saints"
    , link = "https://bookstore.wordonfire.org/products/light-of-the-saints"
    , image = "/assets/images/imagekit/36_eINHZkemx9.png"
    }


stPaulCenter : Resource
stPaulCenter =
    { name = "St Paul Center Children's Books"
    , link = "https://stpaulcenter.com/product-category/children/"
    , image = "/assets/images/imagekit/35_evg05JJAFh.png"
    }


littleSaintStories : Resource
littleSaintStories =
    { name = "Little Saint Stories"
    , link = "https://www.littlesaintstories.com/s/shop"
    , image = "/assets/images/imagekit/34_GtSZ5NI8_8.png"
    }


firstFaithTreasury : Resource
firstFaithTreasury =
    { name = "First Faith Treasury"
    , link = "https://firstfaithtreasury.com/"
    , image = "/assets/images/imagekit/33_v8d9TN1XkY.png"
    }


tanBooks : Resource
tanBooks =
    { name = "Tan Books for Kids"
    , link = "https://tanbooks.com/catholic-kids-books/"
    , image = "/assets/images/imagekit/32_22z_5JUPjM.png"
    }


osvKidsBooks : Resource
osvKidsBooks =
    { name = "OSV Kids Books"
    , link = "https://osvkids.com/books/"
    , image = "/assets/images/imagekit/3rd_Party_Logos_DxY5MCRoK.png"
    }


ewtnKidsBooks : Resource
ewtnKidsBooks =
    { name = "EWTN Childrens Books"
    , link = "https://www.ewtnreligiouscatalogue.com/Catholic-Childrens-Books"
    , image = "/assets/images/imagekit/30_SPGrEpxn4o.png"
    }


theLittleRoseShop : Resource
theLittleRoseShop =
    { name = "The Little Rose Shop Fabric Books"
    , link = "https://thelittleroseshop.com/collections/baby-kids"
    , image = "/assets/images/imagekit/29_9r_mR-lb6.png"
    }


theotokosKids : Resource
theotokosKids =
    { name = "Theotokos Kids Books"
    , link = "https://theotokoskids.com/collections/books"
    , image = "/assets/images/imagekit/28_INemNiAcr.png"
    }


diaryOfAGodMan : Resource
diaryOfAGodMan =
    { name = "Diary of a God-Man. A fully illustrated children's missal"
    , link = "https://www.diaryofagodman.com/books"
    , image = "/assets/images/imagekit/27_LJ8rjMXH6.png"
    }


catholicSprouts : Resource
catholicSprouts =
    { name = "Catholic Sprouts Books and Materials"
    , link = "https://shop.catholicsprouts.com/collections/all"
    , image = "/assets/images/imagekit/26_2TkstMXTY.png"
    }


holyHeroesBooks : Resource
holyHeroesBooks =
    { name = "Holy Heroes Books"
    , link = "https://holyheroes.com/collections/catholic-childrens-books"
    , image = "/assets/images/imagekit/25_OSP8-2xFJ.png"
    }


brotherFrancisBooks : Resource
brotherFrancisBooks =
    { name = "Brother Francis Books"
    , link = "https://brotherfrancisstore.com/collections/books"
    , image = "/assets/images/imagekit/16_V1sLznRg0.png"
    }


loyolaPressBooks : Resource
loyolaPressBooks =
    { name = "Loyola Press Books"
    , link = "https://www.loyolapress.com/"
    , image = "/assets/images/imagekit/23_UvXPxYgqml.png"
    }


ctsBooks : Resource
ctsBooks =
    { name = "Catholic Truth Society"
    , link = "https://www.ctsbooks.org/product-category/children-young-adults/"
    , image = "/assets/images/imagekit/CTS_Logo_vwbekKAI-.png"
    }


ctbBooks : Resource
ctbBooks =
    { name = "Catholic Teen Books"
    , link = "https://www.catholicteenbooks.com/"
    , image = "/assets/images/ProfilePictures/CatholicTeenBooks.png"
    }


jennaEpkey : Resource
jennaEpkey =
    { name = "Jenna Epkey Catholic Kids Books"
    , link = "https://www.amazon.com/stores/Jenna-Epkey/author/B0CWPDDMRM"
    , image = "/assets/images/ProfilePictures/JennaEpkey.png"
    }
