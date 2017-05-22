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

    // --------------------------begin timepicker option ------------------------
    pickerType = 'time';
    mode = 'dropdown';
    hourTime = '24';
    position = 'left';
    // --------------------------end timepicker option --------------------------


    showAppointmentForm = false;
    oneDayEvents: any[] = [];
    newAppointmentForm: FormGroup;

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
            'title': [''],
            'start': [''],
            'end': ['']
        });
    }

    addEvent() {
        const event = {
            title: this.newAppointmentForm.value.title,
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


}
