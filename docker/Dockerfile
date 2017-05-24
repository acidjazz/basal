FROM cantenesse/basal:base

MAINTAINER Chris Antenesse

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
