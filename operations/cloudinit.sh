
#!/bin/bash
# forged ec2 installation script

# for db instances lets install mongo and then pull in our o
#
echo "[MongoDB]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1" > /etc/yum.repos.d/mongodb.repo
#
#sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf
#
#service mongod start


# turn on epel repo
sed -i '/^\[epel\]$/,/^\[/ s/^enabled=0/enabled=1/' /etc/yum.repos.d/epel.repo
yum -y update

# all the yum packages we need
yum -y install php56 php56-fpm php56-devel php-pear nginx gcc git nodejs npm libyaml libyaml-devel s3cmd jq mongodb-org-server mongodb-org-shell mongodb-org-tools

# put mongodb on the internet (non-prod) 
sed -i 's/bind_ip=127.0.0.1/#bind_ip=127.0.0.1/' /etc/mongod.conf

# mongo and yaml support for php using pear/pecl
pecl install mongo
pecl install yaml
echo "extension=mongo.so" > /etc/php.d/20-mongo.ini
echo "extension=yaml.so" > /etc/php.d/30-yaml.ini

# kill requiretty so we can sudo via ssh
sed -i -e 's/\s*Defaults\s*requiretty$/#Defaults    requiretty/' /etc/sudoers

# add config to nginx
echo '
user  nginx;
worker_processes  4;
pid        /var/run/nginx.pid;

events {
  worker_connections  1024;
}

http {
  include       /etc/nginx/mime.types;
  default_type  application/octet-stream;

  access_log  /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  sendfile        on;
  keepalive_timeout  65;

  gzip on;
  gzip_disable "msie6";


  server {
    listen       80;
    index   index.php;
    server_name  localhost;
    root         /var/www/html/pub/;
    location / {
      if (!-e $request_filename) {
        rewrite ^(.*)$ /index.php;
      }
    }

    location ~ \.php$ {

      fastcgi_split_path_info ^(.+\.php)(/.+)$;
      fastcgi_pass 127.0.0.1:9000;
      fastcgi_index index.php;
      include fastcgi_params;
      fastcgi_param  SCRIPT_FILENAME $document_root$fastcgi_script_name;

      # dev env settings
      fastcgi_param PHP_VALUE "short_open_tag=on \n display_errors=on \n error_reporting=E_ALL";

      # prod env settings
      # fastcgi_param PHP_VALUE "short_open_tag=on \n display_errors=off \n error_reporting=E_ALL";

    }

  }

}

' > /etc/nginx/nginx.conf

chown -R ec2-user:ec2-user /var/www/html

su - ec2-user -c '

echo -e "" > ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no" >> ~/.ssh/config

echo "
-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----

" > /home/ec2-user/.ssh/id_rsa

chmod 0700 /home/ec2-user/.ssh/id_rsa
chmod 0700 /home/ec2-user/.ssh/config

cd ~

curl -sS https://getcomposer.org/installer | php

cd /var/www/html
rm -rf /var/www/html/*
git clone git@github.com:acidjazz/basal.git .

php ~/composer.phar install
npm install

chown -R ec2-user:ec2-user /var/www/html

'

service php-fpm start
service nginx start

