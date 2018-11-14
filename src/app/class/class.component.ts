import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../shared/services/utils.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EventsService } from '../shared/services/event.service';
import { Class } from '../shared/models/class.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ClassService } from './class.service';
import { ConfirmComponent } from '../shared/components/confirm/confirm.component';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss'],
    providers: [ClassService]
})
export class ClassComponent implements OnInit {

    public classes: Class[];
    public noResults: boolean;

    public bsModalRef: BsModalRef;

    constructor(
        private utils: UtilsService,
        private classService: ClassService,
        private router: Router,
        private toastr: ToastrService,
        private modalService: BsModalService,
        private events: EventsService
    ) {
        this.events.on('DELETE_CLASS', (id: number) => {
            this.deleteClass(id);
        });
    }

    ngOnInit() {
        this.utils.eventAlterHeader('Classes');

        this.classes = new Array<Class>();
        this.listClasses();
    }

    public async listClasses() {
        try {
            const classes = await this.classService.list();
            if (classes.length > 0) {
                this.classes = classes;
            } else {
                this.noResults = true;
            }
        } catch (error) {
            this.noResults = true;
            console.log(error);
        }
    }

    public async deleteClass(id: number) {
        try {
            const classDeleted = await this.classService.delete(id);
            if (!classDeleted) {
                this.toastr.error("Não foi possível deletar a classe", "Erro");
            } else {
                this.toastr.success("Classe deletada", "Sucesso");
                this.listClasses();
            }
        } catch (error) {
            this.toastr.error("Erro ao processar a requisição", "Erro");
            console.log(error);
        }
    }

    public confirmDelete(classs) {
        const initialState = {
            title: 'classe',
            event: 'DELETE_CLASS',
            model: classs
        };

        this.bsModalRef = this.modalService.show(ConfirmComponent, { initialState });
    }

    public goEdit(classs: Class) {
        this.router.navigate(['classes/' + classs.id + '/editar']);
    }

    public goResources(classs: Class) {
        this.router.navigate(['classes/' + classs.id + '/resources']);
    }

}
