import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NewStation } from '../_models/newStation';
import { Observable } from 'rxjs';
import { Station } from '../_models/station';
import { NewLine } from '../_models/newLine';
import { Line } from '../_models/line';
import { Bus } from '../_models/bus';
import { Pricelist } from '../_models/pricelist';
import { NewPricelist } from '../_models/newPricelist';
import { PricelistItem } from '../_models/pricelistItem';
import { TimeTable } from '../_models/timeTable';
import { UserDiscount } from '../_models/userDiscount';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

createNewStation(station: Station) {
  return this.http.post(this.baseUrl + 'admin/addStation', station);
}

getStations(pageSize: number, currentPage: number) {
  const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
  return this.http.get<{stations: Observable<Station[]>, count: number}>(this.baseUrl + 'admin/getStations' + queryParams);
}

getAllStations() {
  return this.http.get<Observable<Station[]>>(this.baseUrl + 'admin/getAllStations');
}

getStation(stationId: string) {
  return this.http.get<Station>(this.baseUrl + 'admin/getStation/' + stationId);
}

deleteStation(stationId) {
  return this.http.delete(this.baseUrl + 'admin/removeStation/' + stationId);
}

updateStation(stationId: string, station: Station) {
  return this.http.put(this.baseUrl + 'admin/updateStation/' + stationId, station);
}

createNewLine(line: Line) {
  return this.http.post(this.baseUrl + 'admin/addLine', line);
}

getLines(pageSize: number, currentPage: number) {
  const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
  return this.http.get<{lines: Observable<Line[]>, count: number}>(this.baseUrl + 'admin/getLines' + queryParams);
}

getAllLines() {
  return this.http.get<Observable<Line[]>>(this.baseUrl + 'admin/getAllLines');
}

getLine(lineId: string) {
  return this.http.get<Line>(this.baseUrl + 'admin/getLine/' + lineId);  // 'admin/getLine?lineId='
}

deleteLine(lineId) {
  return this.http.delete(this.baseUrl + 'admin/removeLine/' + lineId);
}

updateLine(line: Line, lineId: string) {
  return this.http.put(this.baseUrl + 'admin/updateLine/' + lineId, line);
}

getBusses() {
  return this.http.get<Observable<Bus[]>>(this.baseUrl + 'admin/getBusses');
}

busInUse(busId: string, bus: Bus) {
  return this.http.put(this.baseUrl + 'admin/busInUse/' + busId, bus);
}

/* busNotInUse(busId: string, bus: Bus) {
  return this.http.put(this.baseUrl + 'admin/busNotInUse/' + busId, bus);
} */

createPricelist(pricelist: PricelistItem) {
  return this.http.post(this.baseUrl + 'admin/addPricelist', pricelist);
}

getPricelists(pageSize: number, currentPage: number) {
  const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
  return this.http.get<{pricelists: Observable<PricelistItem[]>, count: number}>(this.baseUrl + 'admin/getAllPricelists' + queryParams);
}

getPricelist(pricelistId: string) {
  return this.http.get<PricelistItem>(this.baseUrl + 'admin/getPricelist/' + pricelistId);
}

deletePricelist(pricelistId) {
  return this.http.delete(this.baseUrl + 'admin/removePricelist/' + pricelistId);
}

updatePricelist(pricelist: PricelistItem, pricelistId: string) {
  return this.http.put(this.baseUrl + 'admin/updatePricelist/' + pricelistId, pricelist);
}

createNewTimetable(timetable: TimeTable) {
  return this.http.post(this.baseUrl + 'admin/addTimetable', timetable);
}

getTimetables(pageSize: number, currentPage: number) {
  const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
  return this.http.get<{timetables: Observable<TimeTable[]>, count: number}>(this.baseUrl + 'admin/getTimetables' + queryParams);
}

getAllTimetables() {
  return this.http.get<Observable<TimeTable[]>>(this.baseUrl + 'admin/getAllTimetables');
}

getTimetable(timetableId: string) {
  return this.http.get<TimeTable>(this.baseUrl + 'admin/getTimetable/' + timetableId);
}

deleteTimetable(timetableId) {
  return this.http.delete(this.baseUrl + 'admin/removeTimetable/' + timetableId);
}

updateTimetable(timetableId: string, timetable: TimeTable) {
  return this.http.put(this.baseUrl + 'admin/updateTimetable/' + timetableId, timetable);
}

createNewBus(bus: any) {
  return this.http.post(this.baseUrl + 'admin/addBus', bus);
}

getUserDiscount(discType: string) {
  return this.http.get<UserDiscount>(this.baseUrl + 'admin/getUserDiscount/' + discType);
}

updateUserDiscount(discType: string, discount: UserDiscount) {
  console.log(discount);
  return this.http.put(this.baseUrl + 'admin/updateUserDiscount/' + discType, discount);
}
}
