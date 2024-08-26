variable "hosted_zone_id" {
  type        = string
  description = "The hosted zone id"
}

variable "route_records" {
  type = list(object({
    type   = string
    name   = string # The name of the host record
    ttl    = optional(number, 9600)
    values = optional(list(string), [])
    alias = optional(object({
      name                   = string
      zone_id                = string
      evaluate_target_health = optional(bool, false)
    }), null)

  }))
  description = "Create one or more records for the hosted zones"
}
