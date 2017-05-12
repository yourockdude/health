import { NgModule } from '@angular/core';

import { SidenavComponent } from './sidenav.component';
import { SidenavRoutingModule } from './sidenav-routing.module';

@NgModule({
    imports: [
        SidenavRoutingModule,
    ],
    exports: [],
    declarations: [SidenavComponent],
    providers: [],
})
export class SidenavModule { }
