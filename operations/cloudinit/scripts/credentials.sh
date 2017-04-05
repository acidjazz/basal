#!/bin/bash

BUCKET=recipegen-vault
ENVIRONMENT=production

s3cmd get s3://$BUCKET/env-$ENVIRONMENT /var/www/html/.env
chown ec2-user:ec2-user /var/www/html/.env
