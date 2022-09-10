var fs = require('fs')
var Elm = require('./elm.js')
var TeamElm = require('./teamElm.js')
var GiveElm = require('./giveElm.js')

var htmlPrefix = `<!doctype html>
<html lang="en">
  <head>
    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="hsl(267deg 50% 78%)">
    <meta name="theme-color" content="hsl(267deg 50% 78%)">
    <meta name="description" content="`

var htmlPrefix2 = `">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preload" href="assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="assets/Nunito_Sans/NunitoSans-Regular.ttf" as="font" type="font/ttf" crossorigin>

    <title>`

var htmlPrefix3 = `</title>
    <style>
      * {
        box-sizing: border-box;
      }
      @font-face {
        font-family: hvdComicSerifPro;
        src: url(/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf);
        font-display: swap;
      }
      @media (max-width: 720px) {
        .mobileHide {
          visibility: hidden;
        }
      }
      @media (max-width: 720px) {
        .FortyToEightypadding {
          padding: 80px 40px;
        }
      }
      @media (min-width: 721px) {
        .FortyToEightypadding {
          padding: 160px 80px;
        }
      }
    </style>
  </head>
  <body dir="ltr" lang="en" style="margin:0;font-size:1.6em;font-family:Nunito Sans;font-weight:lighter;line-height:1.2em;color:#333" >
`

var htmlSuffix = `</body>
</html>`

var fakeNode = function (description, title, path) {
  return {
    replaceData: function (d, e, f) {
      fs.writeFile(
        path,
        htmlPrefix + description + htmlPrefix2 + title + htmlPrefix3 + f + htmlSuffix,
        function (err) {
          if (err) {
            console.log(err)
          }
        }
      )
    },
  }
}


var app = Elm.Elm.Main.init({ node: fakeNode('Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.', 'Catholic Stories for Children', './ index.html') })
var teamApp = TeamElm.Elm.Team.Main.init({ node: fakeNode('A number of talented artists, contractors, teams and people help bring these animations to life.', 'The Team - Catholic Stories for Children', './team/index.html') })
var giveApp = GiveElm.Elm.Give.Main.init({ node: fakeNode('Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏', 'Give - Catholic Stories for Children', './give/index.html') })
