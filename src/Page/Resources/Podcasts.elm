module Page.Resources.Podcasts exposing (..)

import Page.Resources.Helpers exposing (..)


podcasts : List Resource
podcasts =
    [ saintStoriesForKids
    , catholicSprouts
    , saintsAlive
    , theSaints
    , bibleInAYearWithTeddy
    , thatsTheWord
    , onTheNightTrain
    , catholicKidsPodcast
    , catholicKidsTriviaPodcast
    ]


saintStoriesForKids : Resource
saintStoriesForKids =
    { name = "Saint Stories for Kids"
    , link = "https://podcasts.apple.com/ca/podcast/saint-stories-for-kids/id1448514363"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/10_W0OwjM8Yu.png?updatedAt=1679069711783"
    }


bibleInAYearWithTeddy : Resource
bibleInAYearWithTeddy =
    { name = "Kids Bible in a Year with Teddy"
    , link = "https://podcasts.apple.com/us/podcast/kids-bible-in-a-year-with-teddy/id1676869671"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/kidsbibleinayearwithteddy_dLisfpvYA.png?updatedAt=1689211660566"
    }


catholicSprouts : Resource
catholicSprouts =
    { name = "Catholic Sprouts"
    , link = "https://podcasts.apple.com/ca/podcast/catholic-sprouts-daily-podcast-for-catholic-kids/id1406174660"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/11_HUKazDTNih.png?updatedAt=1679069711765"
    }


thatsTheWord : Resource
thatsTheWord =
    { name = "That's the word"
    , link = "https://podcasts.apple.com/us/podcast/thats-the-word-with-fr-james-yamauchi/id1540449749"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/12_NwOXTTpkTi.png?updatedAt=1679069710890"
    }


onTheNightTrain : Resource
onTheNightTrain =
    { name = "On The Night Train"
    , link = "https://podcasts.apple.com/us/podcast/on-the-night-train/id1638922447"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/On_The_Night_Train_Uy2SqRG8B.png?updatedAt=1679069840295"
    }


saintsAlive : Resource
saintsAlive =
    { name = "Saints Alive"
    , link = "https://podcasts.apple.com/us/podcast/saints-alive-podcast/id1598392451"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/14_Aps0ku8wH.png?updatedAt=1679069710842"
    }


theSaints : Resource
theSaints =
    { name = "The Saints"
    , link = "https://themerrybeggars.com/shows/the-saints"
    , image = "/assets/images/TheSaints.png"
    }


catholicKidsPodcast : Resource
catholicKidsPodcast =
    { name = "Catholic Kids Podcast"
    , link = "https://podcasts.apple.com/us/podcast/catholic-kids-podcast/id1557527100"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/3rd_Party_Logos_Mz1VR_PBx.png?updatedAt=1679071655063"
    }


catholicKidsTriviaPodcast : Resource
catholicKidsTriviaPodcast =
    { name = "Catholic Kids Trivia Podcast"
    , link = "https://podcasts.apple.com/us/podcast/catholic-kids-trivia-podcast/id1662532400"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/CatholicKidsTriviaPodcast_rFHEiGK88.png?updatedAt=1679071809107"
    }
