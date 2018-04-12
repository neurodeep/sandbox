#!/bin/bash
TMPDIR="/var/tmp/${USER}"

# Create user folder for cache
if [ "x$HOSTNAME" != "xkiev4" ]; then
    sshfs -o ssh_command="sshpass -f ${HOME}/.ssh/pass ssh" kiev4:$TMPDIR $TMPDIR
fi
