#!/bin/bash
#
# load i3 layout 
#
# $ load_layout WORKSPACENUM JSON

JSON=$(realpath $2)
NUM=$1

i3-msg "workspace $NUM; append_layout $JSON"

$(urxvt &)
$(urxvt &)
$(urxvt &)
$(urxvt &)
$(urxvt -name cmus -e cmus &)
$(urxvt -name cava -e cava &)
 
