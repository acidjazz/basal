#!/bin/bash

# setup access to our s3 bucket containing credentials
# grab our deploy key

ROLE=recipegen-deploy
BUCKET=recipegen2-vault
REPO=git@github.com:martiansf/recipegen.git

wget -O /home/ec2-user/mycreds -q "http://169.254.169.254/latest/meta-data/iam/security-credentials/$ROLE"

sed -i '/^\[epel\]$/,/^\[/ s/^enabled=0/enabled=1/' /etc/yum.repos.d/epel.repo
yum -y update
yum -y install jq s3cmd git

SECRET_KEY=`jq -r '.SecretAccessKey' </home/ec2-user/mycreds`
ACCESS_KEY=`jq -r '.AccessKeyId' </home/ec2-user/mycreds`
TOKEN=`jq -r '.Token' </home/ec2-user/mycreds`

cat > /home/ec2-user/.s3cfg <<EOM
[default]
access_key = $ACCESS_KEY
secret_key = $SECRET_KEY
security_token = $TOKEN
EOM

chown -R ec2-user:ec2-user /home/ec2-user/.s3cfg

echo -e "" > /home/ec2-user/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no" >> /home/ec2-user/.ssh/config

s3cmd get s3://$BUCKET/id_rsa /home/ec2-user/.ssh/id_rsa

chmod 0700 /home/ec2-user/.ssh/id_rsa
chmod 0700 /home/ec2-user/.ssh/config

chown -R ec2-user:ec2-user /home/ec2-user/.ssh

mkdir /var/www
mkdir /var/www/html
chown -R ec2-user:ec2-user /var/www/

su ec2-user -c " 

cd /var/www/html
git clone $REPO .

"

# grab our scripts

cp -rp /var/www/html/operations/cloudinit/scripts /home/ec2-user/

# execute
/home/ec2-user/scripts/credentials.sh
/home/ec2-user/scripts/node.sh
/home/ec2-user/scripts/nginx.sh
/home/ec2-user/scripts/php.sh
/home/ec2-user/scripts/mongo.sh
/home/ec2-user/scripts/deploy.sh
