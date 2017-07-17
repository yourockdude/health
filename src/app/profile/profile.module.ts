import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { UserFileModule } from '../user-file/user-file.module';

@NgModule({
    imports: [
        ProfileRoutingModule,
        SharedModule,
        NgxMyDatePickerModule,
        UserFileModule,
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }
