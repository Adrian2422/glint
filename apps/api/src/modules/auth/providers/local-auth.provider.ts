import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../users/users.service';
import { SessionsService } from '../sessions.service';
import {
  AuthResponse,
  IAuthProvider,
  JwtPayload,
} from '../interfaces/auth-provider.interface';
import { User } from '../../../../zenstack/models';
import { UserWithMemberships } from '../../../common/types/user-with-memberships.type';
import { SessionWithUserMemberships } from '../../../common/types/session-with-user-memberships.type';

@Injectable()
export class LocalAuthProvider implements IAuthProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async authenticate(email: string, pass: string): Promise<AuthResponse> {
    const user = (await this.usersService.findUniqueWithPassword({
      where: { email },
      include: {
        memberships: {
          where: { isActive: true },
          take: 1,
        },
      },
      omit: { password: false },
    })) as UserWithMemberships | null;

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const activeTenantId = user.memberships?.[0]?.tenantId;
    const role = user.memberships?.[0]?.role;

    return this.generateTokens(user, activeTenantId, role);
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    const session = (await this.sessionsService.findFirst({
      where: { refreshToken },
      include: {
        user: {
          include: {
            memberships: {
              where: { isActive: true },
              take: 1,
            },
          },
        },
      },
    })) as SessionWithUserMemberships | null;

    if (!session) {
      throw new UnauthorizedException('Session not found');
    }

    if (session.expiresAt < new Date()) {
      await this.sessionsService.delete({ where: { id: session.id } });
      throw new UnauthorizedException('Session expired');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );

    if (!isValid) {
      await this.sessionsService.delete({ where: { id: session.id } });
      throw new UnauthorizedException('Invalid refresh token');
    }

    const activeTenantId =
      session.activeTenantId || session.user.memberships?.[0]?.tenantId;
    const role = session.user.memberships?.[0]?.role;

    const payload: JwtPayload = {
      sub: session.user.id,
      email: session.user.email,
      activeTenantId,
      role,
    };

    const accessToken = this.jwtService.sign(payload);

    await this.sessionsService.update({
      where: { id: session.id },
      data: { lastActivityAt: new Date() },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: session.user.id,
        email: session.user.email,
        firstName: session.user.firstName,
        lastName: session.user.lastName,
      },
    };
  }

  async logout(refreshToken: string): Promise<void> {
    const session = await this.sessionsService.findFirst({
      where: { refreshToken },
    });
    if (session) {
      await this.sessionsService.delete({ where: { id: session.id } });
    }
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.usersService.findUnique({
      where: { id: payload.sub },
    });
  }

  private async generateTokens(
    user: User,
    activeTenantId?: string,
    role?: string,
  ): Promise<AuthResponse> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      activeTenantId,
      role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = Math.random().toString(36).substring(2) + Date.now();
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    const refreshTokenTtl = this.configService.get<number>(
      'JWT_REFRESH_TOKEN_TTL',
      1000 * 60 * 60,
    );

    await this.sessionsService.create({
      data: {
        userId: user.id,
        refreshToken,
        refreshTokenHash,
        activeTenantId,
        expiresAt: new Date(Date.now() + Number(refreshTokenTtl)),
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
