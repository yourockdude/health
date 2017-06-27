import { NgModule } from '@angular/core';

import { CalendarModule } from 'angular-calendar';

import { ScheduleComponent } from './schedule.component';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { TextMaskModule } from 'angular2-text-mask';
import { EventModule } from '../event/event.module';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

@NgModule({
    imports: [
        ScheduleRoutingModule,
        SharedModule.forRoot(),
        CalendarModule.forRoot(),
        TextMaskModule,
        EventModule,
        NguiAutoCompleteModule,
    ],
    exports: [],
    declarations: [
        ScheduleComponent,
        CalendarHeaderComponent,
    ],
    providers: [AuthGuard],
})
export class ScheduleModule { }
