# ---------------------------------------------------------------------------------------------------------------------
# COMMON TERRAGRUNT VARIABLES
#
# Variables that are common to all environments.
# Usage: common_config = read_terragrunt_config(find_in_parent_folders("common-vars.hcl"))
# ---------------------------------------------------------------------------------------------------------------------

locals {
  tags = {
    "Branch"         = "Innovation, Information and Technology"
    "Classification" = "Protected B / Medium integrity / Medium availability"
    "Department"     = "Employment and Social Development Canada"
    "Directorate"    = "Business Solutions and Information Management"
    "Division"       = "Digital Technology Solutions"
    "IaCToolChain"   = "Terragrunt/Terraform"
    "ProjectName"    = "Senior's Journey"
    "ProductOwner"   = "Geoff Anderton <geoff.anderton@servicecanada.gc.ca>"
  }
}
