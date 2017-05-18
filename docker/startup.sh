#!/bin/bash
env
yum -y install openssh-server passwd
service sshd start
echo thePassword | passwd basal --stdin
cat /var/www/html/.env
sleep 1000000000
#service php-fpm start
#nginx -g 'daemon off;'
#service --status-all
#echo "NGINX LOG"
#cat /var/log/nginx/*
#echo "PHP FPM LOG"
#cat /var/log/php-fpm/7.0/*
