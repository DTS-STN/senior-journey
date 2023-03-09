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
  application_owners = [
    "frank.basham@hrsdc-rhdcc.gc.ca",
    "gregory.j.baker@hrsdc-rhdcc.gc.ca",
    "landon.a.harrison@hrsdc-rhdcc.gc.ca",
    "sebastien.comeau@hrsdc-rhdcc.gc.ca"
  ]
  application_passwords = [
    "Default secret"
  ]
  application_required_resource_accesses = [
    {
      resource_app_id = "00000003-0000-0000-c000-000000000000" # Microsoft Graph
      resource_accesses = [
        {
          id   = "5b567255-7703-4780-807c-7be8301ae99b" # Group.Read.All
          type = "Role" # aka "Application5b567255-7703-4780-807c-7be8301ae99b"
        }
      ]
    }
  ]
  application_spa_redirect_uris = [
    "https://seniors-journey-dev.dev-dp.dts-stn.com/oauth"
  ]
}
