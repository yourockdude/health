import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { ChatWindowModule } from '../chat-window/chat-window.module';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [];

@NgModule({
    imports: [
        ChatWindowModule,
        SharedModule,
        RouterModule.forRoot(routes),
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
