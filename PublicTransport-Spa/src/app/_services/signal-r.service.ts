/* import { Injectable } from '@angular/core';
import { Location } from '../_models/location';
import * as signalR from '@aspnet/signalr';
import { BusLocation } from '../_models/busLocation';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
public data: BusLocation;

private hubConnection: signalR.HubConnection;

constructor() { }

public startConnection = () => {
  this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('http://localhost:5000/buslocation')
                            .build();
  this.hubConnection.start().then(() => console.log('Connection started'))
                            .catch(err => console.log('Error while starting connection: ' + err));
}

public stopConnection() {
  this.hubConnection.stop().then(() => console.log('Connection started'))
                    .catch(err => console.log('Error while starting connection: ' + err));
}

public addTransferBusLocationListener = () => {
  let locationObservable;
  locationObservable = new Observable(observer => {
    this.hubConnection.on('sendbuslocation', (data) => {
        this.data = data;
        // console.log(data);
        observer.next(data);
      });
    }).pipe(delay(2000));
    return locationObservable;
}

}
 */