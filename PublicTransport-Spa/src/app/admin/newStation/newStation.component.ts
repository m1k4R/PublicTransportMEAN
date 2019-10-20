import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Line } from 'src/app/_models/line';
import { AdminService } from 'src/app/_services/admin.service';
import { Station } from 'src/app/_models/station';
import { StationLine } from 'src/app/_models/stationLine';
import { NewStation } from 'src/app/_models/newStation';
import { Address } from 'src/app/_models/address';
import { Location } from 'src/app/_models/location';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-newStation',
  templateUrl: './newStation.component.html',
  styleUrls: ['./newStation.component.css']
})
export class NewStationComponent implements OnInit {
  isCollapsed = true;
  stationForm: FormGroup;
  station: NewStation;
  newStation: Station = {} as Station;
  editStation: Station;
  address: Address = {} as Address;
  location: Location = {} as Location;
  newStationLines: Line[] = new Array<Line>();
  allLines: Line[];
  selectedLine: string;
  selectedLineToAdd: string;
  latitude = 45.261705;
  longitude = 19.837223;
  locationChosen = false;
  edit: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private alertify: AlertifyService,
              private adminService: AdminService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.createStationForm();

    this.router.data.subscribe(data => {
      this.allLines = data.lines;
    });

    const id = this.router.snapshot.paramMap.get('stationId');

    if (id !== null) {
      this.adminService.getStation(id).subscribe(next => {
        this.editStation = next as Station;
        this.editStation.address = next.address as Address;
        this.editStation.location = next.location as Location;
        this.edit = true;
        if (this.editStation.lines != null)
        {
          this.editStation.lines.forEach(element => {
            this.newStationLines.push(element);
          });
        }
        this.createStationFormForUpdate();
      }, error => {
        this.route.navigate(['/viewStations']);
        this.alertify.error('Error while getting station');
      });
    }
  }

  createStationForm() {
    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      x: ['', Validators.required],
      y: ['', Validators.required],
    });
  }

  createStationFormForUpdate() {
    this.stationForm = this.fb.group({
      name: [this.editStation.name, Validators.required],
      street: [this.editStation.address.street, Validators.required],
      number: [this.editStation.address.number, Validators.required],
      city: [this.editStation.address.city, Validators.required],
      x: [this.editStation.location.x, Validators.required],
      y: [this.editStation.location.y, Validators.required],
    });
  }

  createStation() {
    if (this.editStation !== null && this.editStation !== undefined) {
      if (this.stationForm.valid) {
        this.station = Object.assign({}, this.stationForm.value);
        // edit
        this.address.city = this.station.city;
        this.address.street = this.station.street;
        this.address.number = this.station.number;
        this.location.x = this.station.x;
        this.location.y = this.station.y;

        this.newStation.name = this.station.name;
        this.newStation.address = this.address;
        this.newStation.location = this.location;
        this.newStation.lines = this.newStationLines;

        //this.station.lines = this.newStationLines;
        this.adminService.updateStation(this.editStation._id, this.newStation).subscribe(next => {
          this.alertify.success('Station updated!');
          this.route.navigate(['/viewStations']);
        }, error => {
          this.alertify.error('Error while adding new station');
        });
      }
    } else {
      if (this.stationForm.valid) {
        this.station = Object.assign({}, this.stationForm.value);
        // edit
        this.address.city = this.station.city;
        this.address.street = this.station.street;
        this.address.number = this.station.number;
        this.location.x = this.station.x;
        this.location.y = this.station.y;

        this.newStation.name = this.station.name;
        this.newStation.address = this.address;
        this.newStation.location = this.location;
        this.newStation.lines = this.newStationLines;

        //this.station.lines = this.newStationLines;
        this.adminService.createNewStation(this.newStation).subscribe(next => {
          this.alertify.success('New station added!');
          this.route.navigate(['/viewStations']);
        }, error => {
          this.alertify.error('Error while adding new station');
        });
      }
    }
  }

  lineChanged(id: string) {
    this.selectedLine = id;
  }

  removeLine() {
    const index = this.newStationLines.indexOf(this.newStationLines.find(line => line._id === this.selectedLine));
    this.newStationLines.splice(index, 1);
  }

  lineChangedAdd(id: string) {
    this.selectedLineToAdd = id;
  }

  addLine() {
    const index = this.allLines.indexOf(this.allLines.find(line => line._id === this.selectedLineToAdd));
    this.newStationLines.push(this.allLines[index]);
  }

  onChoseLocation(event) {
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
    this.locationChosen = true;

    this.stationForm.controls.x.setValue(this.latitude);
    this.stationForm.controls.y.setValue(this.longitude);
}

}
