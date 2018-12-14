import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from 'src/app/shared/services/event.service';
import { MessageRequest } from '../../shared/components/confirm/message-request';
import { TopicsService } from '../topics.service';
import { Class } from '../../shared/models/class.model';
import { Topic } from '../../shared/models/topic.model';
import { ClassService } from '../class.service';

@Component({
    selector: 'app-topics',
    templateUrl: './topics.component.html',
    styleUrls: ['./topics.component.scss'],
    providers: [TopicsService]
})
export class TopicsComponent implements OnInit, OnDestroy {

    public class: Class;
    public topics: Topic[];
    public subscribe: Subscription;
    public noResults: boolean;
    public hasPermissionAdmin: boolean;

    public msg: MessageRequest = new MessageRequest();

    constructor(
        private classService: ClassService,
        private topicsService: TopicsService,
        private router: Router,
        private routerActive: ActivatedRoute,
        private events: EventsService,
        private utils: UtilsService
    ) { }

    async ngOnInit() {
        this.topics = new Array<Topic>();
        this.hasPermissionAdmin = this.utils.hasPermissionOfAdmin();
        this.subscribe = await this.routerActive.params.subscribe((params: any) => {
            let class_id = params['id'];
            if (class_id) {
                this.getClass(class_id);
            } else {
                this.router.navigate(['/classes']);
            }
        });
    }

    public async getClass(id: number) {
        try {
            let classe = await this.classService.getById(id);
            if (classe) {
                this.class = classe;
                this.getTopics();
            }
        } catch (e) {
            console.log(e);
        }
    }

    public async getTopics() {
        try {
            let topics = await this.topicsService.get(this.class.id);
            if (topics.length > 0) {
                this.topics = topics;
            } else {
                this.noResults = true;
            }
        } catch (e) {
            this.noResults = true;
            console.log(e);
        }
    }

    public async refleshTopics(feedback: any) {
        if (feedback === '_refreshTopics') {
            await this.getTopics();
            if (this.topics.length > 0) {
                this.noResults = false;
            }
        }
    }

    public async delete(topic: Topic) {
        try {
            const topicDeleted = await this.topicsService.delete(topic.id);
            if (topicDeleted) {
                this.utils.rollbackSuccess(this.msg.deleted_item);
                this.getTopics();
            } else {
                this.utils.rollbackError(this.msg.delete_error);
            }

        } catch (e) {
            this.utils.rollbackError(this.msg.error_request);
            console.log(e);
        }
    }

    public edit(topic: Topic) {
        this.events.broadcast('_altTopic', topic);
    }

    ngOnDestroy() {
        this.subscribe.unsubscribe();
    }
}
