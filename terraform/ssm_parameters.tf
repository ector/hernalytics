
resource "aws_ssm_parameter" "website_bucket_arn" {
  name  = "/${var.environment_name}/${var.app_name}/bucket/ssm/portal/arn"
  type  = "String"
  value = module.web_bucket.name

  depends_on = [module.web_bucket]
}
