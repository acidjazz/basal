#!/bin/bash
ssh -i ~/.ssh/sugar.pem ec2-user@54.172.80.219 'cd /var/www/html;git reset --hard; git pull origin master;npm run prod'

