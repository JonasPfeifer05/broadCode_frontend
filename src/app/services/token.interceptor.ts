import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let token = localStorage.getItem("broad_code_jwt");
        if (token === null) {
            token = "";
        }
        let tokenhead = request.clone({
            setHeaders: {
                Authorization: token as string
            }
        });

        return next.handle(tokenhead);
    }
}
