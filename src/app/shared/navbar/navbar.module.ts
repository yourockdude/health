import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { ChatWindowModule } from '../chat-window/chat-window.module';
import { SharedModule } from '../shared.module';
import { NotificationModule } from '../../notification/notification.module';

const routes: Routes = [];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        NotificationModule,
    ],
    exports: [
        NavbarComponent
    ],
    declarations: [
        NavbarComponent,
    ],
    providers: [],
})
export class NavbarModule { }
