#!/bin/bash
ssh -i ~/.ssh/sugar.pem ec2-user@54.172.80.219 'cd /var/www/html;php ~/compposer.phar update;npm update'
