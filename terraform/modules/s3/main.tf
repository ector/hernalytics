/* 
  Creating S3 Modules for the S3 Bucket ,
  This should allow the configuration of any S3 buckets with more opinionated 
  configurations.
  From my understanding of S3 bucket configurations.
  https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html
*/


resource "aws_s3_bucket" "bucket" {
  bucket              = local.unique_name
  object_lock_enabled = var.lock_enabled
  force_destroy       = var.force_deletion
  tags = {
    Environment = var.environment_name
  }
  lifecycle {
    # create_before_destroy = false
    # prevent_destroy       = false
    # ignore_changes = [
    #   bucket
    # ]
  }
}

resource "aws_s3_bucket_request_payment_configuration" "request_payment_configuration" {
  bucket = aws_s3_bucket.bucket.id
  payer  = var.payer

  depends_on = [aws_s3_bucket.bucket]
}
