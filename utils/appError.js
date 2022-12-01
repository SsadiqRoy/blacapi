class AppError extends Error {
  constructor(message, code, url, remedy) {
    super(message);
    this.status = `${code}`.startsWith('4') ? 'failed' : 'error';
    this.statusCode = code || 500;
    this.message = message;
    this._message = message;
    this.remedy = remedy;
    this.url = url;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
