import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token: any = localStorage.getItem('token');

        if (token == null || token == undefined) {
            return next.handle(request);
        }
        else {
            if (request.url != ApiService.organizationLoginURL) {
                request = request.clone({ headers: request.headers.set('x-access-token', token) });
                return next.handle(request).pipe(catchError(err => {

                    if (err.status == 401 || err.status == 111) {
                        // auto logout if 401 response returned from api
                        this.router.navigate(['/account/login']);
                    }
                    const error = err.error.statusText || err.statusText;
                    return throwError(error);
                }))
            }
            else {

                return next.handle(request);
            }
        }
    }
}