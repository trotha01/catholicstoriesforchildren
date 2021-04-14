var fs = require('fs')
var Elm = require('./elm.js')

var htmlPrefix = `<!doctype html>
<html lang="en">
  <head>
    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
    <meta name="description" content="Joyful animations helping bring the Catholic faith to life.">
    <meta name="theme-color" content="hsl(267deg 50% 78%)">
    <meta name="theme-color" content="hsl(267deg 50% 78%)">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preload" href="assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf" as="font" type="font/otf" crossorigin>

    <title>Catholic Stories for Children</title>
    <style>
      @font-face {
        font-family: hvdComicSerifPro;
        src: url(/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf);
        font-display: swap;
      }
    </style>
  </head>
  <body dir="ltr" lang="en" style="margin:0;font-size:1.5em;font-family:Helvetica;line-height:1.5em;color:#333" >`

var htmlSuffix = `</body>
</html>`

var fakeNode = function (path) {
  return {
    replaceData: function (d, e, f) {
      fs.writeFile(
        path + '/index.html',
        htmlPrefix + f + htmlSuffix,
        function (err) {
          if (err) {
            console.log(err)
          }
        }
      )
    },
  }
}

var app = Elm.Elm.Main.init({ node: fakeNode('./') })
