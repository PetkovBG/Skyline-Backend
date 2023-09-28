class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message || "Something went wrong...");
    this.statusCode = statusCode || 500;
  }
}

module.exports = ErrorResponse;
