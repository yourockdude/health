import { NgModule } from '@angular/core';

import { CalendarModule } from 'angular-calendar';

import { ScheduleComponent } from './schedule.component';
// import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
// import { DateTimePickerModule } from 'ng-pick-datetime';
import { TimeFormatPipe } from '../shared/pipes/time-format.pipe';
import { DateTimeFormatPipe } from '../shared/pipes/date-time-format.pipe';
import { TimepickerComponent } from '../timepicker/timepicker.component';

@NgModule({
    imports: [
        // ScheduleRoutingModule,
        SharedModule.forRoot(),
        CalendarModule.forRoot(),
        // DateTimePickerModule,
    ],
    exports: [],
    declarations: [
        ScheduleComponent,
        CalendarHeaderComponent,
        TimepickerComponent,
        TimeFormatPipe,
        DateTimeFormatPipe,
    ],
    providers: [AuthGuard],
})
export class ScheduleModule { }
