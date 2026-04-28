port module Page.Signup exposing (..)

import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Http


type alias Model =
    { email : String
    , message : String
    , isLoading : Bool
    }


init : Model
init =
    { email = ""
    , message = ""
    , isLoading = False
    }


type Msg
    = FormSubmitted (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FormSubmitted (Ok _) ->
            ( { model
                | isLoading = False

                -- , message = response
                , message = "Email sent!"
              }
            , Cmd.batch [ gtagReportConversion "", Nav.load "/thankyou" ]
            )

        FormSubmitted (Err _) ->
            -- TODO: give more specific error
            ( { model
                | isLoading = False
                , message = "Error: please try again later"
              }
            , Cmd.none
            )


view2 : Html msg
view2 =
    div
        [ class "mb-5 bg-white text-black" ]
        [ p
            [ class "pb-2 pt-4 pl-1 m-auto text-center max-w-7xl"
            ]
            [ text "Receive free animations, activities, resources, and more!" ]
        , Html.iframe
            [ src "https://blog.claritasstudios.com/embed"
            , height 150
            , class "w-screen"
            , attribute "frameborder" "0"
            , attribute "scrolling" "no"
            , style "margin" "0"
            , style "border-radius" "5px !important"
            , style "background-color" "transparent"
            ]
            []
        ]


view4 : Html msg
view4 =
    div
        [ class "flex justify-center py-3 text-black"
        ]
        -- [ div [ class "max-w-3xl" ] [ viewShopItem2 liturgicalCalendar2025 ]
        [ div [ class "text-center grid justify-center mb-10" ] [ view2 ]
        ]


viewSubstackSignup : Html msg
viewSubstackSignup =
    div [ class "mx-auto w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950" ]
        [ Html.form
            [ action "https://blog.claritasstudios.com/api/v1/free"
            , method "post"
            , target "_blank"
            , attribute "accept-charset" "utf-8"
            , class "flex flex-col gap-3 sm:flex-row"
            ]
            [ input
                [ id "email"
                , name "email"
                , type_ "email"
                , placeholder "Enter your email"
                , required True
                , class "min-h-12 flex-1 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-base text-zinc-900 outline-none ring-0 placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                ]
                []
            , button
                [ type_ "submit"
                , class "min-h-12 rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-400 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
                ]
                [ text "Subscribe" ]
            ]
        , p [ class "mt-3 text-xs leading-5 text-zinc-500 dark:text-zinc-500" ]
            -- TODO: insert this as Elm: <div translated="true" class="pencraft pc-reset color-pub-secondary-text-hGQ02T align-center-y7ZD4w line-height-16-mdHjij font-text-qe4AeH size-12-mmZ61m weight-regular-mUq6Gb reset-IxiVJZ">By subscribing you agree to <a target="_blank" rel="noopener" href="https://blog.claritasstudios.com/tos?utm_source=embed_publication" class="tos-text">Substack's Terms of Use</a>, <a target="_blank" rel="noopener" href="https://blog.claritasstudios.com/privacy?utm_source=embed_publication" class="tos-text">our Privacy Policy</a> and <a target="_blank" rel="noopener" href="https://substack.com/ccpa?utm_source=embed_publication#personal-data-collected" class="tos-text">our Information collection notice</a></div>
            [ text "By subscribing, you’ll be sent to Substack to confirm your subscription. Unsubscribe anytime." ]
        , a
            [ href "https://blog.claritasstudios.com/subscribe"
            , target "_blank"
            , rel "noopener noreferrer"
            , class "mt-4 inline-flex text-sm font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-700 dark:hover:text-zinc-100"
            ]
            [ text "Signup on Substack" ]
        ]


port gtagReportConversion : String -> Cmd msg
