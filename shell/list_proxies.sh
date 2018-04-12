#!/bin/bash

# nikolaym

PROXY_IP=$1;

if [ "x${PROXY_IP}" = "x" ];
then
        echo "Usage: $0 <proxy IP>";
        exit 1;
fi

for i in /porta_var/sipenv-*; do
    NODE_IP=${i:18}
    grep $PROXY_IP /porta_var/sipenv-$NODE_IP/etc/b2bua.conf > /dev/null
    if [[ $? == 0 ]]; then
        echo ===================================
        echo Node: $NODE_IP
        echo -e '\033[0;31m'
        /porta_var/telinta/porta-sip-additions/scripts/rtpproxy_reconfig/list_proxies.sh $NODE_IP | grep ERROR
        echo -e '\033[0m'
        tail /porta_var/sipenv-$NODE_IP/log/b2bua.log | grep DEBUG
        echo
    fi
done
