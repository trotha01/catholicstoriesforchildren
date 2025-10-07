module Page.About.PrivacyPolicy.Main exposing (..)

import Browser
import Component.Footer exposing (viewFooter)
import Component.Header exposing (viewSubpageHeader)
import Theme.Layout exposing (headerMargin)
import Html exposing (..)
import Html.Attributes exposing (..)



-- MAIN


type alias Model =
    {}


main : Program () Model Never
main =
    Browser.sandbox
        { init = {}
        , view =
            \_ ->
                view
        , update = \_ -> \model -> model
        }


view : Html Never
view =
    div
        []
        [ viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div []
        [ h1 [ class "m-10" ] [ text "Privacy Policy" ]
        , h2 [ class "m-10" ] [ text "Privacy Policy and Digital Millennium Copyright Act Notice" ]
        , div [ class "m-10" ]
            [ p [ class "my-5" ]
                [ text """This privacy policy explains the privacy practices of Claritas Studios ("CS") and how CS treats your information."""
                ]
            , p [ class "my-5" ] [ text """CS collects your personal information, including email addresses.  There is also information about your computer hardware and software that is automatically collected by CS, which can include your IP address, browser type, domain names, access times and referring Web site addresses.  CS will use your personal information to fulfill a contract, in particular, in facilitating and processing transactions, and where it is necessary to fulfill CS's legitimate interests, which include operating CS web site, providing the services and goods described on CS's web sites, verifying your identity, determining how to improve CS's web sites, monitoring activity on CS's web sites, responding to your comments or questions, informing you of areas of interest or services available from CS, and fulfilling contracts made with you.  We collect your information when you give CS consent, for purposes which are required by law and for the purposes of responding to requests by government, a court of law or law enforcement authorities conducting an investigation.  CS retains your personal information for as long as is necessary to provide the services to you and to comply with legal obligations.  If you no longer want CS to use your personal information you can request that CS erase your personal information by contacting us at privacy@catholicstoriesforchildren.org however CS will retain information as is necessary for CS legitimate business interests.  If you have questions about CS's privacy practices, please contact us at privacy@catholicstoriesforchildren.com.""" ]
            , p [ class "my-5" ] [ text """CS encourages you to review the privacy statements of web sites you choose to link to from CS so that you can understand how those Web sites collect, use and share your information. CS is not responsible for the privacy statements or other content on Web sites outside of the CS and CS family of Web sites, or the web sites to which CS has linked, such as YouTube, and the sites hosting videos. """ ]
            , p [ class "my-5" ] [ text """Please notify CS if you believe any of your intellectual property rights have been infringed.  Pursuant to section 512 of the Copyright Act ("DMCA").  CS designates the following individual as its agent for receipt of notifications of claimed infringement:   CS, Trevor Rothaus, trevor@claritasstudios.com, 532 N Magnolia Ave., Anaheim, CA, 92801.  To be effective, the notification should include:  (a) a physical or electronic signature of the person authorized to act on behalf of the owner of the right being infringed, (b) identification of the copyrighted work claimed to have been infringed, or if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at the site; (c) identification of the material that is claimed to be infringing or to be the subject of infringing activity, and information sufficient to permit us to locate the material; (d) information sufficient to allow us to contact the complaining party; (e) a statement that the complaining party has a good faith belief that use of the material in the manner  complained of is not authorized by the copyright or intellectual property owner, agent, or the law; and (f) a statement that the information in the notification is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of the right being infringed.  If you fail to comply with all of these requirements, your DMCA notification may not be valid.""" ]
            ]
        ]
