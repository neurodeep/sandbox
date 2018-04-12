#!/bin/bash
HOME="/home/users/nikolaym"
BACKUP="$HOME/backup"

HIDDEN="bashrc screenrc hgrc ssh vimrc xprofile profile"
SCRIPTS="rsync.sh "

# backup dot files
for i in $HIDDEN; do
	cp -r $HOME/.$i $BACKUP/hidden/
done

# backup scripts
for i in $SCRIPTS; do
	cp -r $HOME/scripts/$i $BACKUP/scripts/
done

# backup tasks (once?)

# rsync to server (rarely?)
