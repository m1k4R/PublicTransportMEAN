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
    // params = params.append('userId', JSON.stringify(userId));
    params = params.append('valid', JSON.stringify(valid));
    return this.http.put(this.baseUrl + 'moderator/verificateUser/' + userId, params);
  }

  verificateTicket(ticketId: string) {
    let params = new HttpParams();
    let id = ticketId;
    params = params.append('id', JSON.stringify(id));
    return this.http.put(this.baseUrl + 'moderator/validateTicket/' + ticketId, params);
  }

  getTickets(pageSize: number, currentPage: number) {
    const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
    return this.http.get<{tickets: Observable<Ticket[]>, count: number}>(this.baseUrl + 'moderator/getTickets' + queryParams);
  }

}
