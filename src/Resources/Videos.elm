module Resources.Videos exposing (..)

import Resources.Helpers exposing (..)


videos : List Resource
videos =
    [ catholicStoriesForChildren
    , christineInAction
    , tomkin
    , juiceBox
    , catholicKidsMedia
    , brotherFrancis
    , amyheysart
    , heidiWitte
    , sacredHeartofJesusConvent
    , catholicSongsForKids
    , opusJoyous
    , catholicIcing
    , prostradaDesigns
    ]


catholicStoriesForChildren : Resource
catholicStoriesForChildren =
    { name = "Claritas Studios"
    , link = "https://www.youtube.com/@CatholicStoriesforChildren"
    , image = "https://ik.imagekit.io/catholicstories/CSCLogo_JiNT9WUPX.png?updatedAt=1679070448402"
    }


catholicKidsMedia : Resource
catholicKidsMedia =
    { name = "Catholic Kids Media"
    , link = "https://www.youtube.com/@CatholicKidsMedia"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/17_z9ZERCAuK.png?updatedAt=1679070333348"
    }


brotherFrancis : Resource
brotherFrancis =
    { name = "Brother Francis"
    , link = "https://www.youtube.com/@BrotherFrancis"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/16_V1sLznRg0.png?updatedAt=1679070333303"
    }


tomkin : Resource
tomkin =
    { name = "Tomkin"
    , link = "https://www.youtube.com/playlist?list=PL9CQlldupc5_L0shwBi1w-n5liWhD0ArO"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/15_Wrw3_kbKK.png?updatedAt=1679070333309"
    }


christineInAction : Resource
christineInAction =
    { name = "Christine In Action"
    , link = "https://www.youtube.com/@ChristineInAction"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/christineinaction_Le5_7yr2K.jpeg?updatedAt=1682821244341"
    }


catholicSongsForKids : Resource
catholicSongsForKids =
    { name = "Catholic Songs for Kids"
    , link = "https://www.youtube.com/@catholicsongsforkids"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/40_vS6tZTdD3.png?updatedAt=1682876930344"
    }


juiceBox : Resource
juiceBox =
    { name = "Spirit Juice Kids"
    , link = "https://www.youtube.com/@SpiritJuiceKids"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/juicebox_flQW7t8YD.png?updatedAt=1692736674561"
    }


catholicIcing : Resource
catholicIcing =
    { name = "Catholic Icing"
    , link = "https://www.youtube.com/@CatholicIcing"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/41_XrkKmwtXL.png?updatedAt=1682876930378"
    }


amyheysart : Resource
amyheysart =
    { name = "Amy Heyse Art"
    , link = "https://www.youtube.com/@amyheyseart"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/AmyH_ld3G4EoVX.png?updatedAt=1692735921831"
    }


prostradaDesigns : Resource
prostradaDesigns =
    { name = "Prostrada Designs"
    , link = "https://www.youtube.com/@prostradadesignsllc"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/42_GMJuNZEVs.png?updatedAt=1683226627331"
    }


opusJoyous : Resource
opusJoyous =
    { name = "Opus Joyous"
    , link = "https://www.youtube.com/@OpusJoyous"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/opusjoyouslogo__bVhpC3Fj.jpeg?updatedAt=1687549207653"
    }


sacredHeartofJesusConvent : Resource
sacredHeartofJesusConvent =
    { name = "Sacred Heart of Jesus Convent"
    , link = "https://www.youtube.com/@SacredHeartofJesusConvent/about"
    , image = "/assets/images/SacredHeartofJesusConvent.png"
    }


heidiWitte : Resource
heidiWitte =
    { name = "Heidi Witte"
    , link = "https://www.youtube.com/@kidsliturgy"
    , image = "/assets/images/HeidiWitte.png"
    }
