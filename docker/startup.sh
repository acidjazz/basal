#!/bin/bash
env
yum -y install openssh-server passwd
useradd basal
echo thePassword | passwd basal --stdin
sed -i -e 's/PasswordAuthentication no/PasswordAuthentication yes/g' /etc/ssh/sshd_config
service sshd start
cat /var/www/html/.env
service php-fpm start
nginx -g 'daemon off;'