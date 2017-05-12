import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleComponent } from './schedule.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'schedule',
        component: ScheduleComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ScheduleRoutingModule { }

export const routedComponents = [ScheduleComponent];