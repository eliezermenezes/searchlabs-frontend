import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReservationService } from 'src/app/reservation/reservation.service';
import { Reservation } from 'src/app/shared/models/reservation.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    public subscribe: Subscription;
    public reservations: Reservation[];
    public occupationMap: Object[];
    public noResults: boolean;

    constructor(
        private reservationService: ReservationService,
        private routerActive: ActivatedRoute
    ) { }

    ngOnInit() {
        
        this.subscribe = this.routerActive.params.subscribe((params: any) => {
            if (params['laboratory']) {
                this.createInstanceMap();
                this.onlyReservations(params['laboratory']);
            }
        });
        console.log(this.routerActive.params);
    }

    public async onlyReservations(laboratory: number) {
        try {
            const reservations = await this.reservationService.getByLaboratory(laboratory);
            if (reservations.length > 0) {
                this.noResults = false;
                this.reservations = reservations;
                await this.mountMap();
            } else {
                this.createInstanceMap();
                this.noResults = true;
            }
        } catch (e) {
            this.createInstanceMap();
            this.noResults = true;
            console.log(e);
        }
    }

    public async mountMap() {
        await this.reservations.forEach((element: any) => {
        
            if (element.occupation_maps) {
                element.occupation_maps.forEach(value => {
                    const classe = {
                        name: element.solicitation.class.name,
                        locale: element.solicitation.class.institution
                    };
                    const schedule_date = {
                        date: value.date,
                        hour: {
                            start: value.start_hour,
                            end: value.end_hour
                        }
                    };

                    const elements = {
                        class: classe,
                        value: schedule_date
                    };

                    this.occupationMap.push(elements);
                });
            }
        });

        await this.orderArray();
    }

    public async orderArray() {
        await this.occupationMap.sort((one: any, two: any): number => {
            if (one.value.date < two.value.date) return -1;
            if (one.value.date > two.value.date) return 1;

            return 0;
        });

        console.log(this.occupationMap);
    }

    public createInstanceMap() {
        this.occupationMap = new Array<Object>();
    }

    ngOnDestroy(): void {
        this.subscribe.unsubscribe();
    }
}
