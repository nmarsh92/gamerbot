#!/usr/bin/env bash
TOKEN=b3603e66c41a6fdfe6bde7fa6c0f3c8ac25c4469
pm2 stop gamerbot
git pull "https://nmarsh92:$TOKEN@github.com/nmarsh92/gamerbot.git"
npm install
pm2 start app.js --name gamerbot -x -- --prod
