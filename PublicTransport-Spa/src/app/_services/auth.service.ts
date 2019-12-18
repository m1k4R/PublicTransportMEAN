import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRegister } from '../_models/userRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl;
jwtHelper = new JwtHelperService();
decodedToken: any;
currentUser: any;
userRoles: any;
userRole: any;

constructor(private http: HttpClient) { }

register(user: UserRegister) {
  return this.http.post(this.baseUrl + 'authorization/register', user);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'authorization/login', model).pipe(
    map((response: any) => {
      const user = response;
      if (user != null && user != undefined) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
        //this.userRoles = this.decodedToken.role as Array<string>;
        this.userRole = this.decodedToken.userRole as String;
        // console.log(this.userRole);
      }
    })
  );
}

loggedIn() {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  if (token != null && token != undefined) {
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.currentUser = JSON.parse(user);
    // this.userRoles = this.decodedToken.role as Array<string>;
    this.userRole = this.decodedToken.userRole as String;
    // console.log(this.userRole);
  }

  if (this.jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem("token");
  }

  return !this.jwtHelper.isTokenExpired(token);

  //return false;
  // return false;
}

isAdmin() {
  /* if (this.userRoles != null) {
    const result = this.userRoles.includes('Admin');
    return result;
  } */
  if (this.userRole != null) {
    if (this.userRole == 'Admin') {
      return true;
    }
  }
  return false;
}

isController() {
  /* if (this.userRoles != null) {
    const result = this.userRoles.includes('Controller');
    return result;
  } */
  if (this.userRole != null) {
    if (this.userRole == 'Controller') {
      return true;
    }
  }
  return false;
}

isPassenger() {
  /* if (this.userRoles != null) {
    const result = this.userRoles.includes('Passenger');
    return result;
  } */
  if (this.userRole != null) {
    if (this.userRole == 'Passenger') {
      return true;
    }
  }
  return false;
}
}
