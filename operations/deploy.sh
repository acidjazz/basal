#!/bin/bash

ssh ec2-user@basal.tech 'cd /var/www/html; git pull origin master;php ~/compposer.phar update; gulp prod'
