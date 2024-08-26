

data "aws_route53_zone" "main" {
  name = local.domain_name
}

# Import the certificate parameter string
data "aws_ssm_parameter" "domain_cert" {
  name     = var.cloudfront_certificate_ssm_name
  provider = aws.north_virginia
}

