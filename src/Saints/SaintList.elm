module Saints.SaintList exposing (..)

import Array exposing (Array)
import Http
import Json.Decode as D exposing (Decoder)


type alias Model =
    { saints : List Saint
    , isLoading : Bool
    , error : Maybe String
    }


type Msg
    = FetchData (Result Http.Error Response)


init : Model
init =
    { saints = []
    , isLoading = True
    , error = Nothing
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FetchData (Err _) ->
            ( { model | isLoading = False, error = Just "Error, please try again later" }, Cmd.none )

        FetchData (Ok response) ->
            ( { model | isLoading = False, saints = response |> convertToSaintList }, Cmd.none )


fetchSaints : Cmd Msg
fetchSaints =
    Http.get
        { url = "https://us-central1-catholic-stories-for-children.cloudfunctions.net/get-feast-day-activities"
        , expect = Http.expectJson FetchData responseDecoder
        }


type alias Response =
    { values : Array (Array String) }


responseDecoder : Decoder Response
responseDecoder =
    D.map Response (D.field "values" (D.array (D.array D.string)))


type alias Saint =
    { score : String
    , name : String
    , alternativeNames : String
    , feastDay : String
    , patronOf : String
    , catholicSaintsLink : String
    , catholicCuisine : String
    , catholicOrgLink : String
    , catholicOrgVideoLink : String
    , loyolaPressSaintStoriesForAllAges : String
    , franciscanMediaLink : String
    , christianiconographyInfo : String
    , uCatholicLink : String
    , catholicSaintsInfoYoutubePlaylist : String
    , catholicEncyclopediaLink : String
    , myCatholicLifeLink : String
    , catholicReadingsOrgLink : String
    , ewtnLink : String
    , teachingCatholicKidsLink : String
    , saintsAliveLink : String
    , coloringPageLink : String
    , catholicSprouts : String
    }


convertToSaintList : Response -> List Saint
convertToSaintList responseData =
    Array.foldl (\data -> \list -> list ++ [ convertToSaint data ]) [] responseData.values


convertToSaint : Array String -> Saint
convertToSaint saintData =
    { score = Array.get 0 saintData |> Maybe.withDefault ""
    , name = Array.get 1 saintData |> Maybe.withDefault ""
    , alternativeNames = Array.get 2 saintData |> Maybe.withDefault ""
    , feastDay = Array.get 3 saintData |> Maybe.withDefault ""
    , patronOf = Array.get 4 saintData |> Maybe.withDefault ""
    , catholicSaintsLink = Array.get 5 saintData |> Maybe.withDefault ""
    , catholicCuisine = Array.get 6 saintData |> Maybe.withDefault ""
    , catholicOrgLink = Array.get 7 saintData |> Maybe.withDefault ""
    , catholicOrgVideoLink = Array.get 8 saintData |> Maybe.withDefault ""
    , loyolaPressSaintStoriesForAllAges = Array.get 9 saintData |> Maybe.withDefault ""
    , franciscanMediaLink = Array.get 10 saintData |> Maybe.withDefault ""
    , christianiconographyInfo = Array.get 11 saintData |> Maybe.withDefault ""
    , uCatholicLink = Array.get 12 saintData |> Maybe.withDefault ""
    , catholicSaintsInfoYoutubePlaylist = Array.get 13 saintData |> Maybe.withDefault ""
    , catholicEncyclopediaLink = Array.get 14 saintData |> Maybe.withDefault ""
    , myCatholicLifeLink = Array.get 15 saintData |> Maybe.withDefault ""
    , catholicReadingsOrgLink = Array.get 16 saintData |> Maybe.withDefault ""
    , ewtnLink = Array.get 17 saintData |> Maybe.withDefault ""
    , teachingCatholicKidsLink = Array.get 18 saintData |> Maybe.withDefault ""
    , saintsAliveLink = Array.get 19 saintData |> Maybe.withDefault ""
    , coloringPageLink = Array.get 20 saintData |> Maybe.withDefault ""
    , catholicSprouts = Array.get 21 saintData |> Maybe.withDefault ""
    }
