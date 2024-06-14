import 'https://cdn.jsdelivr.net/gh/orestbida/cookieconsent@3.0.1/dist/cookieconsent.umd.js';

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
    }
});