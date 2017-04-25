/**
 * help.js
 * author: borysn
 * license: MIT
 */
const i3LmCmd = require('i3LmCmd');

// help
function help() {
  i3LmCmd.call(this);
}

/**
 * exec
 */
help.prototype.exec = function() {}

// set constructor
help.prototype.constructor = help;
// export
module.exports = help;
