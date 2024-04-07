class CustomError extends Error {
  constructor(message, statusCode, originalError = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.originalError = originalError;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ServerError extends CustomError {
  constructor(err) {
    super('Server Error', 500, err);
    this.errorType = 'CatchError';
  }
}

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message, 401);
    this.errorType = 'UnauthorizedError';
  }
}

class ValidateError extends CustomError {
  constructor(message, validatorErrors) {
    super(message, 400);
    this.errorType = 'ValidateError';
    this.validatorErrors = validatorErrors;
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400);
    this.errorType = 'BadRequestError';
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message, 403);
    this.errorType = 'ForbiddenError';
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message, 409);
    this.errorType = 'ConflictError';
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
    this.errorType = 'NotFoundError';
  }
}

module.exports = {
  CustomError,
  ServerError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ValidateError,
  ConflictError,
  NotFoundError,
};
