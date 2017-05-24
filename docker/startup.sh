#!/bin/bash
env
yum -y install openssh-server passwd vim sudo
useradd basal
echo thePassword | passwd basal --stdin
sed -i -e 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
service sshd start
echo "basal    ALL=(ALL)       ALL" >> /etc/sudoers
cd /var/www/html
export APP_KEY=$(php ./artisan key:generate|awk -F'[' '{print $2}'|awk -F']' '{print $1}')
cat /var/www/html/.env
service php-fpm start
nginx -g 'daemon off;'