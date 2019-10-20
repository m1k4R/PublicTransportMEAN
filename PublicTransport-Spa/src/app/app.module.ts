import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { BsDropdownModule, BsDatepickerModule, ButtonsModule, CollapseModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './user/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { AdminService } from './_services/admin.service';
import { AuthGuard } from './_guards/auth.guard';
import { PricelistResolver } from './_resolvers/pricelist.resolver';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './passenger/tickets/tickets.component';
import { TimetableComponent } from './passenger/timetable/timetable.component';
import { UpdateAccountComponent } from './passenger/update-account/update-account.component';
import { UpdateUserResolver } from './_resolvers/update-user.resolver';
import { MomentModule, DateFormatPipe } from 'ngx-moment';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MapComponent } from './passenger/map/map.component';
import { UserVerificationComponent } from './controller/userVerification/userVerification.component';
import { UserVerificationResolver } from './_resolvers/userVerification.resolver';
import { ControllerService } from './_services/controller.service';
import { TicketVerificationComponent } from './controller/ticketVerification/ticketVerification.component';
import { TicketVerificationResolver } from './_resolvers/ticketVerification.resolver';
import { PricelistComponent } from './passenger/pricelist/pricelist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewLineComponent } from './admin/newLine/newLine.component';
import { ViewLinesComponent } from './admin/viewLines/viewLines.component';
import { NewStationComponent } from './admin/newStation/newStation.component';
import { ViewStationsComponent } from './admin/viewStations/viewStations.component';
import { NewTimetableComponent } from './admin/newTimetable/newTimetable.component';
import { ViewTimetablesComponent } from './admin/viewTimetables/viewTimetables.component';
import { ViewPricelistComponent } from './admin/viewPricelist/viewPricelist.component';
import { TicketResolver } from './_resolvers/ticket.resolver';
import { NewPricelistComponent } from './admin/newPricelist/newPricelist.component';
import { StationListResolver } from './_resolvers/stationList.resolver';
import { LineListResolver } from './_resolvers/lineList.resolver';
import { AgmCoreModule } from '@agm/core';
import { BusListResolver } from './_resolvers/busList.resolver';
import { PriceListAdminResolver } from './_resolvers/priceListAdmin.resolver';
import { TimetableListResolver } from './_resolvers/timetableList.resolver';
import { AgmDirectionModule } from 'agm-direction';
import { NgxPayPalModule } from 'ngx-paypal';
import { MyTicketComponent } from './passenger/myTicket/myTicket.component';

export function getToken() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent,
      NavbarComponent,
      HomeComponent,
      TicketsComponent,
      TimetableComponent,
      UpdateAccountComponent,
      MapComponent,
      UserVerificationComponent,
      TicketVerificationComponent,
      PricelistComponent,
      NewLineComponent,
      ViewLinesComponent,
      NewStationComponent,
      ViewStationsComponent,
      NewTimetableComponent,
      ViewTimetablesComponent,
      ViewPricelistComponent,
      NewPricelistComponent,
      MyTicketComponent
   ],
   imports: [
      BrowserModule,
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config: {
            tokenGetter: getToken,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/authorization']
         }
      }),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'
       }),
      AgmDirectionModule,
      HttpClientModule,
      MomentModule,
      FormsModule,
      ReactiveFormsModule,
      FileUploadModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ButtonsModule.forRoot(),
      ModalModule.forRoot(),
      BrowserAnimationsModule,
      CollapseModule.forRoot(),
      NgxPayPalModule
  ],
  providers: [
     AuthService,
     UserService,
     AlertifyService,
     AdminService,
     ControllerService,
     AuthGuard,
     PricelistResolver,
     UpdateUserResolver,
     UserVerificationResolver,
     TicketVerificationResolver,
     StationListResolver,
     TicketResolver,
     LineListResolver,
     BusListResolver,
     PriceListAdminResolver,
     TimetableListResolver
  ],
  bootstrap: [
     AppComponent
   ],
   entryComponents: [LoginComponent, RegisterComponent]
})
export class AppModule { }
