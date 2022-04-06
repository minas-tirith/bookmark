class ApiError extends Error {
  constructor(message, status = 500, errors) {
    super(message);
    Error.captureStackTrace(this, this.constructor); // capturing stack trace

    this.type = this.constructor.name; // saving class name
    this.errors = errors;
    this.status = status;
  }
}

class BadRequestError extends ApiError {
  constructor(message = 'Bad API request', status = 400, errors = []) {
    super(message, status, errors);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = 'Wrong credentials', status = 401) {
    super(message, status);
  }
}

class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden', status = 403) {
    super(message, status);
  }
}

class ResourceNotFoundError extends ApiError {
  constructor(resourceType, resourceId, status = 404) {
    const message = `${resourceType} ${resourceId} not found`;
    super(message, status);
  }
}

class ValidationError extends BadRequestError {
  constructor(message = 'Bad body format', errors = []) {
    super(message, 400, errors);
  }
}

function assert(condition, ErrorType = Error, ...myArgs) {
  if (condition) {
    throw new ErrorType(...myArgs);
  }
}

module.exports = {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ResourceNotFoundError,
  ValidationError,
  assert,
};
