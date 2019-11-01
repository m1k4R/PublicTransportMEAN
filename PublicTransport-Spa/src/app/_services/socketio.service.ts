import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { BusLocation } from '../_models/busLocation';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket = io('http://localhost:3000');
  public data: BusLocation;

  constructor() { }

  public sendLineId(lineId) {
    this.socket.emit('line', lineId);
  }

  public getBusLocation = () => {
  let locationObservable;
  locationObservable = new Observable(observer => {
    this.socket.on('busLocation', (data) => {
        this.data = data;
        // console.log(data);
        observer.next(data);
      });
    }).pipe(delay(2000));
    return locationObservable;
  }

  public sendNextBusLocation() {
    this.socket.emit('nextBusLocation');
  }
}
