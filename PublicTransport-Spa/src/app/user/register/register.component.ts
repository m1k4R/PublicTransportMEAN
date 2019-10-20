import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsModalRef } from 'ngx-bootstrap';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserRegister } from 'src/app/_models/userRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: UserRegister;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private fb: FormBuilder, private alertify: AlertifyService,
              public modalRef: BsModalRef) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-orange'
    };
    this.createRegiserForm();
  }

  createRegiserForm() {
    this.registerForm = this.fb.group({
      userType: ['regular'],
      userName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch : true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Successfull registration');
        this.modalRef.hide();
      }, error => {
        this.alertify.error(error);
      }, () => {
        const model: any = {};
        model.password = this.user.password;
        model.email = this.user.email;
        this.authService.login(model).subscribe(() => {
          console.log('logged in');
        });
      });
    }
  }
}
