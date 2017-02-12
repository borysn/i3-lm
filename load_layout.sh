#!/bin/bash
#
# load i3 layout 
#
# $ load_layout WORKSPACENUM JSON

JSON=$(realpath $2)
NUM=$1

i3-msg "workspace $NUM; append_layout $JSON"

$(urxvt -name neofetch -e bash -c 'neofetch && bash' &)
$(urxvt -name blank &)
$(urxvt -name ranger -e ranger&)
$(urxvt -name clock -e tty-clock -c -C 6 -t &)
$(urxvt -name cmus -e cmus &)
$(urxvt -name cava -e cava &)
 
