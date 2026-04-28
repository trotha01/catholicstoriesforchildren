import * as CookieConsent from 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.esm.js';

const CAT_NECESSARY = "necessary";
const CAT_ANALYTICS = "analytics";
const CAT_ADVERTISEMENT = "advertisement";
const CAT_FUNCTIONALITY = "functionality";
const CAT_SECURITY = "security";

const SERVICE_AD_STORAGE = 'ad_storage'
const SERVICE_AD_USER_DATA = 'ad_user_data'
const SERVICE_AD_PERSONALIZATION = 'ad_personalization'
const SERVICE_ANALYTICS_STORAGE = 'analytics_storage'
const SERVICE_FUNCTIONALITY_STORAGE = 'functionality_storage'
const SERVICE_PERSONALIZATION_STORAGE = 'personalization_storage'
const SERVICE_SECURITY_STORAGE = 'security_storage'

const gtag = window.gtag || function () {};

// Set default consent to 'denied' (this should happen before changing any other dataLayer)
gtag('consent', 'default', {
  [SERVICE_AD_STORAGE]: 'denied',
  [SERVICE_AD_USER_DATA]: 'denied',
  [SERVICE_AD_PERSONALIZATION]: 'denied',
  [SERVICE_ANALYTICS_STORAGE]: 'denied',
  [SERVICE_FUNCTIONALITY_STORAGE]: 'denied',
  [SERVICE_PERSONALIZATION_STORAGE]: 'denied',
  [SERVICE_SECURITY_STORAGE]: 'denied',
});

/**
 * Update gtag consent according to the users choices made in CookieConsent UI
 */
function updateGtagConsent() {
  const analyticsGranted = CookieConsent.acceptedService(SERVICE_ANALYTICS_STORAGE, CAT_ANALYTICS);

  gtag('consent', 'update', {
    [SERVICE_ANALYTICS_STORAGE]: analyticsGranted ? 'granted' : 'denied',
    [SERVICE_AD_STORAGE]: CookieConsent.acceptedService(SERVICE_AD_STORAGE, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_AD_USER_DATA]: CookieConsent.acceptedService(SERVICE_AD_USER_DATA, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_AD_PERSONALIZATION]: CookieConsent.acceptedService(SERVICE_AD_PERSONALIZATION, CAT_ADVERTISEMENT) ? 'granted' : 'denied',
    [SERVICE_FUNCTIONALITY_STORAGE]: CookieConsent.acceptedService(SERVICE_FUNCTIONALITY_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
    [SERVICE_PERSONALIZATION_STORAGE]: CookieConsent.acceptedService(SERVICE_PERSONALIZATION_STORAGE, CAT_FUNCTIONALITY) ? 'granted' : 'denied',
    [SERVICE_SECURITY_STORAGE]: CookieConsent.acceptedService(SERVICE_SECURITY_STORAGE, CAT_SECURITY) ? 'granted' : 'denied',
  });

  // Update blocking flag for legacy compatibility
  if (!analyticsGranted) {
    window.__ga_block = true;
  } else {
    window.__ga_block = false;
    if (typeof window.loadGoogleTag === 'function') {
      window.loadGoogleTag();
    }
  }
}

function initCookieConsent() {
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

    // Trigger consent update when user choices change
    onFirstConsent: () => {
      updateGtagConsent();
    },
    onConsent: () => {
      updateGtagConsent();
    },
    onChange: () => {
      updateGtagConsent();
    },

    categories: {
      [CAT_NECESSARY]: {
        enabled: true,
        readOnly: true,
      },
      [CAT_ANALYTICS]: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/,
            },
            {
              name: '_gid',
            }
          ]
        },
        services: {
          [SERVICE_ANALYTICS_STORAGE]: {
            label: 'Enables storage (such as cookies) related to analytics e.g. visit duration.',
          }
        }
      },
      [CAT_ADVERTISEMENT]: {
        services: {
          [SERVICE_AD_STORAGE]: {
            label: 'Enables storage (such as cookies) related to advertising.',
          },
          [SERVICE_AD_USER_DATA]: {
            label: 'Sets consent for sending user data related to advertising to Google.',
          },
          [SERVICE_AD_PERSONALIZATION]: {
            label: 'Sets consent for personalized advertising.',
          },
        }
      },
      [CAT_FUNCTIONALITY]: {
        services: {
          [SERVICE_FUNCTIONALITY_STORAGE]: {
            label: 'Enables storage that supports the functionality of the website or app e.g. language settings.',
          },
          [SERVICE_PERSONALIZATION_STORAGE]: {
            label: 'Enables storage related to personalization e.g. video recommendations.',
          },
        }
      },
      [CAT_SECURITY]: {
        services: {
          [SERVICE_SECURITY_STORAGE]: {
            label: 'Enables storage related to security such as authentication functionality, fraud prevention, and other user protection.',
          },
        }
      }
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
                linkedCategory: CAT_NECESSARY
              },
              {
                title: "Analytics Cookies",
                description: "We use analytics cookies to gather information about how visitors use our website. This helps us analyze data such as which pages are popular, how visitors move around the site, and where improvements can be made.",
                linkedCategory: CAT_ANALYTICS,
                cookieTable: {
                  headers: {
                    name: "Name",
                    domain: "Service",
                    description: "Description",
                    expiration: "Expiration"
                  },
                  body: [
                    {
                      name: "_ga",
                      domain: "Google Analytics",
                      description: "Cookie set by <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                      expiration: "Expires after 12 days"
                    },
                    {
                      name: "_gid",
                      domain: "Google Analytics",
                      description: "Cookie set by <a href=\"https://business.safety.google/adscookies/\">Google Analytics</a>",
                      expiration: "Session"
                    }
                  ]
                }
              },
              {
                title: "Advertising",
                description: "Google uses cookies for advertising, including serving and rendering ads, personalizing ads (depending on your ad settings at <a href=\"https://g.co/adsettings\">g.co/adsettings</a>), limiting the number of times an ad is shown to a user, muting ads you have chosen to stop seeing, and measuring the effectiveness of ads.",
                linkedCategory: CAT_ADVERTISEMENT,
              },
              {
                title: "Functionality",
                description: "Cookies used for functionality allow users to interact with a service or site to access features that are fundamental to that service. Things considered fundamental to the service include preferences like the user's choice of language, product optimizations that help maintain and improve a service, and maintaining information relating to a user's session, such as the content of a shopping cart.",
                linkedCategory: CAT_FUNCTIONALITY,
              },
              {
                title: "Security",
                description: "Cookies used for security authenticate users, prevent fraud, and protect users as they interact with a service.",
                linkedCategory: CAT_SECURITY,
              },
              {
                title: "More information",
                description: "For any query in relation to my policy on cookies and your choices, please <a class=\"cc__link\" href=\"/team#contact\">contact me</a>."
              }
            ]
          }
        }
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
  initCookieConsent();
}
