import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserCreateArgs } from '../../../zenstack/input';
import { type LoginInput } from './types/login-input.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() data: UserCreateArgs['data']) {
    return this.authService.register(data);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginInput) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }

  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }
}
