class InvalidRefreshTokenError extends Error {}
class UserCreationError extends Error {}
class IncorrectPasswordError extends Error {}
class UserNotFoundError extends Error {}

module.exports = {
  InvalidRefreshTokenError,
  UserCreationError,
  IncorrectPasswordError,
  UserNotFoundError,
};
