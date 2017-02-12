#!/bin/bash
#
# load i3 layout 
#
# $ load_layout WORKSPACENUM JSON

JSON=$(realpath $2)
NUM=$1

i3-msg "workspace $NUM; append_layout $JSON"

i3-msg exec urxvt
i3-msg exec urxvt
i3-msg exec urxvt
i3-msg exec urxvt
i3-msg exec "urxvt -e cmus"
i3-msg exec "urxvt -e cava"

