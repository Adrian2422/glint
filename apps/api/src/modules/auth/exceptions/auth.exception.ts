import { HttpException, HttpStatus } from '@nestjs/common';
import { AuthErrorCode } from '../enums/auth-error-codes.enum';

export class AuthException extends HttpException {
  constructor(
    public readonly errorCode: AuthErrorCode,
    public readonly message: string,
    public readonly statusCode: HttpStatus = HttpStatus.UNAUTHORIZED,
  ) {
    super(
      {
        statusCode,
        error: errorCode,
        message,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
