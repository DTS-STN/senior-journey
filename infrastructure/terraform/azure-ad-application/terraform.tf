###############################################################################
# Main terraform configuration (providers, backend, etc)
# For all Terraform configuration settings, see: https://www.terraform.io/docs/configuration/terraform.html
###############################################################################

terraform {
  required_version = ">= 1.3.0, < 2.0.0"

  required_providers {
    azuread = {
      # see: https://registry.terraform.io/providers/hashicorp/azuread/latest/docs
      source  = "hashicorp/azuread"
      version = "~> 2.29.0"
    }

    azurerm = {
      # see: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs
      source  = "hashicorp/azurerm"
      version = "~> 3.28.0"
    }
  }
}

# #############################################################################
# Azure Active Directory App Registration configuration...
#
# Note that in the AzureAD terraform provider, an app registration is actually an `azuread_application` resource
# see: https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/resources/application
# #############################################################################

data "azuread_users" "owners" {
  # Application registraion owners have the ability to view and edit an application registration.
  # see: https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/data-sources/users

  user_principal_names = var.application_owners
}

resource "azuread_application" "main" {
  # see: https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/resources/application

  display_name    = var.application_display_name
  identifier_uris = var.application_identifier_uris
  logo_image      = filebase64("assets/logo.png")
  owners          = data.azuread_users.owners.object_ids

  web {
    redirect_uris = var.application_web_redirect_uris
  }
}

resource "azuread_application_password" "main" {
  # see: https://registry.terraform.io/providers/hashicorp/azuread/latest/docs/resources/application_password

  for_each = { for application_password in var.application_passwords : application_password => application_password}

  application_object_id = azuread_application.main.object_id
  display_name          = each.value
  end_date_relative     = "876000h"
}
