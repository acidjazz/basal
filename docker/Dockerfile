FROM amazonlinux

MAINTAINER Chris Antenesse

## php Setup

RUN yum -y install php70 php70-fpm php70-devel php7-pear php70-pecl-yaml php70-mbstring php70-pdo php70-pecl-imagick php70-bcmath php70-zip

RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 200M/' /etc/php.ini

RUN touch /etc/sysconfig/network

RUN service php-fpm start


## node setup
RUN curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

RUN yum -y install nodejs

RUN npm install npm@latest -g


# nginx setup
RUN yum -y install nginx

ADD nginx/nginx.conf /etc/nginx/nginx.conf

RUN service nginx start

## mongo setup

ADD mongo/mongodb.repo /etc/yum.repos.d/mongodb.repo

RUN yum -y install mongodb-org-server mongodb-org-shell mongodb-org-tools gcc openssl-devel

RUN echo "extension=mongodb.so" > /etc/php.d/20-mongo.ini

RUN sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf

RUN pecl7 install mongodb

RUN service php-fpm restart

## basal setup

RUN curl -sS https://getcomposer.org/installer | php


RUN cd /var/www/html

RUN git clone git@github.com:acidjazz/basal.git

RUN npm install

RUN npm i --prefix vendor/acidjazz/larpug/node

RUN chmod -R 777 /var/www/html/storage

RUN npm run prod
