#!/bin/bash
ssh -i ~/.ssh/martian-west2.pem ec2-user@ec2-54-67-53-36.us-west-1.compute.amazonaws.com 'cd /var/www/html;git reset --hard; git pull origin master;npm run prod'
