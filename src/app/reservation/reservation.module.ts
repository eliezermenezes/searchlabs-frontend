import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReservationRoutingModule } from './reservation-routing.module';
import { SharedModule } from '../shared/shared.module';

import {
    ReservationComponent
} from './reservation.component';

import {
    faEdit,
    faTimes,
    faBan,
    faCheckDouble,
    faUserEdit,
    faUserTimes,
    faUserPlus,
    faPlus,
    faAsterisk,
    faLaptopCode,
    faTrash,
    faCalendarAlt,
    faSearch,
    faFilter,
    faClock,
    faUniversity,
    faUser,
    faLayerGroup,
    faChevronCircleRight,
    faChevronRight,
    faCheck,
    faSitemap,
    faMapMarked,
    faCogs,
    faPencilAlt,
    faMinusCircle,
    faInfoCircle,
    faUserLock,
    faMale,
    faFemale,
    faUserCircle,
    faLock,
    faSyncAlt,
    faFile,
    faLaptop
} from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';

library.add(
    faEdit,
    faTimes,
    faBan,
    faCheckDouble,
    faUserEdit,
    faUserTimes,
    faUserPlus,
    faPlus,
    faAsterisk,
    faLaptopCode,
    faTrash,
    faCalendarAlt,
    faSearch,
    faFilter,
    faCalendarAlt,
    faClock,
    faUniversity,
    faUser,
    faLayerGroup,
    faChevronCircleRight,
    faChevronRight,
    faCheck,
    faSitemap,
    faMapMarked,
    faCogs,
    faPencilAlt,
    faMinusCircle,
    faInfoCircle,
    faUserLock,
    faMale,
    faFemale,
    faUserCircle,
    faLock,
    faSyncAlt,
    faFile,
    faLaptop
);

@NgModule({
    imports: [
        CommonModule,
        ReservationRoutingModule,
        FontAwesomeModule,
        SharedModule
    ],
    declarations: [ReservationComponent]
})
export class ReservationModule { }
