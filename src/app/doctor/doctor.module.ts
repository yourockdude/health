import { NgModule } from '@angular/core';
import { DoctorComponent } from './doctor.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [DoctorRoutingModule, SharedModule],
    exports: [],
    declarations: [DoctorComponent],
    providers: [],
})
export class DoctorModule { }
