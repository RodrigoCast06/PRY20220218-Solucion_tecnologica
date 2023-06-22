#!/bin/bash
cd ~/tesis-api
npm i
npx pm2 startOrRestart ecosystem.config.js
npx pm2 save
