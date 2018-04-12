#!/bin/sh

HOST=`hostname`
INTERFACES=`xrandr -q | grep ' connected'|wc -l`

if [ "$INTERFACES" -lt 2 ]; then
	exit 0
fi

case "$HOST" in
	lug1)
		#todo after install
		#xrandr --output HDMI1 --auto --right-of VGA1
		exit 0
	;;
	lug2)
		xrandr --output DVI-I-1 --auto --left-of VGA-0
	;;
	lug3)
		#one monitor
	;;
	lug4)
		xrandr --output HDMI1 --auto --left-of VGA1
	;;
	lug5)
		xrandr --output DVI-0 --auto --right-of VGA-0
	;;
esac

exit 0
