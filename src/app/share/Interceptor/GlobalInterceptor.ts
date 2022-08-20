import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const spiner = document.getElementById('globalSpiner') as HTMLElement;
    if (
      (request.body && request.body.spinerOff) ||
      request.url.indexOf('spinerOff') != -1
    ) {
      spiner.style.display = 'none';
    } else {
      spiner.style.display = 'block';
    }
    return next.handle(request).pipe(
      finalize(() => {
        spiner.style.display = 'none';
      })
    );
  }
}
