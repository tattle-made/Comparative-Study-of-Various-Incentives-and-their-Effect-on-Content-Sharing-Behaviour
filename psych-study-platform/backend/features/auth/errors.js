class InvalidRefreshTokenError extends Error {}
class UserCreationError extends Error {}
class IncorrectPasswordError extends Error {}

module.exports = {
  InvalidRefreshTokenError,
  UserCreationError,
  IncorrectPasswordError,
};
