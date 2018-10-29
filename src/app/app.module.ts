// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { UserModule } from './user/user.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { SolicitationModule } from './solicitation/solicitation.module';
import { ReservationModule } from './reservation/reservation.module';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { OccupationMapComponent } from './occupation-map/occupation-map.component';

import {
    faTachometerAlt,
    faUsers,
    faUserCircle,
    faSignOutAlt,
    faSitemap,
    faMapMarkedAlt,
    faBell,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
    faTachometerAlt,
    faUsers,
    faUserCircle,
    faSignOutAlt,
    faSitemap,
    faMapMarkedAlt,
    faBell,
    faCalendarAlt
    );

import * as $ from 'jquery';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        MenuComponent,
        NavbarComponent,
        FooterComponent,
        OccupationMapComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        LoadingBarHttpClientModule,
        LoadingBarRouterModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            preventDuplicates: false,
            progressBar: true,
            progressAnimation: 'increasing'
        }),
        UserModule,
        LaboratoryModule,
        SolicitationModule,
        ReservationModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
