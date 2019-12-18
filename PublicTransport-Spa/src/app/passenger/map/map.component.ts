import { Component, OnInit, NgZone } from '@angular/core';
import { MarkerInfo } from 'src/app/_models/marker-info.model';
import { GeoLocation } from 'src/app/_models/geolocation';
import { Polyline } from 'src/app/_models/polyline';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Line } from 'src/app/_models/line';
import { Station } from 'src/app/_models/station';
import { Directions } from 'src/app/_models/directions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  styles: ['agm-map {height: 100%; width: 100%;}']
})
export class MapComponent implements OnInit {
  markerInfo: MarkerInfo;
  public polyline: Polyline;
  public zoom: number;
  allDir: Directions[] = new Array<Directions>();
  dir = undefined;
  allLines: Line[];
  allStations: Station[];

  public dirsRenderOpt: Array<any> = [{
    renderOptions: { polylineOptions: { strokeColor: '#ff960c' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#0cff38' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#f9188d' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#5508ad' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#04cc1e' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#f9ff00' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#37bbe8' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#7f3c26' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#0f0' }, suppressMarkers: true },
  }, {
    renderOptions: { polylineOptions: { strokeColor: '#0f0' }, suppressMarkers: true },
  }];

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.allLines = data.lines.lines;
      this.allStations = data.stations.stations;
    });

    this.initializeRoutes();
  }

  constructor(private ngZone: NgZone, private alertify: AlertifyService, private route: ActivatedRoute) {
  }

  initializeRoutes() {
    console.table(this.allLines);
    this.allLines.forEach(element => {
      if (element.stations !== null || element.stations !== undefined || element.stations.length > 0) {
        let dir = new Directions();
        dir.waypoints = new Array<any>();
        if (element.stations[0] !== undefined) {
          console.log(element.stations[0]);
          dir.origin = {lat: element.stations[0].location.x, lng: element.stations[0].location.y};
          dir.destination = {lat: element.stations[element.stations.length - 1].location.x,
             lng: element.stations[element.stations.length - 1].location.y};
          element.stations.forEach(stl => {
            dir.waypoints.push({ location: { lat:  stl.location.x, lng: stl.location.y }, stopover: true });
          });
          this.allDir.push(dir);
        }
      }
    });

    console.log(this.allDir);
  }

}
