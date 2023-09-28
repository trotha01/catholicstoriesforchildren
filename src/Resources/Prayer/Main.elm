module Resources.Prayer.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Resources.Helpers exposing (..)
import Signup exposing (..)


type alias Model =
    { signup : Signup.Model
    }


type Msg
    = SignupMsg Signup.Msg


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( { signup = Signup.init }, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SignupMsg signupMsg ->
            let
                ( signup, cmd ) =
                    Signup.update signupMsg model.signup
            in
            ( { model | signup = signup }, cmd |> Cmd.map SignupMsg )


view : Model -> Html Msg
view model =
    div
        [ style "height" "100vh"
        , style "overflow-x" "hidden"
        , style "overflow-y" "auto"
        , style "perspective" "300px"
        , style "scroll-behavior" "smooth"
        , style "background-color" "#FEF7F4"
        ]
        [ viewSubpageHeader "Prayer Resources" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "p-5"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "Prayer Resources" ]
        , a
            [ href "/animations/actofcontrition"
            , class "hover:scale-105 transition ease-in-out duration-50"
            , attribute "aria-label" "Act of Contrition Animation Coming Soon"
            , class "block mb-2"
            ]
            [ img
                [ src "/assets/images/AnimationImageLinks/ActOfContritionComingSoon.png"
                , style "border-radius" "5px"
                , style "width" "-webkit-fill-available"
                , alt "Act of Contrition Animation"
                ]
                []
            ]
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewAboutPrayerResources
        , viewPrayerResources
        , viewPrayerSteps
        , viewWorkInProgressNotice
        ]


viewAboutPrayerResources : Html msg
viewAboutPrayerResources =
    div []
        [ text "Find resources to help build your prayer life here."
        ]


viewPrayerResources : Html msg
viewPrayerResources =
    div []
        (List.map viewResource
            [ theHallowApp
            , theAmenApp
            , twoByTwo
            ]
        )


viewPrayerSteps : Html msg
viewPrayerSteps =
    div []
        [ h2 [ class "mt-16 mb-4" ] [ text "Prayer Progression" ]
        , p []
            [ span []
                [ text
                    "Having trouble getting your kids to pray the Rosary? Or other long prayers? You might be starting too big for them. Learning to build a daily habit of prayer takes time and patience."
                ]
            , span [] [ text " Here is a prayer progression you can use to slowly introduce your kids to each prayer. " ]
            , span [] [ text " There is no hard and fast rule. You can teach multiple prayers at a time or in a different order than listed. Remove distractions during prayer time and when appropriate, kneel while praying." ]
            , span [] [ text " Remember every kid is different and may take longer to learn the prayers. Be patient." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Sign of the Cross" ]
        , p []
            [ span [] [ text "The sign of the cross is a prayer in and of itself. It is a sign of our salvation. It expresses our belief in the Trinity." ]
            , span [] [ text " It offers protection against demons and our own inclination to sin." ]
            , span [] [ text " The sign of the cross is usually accompanied by the words, 'In the name of the Father, and of the Son, and of the Holy Spirit.'" ]
            , span [] [ text " You can remind your kids to do the sign of the cross before they eat, before they sleep" ]
            , span [] [ text " when they enter a Church, whenever you drive by a Church, and at other times throughout the day." ]
            , span [] [ text " You can also bless your children by making the sign of the cross on their forehead with your thumb." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Prayer Before Meals" ]
        , p []
            [ text
                "Say this prayer every time you eat. This will quickly help your kid build a habit of turning to God in prayer. It will help them grow in the virtue of gratitude."
            ]
        , p [ class "mt-4 italic" ]
            [ text "Bless us, O Lord, and these Thy gifts, which we are about to receive from Thy bounty, through Christ, Our Lord. Amen."
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Hail Mary" ]
        , p []
            [ span [] [ text "The Hail Mary prayer is short and sweet for kids. You can use " ]
            , span [] [ a [ href "/animations/hailmary", class "underline" ] [ text "our animation" ] ]
            , span [] [ text " to help your kids understand this prayer. You can also find Hail Mary Prayer activities on " ]
            , span [] [ a [ href "/animations/hailmary", class "underline" ] [ text "our animation page" ] ]
            , span [] [ text "." ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "Hail Mary, full of grace, the Lord is with you; blessed are you among women, and blessed is the fruit of your womb, Jesus.  Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen."
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Guardian Angel Prayer" ]
        , p []
            [ span [] [ text "This prayer can be said each night and each morning." ]
            , span [] [ text " Let your kids learn about their guardian angel and ask for their intercession. You can use " ]
            , span [] [ a [ href "/animations/guardianangel", class "underline" ] [ text "our animation" ] ]
            , span [] [ text " to help your kids understand this prayer. You can also find Guardian Angel Prayer activities on " ]
            , span [] [ a [ href "/animations/guardianangel", class "underline" ] [ text "our animation page" ] ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "Angel Of God, my guardian dear, to whom God's love commits me here, ever this day be at my side, to light and guard, to rule and guide. Amen." ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Glory Be" ]
        , p []
            [ span [] [ text "This prayer is called a doxology because" ]
            , span [] [ text " it is an expression of praise and glory." ]
            , span [] [ text " It is usually used at the end of a longer prayer to sum up our feelings and intentions." ]
            , span [] [ text " We pray this at the end of each decade of the Rosary. It can also be prayed at the end of the Angelus." ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen." ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Our Father" ]
        , p []
            [ span [] [ text "The prayer our Savior gave us. It is a powerful prayer that he instructed us to pray. " ]
            , span [] [ text " Having your kids learn this prayer will help them follow along with it at Mass." ]
            , span [] [ text " To introduce it to them, you can read from Scripture: Matthew 6:5-15 and Luke 11:1-13." ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen." ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Fatima Prayer" ]
        , p []
            [ span [] [ text "This prayer was given by Our Lady during the Third Apparition of Our Lady of Fatima to the three shepherd children on July 13, 1917. It is to be prayed after the 'Glory Be' in each decade of the Rosary." ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "O my Jesus, forgive us our sins, save us from the fire of hell, lead all souls to heaven, especially those who are in most need of Thy mercy." ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "Prayer to Saint Michael the Archangel" ]
        , p []
            [ span [] [ text "The St Michael Prayer was originally composed by Pope Leo XIII. He sent it to all the churches for the people to say after each Mass. In this prayer, we seek St Michael's protection from the devil and evil spirits." ]
            ]
        , p []
            [ span [] [ text "You can use " ]
            , span [] [ a [ href "/animations/stmichael", class "underline" ] [ text "our animation" ] ]
            , span [] [ text " to help your kids understand this prayer. You can also find Saint Michael Prayer activities on " ]
            , span [] [ a [ href "/animations/stmichael", class "underline" ] [ text "our animation page" ] ]
            , span [] [ text "." ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "St. Michael the Archangel, defend us in battle.  Be our defense against the wickedness and snares of the Devil.  May God rebuke him, we humbly pray, and do thou, O Prince of the heavenly hosts, by the power of God, cast into hell Satan, and all the evil spirits, who prowl about the world seeking the ruin of souls. Amen." ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "Prayers of Intercession" ]
        , p []
            [ span [] [ text "While there are no specific words to this, prayers of intercession are a wonderful way for kids to grow in charity." ]
            , span [] [ text " It allows them to think about others and prayer for them." ]
            ]
        , p []
            [ span [] [ text " You can ask your kids who they would like to pray for right before the prayer before meals or before Mass." ]
            , span [] [ text " They can pray for family members, friends, classmates, teachers, or anyone in their lives." ]
            , span [] [ text " They can pray for priests, doctors, nurses, or groups of people in general." ]
            , span [] [ text " They can pray for countries or those affected by certain afflictions." ]
            , span [] [ text " You can start and lead them by example, 'Let us pray for your uncle who is in the hospital' or 'Let us pray for those affected by the hurricane and in need of a home.'" ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Angelus" ]
        , p []
            [ span [] [ text "The Angelus is a special prayer recited by Catholics three times a day, at 6am, noon, and 6pm" ]
            , span [] [ text ", and is accompanied by the ringing of the Angelus bell." ]
            , span [] [ text " The name comes from the Latin word for Angel and the prayer itself reminds us of how Jesus Christ" ]
            , span [] [ text " assumed our human nature through the Mystery of the Incarnation." ]
            , span [] [ text " The Pope recites the Angelus prayer in St Peter’s Square every Sunday at midday. It concludes with the recitation of the Gloria three times." ]
            , span [] [ text " source: https://www.vaticannews.va/en/pope-francis/angelus.html" ]
            ]
        , div []
            [ p [ class "mt-4 italic" ]
                [ text "V/. The Angel of the Lord declared unto Mary," ]
            , p [ class "mt-4 italic" ]
                [ text "R/. And she conceived of the Holy Spirit." ]
            , p [ class "mt-4 italic" ]
                [ text "Hail Mary, full of grace, the Lord is with you;\nblessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen." ]
            , p [ class "mt-4 italic" ]
                [ text "V/. Behold the handmaid of the Lord," ]
            , p [ class "mt-4 italic" ]
                [ text "R/. Be it done unto me according to your Word." ]
            , p [ class "mt-4 italic" ]
                [ text "Hail Mary, full of grace, the Lord is with you; blessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen." ]
            , p [ class "mt-4 italic" ]
                [ text "V/. And the Word was made flesh," ]
            , p [ class "mt-4 italic" ]
                [ text "R/. And dwelt among us." ]
            , p [ class "mt-4 italic" ]
                [ text "Hail Mary, full of grace, the Lord is with you;\nblessed are you among women, and blessed is the fruit of your womb, Jesus. Holy Mary, Mother of God, pray for us sinners now and at the hour of our death. Amen." ]
            , p [ class "mt-4 italic" ]
                [ text "V/. Pray for us, O holy Mother of God," ]
            , p [ class "mt-4 italic" ]
                [ text "R/. That we may be made worthy of the promises of Christ." ]
            , p [ class "mt-4 italic" ]
                [ text "Let us pray. Pour forth, we beseech you, O Lord, your grace into our hearts: that we, to whom the Incarnation of Christ your Son was made known by the message of an Angel, may by his Passion and Cross be brought to the glory of his Resurrection. Through the same Christ our Lord. Amen." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Regina Coeli" ]
        , p []
            [ span [] [ text " From Easter to Pentecost the Regina Coeli is prayed instead of the Angelus. This prayer commemorates the Resurrection of Jesus Christ and, like the Angelus, concludes with the recitation of the Gloria three times." ]
            ]
        , div []
            [ p [ class "mt-4 italic" ]
                [ text "V. Queen of Heaven, rejoice, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "R. For He whom you did merit to bear, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "V. Has risen, as he said, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "R. Pray for us to God, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "V. Rejoice and be glad, O Virgin Mary, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "R. For the Lord has truly risen, alleluia." ]
            , p [ class "mt-4 italic" ]
                [ text "Let us pray. O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant we beseech Thee, that through the intercession of the Virgin Mary, His Mother, we may obtain the joys of everlasting life. Through the same Christ our Lord. Amen." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "Three Hail Mary Devotion" ]
        , p []
            [ span [] [ text "Once your kids have single daily prayers down. You can start incorporating longer strings of prayers together. A wonderful one to begin with is the Three Hail Mary Devotion to say in the morning and at night. " ]
            , span [] [ a [ href "https://visitationproject.org/pages/the-three-hail-marys", class "underline" ] [ text "Our Blessed Mother revealed this devotion to St. Mechtilde, a Benedictine mystic. St. Gertrude wrote down the revelation at the dictation of St. Mechtilde." ] ]
            ]
        , div [ class "italic" ]
            [ p [ class "mt-4" ] [ text " While Mechtilde was beseeching the glorious Virgin to assist her in her hour of death, Our Lady appeared to her and said: 'I will certainly. But I also want you to say three special Hail Marys to me every day." ]
            , p [ class "mt-4" ] [ text " 'The first will be in honor of God the Father, Whose omnipotence raised my soul so high above every other creature that, after God, I have the greatest power in Heaven and on earth. In the hour of your death, I will use that power of God the Father to keep any hostile power far from you. " ]
            , p [ class "mt-4" ] [ text " 'The second Hail Mary will be said in honor of the Son of God, Who communicated His inscrutable wisdom to me. In the hour of your death, I will fill your soul with the light of that wisdom, so that all the darkness of ignorance and error will be dispelled." ]
            , p [ class "mt-4" ] [ text " 'The third Hail Mary will be in honor of God the Holy Ghost, Who filled my soul with the sweetness of His love and tenderness and mercy. In your last hour, I will then change the bitterness of death into divine sweetness and delight." ]
            , p [ class "mt-4" ] [ text " 'To any soul who faithfully prays the Three Hail Marys, I will appear at the hour of death in a splendor so extraordinary that it will fill the soul with heavenly consolation." ]
            ]
        , p [ class "mt-4" ] [ text " For this devotion, say 'O my Mother, preserve me this day (or night) from mortal sin,' then pray three Hail Marys in a row in honor of the Father, the Son, and the Holy Spirit. " ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "Three Day Novenas" ]
        , p []
            [ span [] [ text "Once your kids have daily prayers down. You can start incorporating Novenas." ]
            , span [] [ text " Doing a full nine-day novena might be hard, so you can start with a three-day novena." ]
            , span [] [ text " Here are a couple three-day Novena's you can try:" ]
            , ul []
                [ li [] [ a [ href "https://novenaprayer.com/2020/03/02/miraculous-prayer-to-the-holy-spirit/", class "underline", target "_blank" ] [ text "Three Day Miraculous Novena Prayer to the Holy Spirit" ] ]
                , li [] [ a [ href "https://novenaprayer.com/2022/04/26/three-day-miracle-prayer-to-our-lady/", class "underline", target "_blank" ] [ text "Three Day Miracle Prayer To Our Lady" ] ]
                ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "A Decade of the Rosary" ]
        , div []
            [ p []
                [ span [] [ text "Choose one of the Mysteries of the Rosary to reflect on. Reading a short passage from the Gospel and having an image of that mystery will help with this." ]
                , span [] [ text " Start with a short Gospel reading, then pray the Our Father, the Hail Mary ten times, the Glory Be, and end with the Fatima Prayer." ]
                , span [] [ text " You can interweave the Gospel verses between the Hail Marys. If your kids aren't able to do ten Hail Marys, then start smaller and work your way up." ]
                , span [] [ text " Here is a list of the Mysteries and associated fruits and bible passages." ]
                ]
            , h4 [ class "font-semibold" ] [ text "Joyful Mysteries" ]
            , ul [ class "list-decimal list-inside" ]
                [ li [] [ text "The Annunciation (Humility). Luke 1:26-38; John 1:14." ]
                , li [] [ text "The Visitation (Charity). Luke 1:29-56." ]
                , li [] [ text "The Nativity (Poverty). Luke 2:1-29; Matthew 1:18-25." ]
                , li [] [ text "The Presentation. Luke 2:22-39" ]
                , li [] [ text "The Finding at the Temple. Luke 2:41-52" ]
                ]
            , h4 [ class "font-bold" ] [ text "Luminous Mysteries" ]
            , ul [ class "list-decimal list-inside" ]
                [ li [] [ text "The Baptism in the Jordan (Fidelity to our baptismal promises). Matthew 3:11-17; Mark 1:9-11; Luke 3:15-22; John 1:26-34." ]
                , li [] [ text "The Wedding at Cana  (Faith in Mary‘s intercession and maternal care). John 2:1-12." ]
                , li [] [ text "The Proclamation of the Kingdom of God (Conversion of heart). Mark 1:14-15; Matthew 5:1-16; Matthew 6:33; Matthew 7:21." ]
                , li [] [ text "The Transfiguration (Desire to become a new person in Christ). Matthew 17:1-8; Mark 9:2-10; Luke 9:28-36." ]
                , li [] [ text "The Institution of the Eucharist (Love of the Eucharist; active participation at Mass); Matthew 26:26-28; Mark 22-25; Luke 22:14-20; John 6:33-59." ]
                ]
            , h4 [ class "font-bold" ] [ text "Sorrowful Mysteries" ]
            , ul [ class "list-decimal list-inside" ]
                [ li [] [ text "The Agony in the Garden (True sorrow for sin; repentance). Matthew 26:36-46; Mark 14:32-42; Luke 22:39-46." ]
                , li [] [ text "The Scourging at the Pillar (Modesty and purity; mortification or self-denial). Matthew 27:26; Mark 15:15; Luke 23:16-22; John 19:1." ]
                , li [] [ text "The Crowning of Thorns (Moral courage; love of our enemies). Matthew 27:29-30; Mark 15:16-20; John 19: 2-3." ]
                , li [] [ text "The Carrying of the Cross  (Patience, especially when suffering; fortitude) Luke 23: 26-32; Matthew 27:31-32; Mark 15:21; Luke 23:26-32." ]
                , li [] [ text "The Crucifixion (Perseverance; mercy). Luke 23: 33-46; Matthew 27: 33-54; Mark 15: 22-39; Luke 23: 33-47; John 1917-37" ]
                ]
            , h4 [ class "font-bold" ] [ text "Glorious Mysteries" ]
            , ul [ class "list-decimal list-inside" ]
                [ li [] [ text "The Resurrection (Faith). Matthew 28:1-10; Mark 16:1-18; Luke 24:1-49; John 20:1-29." ]
                , li [] [ text "The Ascension (Hope). Mark 16:19-20; Luke 24:50-51; Acts 1:6-11." ]
                , li [] [ text "The Descent of the Holy Spirit (Love of God; gifts of the Holy Spirit) Acts 2:1-41," ]
                , li [] [ text "The Assumption (Grace of a happy death; eternal happiness). Revelation 12:1." ]
                , li [] [ text "The Crowning of Mary as Queen of Heaven and Earth (True devotion to Mary). Revelation 12:1." ]
                ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "A Few Decades of the Rosary" ]
        , p []
            [ span [] [ text "When your kids are comfortable with a single decade, you can start doing multiple decades of the Rosary. Start with a few Hail Marys for each and work your way up to ten Hail Marys for each." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Divine Mercy Chaplet" ]
        , p []
            [ span [] [ text "This Chaplet is from the vision of St. Faustina. It is appropriate to pray at three o'clock each afternoon but can be prayed at other times. The Chaplet of Mercy can be recited using ordinary Rosary beads. " ]
            ]
        , a [ href "https://www.thedivinemercy.org/message/devotions/chaplet", target "_blank", class "underline" ]
            [ span [] [ text "Click here for instructions on how to pray the Divine Mercy Chaplet." ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Servite Rosary" ]
        , p []
            [ span []
                [ a [ href "https://www.ourladymountcarmel.com/blog/pray-servite-rosary", class "underline", target "_blank" ] [ text "The Servite Rosary" ]
                , text " consists of seven groups of prayer in memory of Marys seven sorrows. Seven Hail Marys are said for each group instead of ten as done in the Rosary."
                ]
            ]
        , p [ class "mt-4 italic" ]
            [ text "It is customary to begin with an Act of Contrition, to call to mind the role our sins had in Mary’s sufferings. At the beginning of each group, the sorrow is announced, followed by an Our Father and seven Hail Marys. At the end of the rosary, we say 3 Hail Marys in honor of Our Lady’s tears."
            ]
        , p [ class "mt-4 italic" ]
            [ ul [ class "list-decimal list-inside" ]
                [ li [] [ text "The Prophecy Of Simeon (Luke 2:34–35)." ]
                , li [] [ text "The Flight Into Egypt (Matthew 2:13)." ]
                , li [] [ text "The Loss Of Jesus In The Temple (Luke 2:43–45)." ]
                , li [] [ text "Mary Meets Jesus On the Way To Calvary." ]
                , li [] [ text "Jesus Dies On The Cross (John 19:25)." ]
                , li [] [ text "Mary Receives The Dead Body of Jesus (Matthew 27:57–59)." ]
                , li [] [ text "Jesus Is Laid In The Tomb (John 19:40–42)." ]
                ]
            ]
        , h3 [ class "text-lg font-bold mt-16 mb-4" ] [ text "The Full Rosary" ]
        , p []
            [ span [] [ text "\"The Rosary is a prayer loved by countless Saints and encouraged by the Magisterium. Simple yet profound, it still remains, at the dawn of this third millennium, a prayer of great significance, destined to bring forth a harvest of holiness.\" - " ]
            , a [ href "https://www.vatican.va/content/john-paul-ii/en/apost_letters/2002/documents/hf_jp-ii_apl_20021016_rosarium-virginis-mariae.html", target "_blank", class "underline" ] [ text "Apostolic Letter Rosarium Virginis Mariae of the Supreme Pontiff John Paul II to the bishops, clergy and faithful on the Most Holy Rosary" ]
            , span [] [ text "." ]
            ]
        , p [ class "mt-4" ]
            [ span [] [ text "The mysteries can be distributed throughout the week." ]
            , span [] [ text " Monday and Saturday are dedicated to the joyful mysteries, Tuesday and Friday are dedicated to the sorrowful mysteries, Wednesday and Sunday are dedicated to the glorious mysteries, and Thursday is dedicated to the luminous mysteries." ]
            ]
        ]


theHallowApp : Resource
theHallowApp =
    { name = "The Hallow Prayer App"
    , link = "https://hallow.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/45_n7tIe7YkV.png?updatedAt=1683227692949"
    }


theAmenApp : Resource
theAmenApp =
    { name = "The Amen Prayer App"
    , link = "https://amenapp.org/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/44_A3rkyg807.png?updatedAt=1683227692705"
    }


twoByTwo : Resource
twoByTwo =
    { name = "Two by two Prayer Website"
    , link = "https://twobytwoprayer.com/"
    , image = "https://ik.imagekit.io/catholicstories/ProfileImages/twobytwo_jqaTekz8M.png?updatedAt=1683228056777"
    }
