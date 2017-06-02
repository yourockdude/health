import { NgModule } from '@angular/core';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from '../client/client.component';

@NgModule({
    imports: [
        ClientsRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        ClientsComponent,
        ClientComponent,
    ],
    providers: [],
})
export class ClientsModule { }
