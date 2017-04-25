/**
 * config.js
 * author: borysn
 * license: MIT
 */

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

// vars
const props = {
  'NUM_WORK_SPACES': 10,
  'USER_HOME': getUserHome(),
  'LAYOUTS_DIR': getUserHome() + '/.config/i3/layouts/'
}

function config() {};

config.props = props;

// set constructor
config.prototype.constructor = config;
// export
module.exports = config;
