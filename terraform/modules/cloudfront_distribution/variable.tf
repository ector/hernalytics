
variable "environment_name" {
  type        = string
  description = "The deployment environment"
}

variable "index_document" {
  type        = string
  default     = "index.html"
  description = "The primary index page to load"
}

variable "target_endpoint" {
  type        = string
  description = "The target endpoint of the resource that the cloudwatch have to pull content from."
}

variable "certificate_arn" {
  type        = string
  description = "The certificate arn , this certificate has be to hosted in the same region"
}

variable "domain_aliases" {
  type        = list(string)
  description = "List of the domain names that can be used to access the cloudfronts."
}

variable "methods" {
  type    = list(string)
  default = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
}
