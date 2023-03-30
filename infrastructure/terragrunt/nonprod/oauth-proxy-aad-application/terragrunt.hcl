# ---------------------------------------------------------------------------------------------------------------------
# TERRAGRUNT NONPROD CONFIGURATION
# ---------------------------------------------------------------------------------------------------------------------

terraform {
  source = "../../../terraform//azure-ad-application"
}

include "root" {
  path = find_in_parent_folders("terragrunt-root.hcl")
}

inputs = {
  application_display_name = "Seniors Journey: OAuth proxy (nonprod)"
  application_identifier_uris = [
    "api://seniors-journey-oauth-proxy-nonprod.esdc-edsc.gc.ca"
  ]
  application_oauth2_permission_scopes = [
    {
      id                         = "8725e6af-d0a0-4e69-bcde-014a0a846fe0"
      admin_consent_description  = "Allows access to protected applications."
      admin_consent_display_name = "Access protected applications"
      user_consent_description   = "Allows access to protected applications."
      user_consent_display_name  = "Access protected applications"
      value                      = "Application.Access"
    }
  ]
  application_owners = [
    "frank.basham@hrsdc-rhdcc.gc.ca",
    "gregory.j.baker@hrsdc-rhdcc.gc.ca",
    "landon.a.harrison@hrsdc-rhdcc.gc.ca",
    "sebastien.comeau@hrsdc-rhdcc.gc.ca"
  ]
  application_passwords = [
    "Default secret"
  ]
  application_web_redirect_uris = [
    "https://seniors-journey-dev.dev-dp.dts-stn.com/oauth/callback"
  ]
}
