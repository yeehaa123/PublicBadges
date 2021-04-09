variable "environment_name" {
  type = string
}

variable "project_prefix" {
  type = string
}

locals {
  name = "badges"
  bucket = "${var.project_prefix}-${local.name}-bucket-${var.environment_name}"
  event_bus = "${var.project_prefix}-${local.name}-event-bus-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}

output "write_badges_event_bus_policy" {
  value = aws_iam_policy.badges_event_bus_write_access.arn
}
