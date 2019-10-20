import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PricelistItem } from 'src/app/_models/pricelistItem';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Paypal } from 'src/app/_models/paypal';

declare let paypal: any;

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  //pricelists: PricelistItem[];
  pricelists: PricelistItem;
  email = '';
  selectedTicket: boolean = false;
  ticketType: string;
  price: number = 1;
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  paypalInfo = {} as Paypal;

  addScript: boolean = false;
  finalAmount: number = 1;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'ASXPSMpMzORTYbomzVaB9IniOfOkFeksL3jyJIfqIhYyxfItHcv6xaHJ2SeRU-bUiW0M4wkAdT-GVvs7',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: {total: this.price, currency: 'USD'}}
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful
        //console.log(payment);
        this.paypalInfo.cart = payment.cart;
        this.paypalInfo.createTime = payment.create_time;
        this.paypalInfo.paypalId = payment.id;
        this.paypalInfo.email = payment.payer.payer_info.email;
        this.paypalInfo.firstName = payment.payer.payer_info.first_name;
        this.paypalInfo.lastName = payment.payer.payer_info.last_name;
        this.paypalInfo.payerId = payment.payer.payer_info.payer_id;
        this.paypalInfo.paymentMethod = payment.payer.payment_method;
        this.paypalInfo.status = payment.payer.status;
        this.paypalInfo.state = payment.state;
        this.paypalInfo.currency = payment.transactions[0].amount.currency;
        this.paypalInfo.total = payment.transactions[0].amount.total;
        //console.log(this.paypalInfo);

        if (this.loggedIn()) {
          this.userService.buyTicketUser(this.ticketType, this.authService.decodedToken.nameid).subscribe(next => {
            this.alertify.success('Ticket bought');
            this.userService.savePaypalInfo(this.paypalInfo).subscribe(() => {
              console.log('Ticket bought');
            }, () => {
              console.log('Ticket error');
            });
          }, error => {
            this.alertify.error('Error while buying ticket');
          });
        } else {
          if (this.email !== null && this.re.test(this.email)) {
            this.userService.buyTicketAnonimus(this.ticketType, this.email).subscribe(next => {
              this.alertify.success('Ticket bought');
              this.userService.savePaypalInfo(this.paypalInfo).subscribe(() => {
                console.log('Ticket bought');
              }, () => {
                console.log('Ticket error');
              });
            }, error => {
              this.alertify.error('Error while buying ticket');
            });
          } else {
            this.alertify.error('Please enter email!');
          }
        }
      })
    },
    onCancel: (data, actions) => {
      //console.log('OnCancel', data, actions);
      this.alertify.error('Canceled');
    }
  };

  constructor(private userService: UserService, private alertify: AlertifyService,
              private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.pricelists = data.pricelists;
    });

    /* this.initConfig(); */

    /* if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      })
    } */
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  getTickets() {
    this.userService.getTicketPrices().subscribe((res: any) => {
      this.alertify.success('Logged in succesfully');
      // this.router.navigate(['/members']);
      console.log(res);
    }, error => {
      this.alertify.error(error);
    }, () => {
      console.log('Ovo odradi i posel errora i  poslse uspeha');
    });
  }

  loggedIn() {
    return this.authService.isPassenger() && this.authService.loggedIn();
  }

  /* buyTicket(ticketType) {
    // tslint:disable-next-line:max-line-length


    if (this.loggedIn()) {
      this.userService.buyTicketUser(ticketType, this.authService.decodedToken.nameid).subscribe(next => {
        this.alertify.success('Ticket bought');
      }, error => {
        this.alertify.error('Error while buying ticket');
      });
    } else {
      if (this.email !== null && this.re.test(this.email)) {
        this.userService.buyTicketAnonimus(ticketType, this.email).subscribe(next => {
          this.alertify.success('Ticket bought');
        }, error => {
          this.alertify.error('Error while buying ticket');
        });
      } else {
        this.alertify.error('Please enter email!');
      }
    }
  } */

  buy(ticketType: string, price: number) {
    this.ticketType = ticketType;
    this.price = price;

    if (this.loggedIn()) {
      this.selectedTicket = true;
      if (!this.addScript) {
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        })
      }
    } else {
      if (this.email !== null && this.re.test(this.email)) {
        this.selectedTicket = true;
        if (!this.addScript) {
          this.addPaypalScript().then(() => {
            paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
          })
        }
      } else {
        this.alertify.error('Please enter email!');
      }
    }
  }
}
