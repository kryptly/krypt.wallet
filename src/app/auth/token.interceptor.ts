import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      if (!req.headers.has('Content-Type')) {
          req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      }

      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

      if(this.authService.getToken()) {
          console.log("added token");
          req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getToken()) });
      }


      console.log(JSON.stringify(req.headers));
      return next.handle(req);
  }
}
