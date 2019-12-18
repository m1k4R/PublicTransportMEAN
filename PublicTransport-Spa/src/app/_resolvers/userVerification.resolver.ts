import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { UserRegister } from '../_models/userRegister';

@Injectable()
export class UserVerificationResolver implements Resolve<any> {
    pageSize = 5;
    currentPage = 1;

    constructor(private router: Router, private alertify: AlertifyService, private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserRegister[]> {
        return this.userService.getUsers(this.pageSize, this.currentPage).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
