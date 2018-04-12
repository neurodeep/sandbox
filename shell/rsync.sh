#!/bin/sh
#@crontab 0 2 * * * /home/users/nikolaym/scripts/rsync.sh >> /var/tmp/nikolaym/rsync.log 2>&1

USER="${USER:-`whoami`}" # for crontab runs
ACTIVE="/var/tmp/$USER"
BACKUP="$HOME/backup/rsync"
DIRS="chrome sublime thunderbird purple hg svn"

USERS=$(users | xargs -n1 | sort | uniq | xargs echo)
CLASS=2

date

if [ "x$USERS" != "x$USER" ] || [ "x$USERS" != "x" ]; then
	echo "I'm not alone, lets be gentle ($USERS)"
    CLASS=3
fi

for i in $DIRS; do
	echo "Will sync $ACTIVE/$i/ to $BACKUP/$i/"
	ionice -c $CLASS rsync -ravt --delete --inplace --bwlimit=10000 $ACTIVE/$i/ $BACKUP/$i/
	# ionice -c $CLASS unison -auto $ACTIVE/$i/ $BACKUP/$i/
done

exit 0

# TODO
# rsync to kiev1

# TODO handle --delete
# rsync -ravtu --inplace $ACTIVE $BACKUP
# rsync -ravtu --inplace $BACKUP $ACTIVE
