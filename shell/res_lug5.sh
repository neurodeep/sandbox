#!/bin/sh
# Set the resolution
# $ cvt 1920 1080
xrandr --newmode "1680x1050"  146.25  1680 1784 1960 2240  1050 1053 1059 1089 -hsync +vsync
xrandr --addmode VBOX0 "1680x1050"
xrandr --output VBOX0 --mode "1680x1050"
