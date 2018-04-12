#!/bin/sh
# Set the resolution
# $ cvt 1280 1024
xrandr --newmode "1280x1024"  109.00  1280 1368 1496 1712  1024 1027 1034 1063 -hsync +vsync
xrandr --addmode VBOX0 "1280x1024"
xrandr --output VBOX0 --mode "1280x1024"
