/**
 * fsUtil.js
 * author: borysn
 * license: MIT
 *
 * fs utilities
 */
const fs = require('fs');
const chalk = require('chalk');
const config = require('./config');
const exceptions = require('./exceptions');

// fsUtils
function fsUtils() {}

/**
 * isValidWorkspace
 *
 * f(num)
 *
 * isValidWorkspace :: num -> bool
 */
fsUtils.prototype.isValidWorkspace = function(workspace) {
  if (!isNaN(workspace) && workspace > 0 && workspace <= config.props.NUM_WORK_SPACES) {
    return true;
  } else {
    throw new exceptions.INVALID_WORKSPACE_EXCEPTION();
  }
}

/**
 * isValidFile
 *
 * f(file)
 *
 * isValidFile :: file -> bool
 */
fsUtils.prototype.isValidFile = function(file) {
  console.log(file);
  // check exists/read/write
  try {
    fs.accessSync(file, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
  } catch (e) {
    console.log(e);
    console.log(chalk.red('Cannot access file. Check path or permissions.'));
    throw new exceptions.INVALID_FILE_EXCEPTION();
  }
  return true;
}

// set constructor
fsUtils.prototype.constructor = fsUtils;
// export
module.exports = new fsUtils();
