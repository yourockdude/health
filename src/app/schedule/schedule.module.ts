import { NgModule } from '@angular/core';

import { CalendarModule } from 'angular-calendar';

import { ScheduleComponent } from './schedule.component';
// import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';

@NgModule({
    imports: [
        // ScheduleRoutingModule,
        SharedModule.forRoot(),
        CalendarModule.forRoot(),
    ],
    exports: [],
    declarations: [
        ScheduleComponent,
        CalendarHeaderComponent,
    ],
    providers: [AuthGuard],
})
export class ScheduleModule { }
