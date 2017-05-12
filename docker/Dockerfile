FROM amazonlinux

MAINTAINER Chris Antenesse

# repo and package setup
RUN touch /etc/sysconfig/network

ADD docker/mongo/mongodb.repo /etc/yum.repos.d/mongodb.repo

RUN curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -

RUN curl https://dl.yarnpkg.com/rpm/yarn.repo -o /etc/yum.repos.d/yarn.repo

RUN yum -y install php70 php70-fpm php70-gd php70-devel php7-pear php70-pecl-yaml php70-mbstring php70-pdo gcc openssl-devel php70-bcmath php70-zip nodejs yarn mongodb-org-server mongodb-org-shell mongodb-org-tools nginx

# php config
RUN sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 200M/' /etc/php.ini

# nginx setup
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf

## mongo setup
RUN echo "extension=mongodb.so" > /etc/php.d/20-mongo.ini

RUN sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf

RUN pecl7 install mongodb

## basal setup
RUN /usr/sbin/useradd web


ADD . /var/www/html

RUN rm -rf /var/www/html/vendor
RUN rm -rf /var/www/html/node_modules
RUN rm -rf /var/www/html/.git

RUN chown -R web /var/www/html/

RUN su - web -c 'curl -sS https://getcomposer.org/installer | php'

RUN su - web -c 'cd /var/www/html && php /home/web/composer.phar install && yarn'

RUN su - web -c 'cd /var/www/html/vendor/acidjazz/larpug/node && yarn'

RUN su - web -c 'chmod -R 777 /var/www/html/storage'

RUN su - web -c 'cd /var/www/html && npm run prod'

RUN chmod 777 /var/www/html/storage/logs -R 

RUN su - web -c 'cd /var/www/html && cp .env.example .env'
RUN su - web -c 'cd /var/www/html && ./artisan key:generate'

ENTRYPOINT ["/var/www/html/docker/startup.sh"]
