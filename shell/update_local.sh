#!/bin/bash
DIR="/tmp/nm`date`"

mkdir -p $DIR
cd $DIR
pkill chrome
apt-get download google-chrome-stable
dpkg -x google-chrome-stable*.deb google-chrome-stable
rsync -ravt --delete --inplace google-chrome-stable/opt/google/chrome/ $HOME/.local/opt/google/chrome
google-chrome &

exit 0
