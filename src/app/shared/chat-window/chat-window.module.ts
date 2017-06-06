import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatWindowComponent } from './chat-window.component';
import { ClientPipe } from '../pipes/client.pipe';
import { ChatDateTimePipe } from '../pipes/chat-date-time.pipe';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Angular2FontawesomeModule,
  ],
  exports: [ChatWindowComponent],
  declarations: [
    ChatWindowComponent,
    ClientPipe,
    ChatDateTimePipe,
  ],
  providers: [],
})
export class ChatWindowModule { }
