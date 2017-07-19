import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IntermediateComponent } from './intermediate.component';
import { AuthGuard } from '../shared/services/auth-guard.service';

const routes: Routes = [
    {
        path: 'intermediate',
        component: IntermediateComponent,
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class IntermediateRoutingModule { }

export const routedComponents = [IntermediateComponent];
