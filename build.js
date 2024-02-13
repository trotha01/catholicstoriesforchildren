var fs = require('fs')

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
  <script src="https://donorbox.org/widget.js" paypalExpress="true"></script>
  <script type="text/javascript" defer src="https://donorbox.org/install-popup-button.js"></script>
  <script> window.DonorBox = { widgetLinkClassName: 'custom-dbox-popup' } </script> 

  <!-- This code is from google ads. Event snippet for Newsletter Signup conversion
  In your html page, add the snippet and call gtag_report_conversion when someone clicks on the chosen link or button. -->
  <script>
  function gtag_report_conversion(url) {
    var callback = function () {
      if (typeof(url) != 'undefined') {
        window.location = url;
      }
    };
    gtag('event', 'conversion', {
        'send_to': 'AW-11094481734/naEuCKW6gJ4YEMa2oaop',
        'event_callback': callback
    });
    return false;
  }
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

  if (app.ports && app.ports.gtagReportConversion) {
    app.ports.gtagReportConversion.subscribe(function(message) {
      gtag_report_conversion();
    });
  }

  if (app.ports && app.ports.goBack) {
    app.ports.goBack.subscribe(function(message) {
      window.history.back();
    });
  }

  </script>

  <!-- Calendly inline widget begin -->
  <script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async></script>
  <!-- Calendly inline widget end -->

`

var htmlPart5 = `<link rel="stylesheet" type="text/css" href="https://donorbox.org/animate-popup-donate-button.css"><script type="text/javascript" id="donorbox-donate-button-installer" src="https://donorbox.org/install-donate-button.js" data-href="https://donorbox.org/catholic-stories-for-children?default_interval=o" data-style="background: rgb(254, 189, 17); color: rgb(0, 0, 0); text-decoration: none; font-family: Verdana, sans-serif; display: flex; font-size: 16px; padding: 8px 24px; border-radius: 5px; gap: 8px; width: fit-content; line-height: 24px; position: fixed; top: 50%; transform: translate(0px, 0px) rotate(-90deg); z-index: 9999; overflow: hidden; left: -45px;" data-img-src="https://donorbox.org/images/white_logo.svg"></script>
</body>
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


fakeNodeWithJs('./about/privacy-policy/index.html', 'Privacy Policy - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.About.PrivacyPolicy')
fakeNodeWithJs('./animations/actofcontrition/index.html', 'Act of Contrition Animation - Catholic Stories for Children', 'An animation to guide kids in learning the Act of Contrition prayer', '.Animations.ActOfContrition')
fakeNodeWithJs('./animations/guardianangel/index.html', 'Guardian Angel Animation - Catholic Stories for Children', 'An animation to guide kids in learning the Guardian Angel prayer', '.Animations.GuardianAngel')
fakeNodeWithJs('./animations/hailmary/index.html', 'Hail Mary Animation - Catholic Stories for Children', 'An animation to guide kids in learning the Hail Mary prayer', '.Animations.HailMary')
fakeNodeWithJs('./animations/index.html', 'Animations - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.Animations')
fakeNodeWithJs('./animations/stmichael/index.html', 'St Michael Animation - Catholic Stories for Children', 'An animation to guide kids in learning the St Michael the Archangel prayer', '.Animations.StMichael')
fakeNodeWithJs('./contact/index.html', 'Contact us - Catholic Stories for Children', '', '.Contact')
fakeNodeWithJs('./feastdayactivities/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Activites for kids on the feast days', '.FeastDayActivities')
fakeNodeWithJs('./feastdayactivities/today/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Catholic activites for kids today', '.FeastDayActivities.Today')
fakeNodeWithJs('./give/index.html', 'Give - Catholic Stories for Children', 'Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏', '.Give')
fakeNodeWithJs('./index.html', 'Catholic Stories for Children', 'Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.', '')
fakeNodeWithJs('./navigation/index.html', 'Navigation - Catholic Stories for Children', '', '.Navigation')
fakeNodeWithJs('./newsroom/index.html', 'Newsroom - Catholic Stories for Children', 'See our latest animation news', '.Newsroom')
fakeNodeWithJs('./prayers/index.html', 'Prayers - Catholic Stories for Children', 'Catholic Prayers', '.Prayers')
fakeNodeWithJs('./prayer/angelus/index.html', 'Angelus Prayer - Catholic Stories for Children', 'Angelus Prayers', '.Prayer.Angelus')
fakeNodeWithJs('./resources/books/index.html', 'Book Resources - Catholic Stories for Children', 'Books to guide kids in learning the Catholic faith', '.Resources.Books')
fakeNodeWithJs('./resources/games/index.html', 'Game Resources - Catholic Stories for Children', 'Games to guide kids in learning the Catholic faith', '.Resources.Games')
fakeNodeWithJs('./resources/index.html', 'Resources - Catholic Stories for Children', 'Resources to guide kids in learning the Catholic faith', '.Resources')
fakeNodeWithJs('./resources/podcasts/index.html', 'Podcast Resources - Catholic Stories for Children', 'Podcasts to guide kids in learning the Catholic faith', '.Resources.Podcasts')
fakeNodeWithJs('./resources/prayer/index.html', 'Prayer Resources - Catholic Stories for Children', 'Prayer resources to guide families in building a strong habit of prayer', '.Resources.Prayer')
fakeNodeWithJs('./resources/subscriptions/index.html', 'Subscription Resources - Catholic Stories for Children', 'Subscriptions to guide kids in learning the Catholic faith', '.Resources.Subscriptions')
fakeNodeWithJs('./resources/videos/index.html', 'Video Resources - Catholic Stories for Children', 'Videos to guide kids in learning the Catholic faith', '.Resources.Videos')
fakeNodeWithJs('./saints/index.html', 'Saints - Catholic Stories for Children', 'Catholic Saint List', '.Saints')
fakeNodeWithJs('./team/index.html', 'The Team - Catholic Stories for Children', 'A number of talented artists, contractors, teams and people help bring these animations to life.', '.Team')
fakeNodeWithJs('./thankyou/index.html', 'Thank You - Catholic Stories for Children', 'Thank you for signing up for our mail list!', '.ThankYou')