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

const exec = require('child_process').exec;
const script = require('commander');
const chalk = require('chalk');

(function() {

  // vars
  const numWorkspaces = 4;

  /**
   * script version 
   */
  script
    .version('1.0.0')

  /**
   * save command
   *
   * f(workspace#)
   */
  script
    .command('save <workspace>')
    .alias('s')
    .action((workspace) => {
      // save
      if (isValidWorkspace(workspace)) {
        save(workspace);
      } else {
        console.log(chalk.red('[Error] invalid workspace selected'));
        process.exit(1);
      }
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
    });

  /**
   * save
   *
   * assuming num is a valid workspace number
   *
   * save :: num => String
   */
  var save = (num) => {
    // exec save command
    exec(getSaveCmd(num), (err, stdout, stderr) => {
      if (err) {
        // catch error
        console.err(err);
      } else if (stdout) {
        // catch stdout
        console.log(stdout);
      } else if (stderr) {
        // catch stderr
        console.err(stderr);
      }
    });
  };

  /**
   * isValidWorkspace
   *
   * f(num)
   *
   * isValidWorkspace :: num -> bool
   */
  var isValidWorkspace = (workspace) => {
    if (!isNaN(workspace) && workspace > 0 && workspace <= numWorkspaces) {
      return true;
    }
    return false;
  };

  /**
   * getSaveCmd
   *
   * getSaveCmd :: num -> String
   */
  var getSaveCmd = (num) => {
   return `i3-save-tree --workspace ${num} > ~/.config/i3/layouts/workspace_${num}.json`;
  };

  /**
   * run script
   */
  script.parse(process.argv);

})();
