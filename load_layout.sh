#!/bin/bash

i3-msg "workspace 2; append_layout /home/p3pt/.config/i3/layouts/workspace_2.json"

(urxvt && ranger &)
(cmus &)
(cava &)
(neofetch &)
(clock &)
(urxvt &)
