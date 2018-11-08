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
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';

// Sign-in
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// Modules
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
import { SigninComponent } from './signin/signin.component';

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('700230342978-uai9re9k768n2fdalf19qivqvgl3fmd3.apps.googleusercontent.com')
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        MenuComponent,
        NavbarComponent,
        FooterComponent,
        OccupationMapComponent,
        SigninComponent
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
            progressAnimation: 'increasing',
            timeOut: 2000
        }),
        ModalModule.forRoot(),
        ReactiveFormsModule,
        SocialLoginModule,
        UserModule,
        LaboratoryModule,
        SolicitationModule,
        ReservationModule
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
