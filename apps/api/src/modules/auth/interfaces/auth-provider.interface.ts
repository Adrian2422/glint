import { User } from '../../../../zenstack/models';

export interface JwtPayload {
  sub: string;
  email: string;
  activeTenantId?: string;
  role?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  };
}

export interface IAuthProvider {
  authenticate(email: string, pass: string): Promise<AuthResponse>;
  refresh(refreshToken: string): Promise<AuthResponse>;
  logout(refreshToken: string): Promise<void>;
  validateUser(payload: JwtPayload): Promise<User | null>;
}
