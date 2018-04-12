#!/bin/bash
ACTIVE="/var/tmp/${USER}"
REMOTE="${ACTIVE}/remote"
DIRS="icons chrome sublime thunderbird purple hg svn"
declare -A LINKS=(
	["icons"]=".icons"
	["chrome"]=".config/google-chrome"
	["sublime"]=".config/sublime-text-3"
	["purple"]=".purple"
	["thunderbird"]=".thunderbird"
	["hg"]="hg"
	["svn"]="svn"
)

# Create user folder for cache
if [ ! -d "$ACTIVE/cache" ]; then
    mkdir -p $ACTIVE/cache
fi

for i in $DIRS; do
    rm $HOME/${LINKS[$i]}
	if [ -d "$ACTIVE/$i" ]; then
		ln -s $ACTIVE/$i $HOME/${LINKS[$i]}
	else
		ln -s $REMOTE/$i $HOME/${LINKS[$i]}
	fi
done

exit 0
