#!/bin/sh

echo "deploy start"

# stop the old version
##stop backend
pkill gunicorn
##stop frontend
pm2 stop 0
pm2 kill
var1=$(sudo netstat -tulp | grep 3000)
pid_front=$(echo ${var1} | cut -d " " -f7 | cut -c -6)
kill -9 ${pid_front}

# open virtual environment
source venv/bin/activate
## start backend
cd backend
sudo pip install -r requirements.txt
gunicorn backend.wsgi -D

## start frontend
cd ../frontend
sudo npm i
npm run build
pm2 start npm --name "next" -- start

cd ../

