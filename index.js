#!/usr/bin/env node

/**
 * i3-lm
 * author: borysn
 * license: MIT
 *
 *
 *
 * i3 layout manager
 * save and load i3 layouts
 *
 * i.e.
 *
 * save the workspace 2 layout
 * $ i3-lm s 2
 *
 * load a layout to workspace 4
 * $ i3-lm l 4 layout.json
 *
 * display help
 * $ i3-lm -h
 *
 */
const fs = require('fs');
const path = require('path');
const script = require('commander');
const chalk = require('chalk');
const save = require('./src/save');
const load = require('./src/load');
const config = require('./src/config');
const help = require('./src/config');

// i3-lm
(function() {

  /**
   * script version
   */
  script.version('1.0.0');

  /**
   * save command
   *
   * f(workspace)
   */
  script
    .command('save <workspace>')
    .alias('s')
    .action((workspace) => {
      let s = new save();
      s.exec(workspace);
    });

  /**
   * load command
   *
   * f(workspace, file)
   */
  script
    .command('load <workspace> <file>')
    .alias('l')
    .action((workspace, file) => {
      let l = new load();
      l.exec(workspace, path.resolve(file));
    });

  /**
   * run script
   */
  script.parse(process.argv);

})();
