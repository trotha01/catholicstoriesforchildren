var fs = require('fs')

var htmlHeadStart = `<!doctype html>
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
  <script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"></script>


    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#EBD7F2">
    <link rel="apple-touch-icon" href="/assets/Favicons/PNG/128x128-favicon.png">
    <link href="/tailwind.css" rel="stylesheet">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="preload" href="/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf" as="font" type="font/otf" crossorigin>
    <link rel="preload" href="/assets/Nunito_Sans/NunitoSans-Regular.ttf" as="font" type="font/ttf" crossorigin>

    <!-- style for the cookie consent popup -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css">

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
    </style>`

var htmlBodyStart =
  `<body dir="ltr" lang="en" class="fontSize" style="margin:0;font-family:Nunito Sans;font-weight:lighter;line-height:1.7em;color:#333" >
  <div id="myapp"></div>`

var htmlBodyEnd = `
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

  <!-- Cookie consent popup -->
  <script type="module" src="/cookieconsent-config.js"></script>
</body>
</html>`

var fakeNodeWithJs = function (path, title, description, elmModule, thumbnail, elmPath) {
  fs.writeFile(
    '.' + path,
    htmlHeadStart
    + `<meta name="description" content="` + description + `">`
    + `<title>` + title + `</title>`
    + `<meta property="og:title" content="` + title + `">`
    + `<meta property="og:description" content="` + description + `">`
    + `<meta property="og:url" content="https://catholicstoriesforchildren.com` + path + `">`
    + `<meta property="og:image" content="https://catholicstoriesforchildren.com` + thumbnail + `">`
    + `<meta property="twitter:card" content="summary_large_image">`
    + `<meta property="twitter:image" content="https://catholicstoriesforchildren.com` + thumbnail + `">`
    + `<script src="` + elmPath + `elm.js"></script>`
    + `</head>`
    + htmlBodyStart
    + `<script>var app = Elm` + elmModule + `.Main.init({ node: document.getElementById('myapp') });`
    + htmlBodyEnd,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
}

var fake404NodeWithJs = function (path, title, description, elmModule, thumbnail, elmPath) {
  fs.writeFile(
    '.' + path,
    htmlHeadStart
    + `<meta name="description" content="` + description + `">`
    + `<title>` + title + `</title>`
    + `<meta property="og:title" content="` + title + `">`
    + `<meta property="og:description" content="` + description + `">`
    + `<meta property="og:url" content="https://catholicstoriesforchildren.com` + path + `">`
    + `<meta property="og:image" content="https://catholicstoriesforchildren.com` + thumbnail + `">`
    + `<meta property="twitter:card" content="summary_large_image">`
    + `<meta property="twitter:image" content="https://catholicstoriesforchildren.com` + thumbnail + `">`
    + `<script>
  var path = window.location.pathname;
  var redirectUrl = "/index.html";

  const params = new URLSearchParams(window.location.search);
  const episode = params.get("e"); // null if it doesn't exist, or the value if it does

  
  // Preserve the path in URL by using JavaScript History API
  if (path !== "/") {
    if (episode) {
     window.location.replace(redirectUrl + "?redirect=" + path.replace(/\\/+$/, "") + "/1/" + episode.toLowerCase());
    } else {
      window.location.replace(redirectUrl + "?redirect=" + path);
  }
  }
</script>`
    + `<script src="` + elmPath + `elm.js"></script>`
    + `</head>`
    + htmlBodyStart
    + `<script>var app = Elm` + elmModule + `.Main.init({ node: document.getElementById('myapp') });`
    + htmlBodyEnd,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
}


fakeNodeWithJs('/about/privacy-policy/index.html', 'Privacy Policy - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.About.PrivacyPolicy', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/about/terms-and-conditions/index.html', 'Terms and Conditions - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.About.TermsAndConditions', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/contact/index.html', 'Contact us - Catholic Stories for Children', '', '.Contact', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/feastdayactivities/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Activities for kids on the feast days', '.FeastDayActivities', '/assets/images/thumbnails/FeastDayActivityThumbnail.png', './')
fakeNodeWithJs('/feastdayactivities/today/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Catholic activities for kids today', '.FeastDayActivities.Today', '/assets/images/thumbnails/FeastDayActivityThumbnail.png', './')
fakeNodeWithJs('/give/index.html', 'Give - Catholic Stories for Children', 'Your support helps make these animations and our work possible. Whether you support financially, via prayers, sending words of encouragement, or voluntary services, we are eternally grateful. 🙏', '.Give', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/index.html', 'Catholic Stories for Children', 'Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.', '', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/navigation/index.html', 'Navigation - Catholic Stories for Children', '', '.Navigation', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/newsroom/index.html', 'Newsroom - Catholic Stories for Children', 'See our latest animation news', '.Newsroom', '/assets/images/thumbnails/CSCThumbnail.png', './')
fake404NodeWithJs('/404.html', 'Not Found - Catholic Stories for Children', 'This page is not found', '.NotFound', '/assets/images/thumbnails/CSCThumbnail.png', '/notfound/')
fakeNodeWithJs('/opportunities/index.html', 'Opportunities - Catholic Stories for Children', 'Find opportunities to be involved', '.Opportunities', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/prayers/index.html', 'Prayers - Catholic Stories for Children', 'Catholic Prayers', '.Prayers', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/prayer/angelus/index.html', 'Angelus Prayer - Catholic Stories for Children', 'Angelus Prayers', '.Prayer.Angelus', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/books/index.html', 'Book Resources - Catholic Stories for Children', 'Books to guide kids in learning the Catholic faith', '.Resources.Books', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/games/index.html', 'Game Resources - Catholic Stories for Children', 'Games to guide kids in learning the Catholic faith', '.Resources.Games', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/index.html', 'Resources - Catholic Stories for Children', 'Resources to guide kids in learning the Catholic faith', '.Resources', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/podcasts/index.html', 'Podcast Resources - Catholic Stories for Children', 'Podcasts to guide kids in learning the Catholic faith', '.Resources.Podcasts', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/prayer/index.html', 'Prayer Resources - Catholic Stories for Children', 'Prayer resources to guide families in building a strong habit of prayer', '.Resources.Prayer', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/subscriptions/index.html', 'Subscription Resources - Catholic Stories for Children', 'Subscriptions to guide kids in learning the Catholic faith', '.Resources.Subscriptions', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/resources/videos/index.html', 'Video Resources - Catholic Stories for Children', 'Videos to guide kids in learning the Catholic faith', '.Resources.Videos', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/saints/index.html', 'Saints - Catholic Stories for Children', 'Catholic Saint List', '.Saints', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/shop/index.html', 'Shop - Catholic Stories for Children', 'Catholic Saint List', '.Shop', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/signup/index.html', 'Signup - Catholic Stories for Children', 'Signup', '.Signup', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/team/index.html', 'The Team - Catholic Stories for Children', 'A number of talented artists, contractors, teams and people help bring these animations to life.', '.Team', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/team/join/index.html', 'Join The Team - Catholic Stories for Children', 'Join the talented artists, contractors and people help bring these animations to life.', '.Team.Join', '/assets/images/thumbnails/CSCThumbnail.png', './')
fakeNodeWithJs('/thankyou/index.html', 'Thank You - Catholic Stories for Children', 'Thank you for signing up for our mail list!', '.ThankYou', '/assets/images/thumbnails/CSCThumbnail.png', './')