import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';

import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError
} from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;

const refreshTokenSubject =
  new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const authService = inject(AuthService);
    const router = inject(Router);

    // Don't attach access token to login/refresh
    if (
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/refresh')
    ) {
      return next(req);
    }

    const token = authService.getAccessToken();

    let authReq = req;

    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });
    }

    return next(authReq).pipe(

      catchError((error: HttpErrorResponse) => {

        // Access token expired
        if (error.status !== 401) {
          return throwError(() => error);
        }

        // Another request is already refreshing
        if (isRefreshing) {

          return refreshTokenSubject.pipe(

            filter(token => token !== null),

            take(1),

            switchMap(token => {

              const retryRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`
                },
                withCredentials: true
              });

              return next(retryRequest);
            })
          );
        }

        // Start refresh
        isRefreshing = true;

        refreshTokenSubject.next(null);

        return authService.refreshToken().pipe(

          switchMap(response => {

            isRefreshing = false;

            const newAccessToken =
              response.accessToken;

            refreshTokenSubject.next(
              newAccessToken
            );

            // Retry original request
            const retryRequest = req.clone({
              setHeaders: {
                Authorization:
                  `Bearer ${newAccessToken}`
              },
              withCredentials: true
            });

            return next(retryRequest);
          }),

          catchError(refreshError => {

            isRefreshing = false;

            refreshTokenSubject.next(null);

            // Refresh token expired/invalid
            authService.clearToken();

            router.navigate(['/login']);

            return throwError(() => refreshError);
          })
        );
      })
    );
  };