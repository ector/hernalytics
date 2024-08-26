
/* Enable Bucket monitoring for a target buckets
    and logs its activites into this buckets given paths
 */

resource "aws_s3_bucket_logging" "bucket_logging" {
  count         = var.server_logging_configuration.target_prefix != null ? 1 : 0
  bucket        = aws_s3_bucket.bucket.id
  target_bucket = var.server_logging_configuration.target_bucket_arn
  target_prefix = var.server_logging_configuration.target_prefix
  depends_on    = [aws_s3_bucket.bucket]
}