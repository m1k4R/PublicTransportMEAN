import { Component, OnInit } from '@angular/core';
import { TimeTable } from 'src/app/_models/timeTable';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Line } from 'src/app/_models/line';

@Component({
  selector: 'app-viewTimetables',
  templateUrl: './viewTimetables.component.html',
  styleUrls: ['./viewTimetables.component.css']
})
export class ViewTimetablesComponent implements OnInit {
  isCollapsed = true;
  allTimetables: TimeTable[];
  allLines: Line[];
  departures: string[];

  currentPage: number = 1;
  totalItems = 10;
  itemsPerPage = 5;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allTimetables = data.timetables.timetables;
      this.totalItems = data.timetables.count;
      this.allLines = data.lines;
    });

    /* this.allTimetables.forEach(tmt => {
      let line = this.allLines.find(l => l._id === tmt.lineId);
      tmt.line = line;
    }); */

  }

  onChangedPage(pageData: any) {
    console.log(pageData);
    this.currentPage = pageData;
    this.adminService.getTimetables(this.itemsPerPage, this.currentPage).subscribe(data => {
      this.allTimetables = data.timetables as unknown as TimeTable[];
      this.totalItems = data.count;
    });
  }

  deleteTimetable(timetableId: string) {
    this.adminService.deleteTimetable(timetableId).subscribe(next => {
      this.alertify.success('Timetable deleted');
      /* const indx = this.allTimetables.indexOf(this.allTimetables.find(timetable => timetable._id === timetableId));
      this.allTimetables.splice(indx, 1); */
      this.adminService.getTimetables(this.itemsPerPage, this.currentPage).subscribe(data => {
        this.allTimetables = data.timetables as unknown as TimeTable[];
        this.totalItems = data.count;
      });
    }, error => {
      this.alertify.error('Failed to delete timetable');
    });
  }

}
