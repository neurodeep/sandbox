#!/usr/local/bin/bash

# nikolay@telinta.com

id=$1
realm=$2
nonce=$3
uri=$4
method=$5
alg=MD5
password=$6

if [ "x${password}" = "x" ]
then
	echo "usage: $0 id realm nonce uri method password"
	exit 1
fi

SYSTEM=`uname`
if [ ${SYSTEM} = "Linux" ]
then
	P1=`echo -n ${id}:${realm}:${password} | md5sum | cut -d' ' -f1`
	P3=`echo -n ${method}:${uri} | md5sum | cut -d' ' -f1`
	echo `echo -n ${P1}:${nonce}:${P3} | md5sum | cut -d' ' -f1`
else
	md5 -qs `md5 -qs $id:$realm:$password`:$nonce:`md5 -qs $method:$uri`
fi
