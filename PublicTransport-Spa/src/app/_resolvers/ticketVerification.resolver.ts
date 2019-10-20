import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ControllerService } from '../_services/controller.service';
import { Ticket } from '../_models/ticket';

@Injectable()
export class TicketVerificationResolver implements Resolve<any> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';

    constructor(private router: Router, private alertify: AlertifyService, private controllerService: ControllerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket[]> {
        return this.controllerService.getTickets().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
