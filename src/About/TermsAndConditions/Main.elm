module About.TermsAndConditions.Main exposing (..)

import Browser
import Footer exposing (viewFooter)
import Header exposing (viewSubpageHeader)
import Helpers exposing (..)
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
        [ viewSubpageHeader "Contact" headerMargin
        , viewBody
        , viewFooter
        ]


viewBody : Html Never
viewBody =
    div []
        [ h1 [ class "m-10" ] [ text "Terms and Conditions of Use" ]
        , div [ class "" ]
            [ p [ class "m-10" ] [ text """ These terms and conditions govern your use of the Catholic Stories for Children website, accessible from https://catholicstoriesforchildren.com/.  """ ]
            , h2 [ class "m-10" ] [ text "1. Acceptance of Terms" ]
            , p [ class "m-10" ] [ text """By accessing this website, you agree to be bound by these terms and conditions, all applicable laws, and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.""" ]
            , h2 [ class "m-10" ] [ text """2. Use License""" ]
            , p [ class "mt-10 mx-10" ] [ text """Permission is granted to temporarily download one copy of the materials (information or software) on Catholic Stories for Children's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:""" ]
            , ul [ class "list-disc" ]
                [ li [ class "mx-20" ] [ text """modify or copy the materials;""" ]
                , li [ class "mx-20" ] [ text """use the materials for any commercial purpose or for any public display (commercial or non-commercial);""" ]
                , li [ class "mx-20" ] [ text """attempt to decompile or reverse engineer any software contained on Catholic Stories for Children's website;""" ]
                , li [ class "mx-20" ] [ text """remove any copyright or other proprietary notations from the materials; or""" ]
                , li [ class "mx-20" ] [ text """transfer the materials to another person or "mirror" the materials on any other server.""" ]
                ]
            , p [ class "m-10" ] [ text """This license shall automatically terminate if you violate any of these restrictions and may be terminated by Catholic Stories for Children at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.""" ]
            , h2 [ class "m-10" ] [ text """3. Disclaimer""" ]
            , p [ class "m-10" ] [ text """The materials on Catholic Stories for Children's website are provided on an 'as is' basis. Catholic Stories for Children makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.""" ]
            , p [ class "m-10" ] [ text """Further, Catholic Stories for Children does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.""" ]
            , h2 [ class "m-10" ] [ text """4. Limitation of Liability""" ]
            , p [ class "m-10" ] [ text """In no event shall Catholic Stories for Children or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Catholic Stories for Children's website, even if Catholic Stories for Children or a Catholic Stories for Children authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.""" ]
            , h2 [ class "m-10" ] [ text """5. Revisions and Errata""" ]
            , p [ class "m-10" ] [ text """The materials appearing on Catholic Stories for Children's website could include technical, typographical, or photographic errors. Catholic Stories for Children does not warrant that any of the materials on its website are accurate, complete, or current. Catholic Stories for Children may make changes to the materials contained on its website at any time without notice. However, Catholic Stories for Children does not make any commitment to update the materials.""" ]
            , h2 [ class "m-10" ] [ text """6. Links to Third-Party Sites""" ]
            , p [ class "m-10" ] [ text """Catholic Stories for Children has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Catholic Stories for Children of the site. Use of any such linked website is at the user's own risk.""" ]
            , h2 [ class "m-10" ] [ text """7. Site Terms of Use Modifications""" ]
            , p [ class "m-10" ] [ text """Catholic Stories for Children may revise these terms of use for its website at any time without notice. By using this website you are agreeing to be bound by the then-current version of these Terms and Conditions of Use.""" ]
            , h2 [ class "m-10" ] [ text """8. Governing Law and Jurisdiction""" ]
            , p [ class "m-10" ] [ text """These terms and conditions are governed by and construed in accordance with the laws of the state of California and the applicable laws of the United States of America. You agree that any legal action or proceeding between Catholic Stories for Children and you for any purpose concerning these terms and conditions or the obligations hereunder shall be brought exclusively in a court of competent jurisdiction sitting in the State of California, and you expressly waive any objection that you may have now or hereafter to the laying of the venue or to the jurisdiction of any such court over you.""" ]
            , h2 [ class "m-10" ] [ text """9. Privacy Policy""" ]
            , p [ class "m-10" ]
                [ span [] [ text """Your use of Catholic Stories for Children's website is also governed by our Privacy Policy. Please review our """ ]
                , a [ href "/about/privacy-policy", class "text-blue-600 underline", target "_blank" ] [ text "Privacy Policy" ]
                , span [] [ text """ for information on how we collect, use, and protect your personal information.""" ]
                ]
            , h2 [ class "m-10" ] [ text """10. Contact Information""" ]
            , p [ class "m-10" ]
                [ text """If you have any questions about these terms and conditions, please visit our """
                , a [ href "/team/#contact", class "text-blue-600 underline", target "_blank" ] [ text """contact page""" ]
                ]
            ]
        ]
