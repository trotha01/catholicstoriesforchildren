module Animations.ActOfContrition.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Signup exposing (..)
import Team.Team exposing (..)


type alias Model =
    { signup : Signup.Model }


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
        [ viewSubpageHeader "Guardian Angel" headerMargin
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
        [ h1 [ class "my-10 leading-10" ] [ text "Act of Contrition Prayer Song and Animation" ]
        , progressBar
        , div [ class "mb-10" ] [ donationButton "Bring this animation to life" ]
        , viewVideoPlayers
        , aboutTheAnimation
        , fundraising
        , team

        -- , div [ class "mb-10" ]
        --     [ Signup.view model.signup |> Html.map SignupMsg ]
        , div [ class "py-4" ] [ viewActivities ]
        , viewPrayer
        , scripture
        , tradition
        , magisterialTeachings
        , aboutThePrayer
        ]


viewVideoPlayers : Html msg
viewVideoPlayers =
    viewVideo
        "Act of Contrition Promo"
        "https://www.youtube-nocookie.com/embed/KSGStToDQdA"


viewVideoPlayer : String -> Html msg
viewVideoPlayer link =
    div
        [ class "w-1/2"
        ]
        [ viewVideo "Act of Contrition Promo" link
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
                "Children are spending six or more hours per day on screens according to the CDC. Do you know much Catholic content is on the other side of that screen? Not much. Most of the things kids are watching are detrimental to their well being. Social media and streaming services have taken over as their primary educators. Kids are growing up without much of an understanding of the Catholic faith and without knowing how to grow in virtue. Their morals are coming from top influencers. Things like the Act of Contrition or going to confession are the last things on their mind."
            ]
        , p [ class "my-3" ]
            [ text
                "It’s time to start making a change. We want to meet kids where they are at. That is why we are making animations. We are teaching kids basic Catholic prayers like the Act of Contrition prayer because prayer has the power to transform kids towards sainthood. Mother Teresa said, “I used to believe that prayer changes things, but now I know that prayer changes us, and we change things.” We can helping kids to grow to be lights in the world today through these animations and through this Act of Contrition animation."
            ]
        , p [ class "my-3" ]
            [ text
                "These animations are not meant to help kids memorize prayer words. They are made to help kids understand the words they are saying and who they are praying to. One of the best ways to transmit understanding is by telling a story. And that is exactly what we are doing here. We are not making generic lessons or lectures, we want kids to enjoy the content. We are using the power of storytelling to help kids understand the concepts around the Act of Contrition prayer."
            ]
        , p [ class "my-3" ]
            [ text
                "This Act of Contrition animation will not only help kids learn the words to this prayer, it will also help kids understand the concepts of a contrite heart, humility, forgiveness, confessing to a priest, and more. Kids can start building a habit of saying sorry to God for their sins, “I am sorry for my sins with all my heart. In choosing to do wrong, and failing to do good, I have sinned against you, whom I should love above all things.” They can start building the habit of making a resolve to lead a better life, “I firmly intend, with your help, to do penance, to sin no more, and to avoid whatever leads me to sin.” Through this Act of Contrition animation, kids can grow in understanding that Jesus can forgive any sin through His mercy."
            ]
        , p [ class "my-3" ]
            [ text
                "Learning the Act of Contrition prayer and the concepts around it help kids grow in virtue. When the concepts are understood, and kids have built a habit for apologizing to God for things they have done wrong, they will have an easier time with humility, with apologizing to others, and with forgiving others."
            ]
        , p [ class "my-3" ]
            [ text "This is our most ambitious animation so far. It involves more people and will help teach more concepts in an engaging way."
            , text " We are producing an Act of Contrition song to help kids enjoy learning the prayer. We are making a graphic novel to go along with the animation to further help instill the concepts from the Act of Contrition prayer. And the animation which will be made freely available for parents, catechists, schools, and parishes."
            ]
        , p [ class "my-3" ]
            [ text " Your donation means they won't have to pay a thing to let kids see the Act of Contrition animation and help their kids grow in the Catholic faith."
            , text " Your donation will help kids around the world learn humility, reconciliation, penance, how to have a contrite heart, and more.  Any donation amount will help us pay for the screenwriters, illustrators, composers, voice actors, singers, storyboard artists, animators, and all the hands helping bring this animation to life."
            ]
        ]


fundraising : Html msg
fundraising =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        ]
        [ progressBar
        , donationButton "Bring this animation to life"

        -- CTA
        , p [ class "my-3" ]
            [ text "On October 2, we will be launching a Kickstarter to raise the remainder of the funds."
            , text " Why donate now? Donations here will avoid the 5% Kickstarter fee for us and 100% of your proceeds here are tax-deductible in the US. The more we raise now, the more attainable our Kickstarter goal will be. Any amount helps."
            ]
        ]


team : Html msg
team =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "max-w-3xl"
        , class "mt-20"
        ]
        [ viewPeople "Who is Creating This Animation?"
            "We are working with a number of talented musicians, artists, screenwriters, animators, and more to bring these animations to life."
            [ nickAndAlina, seanBeeson, rachaelWorkmanMcLaughlin, ekaterina, makoAnimation ]
        , p []
            [ text "You can find everyone we are working with on "
            , a [ href "/team", class "underline" ] [ text "our About Us page." ]
            ]
        ]


progressBar : Html msg
progressBar =
    div []
        [ div [ class "bg-neutral-200 rounded" ]
            [ div
                [ class "bg-[#9200B3] p-1 text-center text-xs font-medium leading-none text-white rounded"

                -- 9,000 out of 42,000
                , class "w-[21%]"
                ]
                [ text "21%" ]
            ]
        , p [ class "mb-3 text-sm" ]
            [ text "$9,000 of $42,000 has been raised so far! (updated daily)" ]
        ]


viewActivities : Html msg
viewActivities =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text "Confession for Kids Printout" ]
        , div [ class "grid" ]
            [ div []
                [ p [ class "my-3" ]
                    [ text "With each animation, we create printouts to go along with them. We will be creating activities to go along with the Act of Contrition Animation. Right now, we are making our confession guide for kids available to you at no cost. You can print it double-sided and fold it into a little booklet to bring to Confession."
                    ]
                , p [ class "my-3" ]
                    [ text "After the animation is funded, we will create Act of Contrition activities to foster in kids the power of forgiveness and a contrite heart." ]
                , donationButton "I would like these activities"
                , a
                    [ attribute "aria-label" "Confession Guide for Kids"
                    , href "/printables/Little-Reconciliation-Booklet.pdf"
                    , target "_blank"
                    ]
                    [ img
                        [ class "w-full max-w-[400px]"
                        , class "transition ease-in-out hover:scale-110"
                        , alt "Little Reconciliation Booklet"
                        , src "/assets/images/LittleReconciliationBookletFlyer.png"
                        ]
                        []
                    ]
                ]
            ]
        ]


viewPrayer : Html msg
viewPrayer =
    div [ class "my-10 text-lg" ]
        [ h2 [ class "mb-3" ] [ text "The Prayer" ]
        , p []
            [ span [ class "block" ] [ text "My God," ]
            , span [ class "block" ] [ text "I am sorry for my sins with all my heart." ]
            , span [ class "block" ] [ text "In choosing to do wrong" ]
            , span [ class "block" ] [ text "and failing to do good," ]
            , span [ class "block" ] [ text "I have sinned against you" ]
            , span [ class "block" ] [ text "whom I should love above all things." ]
            , span [ class "block" ] [ text "I firmly intend, with your help," ]
            , span [ class "block" ] [ text "to do penance," ]
            , span [ class "block" ] [ text "to sin no more," ]
            , span [ class "block" ] [ text "and to avoid whatever leads me to sin." ]
            , span [ class "block" ] [ text "Our Savior Jesus Christ suffered and died for us." ]
            , span [ class "block" ] [ text "In his name, my God, have mercy." ]
            ]
        , p [ class "mt-5" ]
            [ text "Each animation has a composed song made to match the tone of the prayer while staying reverent to the nature of prayer. Music and repetition are powerful tools that can help aid in children's memory retention while improving the learning experience. This is much more enojoyable than simply memorizing words."
            , text " In addition, having the song embedded into the animation will help bring understanding to the words in the prayer."
            ]
        , donationButton "I would like this song"
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Act of Contrition Animation" ]
        , p [ class "my-3" ] [ text "We research every prayer we make for the animations. We do not water down the faith and ensure that the animation is authentic Catholic teaching." ]
        , p [ class "my-3" ] [ text "We adhere to the teachings of the Magisterium and help kids learn to live the beauty of the Catholic faith." ]
        , donationButton "Bring the animation to life"
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
            [ text "We find a reference to God's forgiveness of sins throughout Scripture." ]
        , p []
            [ customBlockquote "It is I, I, who wipe out, for my own sake, your offenses; your sins I remember no more." "Isaiah 43:25."
            ]
        , p [ class "" ]
            [ text "It is God that heals and forgives us." ]
        , p []
            [ customBlockquote """Bless the LORD, my soul; and do not forget all his gifts, Who pardons all your sins, and heals all your ills.""" """Psalm 103:2–3.""" ]
        , p [ class "" ]
            [ text "We also find Christ sending forth his apostles to forgive sins. He commissions his apostles to carry on his work and he gives them the power to forgive sins in his name." ]
        , p [ class "" ]
            [ customBlockquote """[Jesus] said to them again, “Peace be with you. As the Father has sent me, so I send you.” And when he had said this, he breathed on them and said to them, “Receive the holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained.”""" """John 20:21-23"""
            ]
        , p [ class "" ]
            [ text "St Paul reminds us of this commission and power to forgive when writing to the Corinthians" ]
        , p [ class "" ]
            [ customBlockquote """Whomever you forgive anything, so do I.""" """2 Corinthians 2:10a"""
            ]
        , p [ class "" ]
            [ text "You can find more details at "
            , a [ class "underline", target "_blank", href "https://www.catholic.com/magazine/online-edition/is-confession-in-scripture" ] [ text "Catholic Answers." ]
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
            [ text "We can find writing about confession in church in the Didache." ]
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
                [ text "Confess your sins in church, and do not go up to your prayer with an evil conscience. This is the way of life. . . . On the Lord’s Day gather together, break bread, and give thanks, after confessing your transgressions so that your sacrifice may be pure."
                ]
            , p
                [ class "mt-2" ]
                [ text "Didache 4:14, 14:1 [A.D. 70]"
                ]
            ]
        , p [ class "" ]
            [ text "St. Ignatius of Antioch also writes about penance and how it reconciles one with the Church." ]
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
                [ text "For as many as are of God and of Jesus Christ are also with the bishop. And as many as shall, in the exercise of penance, return into the unity of the Church, these, too, shall belong to God, that they may live according to Jesus Christ."
                ]
            , p
                [ class "mt-2" ]
                [ text "St. Ignatius of Antioch, Letter to the Philadelphians 3 [A.D. 110]"
                ]
            ]
        , p [ class "" ]
            [ text "Saint Hippolytus of Rome talks about the authority of the priesthood to forgive sins given to them by Jesus Christ." ]
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
                [ text "[The bishop conducting the ordination of the new bishop shall pray:] God and Father of our Lord Jesus Christ. . . . Pour forth now that power which comes from you, from your royal Spirit, which you gave to your beloved Son, Jesus Christ, and which he bestowed upon his holy apostles . . . and grant this your servant, whom you have chosen for the episcopate, [the power] to feed your holy flock and to serve without blame as your high priest, ministering night and day to propitiate unceasingly before your face and to offer to you the gifts of your holy Church, and by the Spirit of the high priesthood to have the authority to forgive sins, in accord with your command."
                ]
            , p
                [ class "mt-2" ]
                [ text "Hippolytus, Apostolic Tradition 3 [A.D. 215]"
                ]
            ]
        , p [ class "" ]
            [ text "You can find more quotes from Church Fathers about confession at "
            , a [ class "underline", target "_blank", href "https://www.catholic.com/tract/confession" ] [ text "Catholic Answers." ]
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
            [ text "We can also find the Church councils talking about the Sacrament of Reconciliation." ]
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
                [ text "All the faithful of both sexes shall after they have reached the age of discretion faithfully confess all their sins at least once a year to their own (parish) priest and perform to the best of their ability the penance imposed."
                ]
            , p
                [ class "mt-2" ]
                [ text "Lateran IV, Canon 21 [A.D. 1215]"
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
                [ text "The Lord then especially instituted the sacrament of penance when, after being risen from the dead, He breathed upon His disciples, and said: <Receive ye the Holy Ghost, whose sins you shall forgive, they are forgiven them, and whose sins you shall retain, they are retained. The consensus of all the Fathers has always acknowledged that by this action so sublime and words so clear the power of forgiving and retaining sins was given to the Apostles and their lawful successors for reconciling the faithful who have fallen after baptism."
                ]
            , p
                [ class "mt-2" ]
                [ text "Council of Trent, Session XIV, I, [A.D. 1551]"
                ]
            ]
        ]


customBlockquote : String -> String -> Html msg
customBlockquote quote attribute =
    blockquote
        [ Html.Attributes.cite ""
        , class "my-10"
        , class "rounded p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800"
        , class "italic"
        ]
        [ p
            [ class "inline"
            , class "text-gray-500 dark:text-gray-400"
            ]
            [ text quote
            ]
        , p
            [ class "mt-2" ]
            [ text attribute
            ]
        ]


donationButton : String -> Html msg
donationButton buttonText =
    a
        [ style "padding" "10px 10px"
        , style "display" "inline-block"
        , style "border-radius" "5px"
        , style "border-radius" "5px"
        , style "box-shadow" "#777 1px 1px 5px"
        , style "color" "white"
        , class "text-lg"
        , class "bg-[#9200B3]"
        , href "https://www.paypal.com/donate/?hosted_button_id=TB5BTND8DXU86"
        , target "_blank"
        , attribute "aria-label" "Bring this animation to life"
        ]
        [ text buttonText ]
