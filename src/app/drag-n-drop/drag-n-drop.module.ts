import { NgModule } from '@angular/core';

import { DragNDropComponent } from './drag-n-drop.component';
import { SharedModule } from '../shared/shared.module';
import { DragNDropDirective } from './drag-n-drop.directive';

@NgModule({
    imports: [
        SharedModule
    ],
    exports: [
        DragNDropComponent,
        DragNDropDirective,
    ],
    declarations: [
        DragNDropComponent,
        DragNDropDirective,
    ],
    providers: [],
})
export class DragNDropModule { }
