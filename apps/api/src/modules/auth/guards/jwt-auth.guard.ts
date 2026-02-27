import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { JwtPayload } from '../interfaces/auth-provider.interface';
import { AuthException } from '../exceptions/auth.exception';
import { AuthErrorCode } from '@glint/shared';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new AuthException(AuthErrorCode.JWT_INVALID, 'JWT token not found');
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new AuthException(
        AuthErrorCode.UNAUTHORIZED,
        'JWT verification failed',
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const header = request.headers['authorization'] as string | null;
    const [type, token] = header?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
