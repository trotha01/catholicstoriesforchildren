module Logo exposing (..)

import Html
import Html.Attributes
import Html.String exposing (..)
import Html.String.Attributes exposing (..)



-- import Svg.String exposing (..)
-- import Svg.String.Attributes exposing (attribute, style, transform, viewBox)


logo : Html msg
logo =
    img
        [ src "/assets/logo_solid.svg"
        , style "height" "30px"
        , alt ""
        , style "vertical-align" "middle"
        ]
        []


logoHtml =
    Html.img
        [ Html.Attributes.src "/assets/logo_solid.svg"
        , Html.Attributes.style "height" "36px"
        , Html.Attributes.style "padding-top" "3px"
        , Html.Attributes.alt ""
        , Html.Attributes.style "vertical-align" "middle"
        ]
        []



{--
logo : Html msg
logo =
    node "svg"
        [ attribute "viewBox" "0 0 464.11 485.49"

        -- "viewBox" is converted to "view-box" in elm, so we can't use this
        , attribute "preserveAspectRatio" "xMidYMid meet"
        ]
        [ node "defs" [] [ node "style" [] [ text ".a{fill:#395d73;}.b{fill:#ebd7f2;}.c{fill:#f7f1ef;}" ] ]
        , node "path" [ attribute "class" "a", attribute "d" "M599.2,177.7a216.12,216.12,0,0,0-74.09-80.28,202,202,0,0,0-35.06-18.11C450.13,63.77,406.17,60.5,363.86,65A242.87,242.87,0,0,0,252.7,106.13a185.07,185.07,0,0,0-44.4,42.23,204.19,204.19,0,0,0-27.75,51.13,227.5,227.5,0,0,0-9.39,32.88c-2.11,15.15-4.3,30.08-5.66,45.11a294.69,294.69,0,0,0-1.31,35c.69,26.07,4,52.81,11,77.68,1.83,6.48,3.72,12.9,6,18.95,0,.1.06.22.1.33a233.33,233.33,0,0,0,21.85,43.72c22.43,34.84,55.68,60.66,93.78,76.61,33,13.82,69.23,18.86,104.86,18.86,41.68,0,82.71-9.32,118.47-31.16a212.28,212.28,0,0,0,65.29-63c23.89-35.67,37.18-77.85,40.67-120.49.55-6.73,1.48-13.25,1.75-20,.19-4.74.28-9.49.24-14.23C627.91,257.77,619,214.92,599.2,177.7Zm-3.11,126c0,1.51,0,3-.05,4.52a48.77,48.77,0,0,1-28.86,43.45,48.77,48.77,0,0,1,2.1,52.18c-.75,1.3-1.52,2.6-2.3,3.88a48.76,48.76,0,0,1-41.71,23.42,49.45,49.45,0,0,1-5-.26,48.77,48.77,0,0,1-24.19,46.2c-1.29.75-2.6,1.49-3.9,2.21A48.77,48.77,0,0,1,440,476.05,48.69,48.69,0,0,1,395.94,504h-.09c-1.46,0-2.92,0-4.37-.05A48.77,48.77,0,0,1,348,475.09a48.77,48.77,0,0,1-52.17,2.14q-2-1.14-3.9-2.31a48.79,48.79,0,0,1-23.18-46.71c-1.33.11-2.66.16-4,.16a48.73,48.73,0,0,1-42.23-24.3q-1.12-1.95-2.22-3.92A48.79,48.79,0,0,1,223.53,348a48.77,48.77,0,0,1-27.93-44.1v-.19c0-1.42,0-2.84.05-4.26A48.78,48.78,0,0,1,224.46,256a48.75,48.75,0,0,1-2.17-52.17q1.13-2,2.29-3.88a48.71,48.71,0,0,1,46.7-23.23,48.78,48.78,0,0,1,24.14-46.24q1.95-1.12,3.91-2.21a48.77,48.77,0,0,1,52.12,3.19,48.79,48.79,0,0,1,44.12-27.95h.28c1.39,0,2.77,0,4.15,0a48.78,48.78,0,0,1,43.5,28.78,48.79,48.79,0,0,1,52.17-2.2c1.32.76,2.64,1.54,3.94,2.33a48.79,48.79,0,0,1,23.2,46.65c1.34-.11,2.68-.17,4-.17a48.77,48.77,0,0,1,42.22,24.26c.75,1.29,1.49,2.6,2.21,3.91a48.76,48.76,0,0,1-3.15,52.15,48.75,48.75,0,0,1,28,43.94Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M388.84,261.86c-7.88,2.1-12.13,11.85-9.48,21.79s11.18,16.28,19.06,14.18,12.12-11.85,9.47-21.78S396.71,259.76,388.84,261.86Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M398.12,356.77c-3.79.42-8.24,3.21-13.29,3.18-4.4.34-8.18-1.22-11.5-1.89-.4-2.63-1-5.46-1.75-8.49,4.56-1.71,8.56-4.13,10.76-7.26,1.07-1.85.27-3.27-1.28-4.08a10.14,10.14,0,0,0-5-.9c-2.6.11-5.13.44-7.66.56s-5.28.14-7.93,0-5.22-.46-7.9-.57a10.31,10.31,0,0,0-5,.9c-1.55.82-2.35,2.21-1.29,4.08,2.75,3.89,7.8,7,14.08,8.45a36.36,36.36,0,0,0,3.74,9c-3,.64-6.47,2.46-10.38,2.43-4.34.34-8.1-1.66-11.2-1.94-3-.44-5.33.84-4.44,3.93a18,18,0,0,0,15.58,11.13c6.16.5,11.76-3.59,14.93-9.87a20.71,20.71,0,0,0,1.66,1.6h0c3.69,4.53,8.59,8,14.45,8.27,7.87.63,15.38-4.66,18.77-13.26C404.74,357.86,401.76,356.13,398.12,356.77Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M444.57,203.08c-1.2.08-2.41.13-3.64.13a55.19,55.19,0,0,1-19.19-3.42,75.18,75.18,0,0,1-73.06,9A32.72,32.72,0,0,1,292,222.53a55.08,55.08,0,0,1-28.89,8.13c-.48,0-.95,0-1.43,0-.12.36-.25.71-.37,1.06-12.74,38-14.69,77.88-8,108.77,7,31.24,25.73,53.75,52.22,70.15,19.84,11.94,44.12,20.4,68.7,20.4A99.79,99.79,0,0,0,398,428.18c32.43-7.13,58.67-30.85,75.25-56.63,16.52-26.41,23.38-54.87,15.87-86C482.47,258.93,467,229.12,444.57,203.08ZM449.08,356c-15,23.33-35.87,39.41-57.93,44.26a71.08,71.08,0,0,1-16.95,2c-17.3,0-36.43-5.78-53.57-16.1-21.9-13.55-34.38-30.07-39.25-51.76-4.9-22.74-3.91-50.61,2.64-77.62,1.39-.35,2.76-.74,4.13-1.17a61.6,61.6,0,0,0,74.62-13.43,104.15,104.15,0,0,0,63.76-11.44c1.3.22,2.61.42,3.93.58,14.76,19.41,25.77,41.18,30.72,61C466.45,314.13,462.55,334.47,449.08,356Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M312.56,271.25c-8.15,0-14.76,8.33-14.76,18.61s6.61,18.62,14.76,18.62,14.77-8.33,14.77-18.62S320.72,271.25,312.56,271.25Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M165.5,277.48a294.69,294.69,0,0,0-1.31,35c.69,26.07,4,52.81,11,77.68,1.83,6.48,3.72,12.9,6,18.95,0,.1.06.22.1.33a233.33,233.33,0,0,0,21.85,43.72c22.43,34.84,55.68,60.66,93.78,76.61,33,13.82,69.23,18.86,104.86,18.86,41.68,0,82.71-9.32,118.47-31.16a212.37,212.37,0,0,0,65.29-63c23.89-35.68,37.18-77.86,40.67-120.5.55-6.73,1.48-13.25,1.75-20,.19-4.74.28-9.49.24-14.23-.29-42-9.2-84.82-29-122a216.12,216.12,0,0,0-74.09-80.28,202,202,0,0,0-35.06-18.11C450.13,63.77,406.17,60.5,363.86,65A242.83,242.83,0,0,0,252.7,106.13a185.07,185.07,0,0,0-44.4,42.23,204.19,204.19,0,0,0-27.75,51.13,227.5,227.5,0,0,0-9.39,32.88C169.05,247.52,166.86,262.45,165.5,277.48Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "b", attribute "d" "M391.15,400.26c22.06-4.85,42.92-20.93,57.93-44.26,13.47-21.53,17.37-41.87,12.1-63.71-4.95-19.8-16-41.57-30.72-61-1.32-.16-2.63-.36-3.93-.58a104.15,104.15,0,0,1-63.76,11.44,61.6,61.6,0,0,1-74.62,13.43c-1.37.43-2.74.82-4.13,1.17-6.55,27-7.54,54.88-2.64,77.62,4.87,21.69,17.35,38.21,39.25,51.76,17.14,10.32,36.27,16.1,53.57,16.1A71.08,71.08,0,0,0,391.15,400.26Zm16.74-124.21c2.65,9.93-1.59,19.69-9.47,21.78s-16.41-4.25-19.06-14.18,1.6-19.69,9.48-21.79S405.25,266.11,407.89,276.05Zm-95.33,32.43c-8.15,0-14.76-8.33-14.76-18.62s6.61-18.61,14.76-18.61,14.77,8.33,14.77,18.61S320.72,308.48,312.56,308.48ZM370.26,367a20.71,20.71,0,0,1-1.66-1.6c-3.17,6.28-8.77,10.37-14.93,9.87a18,18,0,0,1-15.58-11.13c-.89-3.09,1.44-4.37,4.44-3.93,3.1.28,6.86,2.28,11.2,1.94,3.91,0,7.34-1.79,10.38-2.43a36.36,36.36,0,0,1-3.74-9c-6.28-1.42-11.33-4.56-14.08-8.45-1.06-1.87-.26-3.26,1.29-4.08a10.31,10.31,0,0,1,5-.9c2.68.11,5.31.45,7.9.57s5.29.12,7.94,0,5-.45,7.65-.56a10.14,10.14,0,0,1,5,.9c1.55.81,2.35,2.23,1.28,4.08-2.2,3.13-6.2,5.55-10.76,7.26.71,3,1.35,5.86,1.75,8.49,3.32.67,7.1,2.23,11.5,1.89,5.05,0,9.5-2.75,13.29-3.18,3.64-.64,6.62,1.09,5.4,5.26-3.39,8.6-10.9,13.89-18.77,13.26-5.86-.23-10.76-3.74-14.44-8.27Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "c", attribute "d" "M568.11,259.23a48.76,48.76,0,0,0,3.15-52.15c-.72-1.31-1.46-2.62-2.21-3.91a48.77,48.77,0,0,0-42.22-24.26c-1.34,0-2.68.06-4,.17a48.79,48.79,0,0,0-23.2-46.65c-1.3-.79-2.62-1.57-3.94-2.33a48.76,48.76,0,0,0-52.17,2.21A48.79,48.79,0,0,0,400,103.52c-1.38,0-2.76,0-4.15,0h-.28a48.79,48.79,0,0,0-44.12,28,48.77,48.77,0,0,0-52.12-3.19q-2,1.08-3.91,2.21a48.78,48.78,0,0,0-24.14,46.24,48.71,48.71,0,0,0-46.7,23.23q-1.17,1.92-2.29,3.88A48.75,48.75,0,0,0,224.46,256a48.78,48.78,0,0,0-28.81,43.49c0,1.42-.05,2.84-.05,4.26v.19A48.77,48.77,0,0,0,223.53,348a48.79,48.79,0,0,0-3.22,52.14q1.09,2,2.22,3.92a48.73,48.73,0,0,0,42.23,24.3c1.32,0,2.65-.05,4-.16a48.79,48.79,0,0,0,23.18,46.71q1.93,1.17,3.9,2.31A48.77,48.77,0,0,0,348,475.09a48.77,48.77,0,0,0,43.49,28.83c1.45,0,2.91.05,4.37.05h.09A48.69,48.69,0,0,0,440,476.05a48.77,48.77,0,0,0,52.17,3.27q2-1.08,3.9-2.21a48.77,48.77,0,0,0,24.19-46.2,49.45,49.45,0,0,0,5,.26A48.76,48.76,0,0,0,567,407.75c.78-1.28,1.55-2.58,2.3-3.88a48.77,48.77,0,0,0-2.1-52.18A48.77,48.77,0,0,0,596,308.24c0-1.5.05-3,.05-4.52v-.55A48.75,48.75,0,0,0,568.11,259.23ZM473.26,371.55c-16.58,25.78-42.82,49.5-75.25,56.63A99.79,99.79,0,0,1,374.2,431c-24.58,0-48.86-8.46-68.7-20.41-26.49-16.39-45.21-38.9-52.22-70.14-6.66-30.89-4.71-70.74,8-108.76.12-.36.25-.71.37-1.07.48,0,.95,0,1.43,0A55.08,55.08,0,0,0,292,222.53a32.72,32.72,0,0,0,56.68-13.72,75.18,75.18,0,0,0,73.06-9,55.19,55.19,0,0,0,19.19,3.42c1.23,0,2.44-.05,3.64-.13,22.44,26,37.9,55.85,44.56,82.47C496.64,316.68,489.78,345.14,473.26,371.55Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M312.56,271.25c-8.15,0-14.76,8.33-14.76,18.61s6.61,18.62,14.76,18.62,14.77-8.33,14.77-18.62S320.72,271.25,312.56,271.25Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M444.57,203.08c-1.2.08-2.41.13-3.64.13a55.19,55.19,0,0,1-19.19-3.42,75.18,75.18,0,0,1-73.06,9A32.72,32.72,0,0,1,292,222.53a55.08,55.08,0,0,1-28.89,8.13c-.48,0-.95,0-1.43,0-.12.36-.25.71-.37,1.07-12.74,38-14.69,77.87-8,108.76,7,31.24,25.73,53.75,52.22,70.14,19.84,12,44.12,20.41,68.7,20.41A99.79,99.79,0,0,0,398,428.18c32.43-7.13,58.67-30.85,75.25-56.63,16.52-26.41,23.38-54.87,15.87-86C482.47,258.93,467,229.12,444.57,203.08ZM449.08,356c-15,23.33-35.87,39.41-57.93,44.26a71.08,71.08,0,0,1-16.95,2c-17.3,0-36.43-5.78-53.57-16.1-21.9-13.55-34.38-30.07-39.25-51.76-4.9-22.74-3.91-50.61,2.64-77.62,1.39-.35,2.76-.74,4.13-1.17a61.6,61.6,0,0,0,74.62-13.43,104.15,104.15,0,0,0,63.76-11.44c1.3.22,2.61.42,3.93.58,14.76,19.41,25.77,41.18,30.72,61C466.45,314.13,462.55,334.47,449.08,356Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M398.12,356.77c-3.79.43-8.24,3.22-13.29,3.18-4.4.34-8.18-1.22-11.5-1.89-.4-2.63-1-5.46-1.75-8.49,4.56-1.71,8.56-4.13,10.76-7.26,1.07-1.85.27-3.27-1.28-4.08a10.14,10.14,0,0,0-5-.9c-2.6.11-5.13.44-7.65.56s-5.29.14-7.94,0-5.22-.46-7.9-.57a10.31,10.31,0,0,0-5,.9c-1.55.82-2.35,2.21-1.29,4.08,2.75,3.89,7.8,7,14.08,8.45a36.36,36.36,0,0,0,3.74,9c-3,.64-6.47,2.46-10.38,2.43-4.34.34-8.1-1.66-11.2-1.94-3-.44-5.33.84-4.44,3.93a18,18,0,0,0,15.58,11.13c6.16.5,11.76-3.59,14.93-9.87a20.71,20.71,0,0,0,1.66,1.6h.05c3.68,4.53,8.58,8,14.44,8.27,7.87.63,15.38-4.66,18.77-13.26C404.74,357.86,401.76,356.13,398.12,356.77Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        , node "path" [ attribute "class" "a", attribute "d" "M388.84,261.86c-7.88,2.1-12.13,11.85-9.48,21.79s11.18,16.28,19.06,14.18,12.12-11.85,9.47-21.78S396.71,259.76,388.84,261.86Z", attribute "transform" "translate(-164.1 -63.14)" ] []
        ]

--}
