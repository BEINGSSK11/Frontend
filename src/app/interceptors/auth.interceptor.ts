import {
  HttpInterceptorFn,
  HttpErrorResponse
} from '@angular/common/http';

import {
  inject
} from '@angular/core';

import {
  catchError,
  switchMap,
  throwError
} from 'rxjs';

import {
  AuthService
} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const authService =
      inject(AuthService);

    const token =
      authService.getAccessToken();

    let authReq = req;

    // Add access token
    if (token) {

      authReq = req.clone({
        setHeaders: {
          Authorization:
            `Bearer ${token}`
        }
      });

    }

    return next(authReq).pipe(

      catchError(
        (error: HttpErrorResponse) => {

          // Access token expired
          if (
            error.status === 401 &&
            !req.url.includes('/auth/login') &&
            !req.url.includes('/auth/refresh')
          ) {

            return authService
              .refreshToken()
              .pipe(

                switchMap(response => {

                  const retryRequest =
                    req.clone({
                      setHeaders: {
                        Authorization:
                          `Bearer ${response.accessToken}`
                      }
                    });

                  return next(
                    retryRequest
                  );

                }),

                catchError(refreshError => {

                  // Refresh token also expired
                  return throwError(
                    () => refreshError
                  );

                })

              );
          }

          return throwError(
            () => error
          );

        }
      )

    );
  };