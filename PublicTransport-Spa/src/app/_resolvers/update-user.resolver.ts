import { Injectable } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { UserRegister } from '../_models/userRegister';

@Injectable()
export class UpdateUserResolver implements Resolve<User> {

    constructor(private router: Router, private alertify: AlertifyService, private userService: UserService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserRegister> {
        console.log('OPAAAAA' + this.authService.decodedToken.userId);
        return this.userService.getUser(this.authService.decodedToken.userId).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
