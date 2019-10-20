import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) { }

  title = 'PublicTransport-Spa';

  loggedIn() {
    return this.authService.loggedIn();
    /* return true; */
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  isController() {
    return this.authService.isController();
  }
}
