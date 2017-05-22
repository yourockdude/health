import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        AuthRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class AuthModule { }
