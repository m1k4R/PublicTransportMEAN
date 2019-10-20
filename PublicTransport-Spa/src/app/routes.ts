import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './passenger/tickets/tickets.component';
import { PricelistResolver } from './_resolvers/pricelist.resolver';
import { TimetableComponent } from './passenger/timetable/timetable.component';
import { UpdateAccountComponent } from './passenger/update-account/update-account.component';
import { UpdateUserResolver } from './_resolvers/update-user.resolver';
import { MapComponent } from './passenger/map/map.component';
import { UserVerificationComponent } from './controller/userVerification/userVerification.component';
import { UserVerificationResolver } from './_resolvers/userVerification.resolver';
import { TicketVerificationComponent } from './controller/ticketVerification/ticketVerification.component';
import { TicketVerificationResolver } from './_resolvers/ticketVerification.resolver';
import { PricelistComponent } from './passenger/pricelist/pricelist.component';
import { NewLineComponent } from './admin/newLine/newLine.component';
import { ViewChild } from '@angular/core';
import { ViewLinesComponent } from './admin/viewLines/viewLines.component';
import { NewStationComponent } from './admin/newStation/newStation.component';
import { ViewStationsComponent } from './admin/viewStations/viewStations.component';
import { NewTimetableComponent } from './admin/newTimetable/newTimetable.component';
import { ViewTimetablesComponent } from './admin/viewTimetables/viewTimetables.component';
import { ViewPricelistComponent } from './admin/viewPricelist/viewPricelist.component';
import { AdminGuard } from './_guards/admin.guard';
import { AuthGuard } from './_guards/auth.guard';
import { TicketResolver } from './_resolvers/ticket.resolver';
import { ControllerGuard } from './_guards/controller.guard';
import { NewPricelistComponent } from './admin/newPricelist/newPricelist.component';
import { StationListResolver } from './_resolvers/stationList.resolver';
import { LineListResolver } from './_resolvers/lineList.resolver';
import { BusListResolver } from './_resolvers/busList.resolver';
import { PriceListAdminResolver } from './_resolvers/priceListAdmin.resolver';
import { TimetableListResolver } from './_resolvers/timetableList.resolver';
import { MyTicketComponent } from './passenger/myTicket/myTicket.component';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'timetable', component: TimetableComponent, resolve: {timetables: TimetableListResolver, lines: LineListResolver}},
    {path: 'map', component: MapComponent, resolve: {lines: LineListResolver, stations: StationListResolver}},
    {path: 'tickets', component: TicketsComponent, resolve: {pricelists: TicketResolver}},
    {path: 'pricelist', component: PricelistComponent, resolve: {allPricelists: PricelistResolver}},
    {path: 'updateAccount', runGuardsAndResolvers: 'always',
     canActivate: [AuthGuard], component: UpdateAccountComponent, resolve: {user: UpdateUserResolver}},
    {path: 'userVerification', runGuardsAndResolvers: 'always',
    canActivate: [ControllerGuard], component: UserVerificationComponent, resolve: {users: UserVerificationResolver}},
    {path: 'ticketVerification', runGuardsAndResolvers: 'always',
    canActivate: [ControllerGuard], component: TicketVerificationComponent, resolve: {tickets: TicketVerificationResolver}},
    {path: 'newLine', component: NewLineComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {stations: StationListResolver, busses: BusListResolver}},
    {path: 'viewLines', component: ViewLinesComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {lines: LineListResolver}},
    {path: 'newStation', component: NewStationComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {lines: LineListResolver}},
    {path: 'viewStations', component: ViewStationsComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {stations: StationListResolver}},
    {path: 'newTimetable', component: NewTimetableComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {lines: LineListResolver}},
    {path: 'viewTimetables', component: ViewTimetablesComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {timetables: TimetableListResolver, lines: LineListResolver}},
    {path: 'viewPricelist', component: ViewPricelistComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard], resolve: {pricelists: PriceListAdminResolver}},
    {path: 'newPricelist', component: NewPricelistComponent, runGuardsAndResolvers: 'always',
    canActivate: [AdminGuard]},
    {path: 'myTicket', component: MyTicketComponent, resolve: {user: UpdateUserResolver}},
    { path: '**', redirectTo: '', pathMatch: 'full'} // order is important and this need to be last
];
