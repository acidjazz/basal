#!/bin/bash

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -
yum -y install nodejs
npm install npm@latest -g
