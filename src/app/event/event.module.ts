import { NgModule } from '@angular/core';
import { EventComponent } from './event.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    exports: [EventComponent],
    declarations: [EventComponent],
    providers: [],
})
export class EventModule { }
