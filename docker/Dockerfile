FROM amazonlinux

MAINTAINER Chris Antenesse

# repo and package setup
RUN touch /etc/sysconfig/network

ADD docker/mongo/mongodb.repo /etc/yum.repos.d/mongodb.repo

RUN curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -

RUN curl https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo

RUN yum -y install php70 php70-fpm php70-devel php7-pear php70-pecl-yaml php70-mbstring php70-pdo php70-pecl-imagick php70-bcmath php70-zip nodejs yarn mongodb-org-server mongodb-org-shell mongodb-org-tools gcc openssl-devel nginx

# php config
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 200M/' /etc/php.ini

RUN service php-fpm start

# nginx setup
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf

RUN service nginx start

## mongo setup
RUN echo "extension=mongodb.so" > /etc/php.d/20-mongo.ini

RUN sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf

RUN pecl7 install mongodb

RUN service php-fpm restart

## basal setup
RUN /usr/sbin/useradd web

RUN su - web -c 'curl -sS https://getcomposer.org/installer | php'

ADD . /var/www/html

RUN chown web -R /var/www/html

RUN su - web -c 'cd /var/www/html && php /home/web/composer.phar install && yarn'

RUN su - web -c 'cd /var/www/html/vendor/acidjazz/larpug/node && yarn'

RUN su - web -c 'chmod -R 777 /var/www/html/storage'

RUN su - web -c 'cd /var/www/html && npm run prod'

RUN chmod 777 /var/www/html/storage/logs -R 

RUN su - web -c 'cd /var/www/html && cp .env.example .env'
RUN su - web -c 'cd /var/www/html && ./artisan key:generate'
