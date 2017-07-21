import { Component, OnInit, TemplateRef } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay } from 'angular-calendar';
import { Router, ActivatedRoute } from '@angular/router';
import { startOfDay, endOfDay, isSameMonth, isSameDay } from 'date-fns';
import { HealthService } from '../shared/services/health.service';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { toggleLoader } from '../shared/utils/toggle-loader';
import { User } from '../shared/models/user';

const color: any = {
    primary: '#20b2aa',
    secondary: '#20b2aa'
};

@Component({
    moduleId: module.id,
    selector: 'health-schedule',
    templateUrl: 'schedule.component.html',
    styleUrls: ['schedule.component.scss'],
    providers: [HealthService, AuthService],
})

export class ScheduleComponent implements OnInit {

    // --------------------------begin calendar options ------------------------
    view = 'month';
    viewDate: Date = new Date();
    events: any[] = [];
    clickedDate: Date;
    locale = 'ru';
    weekStartsOn = 1;
    activeDayIsOpen = false;
    // --------------------------end calendar options --------------------------

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
    isAdmin: boolean;
    selectedDay: CalendarMonthViewDay;
    selectDay: (day: CalendarMonthViewDay) => void;
    editAppointment = false;
    editEvent;
    reservedTime = [];
    client: User;
    userDoctors: User[];
    selectedDoctorId: string;
    allDoctors: User[] = [];
    isOpenDoctorList = false;

    // --------------------------begin autocomplite options ------------------------
    allClients: User[];
    clientName = '';
    noMatchFoundText = 'Нет результатов';
    matchFormatted = true;
    listFormatter = (data) => {
        return `${data.firstName} ${data.lastName}`;
    }
    valueFormatter = (data) => {
        return `${data.firstName} ${data.lastName}`;
    }

    // --------------------------end autocomplite options --------------------------

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
                this.userDoctors = this.user.doctors;
                this.isAdmin = res.data.role === 0 ? true : false;
                if (this.isAdmin) {
                    this.fetchEvents(this.user.id);
                    this.healthService.getClients().subscribe(r => {
                        if (r.success) {
                            this.allClients = r.data;
                        } else {
                            throw new Error(JSON.stringify(r.error));
                        }
                    });
                } else {
                    this.selectedDoctorId = this.user.doctors[0].id;
                    this.fetchEvents(this.selectedDoctorId);
                }
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
        this.healthService.getAdmins().subscribe(res => {
            if (res.success) {
                this.allDoctors = res.data;
            } else {
                throw new Error(JSON.stringify(res.error));
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
        this.buildForm();
    }

    ngOnInit() { }

    get isAuth(): boolean {
        return this.authService.isAuth();
    }

    mask(time): (string | RegExp)[] {
        if (time.charAt(0) === '2') {
            return [/[0-2]/, /[0-3]/, ':', /[0-5]/, /[0-9]/];
        } else {
            return [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
        }
    }

    fetchEvents(id: string): void {
        this.healthService.getEvents().subscribe(res => {
            if (res.success) {
                this.events = res.data.map(result => {
                    result.start = new Date(result.start);
                    result.end = new Date(result.end);
                    return result;
                }).filter(e => e.doctorId === id);
                this.events.sort((a, b) => {
                    return a.start.getTime() - b.start.getTime();
                });
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    buildForm(start = '', end = ''): void {
        this.newAppointmentForm = this.formBuilder.group({
            'start': [start],
            'end': [end],
        });
    }

    addEvent(): void {
        if (this.isAdmin && this.editAppointment) {
            this.editEvent.start = this.combineDate(this.newAppointmentForm.value.start, this.viewDate);
            this.editEvent.end = this.combineDate(this.newAppointmentForm.value.end, this.viewDate);
            this.healthService.editEvent(this.editEvent).subscribe(res => {
                if (res.success) {
                    this.editAppointment = false;
                    this.buildForm();
                } else {
                    throw new Error(JSON.stringify(res.error));
                }
            });
        } else if (this.isAdmin) {
            const event = {
                title: `${this.client.firstName} ${this.client.lastName}`,
                start: this.combineDate(this.newAppointmentForm.value.start, this.viewDate),
                end: this.combineDate(this.newAppointmentForm.value.end, this.viewDate),
                color: color,
                doctorId: this.user.id,
            };
            this.healthService.addEventAsAdmin(event, this.client.id).subscribe(
                res => {
                    if (res.success) {
                        this.showAppointmentForm = false;
                        this.fetchEvents(this.user.id);
                        this.oneDayEvents.push({
                            id: res.data.id,
                            title: event.title,
                            start: event.start,
                            end: event.end
                        });
                        this.oneDayEvents.sort((a, b) => {
                            return a.start.getTime() - b.start.getTime();
                        });
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                },
                err => {
                    throw new Error(JSON.stringify(err));
                },
                () => {
                    this.clientName = '';
                    this.buildForm();
                }
            );
            console.log(event);
        } else {
            const event = {
                title: `${this.user.firstName} ${this.user.lastName}`,
                start: this.combineDate(this.newAppointmentForm.value.start, this.viewDate),
                end: this.combineDate(this.newAppointmentForm.value.end, this.viewDate),
                color: color,
                doctorId: this.selectedDoctorId,
            };
            this.healthService.addEvent(event).subscribe(
                res => {
                    if (res.success) {
                        this.showAppointmentForm = false;
                        this.fetchEvents(this.selectedDoctorId);
                        // this.events.push(res.data);
                        this.oneDayEvents.push({
                            id: res.data.id,
                            title: event.title,
                            start: event.start,
                            end: event.end
                        });
                        this.oneDayEvents.sort((a, b) => {
                            return a.start.getTime() - b.start.getTime();
                        });
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                },
                err => {
                    throw new Error(JSON.stringify(err));
                },
                () => {
                    this.buildForm();
                    this.payed = false;
                }
            );
        }
    }

    delete(e): void {
        this.healthService.deleteEvent(e.id).subscribe(res => {
            if (res.success) {
                this.oneDayEvents.splice(this.oneDayEvents.indexOf(e), 1);
                if (this.isAdmin) {
                    this.fetchEvents(this.user.id);
                } else {
                    this.fetchEvents(this.selectedDoctorId);
                }
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    edit(e): void {
        this.editEvent = e;
        this.editAppointment = true;
        this.showAppointmentForm = true;
        let start = new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit' }).format(e.start);
        if (start.length === 4) {
            start = 0 + start;
        }
        let end = new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit' }).format(e.end);
        if (end.length === 4) {
            end = 0 + end;
        }
        this.reservedTime.splice(this.reservedTime
            .map(r => JSON.stringify(r)).indexOf(JSON.stringify({
                'start': e.start.getTime(),
                'end': e.end.getTime()
            })), 1);
        this.buildForm(start, end);
    }

    cancel(): void {
        this.editAppointment = false;
        this.buildForm();
        this.payed = false;
        this.clientName = '';
        delete this.editEvent;
    }

    combineDate(time: string, date: Date): Date {
        const newDate = new Date(date.getTime());
        newDate.setHours(parseInt(time.split(':')[0], 10));
        newDate.setMinutes(parseInt(time.split(':')[1], 10));
        return newDate;
    }

    fetchOneDayEvents(events) {
        const oneDayEvents = [];
        for (const event of events) {
            oneDayEvents.push(event);
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
        this.oneDayEvents = day.events;
        this.reservedTime = this.oneDayEvents.map(res => ({
            'start': res.start.getTime(),
            'end': res.end.getTime()
        }));
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
                    for (const item of this.reservedTime) {
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
        if (this.validTime && this.payed || this.validTime && this.isAdmin) {
            return true;
        } else {
            return false;
        }
    }

    onValueChanged(user: User): void {
        this.client = user;
        console.log(user);
    }

    selectDoctor(doctor) {
        this.selectedDoctorId = doctor.id;
        this.fetchEvents(this.selectedDoctorId);
    }

    addDoctor(doctor) {
        this.healthService.editProfile(this.user).subscribe(res => {
            if (res.success) {
                this.userDoctors.push(doctor);
                this.isOpenDoctorList = false;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    openDoctorList() {
        this.allDoctors = this.allDoctors.filter(f => this.userDoctors.map(m => m.id).indexOf(f.id) === -1);
        this.isOpenDoctorList = !this.isOpenDoctorList;
    }
}
