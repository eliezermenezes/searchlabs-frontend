import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventsService } from 'src/app/shared/services/event.service';
import { UtilsService } from '../../../shared/services/utils.service';
import { MessageRequest } from '../../../shared/components/confirm/message-request';
import { TopicsService } from '../../topics.service';
import { Class } from '../../../shared/models/class.model';
import { Topic } from '../../../shared/models/topic.model';

@Component({
    selector: 'app-topic-form',
    templateUrl: './topic-form.component.html',
    styleUrls: ['./topic-form.component.scss'],
    providers: [TopicsService]
})
export class TopicFormComponent implements OnInit {

    @Input() class: Class;
    @Input() topicEdit: Topic;
    @Output() feedBackSon = new EventEmitter();

    public isFormEdit: boolean;
    public formulario: FormGroup;
    public topic: Topic;
    public msg: MessageRequest = new MessageRequest();

    constructor(
        private formBuilder: FormBuilder,
        private topicService: TopicsService,
        private events: EventsService,
        private utils: UtilsService
    ) {
        this.events.on('_altTopic', (topic: Topic) => {
            this.topic = topic;
            this.isFormEdit = true;
            this.inicializeFormulario();
        });
    }

    async ngOnInit() {
        this.topic = new Topic();
        this.inicializeFormulario();
    }

    public inicializeFormulario() {
        this.formulario = this.formBuilder.group({
            class_id: [null],
            description: [this.topic.description, Validators.required]
        });
    }

    public onSubmit() {

        this.formulario.patchValue({
            class_id: this.class.id
        });

        if (!this.topic.id) {
            this.save();
        } else {
            this.update();
        }
    }

    public async save() {

        try {
            const topicCreated = await this.topicService.create(this.formulario.value);
            if (topicCreated) {
                this.formulario.reset();
                this.emitFeedbackForGetter();
                this.utils.rollbackSuccess(this.msg.created_item);
            } else {
                this.utils.rollbackError(this.msg.create_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    public async update() {

        try {
            const topicUpdated = await this.topicService.update(this.topic.id, this.formulario.value);
            if (topicUpdated) {
                this.rollbackTopics();
                this.emitFeedbackForGetter();
                this.utils.rollbackSuccess(this.msg.updated_item);
            } else {
                this.utils.rollbackError(this.msg.alter_error);
            }
        } catch (e) {
            console.log(e);
            this.utils.rollbackError(this.msg.error_request);
        }
    }

    private emitFeedbackForGetter() {
        this.feedBackSon.emit('_refreshTopics');
    }

    public rollbackTopics() {
        this.isFormEdit = !this.isFormEdit;
        this.topic = Object.assign(new Topic());
        this.formulario.reset();
    }
}
