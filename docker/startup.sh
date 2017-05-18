#!/bin/bash
env
cat /var/www/html/.env
service php-fpm start
nginx -g 'daemon off;'
service --status-all
echo "NGINX LOG"
cat /var/log/nginx/*
echo "PHP FPM LOG"
cat /var/log/php-fpm/7.0/*