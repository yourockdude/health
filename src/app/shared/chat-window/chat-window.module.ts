import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatWindowComponent } from './chat-window.component';
import { ClientPipe } from '../pipes/client.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ChatWindowComponent],
  declarations: [
    ChatWindowComponent,
    ClientPipe,
  ],
  providers: [],
})
export class ChatWindowModule { }
