export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
