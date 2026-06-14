module Page.Prayers.View exposing (..)

import Component.Footer exposing (viewFooter)
import Html exposing (..)
import Html.Attributes exposing (..)


view : Html msg
view =
    div
        []
        [ viewBody
        , viewFooter
        ]


viewBody : Html msg
viewBody =
    div
        [ class "bg-[#FEF7F4]"
        , class "px-6 py-10"
        ]
        [ div [ class "max-w-2xl mx-auto" ]
            [ h1
                [ class "text-center my-10 leading-tight"
                , style "color" "#395D73"
                ]
                [ text "Catholic Prayers for Children" ]
            , viewIntro
            , viewSection viewWhyPray
            , viewSection viewPrayerList
            , viewSection viewAnimations
            , viewSection viewPrayerTips
            , viewSection viewMoreResources
            ]
        ]


viewIntro : Html msg
viewIntro =
    p
        [ class "text-center leading-8 mb-2"
        , style "color" "#555"
        ]
        [ text "Teaching children to pray is one of the greatest gifts a parent or catechist can give. Here you will find the classic Catholic prayers for children that form the foundation of a life of faith — from the Our Father and Hail Mary to the Angelus and Guardian Angel prayer." ]


viewSection : Html msg -> Html msg
viewSection content =
    div
        [ class "mt-10 pt-10"
        , style "border-top" "1px solid #EBD7F2"
        ]
        [ content ]


viewSectionHeading : String -> Html msg
viewSectionHeading label =
    h2
        [ class "text-xl font-medium mb-5 pl-3 leading-snug"
        , style "color" "#395D73"
        , style "border-left" "3px solid #B99EDA"
        ]
        [ text label ]


viewWhyPray : Html msg
viewWhyPray =
    div []
        [ viewSectionHeading "Why Teach Children Catholic Prayers?"
        , p [ class "leading-8 mb-4", style "color" "#444" ]
            [ text "Memorizing Catholic prayers gives children a vocabulary for speaking with God. When children know these prayers by heart, they can turn to them in moments of joy, fear, gratitude, or sadness — no matter where they are." ]
        , p [ class "leading-8", style "color" "#444" ]
            [ text "The prayers on this page are the ones the Church has treasured for centuries. They cover adoration, petition, intercession, and thanksgiving, giving children a well-rounded way to approach God each day." ]
        ]


viewPrayerList : Html msg
viewPrayerList =
    div []
        [ viewSectionHeading "Essential Catholic Prayers to Learn"
        , p [ class "leading-8 mb-6", style "color" "#555" ]
            [ text "Click any prayer below to read the full text. These are the core Catholic prayers every child should know." ]
        , viewPrayerCard
            "The Our Father"
            "The prayer Jesus himself taught his disciples."
            [ div [] [ text "Our Father, Who art in heaven, hallowed be Thy name;" ]
            , div [] [ text "Thy kingdom come; Thy will be done on earth as it is in" ]
            , div [] [ text "heaven. Give us this day our daily bread; and forgive us our" ]
            , div [] [ text "trespasses as we forgive those who trespass against us; and" ]
            , div [] [ text "lead us not into temptation, but deliver us from evil. Amen." ]
            ]
        , viewPrayerCard
            "The Hail Mary"
            "A prayer of love and devotion to our Blessed Mother. Children who pray it daily grow close to Mary, who leads them to Jesus."
            [ div [] [ text "Hail, Mary, full of grace," ]
            , div [] [ text "the Lord is with thee." ]
            , div [] [ text "Blessed art thou amongst women" ]
            , div [] [ text "and blessed is the fruit of thy womb, Jesus." ]
            , div [] [ text "Holy Mary, Mother of God," ]
            , div [] [ text "pray for us sinners," ]
            , div [] [ text "now and at the hour of our death." ]
            , div [] [ text "Amen." ]
            ]
        , viewPrayerCard
            "The Glory Be"
            "A short prayer of praise to the Holy Trinity — Father, Son, and Holy Spirit."
            [ div [] [ text "Glory be to the Father, and to the Son, and to the Holy Spirit." ]
            , div [] [ text "As it was in the beginning, is now, and ever shall be," ]
            , div [] [ text "world without end. Amen." ]
            ]
        , viewPrayerCard
            "Guardian Angel Prayer"
            "Every child has a guardian angel appointed by God. This simple prayer builds that personal relationship from an early age."
            [ div [] [ text "Angel of God," ]
            , div [] [ text "my guardian dear," ]
            , div [] [ text "To whom God's love" ]
            , div [] [ text "commits me here," ]
            , div [] [ text "Ever this day," ]
            , div [] [ text "be at my side," ]
            , div [] [ text "To light and guard," ]
            , div [] [ text "Rule and guide." ]
            , div [] [ text "Amen." ]
            ]
        , viewPrayerCard
            "Saint Michael the Archangel"
            "A powerful prayer of protection. Many families pray this together after Mass or before bedtime."
            [ div [] [ text "St. Michael the Archangel, defend us in battle." ]
            , div [] [ text "Be our defense against the wickedness and snares of the Devil." ]
            , div [] [ text "May God rebuke him, we humbly pray, and do thou," ]
            , div [] [ text "O Prince of the heavenly hosts, by the power of God," ]
            , div [] [ text "cast into hell Satan, and all the evil spirits," ]
            , div [] [ text "who prowl about the world seeking the ruin of souls. Amen." ]
            ]
        , viewPrayerCard
            "The Angelus"
            "Traditionally prayed at 6 a.m., noon, and 6 p.m.; it is a beautiful way to pause three times a day and remember the Incarnation."
            [ div [] [ text "V. The Angel of the Lord declared unto Mary," ]
            , div [] [ text "R. And she conceived of the Holy Spirit." ]
            , div [ class "py-3" ] []
            , div [] [ text "Hail, Mary, full of grace," ]
            , div [] [ text "the Lord is with thee." ]
            , div [] [ text "Blessed art thou amongst women" ]
            , div [] [ text "and blessed is the fruit of thy womb, Jesus." ]
            , div [] [ text "Holy Mary, Mother of God," ]
            , div [] [ text "pray for us sinners," ]
            , div [] [ text "now and at the hour of our death." ]
            , div [] [ text "Amen." ]
            , div [ class "py-3" ] []
            , div [] [ text "V. Behold the handmaid of the Lord," ]
            , div [] [ text "R. Be it done unto me according to your Word." ]
            , div [ class "py-3" ] []
            , div [] [ text "Hail, Mary..." ]
            , div [ class "py-3" ] []
            , div [] [ text "V. And the Word was made flesh," ]
            , div [] [ text "R. and dwelt among us." ]
            , div [ class "py-3" ] []
            , div [] [ text "Hail, Mary..." ]
            , div [ class "py-3" ] []
            , div [] [ text "V. Pray for us, O holy Mother of God," ]
            , div [] [ text "R. That we may be made worthy of the promises of Christ." ]
            , div [ class "py-3" ] []
            , div [] [ text "Let us pray:" ]
            , div [] [ text "Pour forth, we beseech you, O Lord, your grace into our hearts:" ]
            , div [] [ text "that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel," ]
            , div [] [ text "may by his Passion and Cross be brought to the glory of his Resurrection." ]
            , div [] [ text "Through the same Christ our Lord. Amen." ]
            ]
        ]


viewPrayerCard : String -> String -> List (Html msg) -> Html msg
viewPrayerCard title description prayerLines =
    details
        [ class "mb-3 rounded-lg overflow-hidden"
        , style "background" "white"
        , style "border" "1px solid #EBD7F2"
        ]
        [ summary
            [ class "flex items-center justify-between px-5 py-4 cursor-pointer select-none list-none"
            , style "color" "#395D73"
            ]
            [ div []
                [ h3
                    [ class "text-base font-medium leading-snug"
                    , style "color" "#395D73"
                    ]
                    [ text title ]
                , p
                    [ class "text-sm mt-1 leading-snug"
                    , style "color" "#777"
                    ]
                    [ text description ]
                ]
            , span
                [ class "ml-4 flex-shrink-0 text-lg"
                , style "color" "#B99EDA"
                ]
                [ text "›" ]
            ]
        , div
            [ class "px-5 pb-5 leading-8 text-sm"
            , style "color" "#444"
            , style "border-top" "1px solid #EBD7F2"
            ]
            prayerLines
        ]


viewAnimations : Html msg
viewAnimations =
    div []
        [ viewSectionHeading "Learn Catholic Prayers Through Animation"
        , p [ class "leading-8 mb-5", style "color" "#444" ]
            [ text "Watching and hearing a prayer brings it to life for young children. Our free animated series help children not just memorize Catholic prayers but truly understand and love them." ]
        , div [ class "flex flex-col gap-3" ]
            [ viewAnimationLink "/animations/hailmary/" "Hail Mary" "An animated story teaching the Hail Mary prayer for children ages 2+"
            , viewAnimationLink "/animations/prayertimewithangels/" "Prayer Time with Angels" "Learn core prayers with Theo and Felicity — ages 6+"
            , viewAnimationLink "/animations/prayingwiththesaints/" "Praying with the Saints" "12 prayer videos with St. Thérèse and Carlo Acutis — ages 6+"
            ]
        ]


viewAnimationLink : String -> String -> String -> Html msg
viewAnimationLink url title subtitle =
    a
        [ href url
        , class "flex items-center gap-4 px-5 py-4 rounded-lg no-underline"
        , style "background" "white"
        , style "border" "1px solid #EBD7F2"
        ]
        [ div [ class "flex-1" ]
            [ p [ class "text-sm font-medium leading-snug", style "color" "#395D73" ] [ text title ]
            , p [ class "text-xs mt-1 leading-snug", style "color" "#777" ] [ text subtitle ]
            ]
        , span [ class "text-lg", style "color" "#B99EDA" ] [ text "→" ]
        ]


viewPrayerTips : Html msg
viewPrayerTips =
    div []
        [ viewSectionHeading "Tips for Praying with Children"
        , p [ class "leading-8 mb-4", style "color" "#444" ]
            [ text "The best way to teach Catholic prayers for children is to pray them together out loud, every day. A few simple strategies that help:" ]
        , ul [ class "flex flex-col gap-3" ]
            [ viewTip "Start with one prayer at a time. Master the Our Father before adding the Hail Mary."
            , viewTip "Pray at the same time each day — morning, meals, and bedtime are natural moments."
            , viewTip "Explain the meaning in simple words before or after praying."
            , viewTip "Use our animations to reinforce the words visually."
            , viewTip "Celebrate milestones — when a child learns a new prayer by heart, acknowledge it."
            ]
        ]


viewTip : String -> Html msg
viewTip tipText =
    li
        [ class "flex items-start gap-3 px-4 py-3 rounded-lg text-sm leading-7"
        , style "background" "white"
        , style "border" "1px solid #EBD7F2"
        , style "color" "#444"
        ]
        [ span [ style "color" "#B99EDA", class "mt-1 flex-shrink-0" ] [ text "•" ]
        , text tipText
        ]


viewMoreResources : Html msg
viewMoreResources =
    div []
        [ viewSectionHeading "More Catholic Resources for Children"
        , p [ class "leading-8 mb-5", style "color" "#444" ]
            [ text "Prayers are just one part of a rich Catholic education. Explore our other free resources:" ]
        , div [ class "grid grid-cols-2 gap-3" ]
            [ viewResourceLink "/saints/" "Lives of the Saints" "Short biographies for kids"
            , viewResourceLink "/feastdayactivities/" "Feast Day Activities" "Celebrate the liturgical year at home"
            , viewResourceLink "/resources/" "Printable Resources" "Prayer cards, activity sheets, and more"
            , viewResourceLink "/animations/" "All Animations" "Free Catholic video series for families"
            ]
        ]


viewResourceLink : String -> String -> String -> Html msg
viewResourceLink url title subtitle =
    a
        [ href url
        , class "flex flex-col gap-1 px-4 py-4 rounded-lg no-underline"
        , style "background" "white"
        , style "border" "1px solid #EBD7F2"
        ]
        [ p [ class "text-sm font-medium leading-snug", style "color" "#395D73" ] [ text title ]
        , p [ class "text-xs leading-snug", style "color" "#777" ] [ text subtitle ]
        ]
