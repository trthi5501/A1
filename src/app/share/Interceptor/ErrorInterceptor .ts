import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AppConsts } from 'src/app/conts/app-conts';
import { AppService } from '../app-service/app.service';
declare var $: any;
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  typeService: string;
  constructor(private appService: AppService) {
    this.typeService = localStorage.getItem(AppConsts.typeService) ?? '';
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        //   if (err instanceof HttpErrorResponse && err.status === 401) {
        //     try {
        //         return this.handle401Error(request, next);
        //     } catch (e) {
        //         this.appService.logout();
        //     }
        //   }
        //captureMessage(this.getMessage(request, err));
        const error = err.error.message || err.statusText;
        return throwError(() => err);
      })
    );
  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // if (!this.isRefreshing) {
    //   this.isRefreshing = true;
    //   this.refreshTokenSubject.next(null);
    //     return this.appService.refreshToken().pipe(switchMap(authToken => {
    //       this.isRefreshing = false;
    //       this.refreshTokenSubject.next(authToken);
    //       this.appService.updateToken(authToken);
    //       return next.handle(this.addToken(request, authToken));
    //     }));
    // } else {
    //   return this.refreshTokenSubject.pipe(
    //     filter(token => token != null),
    //     take(1),
    //     switchMap(jwt => {
    //       return next.handle(this.addToken(request, jwt));
    //     }));
    // }
  }
  private addToken(request: HttpRequest<any>, authToken: String) {
    return request.clone({
      headers: request.headers.set(
        AppConsts.authorizationKey,
        `Bearer ${authToken}`
      ),
    });
  }
  private getMessage(request: HttpRequest<any>, err: any): string {
    const defaultMessage = 'Http request failed. ({method}, {status}, {url})';
    const error = err.error.message || err.statusText;
    const replace = (msg: string) => {
      const map = {
        method: request.method,
        url: request.url,
        status: err.status,
        message: error,
      };
      // replace all keys with their values
      // Object.keys(map).forEach((key) => {
      //   msg = msg.replace(new RegExp(`{${key}}`, 'g'), map[key]);
      // });
      return msg;
    };
    // use default message
    return replace(defaultMessage);
  }
}
