import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { BsModalRef  } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private router: Router, public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in succesfully');
      this.router.navigate(['/home']);
      this.modalRef.hide();
    }, error => {
      // this.alertify.error(error);
      this.alertify.error('Login failed');
    }, () => {
      console.log('This is where sth happens!');
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
