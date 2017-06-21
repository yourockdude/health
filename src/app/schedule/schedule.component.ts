import { Component, OnInit, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { HealthService } from '../shared/services/health.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { toggleLoader } from '../shared/utils/toggle-loader';
import { User } from "app/shared/models/user";

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
    providers: [HealthService, AuthService],
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
    user: User;

    selectedDay: CalendarMonthViewDay;
    selectDay: (day: CalendarMonthViewDay) => void;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private healthService: HealthService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
            }
        });
        this.selectDay = (day: CalendarMonthViewDay): void => {
            if (this.selectedDay && day.date.getTime() === this.selectedDay.date.getTime()) {
                day.cssClass = 'cal-day-selected';
            }
            const today = this.getToday();
            if (day.date < today) {
                day.cssClass = 'cal-day-disabled';
            }
        };
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

    fetchEvents() {
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

    buildForm(start = '', end = '') {
        this.newAppointmentForm = this.formBuilder.group({
            'start': [start],
            'end': [end]
        });
    }

    addEvent() {
        this.payed = false;
        const event = {
            title: `${this.user.firstName} ${this.user.lastName}`,
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
                this.oneDayEvents.sort((a, b) => {
                    return a.start.getTime() - b.start.getTime();
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

    selectToday(event) {
        this.activeDayIsOpen = false;
        if (isSameDay(event, new Date())) {
            const today = this.getToday();
            const tomorrow = new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000);
            const day = {
                date: today,
                events: this.events.filter(f => (f.start >= today && f.start <= tomorrow)),
            };
            this.dayClicked(day as CalendarMonthViewDay);
        }
    }

    dayClicked(day: CalendarMonthViewDay) {
        if (day.date < this.getToday()) {
            return;
        }
        this.showAppointmentForm = false;
        this.buildForm();
        if (day.cssClass) {
            this.selectedDay = undefined;
        } else {
            this.selectedDay = day;
            day.cssClass = 'cal-day-selected';
        }
        this.oneDayEvents = this.fetchOneDayEvents(day.events);
        if (isSameDay(this.viewDate, day.date)) {
            this.activeDayIsOpen = !this.activeDayIsOpen;
        } else {
            this.activeDayIsOpen = true;
        }
        this.viewDate = new Date(day.date);
    }

    onFocusOut(isStart) {
        if (isStart && this.newAppointmentForm.value.start.indexOf('_') >= 0) {
            this.buildForm('', this.newAppointmentForm.value.end);
        }
        if (!isStart && this.newAppointmentForm.value.end.indexOf('_') >= 0) {
            this.buildForm(this.newAppointmentForm.value.start, '');
        }
    }

    getToday() {
        return new Date(new Date().setHours(0, 0, 0, 0));
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
        const reservedTime = this.oneDayEvents.map(res => ({
            'start': res.start.getTime(),
            'end': res.end.getTime()
        }));
        if (isNaN(userTime.start) || isNaN(userTime.end)) {
            return 'Время не введено';
        } else {
            if (userTime.start >= userTime.end) {
                return 'Время начала должно быть меншьше времени окончания';
            } else {
                if (
                    userTime.start < workTime.start ||
                    userTime.start > workTime.end ||
                    userTime.end < workTime.start ||
                    userTime.end > workTime.end
                ) {
                    return 'Выбрано нерабочее время';
                } else {
                    for (const item of reservedTime) {
                        if (
                            item.start <= userTime.start && item.end > userTime.start ||
                            item.start < userTime.end && item.end >= userTime.end ||
                            userTime.start < item.start && userTime.end > item.end
                        ) {
                            return 'Время занято';
                        }
                    };
                }
            }
        }
        this.validTime = true;
        return '';
    }

    get allowToSaveEvent() {
        if (this.validTime && this.payed) {
            return true;
        }
        return false;
    }
}
