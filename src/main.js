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
  // const mountNode = document.body;
  const mountNode = document.getElementById("elm-root");
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
  const app = window.app;
  if (!app || !app.ports) return;
  if (app.ports.gtagReportConversion && !app.__gtagHooked){
    app.ports.gtagReportConversion.subscribe(function(url){ if (typeof window.gtag_report_conversion === 'function') window.gtag_report_conversion(url); });
    app.__gtagHooked = true;
  }
  if (app.ports.goBack && !app.__goBackHooked){
    app.ports.goBack.subscribe(function(){ window.history.back(); });
    app.__goBackHooked = true;
  }
}

mount();
