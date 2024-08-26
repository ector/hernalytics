
/*

  Record Types
  A, AAAA, CAA, CNAME, DS, MX, NAPTR, NS, PTR, SOA, SPF, SRV and TXT.
*/
resource "aws_route53_record" "main" {

  for_each = {
    for key, item in var.route_records : key => item
  }

  allow_overwrite = true
  zone_id         = var.hosted_zone_id
  name            = each.value.name

  type    = each.value.type
  ttl     = each.value.alias != null ? null : each.value.ttl
  records = each.value.alias == null ? each.value.values : null

  # Alias record does not support CNAME types bewarned.
  dynamic "alias" {
    for_each = each.value.alias != null ? toset([each.value.alias]) : []
    iterator = item
    content {
      name                   = item.value.name
      zone_id                = item.value.zone_id
      evaluate_target_health = item.value.evaluate_target_health
    }
  }
}


