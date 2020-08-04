import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    currentUser: any;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authenticationService.logged &&
            !this.authenticationService.isTokenExpired()) {
            // // check if route is restricted by role
            if (route.data.role_id && route.data.role_id.indexOf(this.currentUser.role_id) != -1) {
                //     // role not authorised so redirect to home page
                this.router.navigate(['/home']);
                return false;
                } else
      
                // authorized so return true
                //this.router.navigate(['/request']);
                return true;
            }
      
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
      }