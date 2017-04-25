/**
 * load.js
 * author: borysn
 * license: MIT
 */
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const path = require('path');
const fsUtils = require('./fsUtils');
const exceptions = require('./exceptions');
const i3LmCmd = require('./i3LmCmd');

// load
function load() {
  i3LmCmd.call(this);
}
load.prototype = Object.create(i3LmCmd.prototype);

/**
 * exec
 */
load.prototype.exec = function(workspace, file) {
  try {
    if (fsUtils.isValidWorkspace(workspace) && fsUtils.isValidFile(file)) {
      // exec save command
      execSync(getLoadCmd(workspace, file));
      // restore
      restoreUrxvt();
    }
  } catch (e) {
    if (e instanceof exceptions.INVALID_FILE_EXCEPTION) {
      console.log(chalk.red(e.message));
    } else if (e instanceof exceptions.INVALID_WORKSPACE_EXCEPTION) {
      console.log(chalk.red(e.message));
    } else {
      console.log(e);
    }
  }
}

/**
 * restoreUrvxt
 *
 * restore urxvt busy layout
 *
 */
function restoreUrxvt() {
  let apps = [];
  apps.push({name:'neofetch', cmd:'neofetch'});
  apps.push({name:'blank', cmd:'ls'});
  apps.push({name:'ranger', cmd:'ranger'});
  apps.push({name:'clock', cmd:'tty-clock -c -C 2 -t'});
  apps.push({name:'cmus', cmd:'cmus'});
  apps.push({name:'cava', cmd:'cava'});

  let cmd = apps.map((a) => {
    return getUrxvtString(a.name, a.cmd, true);
  }).join(' && ');

  execSync(cmd);
};

/**
 * getUrxvtString
 *
 */
function getUrxvtString(name, cmd, zsh) {
  if (zsh)
    return `(urxvt -name ${name} -e zsh -c "${cmd} && zsh" &)`.toString();
  else
    return `(urxvt -name ${name} -e ${cmd} &)`.toString();
}

/**
 * getLoadCmd
 *
 * getLoadCmd :: num, file -> String
 */
function getLoadCmd(num, file) {
  return `i3-msg "workspace ${num}; append_layout ${file}"`.toString();
}

// set constructor
load.prototype.constructor = load;
// export
module.exports = load;
