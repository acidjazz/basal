#!/bin/bash
env
yum -y install openssh-server passwd
useradd basal
echo thePassword | passwd basal --stdin
sed -i -e 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
service sshd start
cat /var/www/html/.env
sleep 1000000000
#service php-fpm start
#nginx -g 'daemon off;'
#service --status-all
#echo "NGINX LOG"
#cat /var/log/nginx/*
#echo "PHP FPM LOG"
#cat /var/log/php-fpm/7.0/*
