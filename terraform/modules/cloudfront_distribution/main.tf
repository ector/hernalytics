
resource "aws_cloudfront_distribution" "distribution" {

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = var.index_document

  origin {
    domain_name = var.target_endpoint
    origin_id   = local.s3_origin_id

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }

  }


  default_cache_behavior {
    allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "all"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 3600
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  viewer_certificate {
    acm_certificate_arn            = var.certificate_arn
    cloudfront_default_certificate = true
    ssl_support_method             = "sni-only"
  }

  aliases             = var.domain_aliases
  wait_for_deployment = true

  lifecycle {
    prevent_destroy = false
  }

  tags = {
    EnvironmentName = "${var.environment_name}"
  }

}


