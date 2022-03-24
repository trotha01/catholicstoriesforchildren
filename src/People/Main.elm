module People.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)
import List
import Ordering exposing (Ordering)
import Svg exposing (image)



-- MAIN


type alias Person =
    { name : String
    , initials : String
    , position : String
    , description : String
    , image : String
    , socials : List ( Social, String )
    }


type Social
    = Website
    | Instagram
    | Twitter
    | Vimeo
    | IMDB
    | Facebook
    | LinkedIn
    | YouTube
    | Spotify
    | SoundCloud
    | Behance


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
        , Spotify
        , SoundCloud
        , Behance
        ]


imagePath : String
imagePath =
    "/assets/People/"


staff : List Person
staff =
    [ { name = "Trevor Rothaus"
      , initials = ""
      , position = "CEO"
      , description =
            "Trevor is a former software engineer. He is currently studying for a "
                ++ "Masters in Theology at the Franciscan University of Stuebenville. "
                ++ "He founded Catholic Stories for Children to spread the light and love of God through animated stories that kids will love."
      , image = imagePath ++ "TrevorRothaus.jpeg"
      , socials = []
      }
    , { name = "Noeli Acoba"
      , initials = ""
      , position = "CFO"
      , description = "Noeli is a Los Angeles-based circus artist and video editor who mixes virtual effects with circus performance to create stories of hope. She believes that her faith in God and prayer has helped her navigate an unconventional life, and she is excited to be part of Catholic Stories for Children. She is also a wife, cat mom, and regular café goer."
      , image = imagePath ++ "NoeliAcoba.PNG"
      , socials = []
      }
    ]


boardOfAdvisors : List Person
boardOfAdvisors =
    [ { name = "Father Aaron Galvizo, A.M."
      , initials = ""
      , position = "Alagad ni Maria"
      , description = "Fr. Aaron is the associate chaplain in Saint Irenaeus Parish in Cypress, CA."
      , image = imagePath ++ "FrAaron.jpeg"
      , socials = []
      }
    , { name = "Father Fredrick Miras, A.M."
      , initials = ""
      , position = "Alagad ni Maria"
      , description =
            "Fr. Fredrick is a former chaplain of Santa Margarita Catholic High School and CHOC, "
                ++ "former Parochial Vicar of St. Irenaeus Catholic Church, Church of St. Pius X, "
                ++ "and Our Lady of Mt. Carmel Church."
      , image = imagePath ++ "FrDodik.jpeg"
      , socials = []
      }
    , { name = "Christopher Pagel"
      , initials = ""
      , position = "Assistant Dean"
      , description =
            "Chris Pagel is the assistant dean of Graduate Business Programs and Career Services at "
                ++ "Chapman University's George L. Argyros School of Business and Economics."
      , image = imagePath ++ "ChrisPagel.jpeg"
      , socials = []
      }
    , { name = "Cheri Loreto"
      , initials = ""
      , position = "Former House Supervisor"
      , description = "Cheri is a retired House Supervisor from Anaheim Regional Medical Center."
      , image = imagePath ++ "Cheri.jpeg"
      , socials = []
      }
    , { name = "Carlos Gutierrez"
      , initials = ""
      , position = "Mechanical Engineer"
      , description = "Carlos is a CAD designer who also has a passion for dogs, comedy and food."
      , image = imagePath ++ "CarlosG.jpg"
      , socials = []
      }
    ]


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
    , { name = "Ethan"
      , initials = "E"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Italia"
      , initials = "I"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Dominic"
      , initials = "D"
      , position = "Singer and Voice Actor"
      , description = ""
      , image = ""
      , socials = []
      }
    , { name = "Sean Beeson"
      , initials = "SB"
      , position = "Composer"
      , description = "Sean has scored hundreds of projects and have over a decade of media scoring experience."
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
      , position = "Illustrator"
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
      , description = "Francesco is an artist, 3D Motion Designer, Husband 💍 and father of 5 awesome kids"
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
    ]


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
        [ -- For parallax
          style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background" darkBlue
        ]
        [ viewSubpageHeader "home" headerMargin
        , viewBody
        , viewFooter
        ]


titleStyle : List (Attribute msg)
titleStyle =
    [ style "text-align" "center"
    , style "color" "white"
    , style "font-family" "hvdComicSerifPro"
    ]


h1Style : List (Attribute msg)
h1Style =
    titleStyle
        ++ [ style "margin" "2em"
           , style "font-size" "3em"
           , style "line-height" "1em"
           ]


viewBody : Html Never
viewBody =
    div
        []
        [ h1 h1Style [ text "The Team" ]
        , viewPeople "Staff" "" staff
        , viewPeople "Board of Advisors" "" boardOfAdvisors
        , viewPeople "Talent" "A number of talented artists, contractors, teams and people help bring these animations to life." contractors
        ]


viewPeople : String -> String -> List Person -> Html msg
viewPeople title description people =
    div [ style "margin-bottom" "100px" ]
        ([ h2 titleStyle [ text title ]
         , div
            [ style "text-align" "center"
            , style "color" "white"
            , style "width" "80%"
            , style "left" "50%"
            , style "position" "relative"
            , style "transform" "translate(-50%)"
            ]
            [ text description ]
         ]
            ++ List.map viewPerson people
        )


viewPerson : Person -> Html msg
viewPerson person =
    div
        [ -- POSITION
          -- center
          style "position" "relative"
        , style "left" "50%"
        , style "transform" "translateX(-50%)"
        , style "display" "grid"
        , style "grid-template-columns" "72px 1fr"

        -- spacing
        , style "margin" "30px 0"

        -- SIZE
        , style "min-height" "115px"
        , style "width" "80%"
        , style "max-width" "800px"

        -- STYLE
        , style "background" "white"
        , style "border-radius" "4px"
        , style "padding" "20px"
        ]
        [ viewImage person.image person.initials
        , div []
            [ viewName person.name
            , viewPosition person.position
            , viewDescription person.description
            , viewSocials person
            ]
        ]


viewSocials : Person -> Html msg
viewSocials person =
    div [ style "margin-top" "10px" ]
        (List.map viewSocial (List.sortWith socialSort person.socials))


socialSort : ( Social, String ) -> ( Social, String ) -> Order
socialSort ( social1, link1 ) ( social2, link2 ) =
    socialOrdering social1 social2


viewSocial : ( Social, String ) -> Html msg
viewSocial ( social, link ) =
    case social of
        Website ->
            viewSocialLink (text "🌐") link

        Instagram ->
            viewSocialLink instagramLogo link

        Twitter ->
            viewSocialLink twitterLogo link

        Facebook ->
            viewSocialLink facebookLogo link

        LinkedIn ->
            viewSocialLink linkedInLogo link

        Vimeo ->
            viewSocialLink vimeoLogo link

        IMDB ->
            viewSocialLink imdbLogo link

        YouTube ->
            viewSocialLink youtubeLogo link

        Spotify ->
            viewSocialLink spotifyLogo link

        SoundCloud ->
            viewSocialLink soundcloudLogo link

        Behance ->
            viewSocialLink behanceLogo link


viewSocialLink : Html msg -> String -> Html msg
viewSocialLink image link =
    a
        [ href link
        , style "text-decoration" "none"
        , target "_blank"
        , style "margin-right" "10px"
        ]
        [ image ]


viewImage : String -> String -> Html msg
viewImage image initials =
    if image == "" then
        div
            [ -- POSITION
              style "margin" "0px 10px 40px 0"
            , style "float" "left"
            , style "position" "relative"

            -- SIZE
            , style "width" "52px"
            , style "height" "52px"

            -- STYLE
            , style "border-radius" "30px"
            , style "border" "1px solid #777"
            , style "background-color" darkPurple
            , style "color" "white"
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
            [ -- POSITION
              style "margin" "0px 10px 40px 0"
            , style "float" "left"

            -- SIZE
            , style "width" "52px"
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
        [ style "color" "#777"
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
