module Page.Resources.Games exposing (..)

import Page.Resources.Helpers exposing (..)


games : List Resource
games =
    [ wanderlight
    , theCatholicCardGame
    , councilAtDaybreak
    , holyHeroes
    , brotherFrancisGames

    -- , saintCards
    , superSaintCards
    , catholicArcade
    ]


wanderlight : Resource
wanderlight =
    { name = "Wanderlight"
    , link = "https://www.wanderlightgame.com/"
    , image = "/assets/images/imagekit/60_2jdg0x5pz.png"
    }


theCatholicCardGame : Resource
theCatholicCardGame =
    { name = "The Catholic Card Game"
    , link = "https://catholiccardgame.com/"
    , image = "/assets/images/imagekit/61_gGyNBdFEh.png"
    }


councilAtDaybreak : Resource
councilAtDaybreak =
    { name = "Council At Daybreak"
    , link = "https://catholiccardgame.com/collections/base-games/products/council-at-daybreak"
    , image = "/assets/images/imagekit/CouncilAtDaybreak_zY9pkcPisJ.png"
    }



-- saintCards : Resource
-- saintCards =
--     { name = "Saint Cards"
--     , link = "https://www.saintcards.com/"
--     , image = "https://ik.imagekit.io/catholicstories/ProfileImages/62_Z__x8cDHl.png?updatedAt=1693439790262"
--     }


superSaintCards : Resource
superSaintCards =
    { name = "Super Saint Cards"
    , link = "https://armadei.com/product/super-saints/"
    , image = "/assets/images/imagekit/63_d1sooSovJJ.png"
    }


brotherFrancisGames : Resource
brotherFrancisGames =
    { name = "Brother Francis Games"
    , link = "https://brotherfrancisstore.com/collections/games"
    , image = "/assets/images/imagekit/16_V1sLznRg0.png"
    }


catholicArcade : Resource
catholicArcade =
    { name = "Catholic Arcade"
    , link = "https://opusjoyous.com/"
    , image = "/assets/images/imagekit/64_P-dJU3ooLI.png"
    }


holyHeroes : Resource
holyHeroes =
    { name = "Holy Heroes Games"
    , link = "https://holyheroes.com/collections/games"
    , image = "/assets/images/imagekit/25_OSP8-2xFJ.png"
    }
