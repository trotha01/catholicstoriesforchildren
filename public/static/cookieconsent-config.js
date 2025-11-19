import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

document.addEventListener('DOMContentLoaded', () => {
    CookieConsent.run({
        guiOptions: {
            consentModal: {
                layout: "bar inline",
                position: "bottom",
                equalWeightButtons: true,
                flipButtons: false
            },
            preferencesModal: {
                layout: "box",
                position: "right",
                equalWeightButtons: true,
                flipButtons: false
            }
        },
        categories: {
            necessary: {
                readOnly: true
            },
            analytics: {}
        },
        language: {
            default: "en",
            autoDetect: "browser",
            translations: {
                en: {
                    consentModal: {
                        title: "This website uses cookies to ensure you get the best experience on our website.",
                        description: "By continuing to browse this site, you agree to our use of cookies as described in our Cookie Policy.",
                        acceptAllBtn: "Accept all",
                        acceptNecessaryBtn: "Reject all",
                        showPreferencesBtn: "Manage preferences",
                        footer: "<a href=\"/about/privacy-policy\">Privacy Policy</a>\n<a href=\"/about/terms-and-conditions\">Terms and conditions</a>"
                    },
                    preferencesModal: {
                        title: "Consent Preferences Center",
                        acceptAllBtn: "Accept all",
                        acceptNecessaryBtn: "Reject all",
                        savePreferencesBtn: "Save preferences",
                        closeIconLabel: "Close modal",
                        serviceCounterLabel: "Service|Services",
                        sections: [
                            {
                                title: "Cookie Usage",
                                description: "At Catholic Stories for Children, we use cookies to enhance your browsing experience and provide personalized content and features. Cookies are small text files that are stored on your device when you visit our website. They help us understand how you interact with our site, which allows us to improve your experience and tailor content to your preferences."
                            },
                            {
                                title: "Strictly Necessary Cookies <span class=\"pm__badge\">Always Enabled</span>",
                                description: "These cookies are necessary for the functioning of our website. They enable basic functions like page navigation and access to secure areas of the website.",
                                linkedCategory: "necessary"
                            },
                            {
                                title: "Analytics Cookies",
                                description: "We use analytics cookies to gather information about how visitors use our website. This helps us analyze data such as which pages are popular, how visitors move around the site, and where improvements can be made.",
                                linkedCategory: "analytics"
                            },
                            {
                                title: "More information",
                                description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"/team#contact\">contact me</a>."
                            }
                        ]
                    }
                }
            }
        },
        onConsent: ({ cookie }) => {
          try {
            // Only grant & load GA if user accepted analytics (EU/EEA will be opt-in by region default)
            if (CookieConsent.acceptedCategory('analytics')) {
              if (typeof window.gtag === 'function') {
                window.gtag('consent','update',{ analytics_storage:'granted', ad_storage:'granted' });
              }

              // Notify Elm app if available (preferred path)
              try {
                if (window.app && window.app.ports && window.app.ports.onConsentChange && typeof window.app.ports.onConsentChange.send === 'function') {
                  window.app.ports.onConsentChange.send({ analytics: true });
                  return;
                }
              } catch (e) { /* no-op */ }

              // Fallback: call legacy global if present
              if (typeof window.enableAnalytics === 'function') {
                try { window.enableAnalytics(); } catch (e) { /* no-op */ }
              }
            }
          } catch (e) { /* no-op */ }
        },
        onChange: ({ cookie, changedCategories }) => {
          try {
            if (changedCategories && changedCategories.includes('analytics')) {
              if (CookieConsent.acceptedCategory('analytics')) {
                // User enabled analytics
                // Notify Elm app if available
                try {
                  if (window.app && window.app.ports && window.app.ports.onConsentChange && typeof window.app.ports.onConsentChange.send === 'function') {
                    window.app.ports.onConsentChange.send({ analytics: true });
                  } else if (typeof window.enableAnalytics === 'function') {
                    // fallback for legacy code
                    try { window.enableAnalytics(); } catch (e) { /* no-op */ }
                  }
                } catch (e) { /* no-op */ }

              } else {
                // revoke analytics consent
                if (typeof window.gtag === 'function') window.gtag('consent','update',{ analytics_storage:'denied' });
                window.__ga_block = true;

                // Notify Elm app of revoked consent if available
                try {
                  if (window.app && window.app.ports && window.app.ports.onConsentChange && typeof window.app.ports.onConsentChange.send === 'function') {
                    window.app.ports.onConsentChange.send({ analytics: false });
                  }
                } catch (e) { /* no-op */ }
              }
            }
          } catch (e) { /* no-op */ }
        }
    });
});