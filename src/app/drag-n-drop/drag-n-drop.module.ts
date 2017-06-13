import { NgModule } from '@angular/core';

import { DragNDropComponent } from './drag-n-drop.component';
import { SharedModule } from '../shared/shared.module';
import { DragNDropDirective } from './drag-n-drop.directive';
import { FileToUploadComponent } from '../file-to-upload/file-to-upload.component';

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
        FileToUploadComponent
    ],
    providers: [],
})
export class DragNDropModule { }
