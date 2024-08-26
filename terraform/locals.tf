
locals {
  domain_name        = var.host_address
  environment_name   = replace(var.environment_name, "_", "-")
  scoped_domain_name = local.environment_name != "master" ? "${local.environment_name}.${var.host_address}" : var.host_address
}
