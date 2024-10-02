module Team.Team exposing (..)

import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import List
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
    , carlos
    , lindsey
    ]


trevor : Person
trevor =
    { name = "Trevor Rothaus"
    , initials = ""
    , position = "CEO"
    , description =
        "Trevor is a former software engineer. He is currently studying for a "
            ++ "MA in Theology at the Franciscan University of Steubenville. "
            ++ "He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love."
    , image = imagePath ++ "TrevorRothaus.jpeg"
    , socials = []
    }


lindsey : Person
lindsey =
    { name = "Lindsey Bruno"
    , initials = ""
    , position = "Creative Consultant and Content Creator"
    , description =
        "Lindsey is a Jill-of-all-trades with a background in entertainment production (theater, theme-park, opera, film), events, music, and education. A Catholic convert from an evangelical background, she is passionate about passing along the riches of the faith - especially to those who may not recognize the treasure trove of the Church! Having worked for Disney in the parks and at Imagineering for over a decade, Lindsey has developed a taste for artistic excellence and hopes to bring a high level of quality to the Catholic creative sphere. Like Tolkien, she is a big believer in the power of myth and fairy tales for developing minds, she aims to tell stories that prepare children for a life of adventure, meaning, virtue, and purpose. She currently serves CSC as a creative consultant and content creator."
    , image = imagePath ++ "LindseyBruno.jpg"
    , socials = []
    }


carlos : Person
carlos =
    { name = "Carlos Gutierrez"
    , initials = ""
    , position = "CFO"
    , description = "Carlos is a CAD designer who also has a passion for dogs, comedy and food."
    , image = imagePath ++ "CarlosG.jpg"
    , socials = []
    }


boardOfAdvisors : List Person
boardOfAdvisors =
    [ fredrick, aaron, chris ]


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


contractors : List Person
contractors =
    [ kelly
    , nickAndAlina
    , seanBeeson
    , makoAnimation
    , ekaterina
    , rachaelWorkmanMcLaughlin
    , francescoSchito
    , willMaciejewski
    , emmaGreene
    , ethanNagy
    , italiaRose
    , dominicGrodi
    , fernandoAlanis
    , danaMiller
    , jadenLuo
    ]


nickAndAlina : Person
nickAndAlina =
    { name = "Nick and Alina De La Torre"
    , initials = "ND"
    , position = "Composer"
    , description = "Nick and Alina have been collaborators in songwriting and performing since 2006. They have fused their creative fires to illuminate the trials and triumphs of the human experience. The duo impacts their audiences through powerful testimony, moving vocals, and songs that burn through with Truth, Love, Inspiration, and Beauty. They are the founders of Awaken Catholic, producing songs, podcasts, and more reaching more than 2.2 million streams per month."
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


seanBeeson : Person
seanBeeson =
    { name = "Sean Beeson"
    , initials = "SB"
    , position = "Composer"
    , description = "Sean Beeson is a composer for games, films, cartoons, trailers, and more. He is a highly sought-after composer for Catholic media. He has composed for the movies Mother Teresa: No Greater Love, St. Joseph: Our Spiritual Father, In Solidarity with Ukraine, and more. He is Roman Catholic, husband of 15 years, and father to seven children."
    , image = imagePath ++ "SeanBeeson.jpeg"
    , socials =
        [ ( Website, "https://www.seanbeeson.com/" )
        , ( SoundCloud, "https://soundcloud.com/sean-beeson" )
        , ( Facebook, "https://www.facebook.com/gamecomposer" )
        , ( Twitter, "https://twitter.com/seanbeeson" )
        , ( YouTube, "https://www.youtube.com/user/Buckeye198181" )
        ]
    }


ekaterina : Person
ekaterina =
    { name = "Ekaterina Soyuznova"
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


makoAnimation : Person
makoAnimation =
    { name = "Mako Animation"
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


rachaelWorkmanMcLaughlin : Person
rachaelWorkmanMcLaughlin =
    { name = "Rachael Workman-McLaughlin"
    , initials = "RW"
    , position = "Screenwriter"
    , description = "Rachael is passionate about telling stories through books, film, and dance. She is a graduate of John Paul the Great Catholic University and brings experience from Spirit Juice Studios and Family Theatre Productions."
    , image = imagePath ++ "RachaelWorkman.jpeg"
    , socials = [ ( LinkedIn, "https://www.linkedin.com/in/rachael-workman/" ) ]
    }


francescoSchito : Person
francescoSchito =
    { name = "Francesco Schito"
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


willMaciejewski : Person
willMaciejewski =
    { name = "Will Maciejewski"
    , initials = "WM"
    , position = "Producer and Animator"
    , description = "Will is a freelance animator based in Arlington, Virginia. "
    , image = imagePath ++ "Will.jpeg"
    , socials =
        [ ( Website, "https://www.willmacmotion.com/" )
        , ( Instagram, "https://www.instagram.com/willmacmotion/" )
        ]
    }


emmaGreene : Person
emmaGreene =
    { name = "Emma Greene"
    , initials = "EG"
    , position = "Designer and Illustrator"
    , description =
        "Emma is a graphic designer with an eye for detail and a desire "
            ++ "to captivate the wonder of the world through art. "
    , image = imagePath ++ "EmmaGreene.jpeg"
    , socials = [ ( Instagram, "https://www.instagram.com/emmarosecreative" ) ]
    }


fernandoAlanis : Person
fernandoAlanis =
    { name = "Fernando J Alanis"
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


danaMiller : Person
danaMiller =
    { name = "Dana Miller"
    , initials = "DM"
    , position = "Voice Actor"
    , description = ""
    , image = imagePath ++ "DanaMiller.jpeg"
    , socials = []
    }


jadenLuo : Person
jadenLuo =
    { name = "Jaden Luo"
    , initials = "JL"
    , position = "Voice Actor"
    , description = ""
    , image = imagePath ++ "JadenLuo.jpeg"
    , socials = []
    }


ethanNagy : Person
ethanNagy =
    { name = "Ethan Nagy"
    , initials = "EN"
    , position = "Singer and Voice Actor"
    , description = ""
    , image = ""
    , socials = []
    }


italiaRose : Person
italiaRose =
    { name = "Italia Rose"
    , initials = "IR"
    , position = "Singer and Voice Actor"
    , description = ""
    , image = ""
    , socials = []
    }


dominicGrodi : Person
dominicGrodi =
    { name = "Dominic Grodi"
    , initials = "DG"
    , position = "Singer and Voice Actor"
    , description = ""
    , image = ""
    , socials = []
    }


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


viewPeople : String -> String -> List Person -> Html msg
viewPeople title description people =
    div []
        ([ h3 [ class "text-2xl my-5" ] [ text title ]
         , div
            [ class "hcenter"
            ]
            [ text description ]
         ]
            ++ List.map
                (\person ->
                    div [ class "my-10" ]
                        [ viewPerson person
                        ]
                )
                people
        )


viewPerson : Person -> Html msg
viewPerson person =
    div
        [ -- POSITION
          style "display" "grid"
        , style "grid-template-columns" "72px 1fr"
        , class "h-full"

        -- SIZE
        , style "min-height" "115px"

        -- STYLE
        , style "background" "white"
        , style "border-radius" "4px"
        , style "padding" "20px"
        ]
        [ div
            [ style "margin" "0px 10px 40px 0"
            , class "float-left relative"
            ]
            [ viewPersonImage person
            ]
        , div []
            [ viewName person.name
            , viewPosition person.position
            , viewDescription person.description
            , viewSocials person
            ]
        ]


viewPersonImage : Person -> Html msg
viewPersonImage person =
    viewImage person.image person.initials


viewSocials : Person -> Html msg
viewSocials person =
    div
        [ style "margin-top" "10px"
        , class "flex items-center"
        ]
        (List.map viewSocial (List.sortWith socialSort person.socials))


socialSort : ( Social, String ) -> ( Social, String ) -> Order
socialSort ( social1, link1 ) ( social2, link2 ) =
    socialOrdering social1 social2


viewImage : String -> String -> Html msg
viewImage image initials =
    if image == "" then
        div
            [ -- POSITION
              style "position" "relative"

            -- SIZE
            , style "width" "52px"
            , style "height" "52px"

            -- STYLE
            , style "border-radius" "30px"
            , style "border" "1px solid #777"
            , style "background-color" darkPurple
            ]
            [ div
                [ style "position" "absolute"
                , style "top" "50%"
                , style "left" "50%"
                , style "transform" "translate(-50%, -50%)"
                ]
                [ text initials
                ]
            ]

    else
        img
            [ -- SIZE
              style "width" "52px"
            , style "height" "52px"

            -- STYLE
            , style "border-radius" "30px"
            , style "border" "1px solid #777"
            , style "object-fit" "cover"
            , src image
            , alt ""
            , attribute "ariaHidden" "true"
            ]
            []


viewName : String -> Html msg
viewName name =
    div []
        [ text name ]


viewPosition : String -> Html msg
viewPosition position =
    div
        [ style "color" "#333"
        , style "font-size" ".8em"
        ]
        [ text position ]


viewDescription : String -> Html msg
viewDescription description =
    div
        [ style "overflow-wrap" "anywhere"
        , style "margin-top" "10px"
        ]
        [ text description
        ]
