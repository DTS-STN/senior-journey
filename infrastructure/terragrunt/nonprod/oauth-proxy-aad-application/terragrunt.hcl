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
    "api://sj-oauth-proxy-nonprod.esdc-edsc.gc.ca"
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
  application_spa_redirect_uris = [
    "https://seniors-journey-dev.dev-dp.dts-stn.com/oauth",
    "https://sj-dev.dev-dp.dts-stn.com/oauth"
  ]
}
