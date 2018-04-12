#!/bin/sh
guake --rename-tab="    psg    " --execute-command="cd && psg" &
sleep 3 && guake --new-tab=2 --rename-tab="    psj    " --execute-command="cd && psj" &
sleep 3 && guake --new-tab=3 --rename-tab="    psd    " --execute-command="cd && psd" &
sleep 3 && guake --new-tab=4 --rename-tab="    box    " --execute-command="cd && clear" &
sleep 3 && guake --new-tab=5 --rename-tab="  drupal  " --execute-command="cd && clear" &
sleep 3 && guake --new-tab=6 --rename-tab="distributor" --execute-command="cd && clear" &
sleep 3 && guake --new-tab=7 --rename-tab="    svn    " --execute-command="cd ~/mnt/svn && clear" &
sleep 3 && guake --new-tab=8 --rename-tab="    hg    " --execute-command="cd ~/mnt/hg && clear" &
sleep 3 && guake --new-tab=9 --rename-tab="public_html" --execute-command="cd ~/mnt/public_html && clear" &
sleep 3 && guake --new-tab=10 --rename-tab="downloads" --execute-command="cd ~/mnt/downloads && clear" &
sleep 3 && guake --new-tab=11 --rename-tab="   misc   " --execute-command="cd && clear" &
