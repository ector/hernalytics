locals {
  website_domain = var.environment_name != "master" ? "${var.environment_name}." : ""
  s3_origin_id   = "${local.website_domain}hernalytics.com"
}