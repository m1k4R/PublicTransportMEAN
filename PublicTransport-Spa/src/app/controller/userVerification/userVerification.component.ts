import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserRegister } from 'src/app/_models/userRegister';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ControllerService } from 'src/app/_services/controller.service';
import { AuthService } from 'src/app/_services/auth.service';
import * as moment from 'moment';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-userVerification',
  templateUrl: './userVerification.component.html',
  styleUrls: ['./userVerification.component.css']
})
export class UserVerificationComponent implements OnInit {
  users: UserRegister[];
  selectedUser: UserRegister;

  currentPage: number = 1;
  totalItems = 10;
  itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
               private controllerService: ControllerService, private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data.users.users;
      this.totalItems = data.users.count;
    });
  }

  onChangedPage(pageData: any) {
    console.log(pageData);
    this.currentPage = pageData;
    this.userService.getUsers(this.itemsPerPage, this.currentPage).subscribe(data => {
      this.users = data.users as unknown as UserRegister[];
      this.totalItems = data.count;
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

  selectUser(user: UserRegister) {
    const myMoment: moment.Moment = moment(user.dateOfBirth);
    this.selectedUser = user;
    this.selectedUser.dateOfBirth = myMoment.toDate();
  }

}
