module Animations.StMichael.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Signup exposing (..)


type LanguageOption
    = EnglishPrayer
    | Latin
    | Spanish


type VideoOption
    = English
    | Urdu


type alias Model =
    { prayerTab : LanguageOption
    , videoTab : VideoOption
    , signup : Signup.Model
    }


type Msg
    = PrayerTabClick LanguageOption
    | VideoTabClick VideoOption
    | SignupMsg Signup.Msg


main : Program () Model Msg
main =
    Browser.element
        { init = \_ -> ( { prayerTab = EnglishPrayer, videoTab = English, signup = Signup.init }, Cmd.none )
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

        PrayerTabClick language ->
            ( { model | prayerTab = language }, Cmd.none )

        VideoTabClick language ->
            ( { model | videoTab = language }, Cmd.none )


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
        [ viewSubpageHeader "St Michael" headerMargin
        , viewBody model
        , viewFooter
        ]


viewBody : Model -> Html Msg
viewBody model =
    div
        [ class "max-w-3xl"
        , class "m-auto"
        , class "py-5 px-11"
        , class "mb-10"
        ]
        [ h1 [ class "my-10 leading-10" ] [ text "St Michael the Archangel Prayer" ]
        , aboutTheAnimation
        , div [ class "mb-20" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]

        -- , viewVideoComingSoon "https://ik.imagekit.io/catholicstories/stmichaelcomingsoon_plkRIX_Oq.png?updatedAt=1682601682466"
        , viewVideoPlayers model
        , div [ class "py-4" ] [ viewActivities ]
        , viewPrayer
        , aboutThePrayer
        , viewPrayerHistory
        , viewStoryHistory

        -- , scripture
        -- , tradition
        -- , magisterialTeachings
        ]


englishVideoLink : String
englishVideoLink =
    "https://www.youtube-nocookie.com/embed/y2-SqI_PLv4?playlist=y2-SqI_PLv4&loop=1"


urduVideoLink : String
urduVideoLink =
    "https://www.youtube-nocookie.com/embed/5ROHimFlar8?si=nlttq8zg2KthJSE1"


viewVideoPlayers : Model -> Html Msg
viewVideoPlayers model =
    div
        []
        [ viewVideoPlayerTabs model
        , case model.videoTab of
            English ->
                viewVideo "St Michael | Prayer Time with Angels" englishVideoLink

            Urdu ->
                viewVideo "St Michael | Prayer Time with Angels" urduVideoLink
        ]


viewVideoPlayerTabs : Model -> Html Msg
viewVideoPlayerTabs model =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

        ( englishClass, aslClass ) =
            case model.videoTab of
                English ->
                    ( selectedClass, nonSelectedClass )

                Urdu ->
                    ( nonSelectedClass, selectedClass )
    in
    div [ class "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ li [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ englishClass)
                    , onClick (VideoTabClick English)
                    ]
                    [ text "English" ]
                ]
            , li
                [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ aslClass)
                    , onClick (VideoTabClick Urdu)
                    ]
                    [ text "Urdu" ]
                ]
            ]
        ]


viewVideoPlayer : String -> Html msg
viewVideoPlayer link =
    div
        [ class "w-1/2"
        ]
        [ viewVideo "St Michael | Prayer Time with Angels" link
        ]


aboutTheAnimation : Html msg
aboutTheAnimation =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ p [ class "my-3" ]
            [ text
                ("Use this animation to help your children learn the St Michael the Archangel prayer though a story and song."
                    ++ " It also will help your children learn more about St Michael and trusting in God in times of fear."
                )
            ]
        , p [ class "my-3" ]
            [ text
                ("This animation is meant to be an aid for your children to slowly build a habit of prayer. "
                    ++ "You can use it during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
            ]
        ]


prayerLanguageTabs : Model -> Html Msg
prayerLanguageTabs model =
    let
        selectedClass =
            "active text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"

        nonSelectedClass =
            "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"

        ( englishClass, latinClass, spanishClass ) =
            case model.prayerTab of
                EnglishPrayer ->
                    ( selectedClass, nonSelectedClass, nonSelectedClass )

                Latin ->
                    ( nonSelectedClass, selectedClass, nonSelectedClass )

                Spanish ->
                    ( nonSelectedClass, nonSelectedClass, selectedClass )
    in
    div [ class "text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700" ]
        [ ul
            [ class "flex flex-wrap -mb-px" ]
            [ li [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ englishClass)
                    , onClick (PrayerTabClick EnglishPrayer)
                    ]
                    [ text "English" ]
                ]
            , li
                [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ latinClass)
                    , onClick (PrayerTabClick Latin)
                    ]
                    [ text "Latin" ]
                ]
            , li
                [ class "mr-2" ]
                [ button
                    [ class ("inline-block p-4 border-b-2 rounded-t-lg " ++ spanishClass)
                    , onClick (PrayerTabClick Spanish)
                    ]
                    [ text "Spanish" ]
                ]
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "mt-10 text-lg" ]
        [ h2 [ class "mb-3" ] [ text "The Prayer" ]
        , p [ class "mb-5" ]
            [ span [ class "block" ] [ text "St. Michael the Archangel," ]
            , span [ class "block" ] [ text "defend us in battle." ]
            , span [ class "block" ] [ text "Be our defense against the wickedness and snares of the Devil." ]
            , span [ class "block" ] [ text "May God rebuke him, we humbly pray," ]
            , span [ class "block" ] [ text "and do thou," ]
            , span [ class "block" ] [ text "O Prince of the heavenly hosts," ]
            , span [ class "block" ] [ text "by the power of God," ]
            , span [ class "block" ] [ text "thrust into hell Satan," ]
            , span [ class "block" ] [ text "and all the evil spirits," ]
            , span [ class "block" ] [ text "who prowl about the world" ]
            , span [ class "block" ] [ text "seeking the ruin of souls. Amen." ]
            ]
        , p []
            [ span [ class "block" ] [ text "O glorious prince St. Michael, " ]
            , span [ class "block" ] [ text "chief and commander of the heavenly hosts, " ]
            , span [ class "block" ] [ text "guardian of souls, vanquisher of rebel spirits, " ]
            , span [ class "block" ] [ text "servant in the house of the Divine King" ]
            , span [ class "block" ] [ text "and our admirable conductor, " ]
            , span [ class "block" ] [ text "you who shine with excellence" ]
            , span [ class "block" ] [ text "and superhuman virtue deliver us from all evil," ]
            , span [ class "block" ] [ text "who turn to you with confidence" ]
            , span [ class "block" ] [ text "and enable us by your gracious protection" ]
            , span [ class "block" ] [ text "to serve God more and more faithfully every day." ]
            ]
        ]


viewActivities : Html msg
viewActivities =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text "Saint Michael Activities" ]
        , div [ class "grid grid-cols-2 gap-4" ]
            [ div []
                [ p [ class "h-14" ]
                    [ text "Access coloring pages, copywork, discussion questions and more!"
                    ]
                , a
                    [ attribute "aria-label" "Saint Michael Activities"
                    , href "/printables/Saint-Michael-Activities.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Cover_J2Qt-zF3t.png?updatedAt=1688494130199"
                        ]
                        []
                    ]
                ]
            , div []
                [ p [ class "h-14" ]
                    [ text "Answers to Saint Michael activity questions."
                    ]
                , a
                    [ attribute "aria-label" "Saint Michael Activities"
                    , href "/printables/Saint-Michael-Activity-Answers.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , src "https://ik.imagekit.io/catholicstories/Saint_Michael_Activity_Answers_3__I3WnUgIL6.png?updatedAt=1688495548276"
                        ]
                        []
                    ]
                ]
            ]
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-3 mt-5" ] [ text "About the St Michael Prayer" ]
        , p [ class "my-3" ]
            [ text
                ("The St Michael Prayer was originally composed by Pope Leo XIII. He sent it to all the churches for the people to say after each Mass."
                    ++ " In this prayer, we seek St Michael's protection from the devil and evil spirits."
                )
            ]
        ]


viewPrayerHistory : Html msg
viewPrayerHistory =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-3 mt-5" ] [ text "The History of the Prayer" ]
        , p []
            [ span []
                [ text "The information here is based on the book "
                ]
            , span [ class "italic" ]
                [ text "Pope Leo XIII and the Prayer to St Michael: An Historical and Theological Examination"
                ]
            , span [] [ text " by Kevin Symonds." ]
            ]
        , h3 [ class "mt-5" ] [ text "1859" ]
        , p [] [ text "Pope Pius IX ordered a series of prayers to be recited after private Masses in all churches in the Papal States. Priests were to say with the people the Ave Maria three times, then the Salve Regina, then a prayer composed of four different orations." ]
        , h3 [ class "mt-5" ] [ text "1884" ]
        , p []
            [ span [] [ text "Pope Leo XIII modified the prayers from Pope Pius IX in the Decree " ]
            , span [ class "italic" ] [ text "Iam inde" ]
            , span [] [ text " through the Sacred Congregation of Rites. He replaced the four concluding orations with one." ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ span [ class "italic" ] [ text "O God, our refuge and our strength, attend to and guarantee the prayers of your holy Church, so that we may efficaciously follow [You] by the intercession of the glorious and Immaculate Virgin Mary Mother of God, St. Joseph and your blessed Apostles Peter and Paul and all the Saints, whom in the present necessity we humbly implore. Through Christ our Lord. Amen" ]
                ]
            ]
        , h3 [ class "font-bold mt-5" ] [ text "1886" ]
        , p [ class "font-bold" ] [ text "Pope Leo XIII revised the oration again and also added the prayer to St Michael the Archangel." ]
        , div
            [ class "md:columns-2"
            ]
            [ blockquote
                [ Html.Attributes.cite ""
                , class "my-10"
                , class "rounded px-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
                , class "italic"
                ]
                [ div
                    [ class "inline"
                    , class "text-gray-500 dark:text-gray-400"
                    ]
                    [ p [ class "italic" ] [ text "Sancte Michael Archangele, defende nos in proelio, contra nequitiam et insidias diaboli esto praesidium. Imperet illi Deus, supplices deprecamur: tuque, Princeps militiae coelestis, Satanam aliosque spiritus malignos, qui ad perditionem animarum pervagantur in mundo, divina virtue, in infernum detrude. Amen. (Ephemerides Liturgicae 69:57)" ]
                    ]
                ]
            , p
                [ class "italic"
                , class "px-4 my-4"
                ]
                [ text "Saint Michael the Archangel, defend us in battle, be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray: and do thou, O Prince of the heavenly hosts, by the power of God, thrust into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen." ]
            ]
        , h3 [ class "mt-5" ] [ text "1930" ]
        , p [] [ text "Pope Pius IX in his allocution of June 30, 1930, wanted it to be recited with an intention for Russia." ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ p [ class "italic" ] [ text "Therefore we must press upon Christ  the Redeemer of the human race, that he allow tranquility and the freedom to profess the faith to be restored to the afflicted children of Russia. And so that everyone can press [upon him], with, to be sure, little trouble and inconvenience, we desire that those same prayers which our predecessor of happy memory Leo XIII ordered priests to recite with the people after Holy [Mass] is finished should be said for this same intention, namely for Russia." ]
                ]
            ]
        , h3 [ class "mt-5" ] [ text "1964" ]
        , p []
            [ span [] [ text "Inter Oecumenici, promulgated by the Consilium and the Sacred Congregation of Rites, suppressed the prayer to Saint Michael." ]
            ]
        , h3 [ class "mt-5" ] [ text "2018" ]
        , p [] [ text "In his prayer intention for the month of October in 2018, Pope Francis called for the praying of the rosary every day in October, ending with the ancient prayer to our lady, the Sub Tuum Praesidium, and the prayer to St. Michael the Archangel, to repel the attacks of the Devil who wants to divide the Church." ]
        ]


viewStoryHistory : Html msg
viewStoryHistory =
    -- HISTORY OF THE STORY VS HISTORY OF THE PRAYER
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-3 mt-5" ] [ text "The History of the Story of Pope Leo XIII's Vision" ]
        , p []
            [ span []
                [ text "The information here is based on the book "
                ]
            , span [ class "italic" ]
                [ text "Pope Leo XIII and the Prayer to St Michael: An Historical and Theological Examination"
                ]
            , span [] [ text " by Kevin Symonds." ]
            ]
        , h3 [ class "mt-5" ] [ text "1931" ]
        , p []
            [ span [] [ text "Fr. Carl Vogl wrote the vision of Pope Leo XIII in his book " ]
            , span [ class "italic" ] [ text "Wiche Satan. " ]
            , span [] [ text "He also published it in the publication " ]
            , span [ class "italic" ] [ text "Altottinger-Liebfrauenbote" ]
            , span [] [ text ". Vogl said that Pope Leo XIII composed a powerful prayer of exorcism for priests against the fallen angels and evil spirits." ]
            , blockquote
                [ Html.Attributes.cite ""
                , class "my-10"
                , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
                , class "italic"
                ]
                [ p
                    [ class "inline"
                    , class "text-gray-500 dark:text-gray-400"
                    ]
                    [ span [ class "italic block " ] [ text "After celebrating Mass one day he was in conference with the Cardinals. Suddenly he sank to the floor. Several doctors were summoned at once but found no sign of a pulse- the very life seemed to have ebbed away from the fragile and aging body. Suddenly he recovered and said: “What a horrible vision I have been shown!” He saw the ages to come, the seductive powers and ravings of the devils against the Church in every land. But St. Michael appeared in the moment of greatest distress and cast Satan and his cohorts back into the abyss of hell. Such was the occasion that caused Pope Leo XIII to prescribe this prayer for the universal Church." ]
                    ]
                ]
            ]
        , h3 [ class "mt-5" ] [ text "1933" ]
        , p []
            [ span [] [ text "Hugo Schnell wrote an article in " ]
            , span [ class "italic" ] [ text "Konnersreuther Sonntagsblatt 39" ]
            , span [] [ text " Year 7 titled " ]
            , span [ class "italic" ] [ text "Eine Teufelsanstreibung und Kpnnersreuth: Engel und Teufel " ]
            , span [] [ text "(An Exorcism and Konnersreuth: Angels and Demons)." ]
            , blockquote
                [ Html.Attributes.cite ""
                , class "my-10"
                , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
                , class "italic"
                ]
                [ p
                    [ class "inline"
                    , class "text-gray-500 dark:text-gray-400"
                    ]
                    [ span [ class "italic" ] [ text "After Leo XIII had celebrated a morning Mass, he went to a meeting with the Cardinals. Suddenly he collapsed into unconsciousness. The doctors who came to his aid found no cause for the collapse, although his pulse almost ceased. Suddenly he awoke and was fresh as ever. He reported that he had seen a terrible vision. He was granted to see the devil’s seductiveness and ravaging for the coming ages in all lands. In this distress, St Michael the Archangel appeared and cast Satan with all his demons back into the infernal abyss. Leo XIII thereupon ordered, shortly after 1880, the Common Prayer to St. Michael." ]
                    ]
                ]
            ]
        , h3 [ class "mt-5" ] [ text "1934" ]
        , p []
            [ span [] [ text "Monsignor Wilhelm Bers in 1934 published the stories of the vision in the theological journal " ]
            , span [ class "italic" ] [ text "Theologische-Praktische, Quartalschrift" ]
            , span [] [ text ". He quotes from Vogl's " ]
            , span [ class "italic" ] [ text "Wiche Satan" ]
            , span [] [ text " and Schnell's publication." ]
            ]
        , h3 [ class "mt-5" ] [ text "1946" ]
        , p []
            [ span [] [ text "Cardinal Giovanni Battista Nasalli Rocca di Corneliano, the Archbishop of Bologna 1922-1952, recounted the story in his Pastoral Letter for Lent, issued in Bologna in 1946." ]
            , blockquote
                [ Html.Attributes.cite ""
                , class "my-10"
                , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
                , class "italic"
                ]
                [ p
                    [ class "inline"
                    , class "text-gray-500 dark:text-gray-400"
                    ]
                    [ span [ class "italic block" ] [ text "It wasn't for naught that the most wise Pontiff, Pope Leo XIII, whose superior intelligence and certainly not narrow-minded or small spirit, himself wrote that beautiful and powerful prayer, and then ordered its recitation by all priests after the celebration of the Holy Mass..." ]
                    , span [ class "italic block" ] [ text "And that part of the prayer - 'who prowl about the world' - has an historical explanation, which has been shared numerous times by the Holy Father's most faithful Secretary, who was very close to him throughout his pontificate, Msgr. Rinaldo Angelini. " ]
                    , span [ class "italic block" ] [ text "Pope Leo XIII truly had a vision of demonic spirits, who were gathering on the Eternal City (Rome). From that experience - which he shared with the Prelate and certainly with others in confidentiality - comes the prayer which he wanted the whole Church to recite." ]
                    , span [ class "italic block" ] [ text "This was the prayer which he recited (we heard this many times in the Vatican Basilica) with a strong, powerful voice, which resonated in an unforgettable way in the universal silence beneath the vaults of the most important temple of Christianity." ]
                    ]
                ]
            ]
        , h3 [ class "mt-5" ] [ text "1947" ]
        , p []
            [ span [] [ text "Father Domenico Pechenino submitted an article titled " ]
            , span [ class "italic" ] [ text "La Tragedia dei Tempi Nostri e l'Opera di Satana" ]
            , span [] [ text " (The Tragedy of Our Times and the Work of Satan) for the Italian newspaper " ]
            , span [ class "italic" ] [ text "La Settimana del Clero." ]
            , blockquote
                [ Html.Attributes.cite ""
                , class "my-10"
                , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
                , class "italic"
                ]
                [ p
                    [ class "inline"
                    , class "text-gray-500 dark:text-gray-400"
                    ]
                    [ span [ class "italic block pl-5 pr-20 pt-1" ] [ text "Permit me here to mention more than a little known fact which throws a vivid beam of light on the order of ideas that I mentioned. I have drawn the fact to a trusted source (and I am willing to reveal it, if required): and let each one weigh the consequence!" ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "I don't remember the precise year. It was a little after 1890. One morning, the great Pontiff, Leo XIII - who had already gained the admiration of the entire civil world and the wrath of the international freemasons - had celebrated Holy Mass, and was assisting at another Mass (for his thanksgiving) as usual." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "At a certain point, he seemed to straighten vigorously his head, fixing his gaze intensely on something that was above the head of the celebrant. He looked at it intently, without batting an eyelid, but with a sense of dread and wonder, becoming pale and fearful. Something strange, something significant was happening to him... " ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "Finally, as if keeping it to himself, giving a light but energetic touch of his hand, he got up. He started heading towards his private study. His closest friends and assistants [i familiari] hastily and anxiously followed him." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "'Holy Father!' they solemnly cried out. 'Do you not feel well? Do you need anything?' He responded: 'No, nothing!' And he closed himself in his study. After a half hour, he called to the Secretary of the Sacred Congregation of Rites, and gave him a piece of paper, ordering him to make copies and to send it to all the Ordinaries of the world." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "What did it contain? The prayer which we recite at the end of the Mass (cum popolo), imploring Mary and the fiery invocation to the Prince of heavenly powers, St Michael 'Sancte Michael Archangele, defendo nos in proelio'..." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "imporing God to drive him to hell, 'et in infernum detrude!'" ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "Then what happened? This is what happened." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "God had shown Satan to the Vicar of His divine Son on earth, just like He did with Job. Satan was bragging that he had already devastated the Church on a large scale. In fact, these were tumultuous times for Italy, for many nations in Europe, and a bit around the world. The freemasons ruled, and governments hadn't become docile instruments. With the audacity of a boaster, Satan put a challenge to God." ]
                    , span [ class "italic block pl-5 pr-20 pt-1" ] [ text "- 'And if you give me a little more freedom, you could see what I would do for your church!' - 'What would you do?' - 'I would destroy it' - 'Oh, that would be something to see. How long would it take?' - 'Fifty or sixty years.' 'Have more freedom, and the time that you need. Then we'll see what happens." ]
                    ]
                ]
            ]
        ]


scripture : Html msg
scripture =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Scripture" ]
        , p [ class "" ]
            [ text "We find a reference to guardian angels in Jesus' parable of the Lost Sheep. He talks about the guardian angels of the little ones and how their angels always look upon the face of God the Father in heaven." ]
        , p [ class "my-3 font-semibold" ]
            [ text """See that you do not despise one of these little ones, for I say to you that their angels in heaven always look upon the face of my heavenly Father.  - Matthew 18:10 """ ]
        , p [ class "" ]
            [ text
                ("We also find a reference to guardian angels in Acts of the Apostles when Peter knocked on the gateway door at the house of Mary, the mother of Mark. Rhonda was excited to hear his voice so she ran to the others to announce his arrival."
                    ++ " But they didn't believe her and thought it was Peter's angel."
                )
            ]
        , p [ class "my-3 font-semibold" ]
            [ span [ class "italic" ] [ text """ Angelus eius est! """ ]
            , span [] [ text """- "It's his angel!" - Acts 12:15 """ ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text
                    " See on what intimate terms the early Christians were with their guardian angels. And what about you? "
                ]
            , p
                [ class "mt-2" ]
                [ text "St Josemaría Escrivá, The Way, 570"
                ]
            ]
        ]


tradition : Html msg
tradition =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Tradition" ]
        , p [ class "" ]
            [ text "We can find some of our early church fathers talking about guardian angels." ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "For regiments of angels are distributed over nations and cities; and perhaps some even are assigned to particular individuals."
                ]
            , p
                [ class "mt-2" ]
                [ text "Clement of Alexandria, Miscellanies 6.17"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "High dignity of souls, that each from its birth has an Angel set in charge over it!"
                ]
            , p
                [ class "mt-2" ]
                [ text "St. Jerome"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "Beside each believer stands an angel as protector and shepherd leading him to life."
                ]
            , p
                [ class "mt-2" ]
                [ text "St. Basil, Adv. Eunomium III, 1: PG 29, 656B"
                ]
            ]
        ]


magisterialTeachings : Html msg
magisterialTeachings =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [ class "mb-10" ] [ text "Popes and The Magisterium" ]
        , p [ class "" ]
            [ text "We can also find popes and magisterial teachings on the care of angels over us." ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "From its beginning until death, human life is surrounded by their watchful care and intercession."
                ]
            , p
                [ class "mt-2" ]
                [ text "CCC 336"
                ]
            ]
        , blockquote
            [ Html.Attributes.cite ""
            , class "my-10"
            , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
            , class "italic"
            ]
            [ p
                [ class "inline"
                , class "text-gray-500 dark:text-gray-400"
                ]
                [ text "Dear friends, the Lord is ever close and active in humanity’s history and accompanies us with the unique presence of his Angels, whom today the Church venerates as “Guardian Angels”, that is, ministers of the divine care for every human being. From the beginning until the hour of death, human life is surrounded by their constant protection."
                ]
            , p
                [ class "mt-2" ]
                [ text "Pope Benedict XVI, Angelus, Oct. 2, 2011]"
                ]
            ]
        ]
