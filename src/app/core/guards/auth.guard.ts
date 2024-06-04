import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,

    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const adminUser = localStorage.getItem('Name');
        if (adminUser) {
            // Admin logged in so return true

            return true;
        }
        else {
            this.router.navigate(['/account/login']);
            return false;
        }

    }
}
