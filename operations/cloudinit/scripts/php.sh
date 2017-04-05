#!/bin/bash

# php7
yum -y install php70 php70-fpm php70-devel php7-pear php70-pecl-yaml php70-mbstring php70-pdo php70-pecl-imagick php70-bcmath php70-zip

# we need to alter /etc/php.ini upload_max_filesize = 2M (s/2M/200M/g)
sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 200M/' /etc/php.ini

service php-fpm start

