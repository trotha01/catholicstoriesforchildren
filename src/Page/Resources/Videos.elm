module Page.Resources.Videos exposing (..)

import Page.Resources.Helpers exposing (..)


videos : List Resource
videos =
    [ claritasStudios
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


claritasStudios : Resource
claritasStudios =
    { name = "Claritas Studios"
    , link = "https://www.youtube.com/@ClaritasStudios"
    , image = "/assets/images/imagekit/CSCLogo_JiNT9WUPX.png"
    }


catholicKidsMedia : Resource
catholicKidsMedia =
    { name = "Catholic Kids Media"
    , link = "https://www.youtube.com/@CatholicKidsMedia"
    , image = "/assets/images/imagekit/17_z9ZERCAuK.png"
    }


brotherFrancis : Resource
brotherFrancis =
    { name = "Brother Francis"
    , link = "https://www.youtube.com/@BrotherFrancis"
    , image = "/assets/images/imagekit/16_V1sLznRg0.png"
    }


tomkin : Resource
tomkin =
    { name = "Tomkin"
    , link = "https://www.youtube.com/playlist?list=PL9CQlldupc5_L0shwBi1w-n5liWhD0ArO"
    , image = "/assets/images/imagekit/15_Wrw3_kbKK.png"
    }


christineInAction : Resource
christineInAction =
    { name = "Christine In Action"
    , link = "https://www.youtube.com/@ChristineInAction"
    , image = "/assets/images/imagekit/christineinaction_Le5_7yr2K.jpeg"
    }


catholicSongsForKids : Resource
catholicSongsForKids =
    { name = "Catholic Songs for Kids"
    , link = "https://www.youtube.com/@catholicsongsforkids"
    , image = "/assets/images/imagekit/40_vS6tZTdD3.png"
    }


juiceBox : Resource
juiceBox =
    { name = "Spirit Juice Kids"
    , link = "https://www.youtube.com/@SpiritJuiceKids"
    , image = "/assets/images/imagekit/juicebox_flQW7t8YD.png"
    }


catholicIcing : Resource
catholicIcing =
    { name = "Catholic Icing"
    , link = "https://www.youtube.com/@CatholicIcing"
    , image = "/assets/images/imagekit/41_XrkKmwtXL.png"
    }


amyheysart : Resource
amyheysart =
    { name = "Amy Heyse Art"
    , link = "https://www.youtube.com/@amyheyseart"
    , image = "/assets/images/imagekit/AmyH_ld3G4EoVX.png"
    }


prostradaDesigns : Resource
prostradaDesigns =
    { name = "Prostrada Designs"
    , link = "https://www.youtube.com/@prostradadesignsllc"
    , image = "/assets/images/imagekit/42_GMJuNZEVs.png"
    }


opusJoyous : Resource
opusJoyous =
    { name = "Opus Joyous"
    , link = "https://www.youtube.com/@OpusJoyous"
    , image = "/assets/images/imagekit/opusjoyouslogo__bVhpC3Fj.jpeg"
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
