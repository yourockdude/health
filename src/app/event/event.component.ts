import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { CalendarEvent } from '../shared/models/calendar-event';

@Component({
    moduleId: module.id,
    selector: 'health-event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})

export class EventComponent implements OnInit {
    @Input() event: CalendarEvent;
    @Input() role: number;

    @Output() onEditEvent = new EventEmitter();
    @Output() onDeleteEvent = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    edit() {
        this.onEditEvent.emit(this.event);
    }

    delete() {
        this.onDeleteEvent.emit(this.event);
    }
}
