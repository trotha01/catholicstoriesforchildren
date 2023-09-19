module Animations.ActOfContrition.Main exposing (..)

import Animations.Helpers exposing (viewVideo)
import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (custom)
import Signup exposing (..)


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
        [ h1 [ class "my-10 leading-10" ] [ text "Act of Contrition Prayer" ]
        , aboutTheAnimation
        , div [ class "mb-10" ]
            [ Signup.view model.signup |> Html.map SignupMsg ]
        , viewVideoPlayers
        , div [ class "py-4" ] [ viewActivities ]
        , viewPrayer
        , scripture
        , tradition
        , magisterialTeachings

        -- , aboutThePrayer
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
                ("Use this animation to help your children learn the Act of Contrition prayer though a story and song."
                    ++ " It also will help your children understand the concept of a contrite heart, humility, forgiveness, confessing to a priest and more!"
                )
            ]
        , p [ class "my-3" ]
            [ text
                ("This animation is also meant to be an aid for your children to build the virtue of humility. "
                    ++ "You can use it during prayer time while kids are still learning both the words and the solemn manner to pray."
                )
            ]
        ]


viewActivities : Html msg
viewActivities =
    div []
        [ h2 [ class "mb-3 mt-5" ] [ text "Confession for Kids Printout" ]
        , div [ class "grid" ]
            [ div []
                [ p [ class "h-14" ]
                    [ text "Access a confession guide for kids. You can print it double-sided and fold into a little booklet to bring to Confession."
                    ]
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
        ]


aboutThePrayer : Html msg
aboutThePrayer =
    div
        [ class "mx-auto col-span-2 w-full"
        , class "text-lg"
        , class "py-5"
        , class "max-w-3xl"
        ]
        [ h2 [] [ text "About the Act of Contrition Prayer" ]
        , p [ class "my-3" ] [ text "" ]
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
            [ text "We also find Christ sending forth his apostles to forgive sins. He commisions his apostles to carry on his work and he gives them the power to forgive sins in his name." ]
        , p [ class "" ]
            [ customBlockquote """[Jesus] said to them again, “Peace be with you. As the Father has sent me, so I send you.” And when he had said this, he breathed on them and said to them, “Receive the holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained.”""" """John 20:21-23"""
            ]
        , p [ class "" ]
            [ text "St Paul reminds us of this commision and power to forgive when writing to the Corinthians" ]
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
            [ text "We can also find the Church councels talking about the Sacrament of Reconciliation." ]
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
