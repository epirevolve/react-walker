#!/bin/bash

echo 'start copy files from origin to copy'
cp -r -f /src_origin/. /src_copy
echo 'fin copy files'

cd /src_copy
echo `pwd`
echo 'start npm install'
npm install
echo 'fin npm install'

cd /server
echo `pwd`
echo 'start main.js'
node main.js