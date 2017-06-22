import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';

@NgModule({
    imports: [
        ProfileRoutingModule,
        SharedModule,
        NgxMyDatePickerModule,
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }
