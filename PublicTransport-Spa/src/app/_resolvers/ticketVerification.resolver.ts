import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ControllerService } from '../_services/controller.service';
import { Ticket } from '../_models/ticket';

@Injectable()
export class TicketVerificationResolver implements Resolve<any> {
    pageSize = 5;
    currentPage = 1;

    constructor(private router: Router, private alertify: AlertifyService, private controllerService: ControllerService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Ticket[]> {
        return this.controllerService.getTickets(this.pageSize, this.currentPage).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
