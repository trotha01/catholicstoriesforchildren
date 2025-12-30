module Page.Resources.Subscriptions exposing (..)

import Page.Resources.Helpers exposing (..)


subscriptions : List Resource
subscriptions =
    [ osvKids
    , saintOfTheMonth
    , massBox
    , faithAndFamilyCollective
    , catholicFamilyCrate
    , magnifiKid
    , formed
    , diaryOfAGodman
    ]


osvKids : Resource
osvKids =
    { name = "OSV Kids Magazine"
    , link = "https://osvkids.com/magazine/"
    , image = "/assets/images/imagekit/3_1__qbNDjJEy1.png"
    }


saintOfTheMonth : Resource
saintOfTheMonth =
    { name = "Saint of the Month Box"
    , link = "https://www.saintofthemonth.com"
    , image = "/assets/images/imagekit/4_1__LjeiFaCGM1.png"
    }


massBox : Resource
massBox =
    { name = "Mass Box"
    , link = "https://themassbox.com"
    , image = "/assets/images/imagekit/5_GX7izsR5Jp.png"
    }


faithAndFamilyCollective : Resource
faithAndFamilyCollective =
    { name = "Faith + Family Collective"
    , link = "https://faithandfamilycollective.com"
    , image = "/assets/images/imagekit/6_tZqBkQ3sW.png"
    }


catholicFamilyCrate : Resource
catholicFamilyCrate =
    { name = "Catholic Family Crate"
    , link = "https://catholicfamilycrate.com"
    , image = "/assets/images/imagekit/7_i5fOMR9CEB.png"
    }


magnifiKid : Resource
magnifiKid =
    { name = "MagnifiKid"
    , link = "https://us.magnificat.net/home/magnifikid"
    , image = "/assets/images/imagekit/8_qucgsetg84.png"
    }


formed : Resource
formed =
    { name = "Formed"
    , link = "https://formed.org"
    , image = "/assets/images/imagekit/9_6wjdaJHdc.png"
    }


diaryOfAGodman : Resource
diaryOfAGodman =
    { name = "Diary of a God-Man"
    , link = "https://www.diaryofagodman.com/subscriptions"
    , image = "/assets/images/imagekit/27_LJ8rjMXH6.png"
    }
