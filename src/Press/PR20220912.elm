module Press.PR20220912 exposing (..)

import Helpers exposing (..)
import Html.String exposing (..)
import Html.String.Attributes exposing (..)


view : Html Never
view =
    div
        []
        [ h2 h2Style [ text "Hail Mary Prayer Animation Wins Award in International Hollywood Film Festival" ]
        , p [] [ text "Catholic Stories for Children's animation, 'Hail Mary, Full of Grace' wins the X Award in the iHollywood Film Festival this past week" ] -- subtitle
        , p [ style "font-size" "0.7em" ] [ text "Sept 12, 2022" ]
        , br [] []
        , p []
            [ span [ style "font-style" "bold" ] [ text "Los Angeles, California. " ]
            , span []
                [ text
                    ("""Today, Catholic Stories for Children, a new non-profit that creates animations for children,"""
                        ++ """ announced that they won the X award in the International Hollywood Film Festival (IHFF). "I am really grateful"""
                        ++ """ for this opportunity. I appreciate the support from the iHollywood team in helping spread the"""
                        ++ """ love of our Blessed Virgin Mother Mary" said Trevor Rothaus, founder of Catholic Stories for Children. """
                    )
                ]
            ]
        , br [] []
        , p [] [ text "IHFF merges film, creatives, and web 3.0 technologies as to empower the independent filmmaker. They are also using their platform to support ocean conservation this year. IHFF is a proud member of the Hollywood Chamber of Commerce and is a member of their Entertainment, Arts and Media plus Tourism committees. The iHollywood Film Fest was created in 2020 to bring community to creatives." ]
        , br [] []
        , p [] [ text "The Hail Mary animated short film is a way for kids to not only learn but also understand the words in the Hail Mary prayer. It helps kids come to know their Holy Mother in Heaven. This prayer is a constant reminder for kids that they have a mother who is always listening and will always love them. And it is a reminder that they can go to her for help." ]
        , br [] []
        , p [] [ text "Catholic Stories for Children is a non-profit organization that exists to help Catholic parents pass on the faith with prayer tips and fun animations for children. Catholic Stories for Children aims to help kids grow a habit of prayer. As kids build a habit of thanking God in the morning, before every meal, and throughout their day, they grow into grateful people. As kids pray for each other, they grow in empathy and love. As kids pray together, they grow in community. And when kids pray at home with their families, their hearts open up and the family grows strong with God as their center. But many parents struggle with getting their young kids to sit and pray at home, so Catholic Stories for Children creates animations as an aid for families. These animations can be found on their website, www.catholicstoriesforchildren.com." ]
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
            , br [] []
            , span [] [ text "iHollywood Film Fest" ]
            , br [] []
            , span [] [ text "Joyce Chow | iHollywood Founder & Festival Director" ]
            , br [] []
            , span [] [ text "ihollywoodfilmfest@gmail.com" ]
            , br [] []
            , span [] [ text "www.ihollywoodfilmfest.com" ]
            ]
        ]
