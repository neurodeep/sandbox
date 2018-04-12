#!/bin/sh

HOST=`hostname`
INTERFACES=`xrandr -q | grep ' connected' | wc -l`

# for i in `xrandr -q | grep ' connected' | cut -f1 -d' ' | xargs echo`; do
	#statements
# done

if [ "$INTERFACES" -lt 2 ]; then
	exit 0
fi

case "$HOST" in
	kiev1)
		xrandr --output DVI-I-1 --auto --left-of VGA-0
	;;
	kiev2)
		# one monitor
		;;
	kiev3)
		# one monitor
	;;
	kiev4)
		xrandr --output VGA-0 --auto --right-of DVI-I-1
	;;
	kiev5)
		xrandr --output DVI-0 --auto --right-of VGA-0
	;;
esac

exit 0
