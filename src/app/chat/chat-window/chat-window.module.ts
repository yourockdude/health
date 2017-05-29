import { NgModule } from '@angular/core';
import { ChatWindowComponent } from './chat-window.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [SharedModule],
  exports: [ChatWindowComponent],
  declarations: [ChatWindowComponent],
  providers: [],
})
export class ChatWindowModule { }
