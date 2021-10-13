class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};

class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};

class ConflictsError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};

module.exports = {
  BadRequestError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictsError
}