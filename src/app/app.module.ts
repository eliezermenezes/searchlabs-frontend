// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule, TabsModule } from 'ngx-bootstrap';
import { NgxCoolDialogsModule } from 'ngx-cool-dialogs';

// Sign-in
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// Modules
import { UserModule } from './user/user.module';
import { LaboratoryModule } from './laboratory/laboratory.module';
import { SolicitationModule } from './solicitation/solicitation.module';
import { ReservationModule } from './reservation/reservation.module';
import { ClassModule } from './class/class.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuComponent } from './layout/menu/menu.component';
import { OccupationMapComponent } from './occupation-map/occupation-map.component';
import { DetailComponent } from './occupation-map/detail/detail.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

// Interceptor Service
import { InterceptService } from './shared/services/custom/intercept.service';

import * as $ from 'jquery';

import {
    faTachometerAlt,
    faUsers,
    faUserCircle,
    faSignOutAlt,
    faSitemap,
    faMapMarkedAlt,
    faBell,
    faCalendarAlt,
    faLayerGroup,
    faChevronLeft,
    faBars
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
    faCalendarAlt,
    faLayerGroup,
    faChevronLeft,
    faBars
);

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
        DetailComponent,
        AuthComponent,
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
            progressAnimation: 'increasing',
            timeOut: 2000
        }),
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        ReactiveFormsModule,
        SocialLoginModule,
        UserModule,
        LaboratoryModule,
        SolicitationModule,
        ReservationModule,
        ClassModule,
        SharedModule,
        NgxCoolDialogsModule.forRoot({
            theme: 'default',
            okButtonText: 'Sim',
            cancelButtonText: 'Não',
            color: 'rgb(210, 80, 80)',
            titles: {
                confirm: 'Confirmação!'
            }
        })
    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
