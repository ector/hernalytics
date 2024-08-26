resource "aws_cloudfront_origin_access_control" "access_control" {
  name                              = "${var.environment_name}-access_control"
  description                       = "AWS Access control policy for the cloudfront- distrubuttions"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"

}