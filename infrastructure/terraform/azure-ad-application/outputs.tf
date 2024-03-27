output "application_id" {
  # Note: this is an alias for client_id
  description = "The application ID (also called client ID)."
  value       = azuread_application.main.client_id
}

output "client_id" {
  # Note: this is an alias for application_id
  description = "The client ID (also called application registration ID)."
  value       = azuread_application.main.client_id
}

output "client_secrets" {
  # Note: fetch secrets using `terragrunt output client_secrets`
  description = "The application client secrets."
  value       = [for secret in azuread_application_password.main : { (secret.display_name) = "${secret.value} (expires: ${secret.end_date})" }]
  sensitive   = true
}
