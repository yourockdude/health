import {
    Component,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import {
    subDays,
    addDays,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths
} from 'date-fns';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'mwl-calendar-header',
    templateUrl: 'calendar-header.component.html',
    styleUrls: ['calendar-header.component.css'],
})
export class CalendarHeaderComponent {
    @Input() view: string;
    @Input() viewDate: Date;
    @Input() locale = 'ru';
    @Output() viewChange: EventEmitter<string> = new EventEmitter();
    @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

    increment(): void {
        const addFn: any = {
            day: addDays,
            week: addWeeks,
            month: addMonths
        }[this.view];
        this.viewDateChange.emit(addFn(this.viewDate, 1));
    }

    decrement(): void {
        const subFn: any = {
            day: subDays,
            week: subWeeks,
            month: subMonths
        }[this.view];
        this.viewDateChange.emit(subFn(this.viewDate, 1));

    }

    today(): void {
        this.viewDateChange.emit(new Date());
    }

}
