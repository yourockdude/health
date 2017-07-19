import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorComponent } from './doctor.component';

const routes: Routes = [
    { path: 'doctor/:id', component: DoctorComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DoctorRoutingModule { }

export const routedComponents = [DoctorComponent];
