import { NgModule } from '@angular/core';
import { ClientPageRoutingModule } from './client-page-routing.module';
import { ClientPageComponent } from './client-page.component';
import { SharedModule } from '../shared/shared.module';
import { UserFileModule } from '../user-file/user-file.module';

@NgModule({
    imports: [
        ClientPageRoutingModule,
        SharedModule,
        UserFileModule,
    ],
    exports: [],
    declarations: [
        ClientPageComponent,
    ],
    providers: [],
})
export class ClientPageModule { }
