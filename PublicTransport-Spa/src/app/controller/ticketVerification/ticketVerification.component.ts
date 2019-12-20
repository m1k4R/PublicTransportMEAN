import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ControllerService } from 'src/app/_services/controller.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-ticketVerification',
  templateUrl: './ticketVerification.component.html',
  styleUrls: ['./ticketVerification.component.css']
})
export class TicketVerificationComponent implements OnInit {
  tickets: Ticket[];
  validatedTicket: Ticket;
  ticketId: string;

  currentPage: number = 1;
  totalItems = 10;
  itemsPerPage = 5;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private controllerService: ControllerService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.tickets = data.tickets.tickets;
      this.totalItems = data.tickets.count;
    });
  }

  onChangedPage(pageData: any) {
    console.log(pageData);
    this.currentPage = pageData;
    this.controllerService.getTickets(this.itemsPerPage, this.currentPage).subscribe(data => {
      this.tickets = data.tickets as unknown as Ticket[];
      this.totalItems = data.count;
    });
  }

  checkTicket(ticketId) {
    this.controllerService.verificateTicket(ticketId).subscribe(next => {
      const ticketResult = next as Ticket;
      /* const indx = this.tickets.indexOf(this.tickets.find(ticket => ticket._id === ticketId));
      this.tickets[indx].isValid = ticketResult.isValid; */
      this.controllerService.getTickets(this.itemsPerPage, this.currentPage).subscribe(data => {
        this.tickets = data.tickets as unknown as Ticket[];
        this.totalItems = data.count;
      });
    }, error => {
      this.alertify.error('Failed to check ticket!');
    });
  }

  checkTicketForId() {
    const ticketForValidation = this.ticketId;
    this.controllerService.verificateTicket(ticketForValidation).subscribe(next => {
      this.validatedTicket = next as Ticket;
      console.log(this.validatedTicket);
      /* const indx = this.tickets.indexOf(this.tickets.find(ticket => ticket._id === this.validatedTicket._id));
      this.tickets[indx].isValid = this.validatedTicket.isValid; */
      this.controllerService.getTickets(this.itemsPerPage, this.currentPage).subscribe(data => {
        this.tickets = data.tickets as unknown as Ticket[];
        this.totalItems = data.count;
      });
    }, error => {
      this.alertify.error('Failed to check ticket!');
    });
  }
}
