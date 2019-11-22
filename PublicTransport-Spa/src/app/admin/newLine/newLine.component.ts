import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NewLine } from 'src/app/_models/newLine';
import { Line } from 'src/app/_models/line';
import { Station } from 'src/app/_models/station';
import { AdminService } from 'src/app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/_models/bus';

@Component({
  selector: 'app-newLine',
  templateUrl: './newLine.component.html',
  styleUrls: ['./newLine.component.css']
})
export class NewLineComponent implements OnInit {
  isCollapsed = true;
  lineForm: FormGroup;
  //line: NewLine;
  newLine: Line;
  editLine: Line;
  newLineStations: Station[] = new Array<Station>();
  allStations: Station[];
  newLineBuses: Bus[] = new Array<Bus>();
  allBuses: Bus[];
  selectedStation: string;
  selectedBus: string;
  selectedStationToAdd: string;
  selectedBusToAdd: string;
  model: Bus = {} as Bus;
  edit: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private alertify: AlertifyService,
              private adminService: AdminService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.createLineForm();

    this.router.data.subscribe(data => {
      this.allBuses = data.busses;
      this.allStations = data.stations;
    });

    const id = this.router.snapshot.paramMap.get('lineId');

    if (id !== null) {
      this.adminService.getLine(id).subscribe(next => {
        this.editLine = next as Line;
        this.edit = true;
        this.editLine.stations.forEach(element => {
         this.newLineStations.push(element);
        });
        this.editLine.buses.forEach(element => {
          this.newLineBuses.push(element);
          });
        this.createLineFormForUpdate();
      }, error => {
        this.route.navigate(['/viewLines']);
        this.alertify.error('Error while getting line');
      });
    }
  }

  createLineForm() {
    this.lineForm = this.fb.group({
      name: ['', Validators.required],
      lineNumber: ['', Validators.required]
    });
  }

  createLineFormForUpdate() {
    this.lineForm = this.fb.group({
      name: [this.editLine.name, Validators.required],
      lineNumber: [this.editLine.lineNumber, Validators.required]
    });
  }

  createLine() {
    if (this.editLine !== null && this.editLine !== undefined) {
      if (this.lineForm.valid) {
        this.newLine = Object.assign({}, this.lineForm.value);
        this.newLine.stations = this.newLineStations;
        this.newLine.buses = this.newLineBuses;
        this.adminService.updateLine(this.newLine, this.editLine._id).subscribe(next => {
          this.alertify.success('Line updated!');
          this.route.navigate(['/viewLines']);
        }, error => {
          this.alertify.error('Error while updating line');
        });
      }
    } else {
      if (this.lineForm.valid) {
        this.newLine = Object.assign({}, this.lineForm.value);
        this.newLine.stations = this.newLineStations;
        this.newLine.buses = this.newLineBuses;
        this.adminService.createNewLine(this.newLine).subscribe(next => {
          this.alertify.success('New line added!');
          this.route.navigate(['/viewLines']);
        }, error => {
          this.alertify.error('Error while adding new line');
        });
      }
    }
  }

  stationChanged(id: string) {
    this.selectedStation = id;
  }

  removeStation() {
    const index = this.newLineStations.indexOf(this.newLineStations.find(station => station._id === this.selectedStation));
    this.newLineStations.splice(index, 1);
  }

  stationChangedAdd(id: string) {
    this.selectedStationToAdd = id;
    console.log(id);
  }

  addStation() {
    const index = this.allStations.indexOf(this.allStations.find(station => station._id === this.selectedStationToAdd));
    this.newLineStations.push(this.allStations[index]);
    console.log(this.allStations.indexOf(this.allStations.find(station => station._id === this.selectedStationToAdd)));
    console.log(this.allStations[index]);
  }

  busChanged(id: string) {
    this.selectedBus = id;
  }

  removeBus() {
    const busNotInUse = this.newLineBuses.find(bus => bus._id === this.selectedBus);
    //console.log(busNotInUse._id + ' ' + busNotInUse.inUse);
    busNotInUse.inUse = false;
    // this.adminService.busNotInUse(busNotInUse._id, busNotInUse);

    this.adminService.busInUse(busNotInUse._id, busNotInUse).subscribe(next => {
      // this.alertify.success('Bus not in use!');
      console.log('Bus not in use!');
    }, error => {
      // this.alertify.error('Error while bus not in use');
      console.log('Error while bus not in use');
    });

    const index = this.newLineBuses.indexOf(this.newLineBuses.find(bus => bus._id === this.selectedBus));
    this.newLineBuses.splice(index, 1);
  }

  busChangedAdd(id: string) {
    this.selectedBusToAdd = id;
  }

  addBus() {
    const busInUse = this.allBuses.find(bus => bus._id === this.selectedBusToAdd);
    //console.log(busInUse._id + ' ' + busInUse.inUse);
    busInUse.inUse = true;
    // this.adminService.busInUse(busInUse._id, busInUse);

    this.adminService.busInUse(busInUse._id, busInUse).subscribe(next => {
      // this.alertify.success('Bus in use!');
      console.log('Bus in use!');
    }, error => {
      // this.alertify.error('Error while bus in use');
      console.log('Error while bus in use');
    });

    const index = this.allBuses.indexOf(this.allBuses.find(bus => bus._id === this.selectedBusToAdd));
    this.newLineBuses.push(this.allBuses[index]);
  }

  addNewBus() {
    this.model.inUse = false;
    this.adminService.createNewBus(this.model).subscribe(next => {
      this.alertify.success('Bus added');
      this.adminService.getBusses().subscribe( next => {
        this.allBuses = (next as unknown) as Bus[];
      }, error => {
        this.alertify.error('Error while getting busses');
      });
    }, error => {
      this.alertify.error('Error while adding bus');
    });
  }
}
