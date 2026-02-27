import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Obsługa błędów 401 (Unauthorized)
      if (error.status === 401) {
        const url = req.url;
        const errorCode = error.error?.error;

        // Nie odświeżamy, jeśli błąd wystąpił podczas logowania lub samego odświeżania
        if (
          url.includes('/auth/login') ||
          url.includes('/auth/refresh') ||
          url.includes('/auth/logout')
        ) {
          return throwError(() => error);
        }

        // Jeśli błąd wskazuje na konkretne problemy z sesją, wylogowujemy
        const sessionErrors = ['session_expired', 'session_not_found', 'invalid_refresh_token'];
        if (sessionErrors.includes(errorCode)) {
          authService.logout();
          return throwError(() => error);
        }

        // W innym przypadku (np. wygaśnięcie access tokena) próbujemy odświeżyć
        console.log('refreshing token...');
        return authService.refresh().pipe(
          switchMap((response) => {
            const newAuthReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${response.accessToken}`,
              },
            });
            return next(newAuthReq);
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
