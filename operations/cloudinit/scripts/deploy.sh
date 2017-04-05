#!/bin/bash

# install all neccessary php and npm packages needed
# set permissions for local storage

chown -R ec2-user:ec2-user /var/www/html

su - ec2-user -c '

cd ~

curl -sS https://getcomposer.org/installer | php

cd /var/www/html

php ~/composer.phar install
chmod -R 777 /var/www/html/storage

npm install
npm i --prefix vendor/acidjazz/larpug/node
chown -R ec2-user:ec2-user /var/www/html
chmod -R 777 /var/www/html/storage
npm run prod

'
