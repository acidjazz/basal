#!/bin/bash

# install mongodb and its php support

echo "[MongoDB]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1" > /etc/yum.repos.d/mongodb.repo

yum -y install mongodb-org-server mongodb-org-shell mongodb-org-tools gcc openssl-devel

echo "extension=mongodb.so" > /etc/php.d/20-mongo.ini


# put mongodb on the internet (non-prod) 
sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf

# mongo and yaml support for php using pear/pecl
pecl7 install mongodb

# just need libs, not the server
#service mongod start
service php-fpm restart

