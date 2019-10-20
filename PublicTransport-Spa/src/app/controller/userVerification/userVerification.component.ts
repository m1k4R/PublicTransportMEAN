import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ControllerService } from 'src/app/_services/controller.service';
import { AuthService } from 'src/app/_services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-userVerification',
  templateUrl: './userVerification.component.html',
  styleUrls: ['./userVerification.component.css']
})
export class UserVerificationComponent implements OnInit {
  users: User[];
  selectedUser: User;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
               private controllerService: ControllerService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users;
    });
  }

verificateUserApprove() {
    this.controllerService.verificateUser(this.selectedUser._id, true).subscribe(() => {
      this.selectedUser.accountStatus = 'Active';
      this.selectedUser.verified = true;
      this.alertify.success('User account approved.');
    }, error => {this.alertify.error('Operation failed.')});
  }

  verificateUserReject() {
    this.controllerService.verificateUser(this.selectedUser._id, false).subscribe(() => {
      this.selectedUser.accountStatus = 'Rejected';
      this.selectedUser.verified = false;
      this.alertify.success('User account rejected.');
    }, error => {this.alertify.error('Operation failed.')});
  }

  selectUser(user: User) {
    const myMoment: moment.Moment = moment(user.dateOfBirth);
    this.selectedUser = user;
    this.selectedUser.dateOfBirth = myMoment.toDate();
  }

}
