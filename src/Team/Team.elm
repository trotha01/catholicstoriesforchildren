module Team.Team exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Ordering


type alias Person =
    { name : String
    , initials : String
    , position : String
    , description : String
    , image : String
    , socials : List ( Social, String )
    }


socialOrdering : Social -> Social -> Order
socialOrdering =
    Ordering.explicit
        [ Website
        , Instagram
        , Twitter
        , Vimeo
        , IMDB
        , Facebook
        , LinkedIn
        , YouTube
        , Pinterest
        , Spotify
        , SoundCloud
        , Behance
        ]


imagePath : String
imagePath =
    "/assets/Team/"


staff : List Person
staff =
    [ trevor
    , noeli
    ]


trevor : Person
trevor =
    { name = "Trevor Rothaus"
    , initials = ""
    , position = "CEO"
    , description =
        "Trevor is a former software engineer. He is currently studying for a "
            ++ "Masters in Theology at the Franciscan University of Stuebenville. "
            ++ "He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love."
    , image = imagePath ++ "TrevorRothaus.jpeg"
    , socials = []
    }


noeli : Person
noeli =
    { name = "Noeli Acoba"
    , initials = ""
    , position = "CFO"
    , description = "Noeli is a Los Angeles-based circus artist and video editor who mixes virtual effects with circus performance to create stories of hope. She believes that her faith in God and prayer has helped her navigate an unconventional life, and she is excited to be part of Catholic Stories for Children. She is also a wife, cat mom, and regular café goer."
    , image = imagePath ++ "NoeliAcoba.PNG"
    , socials = []
    }


boardOfAdvisors : List Person
boardOfAdvisors =
    [ fredrick, aaron, chris, cheri, carlos ]


fredrick : Person
fredrick =
    { name = "Father Fredrick Miras, A.M."
    , initials = ""
    , position = "Alagad ni Maria"
    , description =
        "Fr. Fredrick is a former chaplain of Santa Margarita Catholic High School and CHOC, "
            ++ "former Parochial Vicar of St. Irenaeus Catholic Church, Church of St. Pius X, "
            ++ "and Our Lady of Mt. Carmel Church."
    , image = imagePath ++ "FrDodik.jpeg"
    , socials = []
    }


aaron : Person
aaron =
    { name = "Father Aaron Galvizo, A.M."
    , initials = ""
    , position = "Alagad ni Maria"
    , description = "Fr. Aaron is the associate chaplain in Saint Irenaeus Parish in Cypress, CA."
    , image = imagePath ++ "FrAaron.jpeg"
    , socials = []
    }


chris : Person
chris =
    { name = "Christopher Pagel"
    , initials = ""
    , position = "Assistant Dean"
    , description =
        "Chris Pagel is the assistant dean of Graduate Business Programs and Career Services at "
            ++ "Chapman University's George L. Argyros School of Business and Economics."
    , image = imagePath ++ "ChrisPagel.jpeg"
    , socials = []
    }


cheri : Person
cheri =
    { name = "Cheri Loreto"
    , initials = ""
    , position = "Silent Advisor"
    , description = "Truly silent."
    , image = imagePath ++ "Cheri.jpeg"
    , socials = []
    }


carlos : Person
carlos =
    { name = "Carlos Gutierrez"
    , initials = ""
    , position = "CAD Designer"
    , description = "Carlos is a CAD designer who also has a passion for dogs, comedy and food."
    , image = imagePath ++ "CarlosG.jpg"
    , socials = []
    }


contractors : List Person
contractors =
    [ { name = "Will Maciejewski"
      , initials = "WM"
      , position = "Producer and Animator"
      , description = "Will is a freelance animator based in Arlington, Virginia. "
      , image = imagePath ++ "Will.jpeg"
      , socials =
            [ ( Website, "https://www.willmacmotion.com/" )
            , ( Instagram, "https://www.instagram.com/willmacmotion/" )
            ]
      }
    , { name = "Emma Greene"
      , initials = "EG"
      , position = "Designer and Illustrator"
      , description =
            "Emma is a graphic designer with an eye for detail and a desire "
                ++ "to captivate the wonder of the world through art. "
      , image = imagePath ++ "EmmaGreene.jpeg"
      , socials = [ ( Instagram, "https://www.instagram.com/emmarosecreative" ) ]
      }
    , { name = "Fernando J Alanis"
      , initials = "FA"
      , position = "Sound Design and Re-Recording Mixer"
      , description =
            "Fernando is passionate for film, videogames and music. He is passionate about telling stories through sound. "
      , image = ""
      , socials =
            [ ( Website, "https://www.alanissound.com/" )
            , ( IMDB, "https://www.imdb.com/name/nm8854188/" )
            , ( Facebook, "https://www.facebook.com/alanissound" )
            , ( LinkedIn, "http://www.linkedin.com/in/alanissound" )
            ]
      }
    , { name = "Dana Miller"
      , initials = "DM"
      , position = "Voice Actor"
      , description = ""
      , image = imagePath ++ "DanaMiller.jpeg"
      , socials = []
      }
    , { name = "Jaden Luo"
      , initials = "JL"
      , position = "Voice Actor"
      , description = ""
      , image = imagePath ++ "JadenLuo.jpeg"
      , socials = []
      }
    , { name = "Mako Animation"
      , initials = "MT"
      , position = "Animation Team"
      , description =
            "Mako Animation is a creative studio that offers visual communication strategies "
                ++ "for all kinds of projects. They are passionate about "
                ++ "bringing original stories to life\nwith a unique and "
                ++ "creative narrative."
      , image = imagePath ++ "makoTeam.png"
      , socials =
            [ ( Website, "https://makoanimation.mx/" )
            , ( Facebook, "https://www.facebook.com/makoanimation/" )
            , ( Twitter, "https://twitter.com/MakoAnimation" )
            , ( YouTube, "https://www.youtube.com/channel/UCOszpOlqJxLtjpbTH7VN7Kg" )
            ]
      }
    , { name = "Nick and Alina De La Torre"
      , initials = "ND"
      , position = "Composer"
      , description = "Nick and Alina have been collaborators in songwriting and performing since 2006. They have fused their creative fires to illuminate the trials and triumphs of the human experience. The duo impacts their audiences through powerful testimony, moving vocals and songs that burn through with Truth, Love, Inspiration, and Beauty."
      , image = imagePath ++ "NickAndAlina.jpeg"
      , socials =
            [ ( Website, "http://nickandalina.com/" )
            , ( YouTube, "https://www.youtube.com/nickalinadelatorre" )
            , ( Instagram, "https://www.instagram.com/nickandalina/" )
            , ( Facebook, "https://www.facebook.com/nickandalina/" )
            , ( Twitter, "https://twitter.com/nickandalina_" )
            , ( Spotify, "https://open.spotify.com/artist/3BHBEFqQWqROuXbQCSnb06?si=9Mh_b1M4T6S7nmsswkdHPQ&nd=1" )
            ]
      }
    , { name = "Ethan Nagy"
      , initials = "EN"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Italia Rose"
      , initials = "IR"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Dominic Grodi"
      , initials = "DG"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Sean Beeson"
      , initials = "SB"
      , position = "Composer"
      , description = "Sean is a composer for games, films, cartoons, trailers, and more. He is also a highly sought after composer for Catholic media. He is Roman Catholic, husband of 15 years, and father to six children."
      , image = imagePath ++ "SeanBeeson.jpeg"
      , socials =
            [ ( Website, "https://www.seanbeeson.com/" )
            , ( SoundCloud, "https://soundcloud.com/sean-beeson" )
            , ( Facebook, "https://www.facebook.com/gamecomposer" )
            , ( Twitter, "https://twitter.com/seanbeeson" )
            , ( YouTube, "https://www.youtube.com/user/Buckeye198181" )
            ]
      }
    , { name = "Ekaterina Soyuznova"
      , initials = "ES"
      , position = "Visual Development Artist"
      , description = "Ekaterina is a skilled artist presenting a unique approach to developing visually appealing designs."
      , image = imagePath ++ "Ekaterina.png"
      , socials =
            [ ( Website, "https://www.ekaterinasoyuznova.com/" )
            , ( Instagram, "https://www.instagram.com/soyuznova_ekaterina/" )
            , ( Facebook, "https://www.facebook.com/kate.soyuznova/" )
            , ( Twitter, "https://twitter.com/Kati45413104" )
            , ( YouTube, "https://www.youtube.com/channel/UCgc9v2t9OtqQEw_D4jKgbew" )
            ]
      }
    , { name = "Francesco Schito"
      , initials = "FS"
      , position = "3D Artist"
      , description = "Artist, 3D Motion Designer, Husband and Father."
      , image = ""
      , socials =
            [ ( Instagram, "https://www.instagram.com/francescoschito/?hl=en" )
            , ( YouTube, "https://www.youtube.com/playlist?list=UUcaSHFPBBghZlWSePTZzwLw" )
            , ( IMDB, "https://www.imdb.com/name/nm7877744/" )
            , ( Behance, "https://www.behance.net/francescoschito" )
            ]
      }
    , { name = "Rachael Workman"
      , initials = "RW"
      , position = "Screenwriter"
      , description = "Rachael is passionate about telling stories through books, film, and dance."
      , image = imagePath ++ "RachaelWorkman.jpeg"
      , socials = [ ( LinkedIn, "https://www.linkedin.com/in/rachael-workman/" ) ]
      }
    , kelly
    ]


kelly : Person
kelly =
    { name = "Kelly Briggs"
    , initials = "KB"
    , position = "Social Media Specialist"
    , description = "Kelly is a part-time social media specialist and homeschools her four children on the east coast of Canada."
    , image = imagePath ++ "KellyBriggs.jpeg"
    , socials =
        [ ( Instagram, "https://www.instagram.com/simplehomemom/" )
        , ( Facebook, "https://www.facebook.com/simplehomemom" )
        , ( Pinterest, "https://www.pinterest.com/simplehomemom/" )
        , ( Website, "https://www.simplehomemom.com/" )
        ]
    }
