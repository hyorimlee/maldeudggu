#!/bin/sh

echo "deploy start"
pkill gunicorn
#var1=$(sudo netstat -tulp | grep 3000)
#pid_front=$(echo ${var1} | cut -d " " -f7 | cut -c -6)
#kill -9 ${pid_front}
pm2 stop 0

source venv/bin/activate
cd backend
pip install -r requirements.txt
gunicorn backend.wsgi -D
cd ../frontend
npm i
npm run build
pm2 start npm -- start


