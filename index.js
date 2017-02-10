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

const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const script = require('commander');
const chalk = require('chalk');

(function() {

  // vars
  const numWorkspaces = 4;

  /**
   * script version 
   */
  script.version('1.0.0');

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
      if (isValidWorkspace(workspace) && isValidFile(file)) {
        load(workspace, path.resolve(file));
      } else {
        console.log(chalk.red('[Error] invalid file selected'));
      }
    });

  /**
   * load
   *
   * assuming num is a valid workspace number
   * assuming file is a readable file
   *
   * load :: num, file => String
   */
  var load = (num, file) => {
    // exec save command
    execSync(getLoadCmd(num, file));
    // restore
    restoreUrxvt();
  };

  /**
   * save
   *
   * assuming num is a valid workspace number
   *
   * save :: num => String
   */
  var save = (num) => {
    execSync(getSaveCmd(num));
    // edit layout file
    editLayout(`~/.config/i3/layouts/workspace_${num}.json`);
  };

  /**
   * restoreUrvxt
   *
   * restore urxvt busy layout
   *
   */
  var restoreUrxvt = () => {
    let cmd = '$(urxvt &)';
    cmd += ' && $(urxvt &)';
    cmd += ' && $(urxvt &)';
    cmd += ' && $(urxvt &)';
    cmd += ' && $(urxvt &)';
    cmd += ' && $(urxvt &)';
    execSync(cmd);
  }

  /**
   * edit layout
   *
   */
  var editLayout = (file) => {
    // read file
    fs.readFile(file, (err, fd) => {
      if (err) {
        console.log(chalk.red(`${err}`));
        console.log(chalk.red('[Error] Cannot read file'));
        process.exit(1);
      } else {
        // modify file contents & write
        // replace "// " before "class"
        // replace "// " before "instance"
        // replace "// " before "title"
        // replace "// " before "transient_for"
        const data = fd.toString()
          .replace(/\/\/\s\"class\"/g,'"class"')
          .replace(/\/\/\s\"instance\"/g, '"instance"')
          .replace(/\/\/\s\"title\"/g, '"title"')
          .replace(/\/\/\s\"transient_for\"/g, '"transient_for"');

        fs.writeFile(f, data, 'utf8', (err) => {
            if (err) {
              console.log(chalk.red(`${err}`));
              process.exit(1);
            } 
          });
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
   * isValidFile
   *
   * f(file)
   *
   * isValidFile :: file -> bool
   */
  var isValidFile = (file) => {
    // check exists/read/write 
    try {
      fs.accessSync(file, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
    } catch (e) {
      console.log(chalk.red('Cannot access file. Check path or permissions.'));
      return false;
    }
    return true;
  };

  /**
   * getSaveCmd
   *
   * getSaveCmd :: num -> String
   */
  var getSaveCmd = (num) => {
   return `i3-save-tree --workspace ${num} > ~/.config/i3/layouts/workspace_${num}.json`.toString();
  };

  /**
   * getLoadCmd
   *
   * getLoadCmd :: num, file -> String
   */
  var getLoadCmd = (num, file) => {
    return `i3-msg "workspace ${num}; append_layout ${file}"`.toString();
  };

  /**
   * run script
   */
  script.parse(process.argv);

})();
