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

  <!-- Lazy load Substack iframes when they are near viewport or after a delay -->
  <script>
  (function(){
    const SEL = '[data-substack-src]';

    function inject(el){
      if (!el || el.__loaded) return;
      el.__loaded = true;

      var src = el.getAttribute('data-substack-src');
      var h   = el.getAttribute('data-height') || '220';

      var iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = 'Substack Signup';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.sandbox = 'allow-forms allow-scripts allow-popups allow-top-navigation-by-user-activation allow-same-origin';
      iframe.style.width = '100%';
      iframe.style.height = h + 'px';
      iframe.style.background = 'transparent';
      iframe.className = 'rounded';

      el.replaceWith(iframe);
    }

  var io = ('IntersectionObserver' in window)
    ? new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){
            inject(e.target);
            io.unobserve(e.target);
          }
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 })
    : null;

  function setup(){
    document.querySelectorAll(SEL).forEach(function(el){
      if (io) io.observe(el);
    });

    // Safety net: if user never scrolls, load on idle/dwell.
    function idleLoad(){ document.querySelectorAll(SEL).forEach(inject); }
    if ('requestIdleCallback' in window){
      setTimeout(function(){ requestIdleCallback(idleLoad, { timeout: 5000 }); }, 10000);
    } else {
      setTimeout(idleLoad, 15000);
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') setup();
  else document.addEventListener('DOMContentLoaded', setup);
  })();
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
    + `<meta property="og:url" content="https://claritasstudios.com` + path + `">`
    + `<meta property="og:image" content="https://claritasstudios.com` + thumbnail + `">`
    + `<meta property="twitter:card" content="summary_large_image">`
    + `<meta property="twitter:image" content="https://claritasstudios.com` + thumbnail + `">`
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

writeJSFile('/public/index.html', 'Claritas Studios', 'Claritas Studios', '', '/assets/images/thumbnails/CSCThumbnail.png', '/')
writeJSFile('/public/thankyou/index.html', 'Thank You - Claritas Studios', 'Thank you for signing up for our mail list!', '.Page.ThankYou', '/assets/images/thumbnails/CSCThumbnail.png', './')