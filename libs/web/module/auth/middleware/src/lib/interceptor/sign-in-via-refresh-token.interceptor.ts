import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '@instagrammer/web/module/auth/data';

@Injectable()
export class SignInViaRefreshTokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private readonly authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      withCredentials: true,
    });

    return next.handle(request).pipe(
      catchError(error => {
        if (
          request.url.includes('auth/verify-token') ||
          request.url.includes('auth/sign-out') ||
          request.url.includes('auth/sign-in-via-refresh-token')
        ) {
          this.authService.cleanupAfterFailedAuth();

          return throwError(() => error);
        }

        if (
          error instanceof HttpErrorResponse &&
          !request.url.includes('auth/sign-in') &&
          error.status === 401
        ) {
          return this.handle401Error(request, next);
        }

        return throwError(() => error);
      }),
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.signInViaRefreshToken().pipe(
        switchMap(() => {
          this.isRefreshing = false;

          return next.handle(request);
        }),
        catchError(error => {
          this.isRefreshing = false;

          console.log('Error ', error.status);

          if (error.status === 401) {
            this.authService.signOut();
          }

          return throwError(() => error);
        }),
      );
    }

    return next.handle(request);
  }
}
