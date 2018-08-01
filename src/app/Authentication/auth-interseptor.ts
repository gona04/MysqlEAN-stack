import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userService: UserServiceService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
