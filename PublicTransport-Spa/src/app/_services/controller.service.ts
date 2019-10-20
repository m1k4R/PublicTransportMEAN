import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Ticket } from '../_models/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  verificateUser(userId: string, valid: boolean) {
    let params = new HttpParams();
    params = params.append('userId', JSON.stringify(userId));
    params = params.append('valid', JSON.stringify(valid));
    return this.http.put(this.baseUrl + 'moderator', params);
  }

  verificateTicket(ticketId: string) {
    let params = new HttpParams();
    params = params.append('ticketId', JSON.stringify(ticketId));
    return this.http.put(this.baseUrl + 'moderator/validateTicket', params);
  }

  getTickets() {
    return this.http.get<Observable<Ticket[]>>(this.baseUrl + 'moderator');
  }

}
