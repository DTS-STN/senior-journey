variable "application_owners" {
  description = "Active Directory user principal names (ie: email addresses) of users who own this AAD application."
  type        = set(string)
  default     = []
}

variable "application_display_name" {
  description = "The display name to use for this AAD application."
  type        = string
}

variable "application_identifier_uris" {
  description = "A set of user-defined URIs that uniquely identify this AAD application within the AAD tenant."
  type        = set(string)
}

variable "application_passwords" {
  description = "The set of password credentials (ie: client secrets) associated with this AAD application."
  type    = set(string)
  default = []
}

variable "application_spa_redirect_uris" {
  description = "The set of redirect URIs where OAuth 2.0 authorization codes and access tokens are sent when authenticating this AAD application."
  type        = set(string)
  default     = []
}
