import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { SharedModule } from '../shared/shared.module';
import { NotificationDirective } from './notification.directive';

@NgModule({
    imports: [SharedModule],
    exports: [
        NotificationComponent,
        NotificationDirective
    ],
    declarations: [
        NotificationComponent,
        NotificationDirective
    ],
    providers: [],
})
export class NotificationModule { }
