module "web_bucket" {
  source           = "./modules/s3"
  name             = var.host_address
  environment_name = local.environment_name
  public_access = {
    block_public_acls       = false
    block_public_policy     = false
    ignore_public_acls      = false
    restrict_public_buckets = false
  }

  enabled_versioning = true
  index_document     = "index.html"

  policy_statements = [
    {
      principals  = ["*"]
      action_type = "Allow"
      type        = "AWS"
      actions     = ["s3:GetObject"]
      paths       = ["*"]
    }
  ]
}

module "cloudfront" {
  source           = "./modules/cloudfront_distribution"
  environment_name = local.environment_name
  target_endpoint  = module.web_bucket.website_endpoint
  certificate_arn  = data.aws_ssm_parameter.domain_cert.value
  domain_aliases   = [local.scoped_domain_name]
  depends_on       = [data.aws_ssm_parameter.domain_cert]
}

module "website_endpoint" {
  source         = "./modules/routings"
  hosted_zone_id = data.aws_route53_zone.main.zone_id
  route_records = [{
    type = "A"
    name = local.scoped_domain_name
    alias = {
      name    = module.cloudfront.domain_name
      zone_id = module.cloudfront.hosted_zone_id
    }
  }]
}
