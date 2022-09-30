module Newsroom.PR20220912 exposing (..)

import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)


view : Html Never
view =
    div
        []
        [ h2 (h2Style ++ [ style "text-align" "left" ]) [ text "Hail Mary Prayer Animation Wins Multiple Awards in International Hollywood Film Festival" ]
        , p []
            [ span [] [ text "Catholic Stories for Children's animation, " ]
            , a
                [ href "https://youtu.be/HW0DzGEoa1Y"
                , style "color" darkBlue
                , rel "noopener"
                , target "_blank"
                ]
                [ text "'Hail Mary, Full of Grace,'" ]
            , span [] [ text " wins multiple awards in the iHollywood Film Festival this month." ] -- subtitle
            ]
        , img
            [ src "https://ik.imagekit.io/catholicstories/Mother_and_child_from_Hail_Mary_Animation_2_0AW0fCnOc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663026862327"
            , attribute "ariaHidden" "true"
            , alt "Mother and child from the Hail Mary Animation"
            , style "width" "50%"
            , style "position" "relative"
            , style "left" "50%"
            , style "transform" "translate(-50%)"
            , style "margin" "auto"
            ]
            []
        , p [] [ text "Sept 30, 2022" ]
        , br [] []
        , p []
            [ span [ style "font-style" "bold" ] [ text "Los Angeles, California. " ]
            , span []
                [ text
                    ("""Today, Catholic Stories for Children, a new non-profit that creates Catholic animations for children,"""
                        ++ """ announced that they won multiple awards in the International Hollywood Film Festival (IHFF). "I am really grateful"""
                        ++ """ to be able to spread the love of our Blessed Virgin Mother Mary. I appreciate the iHollywood Team for considering this animation"""
                        ++ """ and selecting it for these awards," said Trevor Rothaus, founder of Catholic Stories for Children. """
                        ++ """ The Hail Mary animation was selected for the 5 Star Positive Consciousness Award, the 5 Star Expression Award, """
                        ++ """ the 5 Star Connection Award, and the 5 Star Love &  Beauty Award. It was also the I AM Award Winner and the Semi-Finalist Mini Movie Animation."""
                    )
                ]
            ]
        , br [] []
        , p [] [ text "IHFF merges film, creatives, and web 3.0 technologies as to empower the independent filmmaker. They are also using their platform to support ocean conservation this year. IHFF is a proud member of the Hollywood Chamber of Commerce and is a member of their Entertainment, Arts and Media plus Tourism committees. The iHollywood Film Fest was created in 2020 to bring community to creatives." ]
        , br [] []
        , p []
            [ a
                [ href "https://youtu.be/HW0DzGEoa1Y"
                , style "color" darkBlue
                , rel "noopener"
                , target "_blank"
                ]
                [ text "The Hail Mary animated short film" ]
            , span [] [ text """ is a way for children to not only learn, but also understand the words in the Hail Mary prayer. It helps children come to know their Holy Mother in Heaven. This prayer is a constant reminder for children that they have a mother who is always listening and will always love them. It is a reminder that they can go to her for help. “Not only is it fun to watch and participate, but it's also a true learning experience to bring our faith to every child,” says John Michael, a member\u{00A0}of the Board of Directors of the iHollywood International Film Festival.""" ]
            ]
        , br [] []
        , p [] [ text "Catholic Stories for Children is a non-profit organization that exists to help Catholic parents pass on the faith with prayer tips and fun animations for children. Catholic Stories for Children aims to help children grow a habit of prayer. As children build a habit of thanking God in the morning, before every meal, and throughout their day, they grow in gratitude. As children pray for each other, they grow in empathy and love. As children pray together, they grow in community. And when children pray at home with their families, their hearts open up and the family grows strong with God as their center. Many parents struggle with getting their young children to sit and pray at home, so Catholic Stories for Children creates animations as an aid for families. These animations can be found on their website, www.catholicstoriesforchildren.com." ]
        , br [] []
        , p [ style "font-size" "0.7em", style "line-height" "1.4em" ]
            [ span [] [ text "Media Contacts:" ]
            , br [] []
            , span [] [ text "Catholic Stories for Children" ]
            , br [] []
            , span [] [ text "Trevor Rothaus | Founder" ]
            , br [] []
            , span [] [ text "trevor@catholicstoriesforchildren.com" ]
            , br [] []
            , span [] [ text "www.catholicstoriesforchildren.com" ]
            , br [] []
            , viewSocial ( Facebook, "https://www.facebook.com/catholicstoriesforchildren" )
            , viewSocial ( Instagram, "https://www.instagram.com/catholicstoriesforchildren" )
            , br [] []
            , br [] []
            , span [] [ text "iHollywood Film Fest" ]
            , br [] []
            , span [] [ text "Joyce Chow | iHollywood Founder & Festival Director" ]
            , br [] []
            , span [] [ text "ihollywoodfilmfest@gmail.com" ]
            , br [] []
            , span [] [ text "www.ihollywoodfilmfest.com" ]
            , br [] []
            , viewSocial ( Twitter, "https://twitter.com/ihollywoodfilm" )
            ]
        ]
