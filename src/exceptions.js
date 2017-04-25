/**
 * exceptions.js
 * author: borysn
 * license: MIT
 *
 * custom exceptions for i3lm
 */

// exceptions
function exceptions() {}

/**
 * invalid file
 */
exceptions.INVALID_FILE_EXCEPTION = function(message) {
  this.name = 'INVALID_FILE_EXCEPTION';
  this.message = message || this.name;
  // inherit Error behavior
  this.stack = (new Error()).stack;
}
// inherit Error behavior
exceptions.INVALID_FILE_EXCEPTION.prototype = Object.create(Error.prototype);
exceptions.INVALID_FILE_EXCEPTION.prototype.constructor = this.INVALID_FILE_EXCEPTION;

/**
 * invalid workspace
 */
exceptions.INVALID_WORKSPACE_EXCEPTION = function(message) {
  this.name = 'INVALID_WORKSPACE_EXCEPTION';
  this.message = message || this.name;
  // inherit Error behavior
  this.stack = (new Error()).stack;
}
// inherit Error behavior
exceptions.INVALID_WORKSPACE_EXCEPTION.prototype = Object.create(Error.prototype);
exceptions.INVALID_WORKSPACE_EXCEPTION.prototype.constructor = this.INVALID_WORKSPACE_EXCEPTION;

// set constructor
exceptions.prototype.constructor = exceptions;
// export
module.exports = exceptions;
