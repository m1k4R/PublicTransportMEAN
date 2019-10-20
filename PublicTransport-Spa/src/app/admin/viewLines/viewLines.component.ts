import { Component, OnInit } from '@angular/core';
import { Line } from 'src/app/_models/line';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewLines',
  templateUrl: './viewLines.component.html',
  styleUrls: ['./viewLines.component.css']
})
export class ViewLinesComponent implements OnInit {
  isCollapsedStations = true;
  isCollapsedBuses = true;
  allLines: Line[];

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allLines = data.lines;
    });
  }

  deleteLine(lineId: string) {
    this.adminService.deleteLine(lineId).subscribe(next => {
      this.alertify.success('Line deleted');
      const indx = this.allLines.indexOf(this.allLines.find(line => line._id === lineId));
      this.allLines.splice(indx, 1);
    }, error => {
      this.alertify.error('Failed to delete line');
    });
  }

}
