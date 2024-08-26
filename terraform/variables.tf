variable "app_name" {
  type        = string
  description = "The application for scoping some commmon data"
}

variable "environment_name" {
  type        = string
  description = "the environment variable for the deployments"
}

variable "region" {
  type        = string
  description = "The application main deployment region"
}

variable "cloudfront_certificate_ssm_name" {
  type        = string
  description = "The name of the parameter string that store the cloudwatch arn"
}

variable "host_address" {
  type        = string
  description = "The web address uri"
}