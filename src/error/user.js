class UserError extends Error {
  constructor(message, errorCode) {
    super();
    this.name = 'UserError';
    this.errorCode = errorCode;
    this.message = message;
    this.date = new Date();
  }
}

module.exports = UserError;
