import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import {
  AuthResponse,
  type IAuthProvider,
  JwtPayload,
} from './interfaces/auth-provider.interface';
import { UserCreateArgs } from '../../../zenstack/input';
import { User } from '../../../zenstack/models';
import { AUTH_PROVIDER } from './constants/auth-provider.const';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject(AUTH_PROVIDER) private readonly authProvider: IAuthProvider,
  ) {}

  async register(data: UserCreateArgs['data']) {
    return this.usersService.create({
      data,
    });
  }

  async login(email: string, pass: string): Promise<AuthResponse> {
    return this.authProvider.authenticate(email, pass);
  }

  async logout(refreshToken: string): Promise<void> {
    return this.authProvider.logout(refreshToken);
  }

  async refresh(refreshToken: string): Promise<AuthResponse> {
    return this.authProvider.refresh(refreshToken);
  }

  async validateUser(payload: JwtPayload): Promise<User | null> {
    return this.authProvider.validateUser(payload);
  }
}
