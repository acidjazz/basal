variable "aws_access_key_deployment" {
  description = "The AWS access key for deployment."
}

variable "aws_secret_key_deployment" {
  description = "The AWS secret key for deployment."
}

variable "region" {
  description = "The AWS region to create resources in."
  default = "us-west-2"
}

variable "az_count" {
  description = "Number of AZs to cover in a given AWS region"
  default     = "2"
}

variable "ecs_cluster_name" {
  description = "The name of the Amazon ECS cluster."
  default = "conjugates"
}

variable "docker_username" {
  description = "The name of the dockerhub account."
}

variable "version" {
  description = "The version of the docker image to use when provisioning the analyzer."
}

variable "deploy_id" {
  description = "The unique identifier of the deployment."
}

variable "deploy_type" {
  description = "The type of deployment. Non 'test' deployments are persistent core deployments"
}

/* ECS optimized AMIs per region */
variable "amis" {
  default = {
    us-east-1 = "ami-275ffe31"
  }
}

variable "instance_type" {
  default = "t2.small"
}

variable "app_key" {
  description = "laravel app key"
}

variable "db_password" {
  description = "database password for mongo"
}

variable "s3_key" {
  description = "s3 key for docs"
}

variable "s3_secret" {
  description = "s3 secret for docs"
}

variable "auth_google_id" {
  description = "Google Id"
}

variable "auth_google_secret" {
  description = "Google auth secret"
}