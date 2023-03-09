$ chmod 400 keyname.pem
$ ssh -i "keyname.pem" ubuntu@ec2-XXX-XXX-XXX-XXX.compute-1.amazonaws.com
$ sudo apt update
$ sudo apt install nodejs npm nginx git -y
$ nodejs -v
# this should print out version 8.10.0
$ curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
$ sudo bash nodesource_setup.sh
$ sudo apt install nodejs
$ nodejs -v
# this should now print out version 10.19.0
$ sudo apt install build-essential
$ git clone https://github.com/your_github_username/MERN-deployment.git
$ sudo rm -rf /var/www/html 
$ sudo mv build /var/www/html
$ sudo service nginx restart
$ sudo grep -rl localhost /var/www/html | xargs sed -i 's/http:\/\/localhost:8000//g'
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
$ echo "deb [ arch=amd64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
$ sudo apt update
$ sudo apt install -y mongodb-org
$ sudo service mongod start
$ service mongod status
$ sudo rm /etc/nginx/sites-available/default
$ sudo vim /etc/nginx/sites-available/default
# MERN-Deployment Configuration 1-16-2020
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
    server_name MERN-Deployment;
    location /api {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;    
    }
    location / {
        try_files $uri $uri/ =404;
    }
    error_page 404 /index.html;
}
$ sudo service nginx restart
$ node server.js

$ sudo npm i pm2 -g
$ pm2 start server.js
$ pm2 status