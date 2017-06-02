import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { ChatWindowModule } from '../chat-window/chat-window.module';

const routes: Routes = [];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatWindowModule,
        RouterModule.forRoot(routes),
    ],
    exports: [NavbarComponent],
    declarations: [
        NavbarComponent,
    ],
    providers: [],
})
export class NavbarModule { }
