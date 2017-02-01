#!/usr/bin/env node

/**
 * i3-lm
 *
 * i3 layout manager
 * save and load i3 layouts
 *
 * i.e.
 *
 * save the workspace 2 layout
 * $ i3-lm -s 2
 *
 * load a layout to workspace 4
 * $ i3-lm -l 4 layout.json
 *
 * display help
 * $ i3-lm -h 
 *
 */

const script = require('commander');

(function() {

  script
    .version('1.0.0')
    .option('-s, --save <workspace #>', 'Save layout')
    .option('-l, --load <workspace #> <layout.json>', 'Load layout')
    .option('-h, --help', 'show help')
    .parse(process.argv);

  console.log(script);
  console.log(script.save);
  console.log(script.load);
  console.log(script.help);

})();
