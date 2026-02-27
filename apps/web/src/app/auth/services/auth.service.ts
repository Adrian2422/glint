import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, of, Observable } from 'rxjs';
import { AuthResponse, User } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:3000/api'; // Assuming default port and prefix

  private readonly _currentUser = signal<User | null>(null);
  readonly currentUser = computed(() => this._currentUser());
  readonly isAuthenticated = computed(() => !!this._currentUser());

  constructor() {
    this.loadSession();
  }

  login(email: string, pass: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password: pass })
      .pipe(
        tap((response) => this.setSession(response)),
        catchError((error) => {
          console.error('Login failed', error);
          throw error;
        }),
      );
  }

  logout(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this.http.post(`${this.apiUrl}/auth/logout`, { refreshToken }).subscribe();
    }
    this.clearSession();
    this.router.navigate(['/login']);
  }

  refresh(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.logout();
      return of({} as AuthResponse);
    }

    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken }).pipe(
      tap((response) => this.setSession(response)),
      catchError((error) => {
        this.logout();
        throw error;
      }),
    );
  }

  private setSession(authResponse: AuthResponse): void {
    localStorage.setItem('accessToken', authResponse.accessToken);
    localStorage.setItem('refreshToken', authResponse.refreshToken);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    this._currentUser.set(authResponse.user);
  }

  private clearSession(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this._currentUser.set(null);
  }

  private loadSession(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        this._currentUser.set(JSON.parse(userJson));
      } catch (_e) {
        this.clearSession();
      }
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
