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
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/60_2jdg0x5pz.png?updatedAt=1693439790279"
    }


theCatholicCardGame : Resource
theCatholicCardGame =
    { name = "The Catholic Card Game"
    , link = "https://catholiccardgame.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/61_gGyNBdFEh.png?updatedAt=1693439790210"
    }


councilAtDaybreak : Resource
councilAtDaybreak =
    { name = "Council At Daybreak"
    , link = "https://catholiccardgame.com/collections/base-games/products/council-at-daybreak"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/CouncilAtDaybreak_zY9pkcPisJ.png?updatedAt=1693440036474"
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
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/63_d1sooSovJJ.png?updatedAt=1693439790316"
    }


brotherFrancisGames : Resource
brotherFrancisGames =
    { name = "Brother Francis Games"
    , link = "https://brotherfrancisstore.com/collections/games"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303"
    }


catholicArcade : Resource
catholicArcade =
    { name = "Catholic Arcade"
    , link = "https://opusjoyous.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/64_P-dJU3ooLI.png?updatedAt=1693439790261"
    }


holyHeroes : Resource
holyHeroes =
    { name = "Holy Heroes Games"
    , link = "https://holyheroes.com/collections/games"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/25_OSP8-2xFJ.png?updatedAt=1682716507604"
    }
