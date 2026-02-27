export enum AuthErrorCode {
  // Session errors
  SESSION_NOT_FOUND = 'session_not_found',
  SESSION_EXPIRED = 'session_expired',
  INVALID_REFRESH_TOKEN = 'invalid_refresh_token',

  // Credentials errors
  INVALID_CREDENTIALS = 'invalid_credentials',

  // Token errors
  JWT_EXPIRED = 'jwt_expired',
  JWT_INVALID = 'jwt_invalid',

  // General
  UNAUTHORIZED = 'unauthorized',
}
