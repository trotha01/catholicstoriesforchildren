var fs = require('fs')

var htmlHeadStart = `<!doctype html>
<html lang="en">
  <head>
  <link rel="preload" as="image" href="/assets/images/home/ClaritasStudios-800.webp" imagesrcset="/assets/images/home/ClaritasStudios-400.webp 400w, /assets/images/home/ClaritasStudios-800.webp 800w, /assets/images/home/ClaritasStudios-1200.webp 1200w" imagesizes="(max-width: 720px) 80vw, 400px" fetchpriority="high">
  <script async src="https://app-cdn.clickup.com/assets/js/forms-embed/v1.js"></script>


    <meta charset='utf-8'/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover">
    <meta name="theme-color" content="#EBD7F2">
    <link rel="apple-touch-icon" href="/assets/Favicons/PNG/128x128-favicon.png">
    <link rel="preconnect" href="https://www.googletagmanager.com" crossorigin>
    <link rel="preconnect" href="https://app-cdn.clickup.com" crossorigin>
    <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
    <link href="/tailwind.css" rel="stylesheet">
    <link href="/home.css" rel="stylesheet">
    <link rel="manifest" href="/manifest.webmanifest">

    <!-- style for the cookie consent popup -->
    <link rel="preload" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css" as="style">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.css" media="print" onload="this.media='all'">

    <style>
      * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
      }
      @font-face {
        font-family: hvdComicSerifPro;
        src: url(/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.woff2) format('woff2'),
             url(/assets/HVD-Comic-Serif-Pro/OTF/HVD_Comic_Serif_Pro.otf) format('opentype');
        font-display: swap;
      }
      @font-face {
        font-family: nunitoSansRegular;
        src: url(/assets/Nunito_Sans/NunitoSans-Regular.woff2) format('woff2'),
             url(/assets/Nunito_Sans/NunitoSans-Regular.ttf) format('truetype');
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

  <!-- Google Analytics (deferred + Consent Mode) -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent','default',{
      ad_user_data:'granted',
      ad_personalization:'granted',
      ad_storage:'granted',
      analytics_storage:'granted',
      functionality_storage:'granted',
      security_storage:'granted'
    });
    gtag('consent','default', {
      ad_user_data:'denied',
      ad_personalization:'denied',
      ad_storage:'denied',
      analytics_storage:'denied',
      functionality_storage:'granted',
      security_storage:'granted'
    }, {
      region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IS','IE','IT','LV','LI','LT','LU','MT','NL','NO','PL','PT','RO','SK','SI','ES','SE','CH','GB']
    });
    function loadGA(){
      if (window.__ga_block === true) return;
      var s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=G-TXRVE787GD';
      s.async = true;
      document.head.appendChild(s);
      gtag('js', new Date());
      gtag('config','G-TXRVE787GD', { anonymize_ip: true });
    }
    // Do not auto-load GA; only load after consent
    window.__ga_block = true;

    // Hook for cookie-consent (and geo logic): call this to grant analytics and trigger GA load
    window.enableAnalytics = function(){
      if (navigator.globalPrivacyControl === true) { return; } // honor GPC/CPRA signals
      window.__ga_block = false;
      gtag('consent','update',{ analytics_storage:'granted', ad_storage:'granted' });
      loadGA();
    };
  </script>

  <!-- Cookie consent popup -->
  <script type="module" src="/cookieconsent-config.js"></script>
</body>
</html>`

var writeJSFile = function (path, title, description, elmModule, thumbnail, elmPath) {
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
    + `<script defer>var app = Elm` + elmModule + `.Main.init({ node: document.getElementById('myapp') });`
    + htmlBodyEnd,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
}

var write404JSFile = function (path, title, description, elmModule, thumbnail, elmPath) {
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
  const redirectParam = params.get("redirect"); // Get the 'redirect' query parameter

  
  // Preserve the path in URL by using JavaScript History API
  if (redirectParam !== "/index.html") {
  if (path !== "/") {
    if (episode) {
     window.location.replace(redirectUrl + "?redirect=" + path.replace(/\\/+$/, "") + "/1/" + episode.toLowerCase());
    } else {
      window.location.replace(redirectUrl + "?redirect=" + path);
  }
  }
  }
</script>`
    + `<script src="` + elmPath + `elm.js"></script>`
    + `</head>`
    + htmlBodyStart
    + `<script defer>var app = Elm` + elmModule + `.Main.init({ node: document.getElementById('myapp') });`
    + htmlBodyEnd,
    function (err) {
      if (err) {
        console.log(err)
      }
    }
  )
}


writeJSFile('/public/about/privacy-policy/index.html', 'Privacy Policy - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.About.PrivacyPolicy', '/assets/images/thumbnails/CSCThumbnail.png', './')
writeJSFile('/public/about/terms-and-conditions/index.html', 'Terms and Conditions - Catholic Stories for Children', 'Animations to guide kids in learning Catholic prayers', '.About.TermsAndConditions', '/assets/images/thumbnails/CSCThumbnail.png', './')
writeJSFile('/public/feastdayactivities/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Activities for kids on the feast days', '.FeastDayActivities', '/assets/images/thumbnails/FeastDayActivityThumbnail.png', './')
writeJSFile('/public/feastdayactivities/today/index.html', 'Feast Day Activities - Catholic Stories for Children', 'Catholic activities for kids today', '.FeastDayActivities.Today', '/assets/images/thumbnails/FeastDayActivityThumbnail.png', './')
writeJSFile('/public/index.html', 'Catholic Stories for Children', 'Catholic Stories for Children is a nonprofit aimed at telling short stories, primarily through animation, to help kids learn Catholic prayers, learn about Catholic saints, and to learn other Catholic concepts.', '', '/assets/images/thumbnails/CSCThumbnail.png', '/')
// write404JSFile('/public/404.html', 'Not Found - Catholic Stories for Children', 'This page is not found', '.NotFound', '/assets/images/thumbnails/CSCThumbnail.png', '/notfound/')
writeJSFile('/public/thankyou/index.html', 'Thank You - Catholic Stories for Children', 'Thank you for signing up for our mail list!', '.ThankYou', '/assets/images/thumbnails/CSCThumbnail.png', './')