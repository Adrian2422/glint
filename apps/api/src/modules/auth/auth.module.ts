import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { SessionsService } from './sessions.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalAuthProvider } from './providers/local-auth.provider';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AUTH_PROVIDER } from './constants/auth-provider.const';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'secret'),
        signOptions: {
          expiresIn: configService.get<number>(
            'JWT_ACCESS_TOKEN_TTL',
            1000 * 60 * 15,
          ),
        },
      }),
    }),
  ],
  providers: [
    AuthService,
    SessionsService,
    JwtStrategy,
    {
      provide: AUTH_PROVIDER,
      useClass: LocalAuthProvider,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, AUTH_PROVIDER],
})
export class AuthModule {}
