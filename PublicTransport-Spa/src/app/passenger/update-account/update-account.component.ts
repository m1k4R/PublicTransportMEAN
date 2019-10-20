import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserRegister } from 'src/app/_models/userRegister';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import * as moment from 'moment';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  userUpdate: UserRegister;
  updateForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private fb: FormBuilder, private alertify: AlertifyService,
              private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    console.log('00USao ovde');
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    console.log(this.user);
    this.bsConfig = {
      containerClass: 'theme-orange'
    };
    //this.createRegiserForm();
    this.createUpdateForm();
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'user/adddocument/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize:  10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: any = JSON.parse(response);
        this.user.documentUrl = res.url;
        this.user.publicId = res.id;
        this.alertify.success('Added document image successfuly');
      } else {
        this.alertify.error('Added document image unsuccessful');
      }
    };
  }

  createUpdateForm() {
    const myMoment: moment.Moment = moment(this.user.dateOfBirth);

    this.updateForm = this.fb.group({
      userType: [this.user.userType],
      userName: [this.user.userName, Validators.required],
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      dateOfBirth: [myMoment.toDate(), Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      street: [this.user.address.street, Validators.required],
      number: [this.user.address.number, Validators.required],
      city: [this.user.address.city, Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  /* createUpdateForm() {
    this.updateForm = this.fb.group({
      userType: ['regular'],
      userName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      oldPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  } */

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch : true};
  }

  updateAccount() {
    if (this.updateForm.valid) {
      this.userUpdate = Object.assign({}, this.updateForm.value);
      this.userService.updateAccount(this.userUpdate, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertify.success('Account successfully updated');
      }, error => {
        this.alertify.error(error);
      });
    }
  }

  cancel() {
    this.router.navigate(['/home']);
  }

}
