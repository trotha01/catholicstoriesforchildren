port module Ports.GoogleAnalytics exposing (enableAnalytics, setConsent, loadGA, onConsentChange)

-- Port to enable analytics (grants consent and loads GA)
port enableAnalytics : () -> Cmd msg

-- Port to set consent status
port setConsent : { analytics : Bool, ads : Bool } -> Cmd msg

-- Port to load GA script
port loadGA : () -> Cmd msg

-- Incoming port for consent changes (from JS)
port onConsentChange : ({ analytics : Bool } -> msg) -> Sub msg