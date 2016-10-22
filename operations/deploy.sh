#!/bin/bash
ssh ec2-user@basal.tech 'cd /var/www/html;git reset --hard; git pull origin master;gulp prod'
