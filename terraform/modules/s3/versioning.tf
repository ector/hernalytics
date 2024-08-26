
resource "aws_s3_bucket_versioning" "versioning" {
  count  = var.enabled_versioning ? 1 : 0
  bucket = aws_s3_bucket.bucket.id

  versioning_configuration {
    status     = var.enabled_versioning ? "Enabled" : "Disabled"
    mfa_delete = var.mfa_delete_status ? "Enabled" : "Disabled"
  }

  depends_on = [aws_s3_bucket.bucket]
}