import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pricelist } from '../_models/pricelist';
import { map } from 'rxjs/operators';
import { PricelistItem } from '../_models/pricelistItem';
import { UserRegister } from '../_models/userRegister';
import { User } from '../_models/user';
import { AllPricelists } from '../_models/allPricelists';
import { Paypal } from '../_models/paypal';
import { AuthService } from './auth.service';
import { Ticket } from '../_models/ticket';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient, private authService: AuthService) { }

getTicketPrices(): Observable<PricelistItem> {  // active: boolean = true
  // let params = new HttpParams();
  let userId = 'none';
  if (this.authService.loggedIn()) {
    // params = params.append('userId', this.authService.decodedToken.userId);
    console.log('ima userId');
    userId = this.authService.decodedToken.userId;
  }
  // params = params.append('active', JSON.stringify(active));
  // return this.http.get<PricelistItem[]>(this.baseUrl + 'publictransport/pricelists', {params});
  return this.http.get<PricelistItem>(this.baseUrl + 'user/ticketsPrices/' + userId);
}

getAllPricelists(active: boolean = true): Observable<AllPricelists> {
  let params = new HttpParams();
  params = params.append('active', JSON.stringify(active));
  params = params.append('pricelistForAll', JSON.stringify(true));
  // return this.http.get<AllPricelists>(this.baseUrl + 'user/pricelists', {params});
  return this.http.get<AllPricelists>(this.baseUrl + 'user/pricelists');
}

getUser(userId): Observable<UserRegister> {
  return this.http.get<UserRegister>(this.baseUrl + 'user/getUser/' + userId);
}

getUsers(): Observable<UserRegister[]> {
  return this.http.get<UserRegister[]>(this.baseUrl + 'user/getUsers');
}

updateAccount(user: UserRegister, userId: string) {
  return this.http.put(this.baseUrl + 'user/editUser/' + userId, user);
}

buyTicketAnonimus(ticketType, email): Observable<Ticket> {
  let params = new HttpParams();
  params = params.append('ticketType', ticketType);
  params = params.append('email', email);
  return this.http.put<Ticket>(this.baseUrl + 'user/buyTicketUnRegistered', params);
}

buyTicketUser(ticketType, userId): Observable<Ticket> {
  let params = new HttpParams();
  params = params.append('ticketType', ticketType);
  params = params.append('userId', userId);
  return this.http.put<Ticket>(this.baseUrl + 'user/buyTicket', params);
}

savePaypalInfo(paypal: Paypal, ticketId: string) {
  console.log('Save paypal info');
  return this.http.post(this.baseUrl + 'user/addPaypal/' + ticketId, paypal);
}
}
