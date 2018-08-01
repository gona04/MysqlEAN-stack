import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from "@angular/router";
  import { Injectable } from "@angular/core";
  import { Observable } from "rxjs";
import { UserServiceService } from "./user-service.service";

@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(private userService: UserServiceService, private router: Router){}
    canActivate(
    route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot
): boolean| Observable<boolean> | Promise<boolean> {
        const isAuth = this.userService.getIsAuthenticated();
        if(!isAuth) {
            this.router.navigate(['/']);
        }
        return isAuth;
    }
}

