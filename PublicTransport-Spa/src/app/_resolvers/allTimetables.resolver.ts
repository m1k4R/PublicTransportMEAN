import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AdminService } from '../_services/admin.service';
import { TimeTable } from '../_models/timeTable';

@Injectable()
export class AllTimetablestResolver implements Resolve<TimeTable[]> {

    constructor(private router: Router, private alertify: AlertifyService, private adminService: AdminService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TimeTable[]> {
        return this.adminService.getAllTimetables().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
