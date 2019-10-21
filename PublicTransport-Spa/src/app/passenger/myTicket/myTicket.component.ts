import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Ticket } from 'src/app/_models/ticket';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateUserResolver } from 'src/app/_resolvers/update-user.resolver';

@Component({
  selector: 'app-myTicket',
  templateUrl: './myTicket.component.html',
  styleUrls: ['./myTicket.component.css']
})
export class MyTicketComponent implements OnInit {
  user: User;
  ticket: boolean;
  tickets: Ticket[] = new Array();

  constructor(public modalRef: BsModalRef, private route: ActivatedRoute, private userService: UserService,
              private router: Router, private authService: AuthService, private res: UpdateUserResolver) { }

  ngOnInit() {
    this.userService.getUser(this.authService.decodedToken.userId).subscribe(next => {
      this.user = next;
      if (this.user.tickets === undefined || this.user.tickets.length < 1) {
        console.log('No ticket');
        this.ticket = false;
      } else {
        console.log('Yes ticket');
        this.ticket = true;
      }
      console.log(next);
    }, error => {
      console.log('error');
    });
  }

  buyTicket() {
    this.router.navigate(['/tickets']);
    this.modalRef.hide();
 }

  close() {
    this.modalRef.hide();
  }

  resolve(): User {
    console.log('OPAAAAA' + this.authService.decodedToken.userId);
    let user: User;
    return user;
  }

}
