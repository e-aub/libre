import { HttpInterceptorFn, HttpErrorResponse, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpStatusCode, HttpHandlerFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth-service/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    const token = authService.getAccessToken();
    let clonedRequest = req;

    if (token) {
      clonedRequest = addTokenToReq(req, token);
    }

    return next(clonedRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status == HttpStatusCode.Unauthorized) {
          return handleUnauthorized(clonedRequest, next, authService);
        }
        return throwError(() => error);
      })
    )
};

const handleUnauthorized = (req: HttpRequest<any>, next: HttpHandlerFn, authService : AuthService): Observable<HttpEvent<any>> =>{
    if (!isRefreshing) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refresh()
        .pipe(
          switchMap((token) => {
            isRefreshing = false;
            refreshTokenSubject.next(token);
            return next(addTokenToReq(req, token));
          }

          ),
          catchError(err => {
            isRefreshing = false;
            authService.logout();
            return throwError(() => err);
          })
        )
    } else {
      return refreshTokenSubject.pipe(
        switchMap(token => {
          if (token) {
            return next(addTokenToReq(req, token))
          }
          return throwError(() => new Error("No token after refresh"))

        })
      )
    }
  }


  const addTokenToReq = (req: HttpRequest<any>, token: string) => {
    return req.clone(
      {
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  }