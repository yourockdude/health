import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        ProfileRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        ProfileComponent
    ],
    providers: [],
})
export class ProfileModule { }
