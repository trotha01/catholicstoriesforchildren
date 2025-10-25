import './input.css';
import * as ElmModule from './Main.elm';

function resolveElm(elmImport) {
  // Support the various shapes bundlers/plugins may export
  if (!elmImport) return null;
  if (elmImport.Main) return elmImport;                // { Main: { ... } }
  if (elmImport.default && elmImport.default.Main) return elmImport.default; // { default: { Main: { ... } } }
  if (elmImport.Elm && elmImport.Elm.Main) return elmImport.Elm; // { Elm: { Main: { ... } } }
  if (typeof window !== 'undefined' && window.Elm && window.Elm.Main) return window.Elm; // global fallback
  return null;
}

function mount() {
  const mountNode = document.body;
  if (!mountNode) {
    document.addEventListener('DOMContentLoaded', mount);
    return;
  }

  const Elm = resolveElm(ElmModule);

  if (!Elm || !Elm.Main || typeof Elm.Main.init !== 'function') {
    console.error('Elm module not found or has unexpected shape. Exported value (ElmModule):', ElmModule);
    return;
  }

  try {
    window.app = Elm.Main.init({ node: mountNode });
  } catch (e) {
    console.error('Elm init failed', e);
    return;
  }

  // Wire up ports similar to what build.js used to do
  var app = window.app;
  if (!app || !app.ports) return;
  if (app.ports.gtagReportConversion && !app.__gtagHooked){
    app.ports.gtagReportConversion.subscribe(function(){ if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(); });
    app.__gtagHooked = true;
  }
  if (app.ports.goBack && !app.__goBackHooked){
    app.ports.goBack.subscribe(function(){ window.history.back(); });
    app.__goBackHooked = true;
  }
  // Google Analytics ports
  function loadGA() {
    if (window.__ga_block === true) return;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-TXRVE787GD';
    s.async = true;
    document.head.appendChild(s);
    if (typeof window.gtag === 'function') {
      window.gtag('js', new Date());
      window.gtag('config', 'G-TXRVE787GD', { anonymize_ip: true });
    }
  }
  if (app.ports.enableAnalytics && !app.__enableAnalyticsHooked) {
    app.ports.enableAnalytics.subscribe(function() {
      if (navigator.globalPrivacyControl === true) { return; }
      window.__ga_block = false;
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'granted' });
      }
      loadGA();
    });
    app.__enableAnalyticsHooked = true;
  }
  if (app.ports.setConsent && !app.__setConsentHooked) {
    app.ports.setConsent.subscribe(function(data) {
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
          analytics_storage: data.analytics ? 'granted' : 'denied',
          ad_storage: data.ads ? 'granted' : 'denied'
        });
      }
    });
    app.__setConsentHooked = true;
  }
  if (app.ports.loadGA && !app.__loadGAHooked) {
    app.ports.loadGA.subscribe(function() {
      loadGA();
    });
    app.__loadGAHooked = true;
  }
  if (app.ports.onConsentChange && !app.__onConsentChangeHooked) {
    // This would be called from cookie consent JS
    // For now, placeholder
    app.__onConsentChangeHooked = true;
  }
}

mount();
