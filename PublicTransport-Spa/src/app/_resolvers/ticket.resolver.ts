import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_services/user.service';

@Injectable()
export class TicketResolver implements Resolve<any> {
    pageNumber = 1;
    pageSize = 5;

    constructor(private router: Router, private alertify: AlertifyService, private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TicketResolver[]> {
        return this.userService.getTicketPrices().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
