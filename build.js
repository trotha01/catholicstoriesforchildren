var fs = require('fs')
var NavigationElm = require('./navigationElm.js')
var ContactElm = require('./contactElm.js')
var TeamElm = require('./teamElm.js')
var GiveElm = require('./giveElm.js')
var NewsroomElm = require('./newsroomElm.js')
var AnimationsElm = require('./animationsElm.js')
var GuardianAngelElm = require('./guardianAngelElm.js')
var PrivacyPolicyElm = require('./privacyPolicyElm.js')
var ResourcesElm = require('./resourcesElm.js')
var ResourcesBooksElm = require('./resourcesBooksElm.js')
var ResourcesPodcastsElm = require('./resourcesPodcastsElm.js')
var ResourcesVideosElm = require('./resourcesVideosElm.js')
var ResourcesSubscriptionsElm = require('./resourcesSubscriptionsElm.js')
var SaintsElm = require('./saintsElm.js')
var PrayersElm = require('./prayersElm.js')

var htmlPart1 = `<!doctype html>
<html lang="en">
  <head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-TXRVE787GD"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-TXRVE787GD');
  </script>

    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#EBD7F2">
    <link rel="apple-touch-icon" href="/assets/Favicons/PNG/128x128-favicon.png">
    <link href="/tailwind.css" rel="stylesheet">
    <meta name="description" content="`

var htmlPart2 = `">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preload" href="/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="/assets/Nunito_Sans/NunitoSans-Regular.ttf" as="font" type="font/ttf" crossorigin>

    <title>`

var htmlPart3 = `</title>
    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      @font-face {
        font-family: hvdComicSerifPro;
        src: url(/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf);
        font-display: swap;
      }
      @font-face {
        font-family: nunitoSansRegular;
        src: url(/assets/Nunito_Sans/NunitoSans-Regular.ttf);
        font-display: swap;
      }

      /* Defaults */
      h1 {
        font-size: 38px;
      }
      h2 {
        font-size: 32px;
      }

      /* Helper Classes */
      .inline {
        display: inline;
      }
      .inlineBlock {
        display: inline-block;
      }
      .hcenter {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
      .vcenter {
        /* Container should have position relative */
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
      }
      .center {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .relative {
        position: relative;
      }
      .colorDarkGray {
        color: #333;
      }

      /* Helper keyframes */
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }

      /* Media Changes */

      @media (max-width: 720px) {
        .mobileHide {
          display: none;
        }
        .mobileCenter {
          position: relative;
          left: 50%;
          transform: translate(-50%);
        }
      }
    </style>
`

var htmlPart3js =
  `<script src="elm.js"></script>`

var htmlPart4 =
  `</head>
  <body dir="ltr" lang="en" class="fontSize" style="margin:0;font-family:Nunito Sans;font-weight:lighter;line-height:1.7em;color:#333" >
`

// Used only for pages with json
var htmlPart4js = `
  <div id="myapp"></div>
  <script>
  var app = Elm`

var htmlPart4p2js = `.Main.init({
    node: document.getElementById('myapp')
  });
  </script>
`

var htmlPart5 = `</body>
</html>`

var fakeNode = function (path, title, description) {
  return {
    replaceData: function (d, e, f) {
      fs.writeFile(
        path,
        htmlPart1 + description + htmlPart2 + title + htmlPart3 + htmlPart4 + f + htmlPart5,
        function (err) {
          if (err) {
            console.log(err)
          }
        }
      )
    },
  }
}

var fakeNodeWithJs = function (path, title, description, elmModule) {
  fs.writeFile(
    path,
    htmlPart1 + description + htmlPart2 + title + htmlPart3 + htmlPart3js + htmlPart4 + htmlPart4js + elmModule + htmlPart4p2js + htmlPart5,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
}


fakeNodeWithJs('./index.html', 'Catholic Stories for Children', 'Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.', '')
var navigationApp = NavigationElm.Elm.Navigation.Main.init({ node: fakeNode('./navigation/index.html', 'Navigation - Catholic Stories for Children', '') })
var contactApp = ContactElm.Elm.Contact.Main.init({ node: fakeNode('./contact/index.html', 'Contact us - Catholic Stories for Children', '') })
var teamApp = TeamElm.Elm.Team.Main.init({ node: fakeNode('./team/index.html', 'The Team - Catholic Stories for Children', 'A number of talented artists, contractors, teams and people help bring these animations to life.') })
var giveApp = GiveElm.Elm.Give.Main.init({ node: fakeNode('./give/index.html', 'Give - Catholic Stories for Children', 'Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏') })
var newsroomApp = NewsroomElm.Elm.Newsroom.Main.init({ node: fakeNode('./newsroom/index.html', 'Newsroom - Catholic Stories for Children', 'See our latest animation news') })
var animationsApp = AnimationsElm.Elm.Animations.Main.init({ node: fakeNode('./animations/index.html', 'Animations - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers') })
var privacyPolicyApp = PrivacyPolicyElm.Elm.About.PrivacyPolicy.Main.init({ node: fakeNode('./about/privacy-policy/index.html', 'Privacy Policy - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers') })
fakeNodeWithJs('./feastdayactivities/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Activites for kids on the feast days', '.FeastDayActivities')
fakeNodeWithJs('./animations/hailmary/index.html', 'Hail Mary Animation - Catholic Stories for Children', 'An animation to guide kids in learning the Hail Mary prayer', '.Animations.HailMary')
fakeNodeWithJs('./animations/guardianangel/index.html', 'Guardian Angel Animation - Catholic Stories for Children', 'An animation to guide kids in learning the Guardian Angel prayer', '.Animations.GuardianAngel')
fakeNodeWithJs('./animations/stmichael/index.html', 'St Michael Animation - Catholic Stories for Children', 'An animation to guide kids in learning the St Michael the Archangel prayer', '.Animations.StMichael')
var resourcesApp = ResourcesElm.Elm.Resources.Main.init({ node: fakeNode('./resources/index.html', 'Resources - Catholic Stories for Children', 'Resources to guide kids in learning the Catholic faith') })
var resourcesPodcastsApp = ResourcesPodcastsElm.Elm.Resources.Podcasts.Main.init({ node: fakeNode('./resources/podcasts/index.html', 'Podcast Resources - Catholic Stories for Children', 'Podcasts to guide kids in learning the Catholic faith') })
var resourcesBooksApp = ResourcesBooksElm.Elm.Resources.Books.Main.init({ node: fakeNode('./resources/books/index.html', 'Book Resources - Catholic Stories for Children', 'Books to guide kids in learning the Catholic faith') })
var resourcesVideosApp = ResourcesVideosElm.Elm.Resources.Videos.Main.init({ node: fakeNode('./resources/videos/index.html', 'Video Resources - Catholic Stories for Children', 'Videos to guide kids in learning the Catholic faith') })
var resourcesSubscriptionsApp = ResourcesSubscriptionsElm.Elm.Resources.Subscriptions.Main.init({ node: fakeNode('./resources/subscriptions/index.html', 'Subscription Resources - Catholic Stories for Children', 'Subscriptions to guide kids in learning the Catholic faith') })
var saintsElmApp = SaintsElm.Elm.Saints.Main.init({ node: fakeNode('./saints/index.html', 'Saints - Catholic Stories for Children', 'A list of Catholic saints') })
var prayersElmApp = PrayersElm.Elm.Prayers.Main.init({ node: fakeNode('./prayers/index.html', 'Prayers - Catholic Stories for Children', 'A list of Catholic prayers') })