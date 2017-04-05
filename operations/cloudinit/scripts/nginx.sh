#!/bin/bash

# nginx 

yum -y install nginx 

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
    listen 81;
    return 301 https://$host$request_uri;
  }


  server {
    listen       80;
    index   index.php;
    server_name  localhost;
    client_max_body_size 100m;
    client_body_timeout 180s;
    root         /var/www/html/public/;
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

    }

  }

}
' > /etc/nginx/nginx.conf

chown -R ec2-user:ec2-user /var/www/html

service nginx start
