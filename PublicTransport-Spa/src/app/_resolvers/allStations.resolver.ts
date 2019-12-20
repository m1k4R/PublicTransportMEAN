import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Station } from '../_models/station';
import { AdminService } from '../_services/admin.service';

@Injectable()
export class AllStationsResolver implements Resolve<Station[]> {

    constructor(private router: Router, private alertify: AlertifyService, private adminService: AdminService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Station[]> {
        return this.adminService.getAllStations().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
