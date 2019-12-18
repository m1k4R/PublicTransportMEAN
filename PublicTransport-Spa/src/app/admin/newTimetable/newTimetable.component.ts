import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TimeTable } from 'src/app/_models/timeTable';
import { Line } from 'src/app/_models/line';
import { AdminService } from 'src/app/_services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Departures } from 'src/app/_models/departures';

@Component({
  selector: 'app-newTimetable',
  templateUrl: './newTimetable.component.html',
  styleUrls: ['./newTimetable.component.css']
})
export class NewTimetableComponent implements OnInit {
  isCollapsed = true;
  timetableForm: FormGroup;
  timetable: TimeTable = {} as TimeTable;
  editTimetable: TimeTable;
  selectedLine: string;
  allLines: Line[];
  type: string = 'In City';
  day: string = 'Working day';
  line: Line;
  isInitialized: boolean = false;
  departures: Departures[] = new Array(24);
  departuresEdit: Departures[] = new Array(24);;
  isInitializedEdit: boolean = false;
  edit: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, private alertify: AlertifyService,
    private adminService: AdminService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.createTimetableForm();

    this.router.data.subscribe(data => {
      this.allLines = data.lines.lines;
    });

    const id = this.router.snapshot.paramMap.get('timetableId');

    if (id !== null) {
      this.adminService.getTimetable(id).subscribe(next => {
        this.editTimetable = next as TimeTable;
        this.edit = true;
        this.type = this.editTimetable.type;
        this.line = this.editTimetable.line;
        this.day = this.editTimetable.day;

        /* sjeckacu linije */
        if (!this.isInitialized)
        {
          for(let i=0; i<this.departuresEdit.length; i++)
          {
            this.departuresEdit[i] = new Departures();
            this.departures[i] = new Departures();
          }
          this.isInitialized = true;
        }

        let departuresToEdit = this.editTimetable.departures.split('/');
        for(let i=0; i<departuresToEdit.length; i++)
        {
          if (departuresToEdit[i] !== undefined)
          {
            let depToEdit = departuresToEdit[i].split(':');
            if (depToEdit[1] !== undefined)
            {
              let dep = depToEdit[1].split('-');
              for(let j=0; j<dep.length; j++)
              {
                if(dep[j] !== undefined)
                {
                  this.departuresEdit[i].departuresHour[j] = dep[j];
                  this.departures[i].departuresHour[j] = dep[j];
                }
              }
            }
          }
        }


        this.createTimetableFormForUpdate();
      }, error => {
        this.route.navigate(['/viewTimetables']);
        this.alertify.error('Error while getting timetable');
      });
    }

  }

  createTimetableForm() {
    this.timetableForm = this.fb.group({
    });
  }

  createTimetableFormForUpdate() {
    this.timetableForm = this.fb.group({
    });
  }

  createTimetable() {
    if (this.editTimetable !== null && this.editTimetable !== undefined) {

      this.timetable._id = this.editTimetable._id;
      /* this.timetable.type = this.editTimetable.type;
      this.timetable.line = this.editTimetable.line;
      this.timetable.day = this.editTimetable.day; */
      this.timetable.departures = this.editTimetable.departures;

      this.timetable.day = this.day;
      this.timetable.type = this.type;
      let index = this.allLines.indexOf(this.allLines.find(line => line._id === this.selectedLine));
      this.timetable.line = this.allLines[index] as Line;

      this.departures.forEach(dep => {
        if (dep.name !== undefined)
        {
          this.timetable.departures += dep.name + ":";
          dep.departuresHour.forEach(element => {
            if (element !== undefined)
            {
              this.timetable.departures += element + "-";
            }
          });
          this.timetable.departures += "/";
        }
      });

      this.adminService.updateTimetable(this.editTimetable._id, this.timetable).subscribe(next => {
        this.alertify.success('Timetable updated!');
        this.route.navigate(['/viewTimetables']);
      }, error => {
        this.alertify.error('Error while updating timetable');
      });
    } else {

      this.timetable.day = this.day;
      this.timetable.type = this.type;
      let index = this.allLines.indexOf(this.allLines.find(line => line._id === this.selectedLine));
      this.timetable.line = this.allLines[index] as Line;
      this.timetable.departures = "";

      this.departures.forEach(dep => {
        if (dep.name !== undefined)
        {
          this.timetable.departures += dep.name + ":";
          dep.departuresHour.forEach(element => {
            if (element !== undefined)
            {
              this.timetable.departures += element + "-";
            }
          });
          this.timetable.departures += "/";
        }
      });

      this.adminService.createNewTimetable(this.timetable).subscribe(next => {
        this.alertify.success('New timetable added!');
        this.route.navigate(['/viewTimetables']);
      }, error => {
        this.alertify.error('Error while adding new timetable');
      });
    }
  }

  typeChanged(type: string) {
    this.type = type;
  }

  lineChanged(id: string) {
    this.selectedLine = id;
  }

  dayChanged(day: string) {
    this.day = day;
  }

  daparturesChanged(val: string, id: string) {
    if (!this.isInitialized)
    {
      for(let i=0; i<this.departures.length; i++)
      {
        this.departures[i] = new Departures();
      }
      this.isInitialized = true;
    }
    let index = id.split('-');
    let depName = index[0];
    let depHour = index[1];
    this.departures[+depName].name = depName;
    this.departures[+depName].departuresHour[+depHour] = val;
  }

}
