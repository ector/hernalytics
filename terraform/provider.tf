terraform {

  required_providers {

    aws = {
      source  = "hashicorp/aws"
      version = "~>5.0"
    }

    null = {
      source  = "hashicorp/null"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    key                  = "portal/tfstate.json"
    encrypt              = true
    region               = "eu-west-2"
    dynamodb_table       = "terraform-states-lock"
    workspace_key_prefix = "hernalytics"

  }
}

provider "aws" {
  region = "eu-west-2"
}

# Needed for cloudfront 
provider "aws" {
  region = "us-east-1"
  alias  = "north_virginia"
}