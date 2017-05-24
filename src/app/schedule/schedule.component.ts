import { Component, OnInit, TemplateRef } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { HealthService } from '../shared/services/health.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const colors: any = {
    red: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
    },
    blue: {
        primary: '#1e90ff',
        secondary: '#D1E8FF'
    },
    yellow: {
        primary: '#e3bc08',
        secondary: '#FDF1BA'
    }
};

@Component({
    moduleId: module.id,
    selector: 'health-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.css'],
    providers: [HealthService],
})

export class ScheduleComponent implements OnInit {

    // --------------------------begin calendar option ------------------------
    view = 'month';
    viewDate: Date = new Date();
    events: CalendarEvent[] = [];
    clickedDate: Date;
    locale = 'ru';
    weekStartsOn = 1;
    activeDayIsOpen = false;
    // --------------------------end calendar option --------------------------

    showAppointmentForm = false;
    oneDayEvents: any[] = [];
    newAppointmentForm: FormGroup;
    time = '';
    payed = false;
    workTime = {
        start: '08:00',
        end: '18:00'
    };
    validTime = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private healthService: HealthService,
        private formBuilder: FormBuilder,
    ) {
        this.fetchEvents();
        this.buildForm();
    }

    ngOnInit() { }

    mask(time) {
        if (time.charAt(0) === '2') {
            return [/[0-2]/, /[0-3]/, ':', /[0-5]/, /[0-9]/];
        } else {
            return [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
        }
    }

    fetchEvents(): void {
        this.healthService.getEvents().subscribe(res => {
            if (res.success) {
                this.events = res.data.map(result => {
                    return {
                        start: new Date(result.start),
                        title: result.title,
                        end: new Date(result.end),
                        color: result.color,
                    };
                });
                this.events.sort((a, b) => {
                    return a.start.getTime() - b.start.getTime();
                });
            } else {
                console.log(res);
            }
        });
    }

    buildForm() {
        this.newAppointmentForm = this.formBuilder.group({
            'start': [''],
            'end': ['']
        });
    }

    addEvent() {
        const event = {
            title: 'olololo',
            start: this.combineDate(this.newAppointmentForm.value.start, this.viewDate),
            end: this.combineDate(this.newAppointmentForm.value.end, this.viewDate),
            color: colors.red,
        };
        this.healthService.addEvent(event).subscribe(res => {
            if (res.success) {
                this.fetchEvents();
                this.oneDayEvents.push({
                    title: event.title,
                    start: event.start,
                    end: event.end
                });
                this.buildForm();
            } else {
                console.log(res);
            }
        });
    }

    combineDate(time: string, date: Date): Date {
        const newDate = new Date(date.getTime());
        newDate.setHours(parseInt(time.split(':')[0], 10));
        newDate.setMinutes(parseInt(time.split(':')[1], 10));
        return newDate;
    }

    fetchOneDayEvents(events: CalendarEvent[]) {
        const oneDayEvents = [];
        for (const event of events) {
            oneDayEvents.push({
                title: event.title,
                start: event.start,
                end: event.end
            });
        }
        return oneDayEvents;
    }

    dayClicked({ date, events }: { date: Date, events: CalendarEvent[] }) {
        this.oneDayEvents = this.fetchOneDayEvents(events);
        if (isSameDay(this.viewDate, date)) {
            this.activeDayIsOpen = !this.activeDayIsOpen;
        } else {
            this.activeDayIsOpen = true;
        }
        this.viewDate = new Date(date);
    }

    get timeValidation() {
        this.validTime = false;
        const workTime = {
            start: this.combineDate(this.workTime.start, this.viewDate).getTime(),
            end: this.combineDate(this.workTime.end, this.viewDate).getTime()
        };
        const userTime = {
            start: this.combineDate(this.newAppointmentForm.value.start, this.viewDate).getTime(),
            end: this.combineDate(this.newAppointmentForm.value.end, this.viewDate).getTime()
        };
        const reservedTime = this.oneDayEvents.map(res => ({ 'start': res.start.getTime(), 'end': res.end.getTime() }));
        if (isNaN(userTime.start) || isNaN(userTime.end)) {
            console.log('введите время');
            return 'введите время';
        } else {
            if (userTime.start >= userTime.end) {
                console.log('ну так нельзя');
                return 'ну так нельзя';
            } else {
                if (
                    userTime.start < workTime.start ||
                    userTime.start > workTime.end ||
                    userTime.end < workTime.start ||
                    userTime.end > workTime.end
                ) {
                    console.log('это не рабочее время');
                    return 'это не рабочее время';
                } else {
                    for (const item of reservedTime) {
                        if (item.start <= userTime.start && item.end > userTime.start) {
                            console.log('start wrong');
                            return 'start wrong';
                        }
                        if (item.start < userTime.end && item.end >= userTime.end) {
                            console.log('end wrong');
                            return 'end wrong';
                        };
                        if (userTime.start < item.start && userTime.end > item.end) {
                            console.log('both wrong');
                            return 'both wrong';
                        }
                    };
                }
            }
        }
        this.validTime = true;
        return 'все валидно';
    }
}
