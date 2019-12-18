import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Station } from 'src/app/_models/station';

@Component({
  selector: 'app-viewStations',
  templateUrl: './viewStations.component.html',
  styleUrls: ['./viewStations.component.css']
})
export class ViewStationsComponent implements OnInit {
  isCollapsed = true;
  allStations: Station[];

  currentPage: number = 1;
  totalItems = 10;
  itemsPerPage = 5;

  constructor(private adminService: AdminService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allStations = data.stations.stations;
      this.totalItems = data.stations.count;
    });
  }

  onChangedPage(pageData: any) {
    console.log(pageData);
    this.currentPage = pageData;
    this.adminService.getStations(this.itemsPerPage, this.currentPage).subscribe(data => {
      this.allStations = data.stations as unknown as Station[];
      this.totalItems = data.count;
    });
  }

  deleteStation(stationId: string) {
    this.adminService.deleteStation(stationId).subscribe(next => {
      this.alertify.success('Station deleted');
      const indx = this.allStations.indexOf(this.allStations.find(station => station._id === stationId));
      this.allStations.splice(indx, 1);
    }, error => {
      this.alertify.error('Failed to delete station');
    });
  }

}
