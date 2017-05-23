import { NgModule } from '@angular/core';

import { SidenavComponent } from './sidenav.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SidenavRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [SidenavComponent],
    providers: [],
})
export class SidenavModule { }
