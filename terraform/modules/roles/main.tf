data "aws_iam_policy_document" "assumed_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    dynamic "principals" {
      for_each = var.assume_role_principals
      content {
        type        = principals.value.type
        identifiers = principals.value.identifiers
      }
    }
  }
}

resource "aws_iam_role" "role" {
  name               = "${var.environment}-${var.name}"
  assume_role_policy = data.aws_iam_policy_document.assumed_role_policy.json
}

# Create a policy role
resource "aws_iam_role_policy" "role_policy" {
  for_each = { for key, statement in var.statements : key => statement }

  name = "${var.environment}-${var.name}-${each.value.id}"
  role = aws_iam_role.role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = each.value.actions
        Effect   = "Allow"
        Resource = each.value.resources
      },
    ]
  })
}



# Deal with external policy that will need to attached to this role

resource "aws_iam_role_policy_attachment" "external_role" {
  for_each   = { for key, value in var.external_policies_arn : key => value }
  policy_arn = each.value
  role       = aws_iam_role.role.id
}
