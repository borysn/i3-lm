// custom exceptions
module.exports = function() {

  // invalid file
  this.INVALID_FILE_EXCEPTION = function(message) {
    this.name = 'INVALID_FILE_EXCEPTION';
    this.message = message || this.message;
    this.stack = (new Error()).stack;
  }
  this.INVALID_FILE_EXCEPTION.prototype = Object.create(Error.prototype);
  this.INVALID_FILE_EXCEPTION.prototype.constructor = this.INVALID_FILE_EXCEPTION;

  // invalid workspace
  this.INVALID_WORKSPACE_EXCEPTION = function(message) {
    this.name = 'INVALID_WORKSPACE_EXCEPTION';
    this.message = message || this.name;
    this.stack = (new Error()).stack;
  }
  this.INVALID_WORKSPACE_EXCEPTION.prototype = Object.create(Error.prototype);
  this.INVALID_WORKSPACE_EXCEPTION.prototype.constructor = this.INVALID_WORKSPACE_EXCEPTION;
}
