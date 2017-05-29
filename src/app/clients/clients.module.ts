import { NgModule } from '@angular/core';

import { ClientsComponent } from './clients.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientComponent } from '../client/client.component';

import { ChatWindowModule } from '../chat/chat-window/chat-window.module';

@NgModule({
    imports: [
        ClientsRoutingModule,
        SharedModule,
        ChatWindowModule,
    ],
    exports: [],
    declarations: [
        ClientsComponent,
        ClientComponent,
    ],
    providers: [],
})
export class ClientsModule { }
