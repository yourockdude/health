import { NgModule } from '@angular/core';

import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FileToUploadComponent } from '../file-to-upload/file-to-upload.component';
import { DragNDropModule } from '../drag-n-drop/drag-n-drop.module';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        SharedModule,
        DragNDropModule,
    ],
    exports: [],
    declarations: [
        DocumentsComponent,
        FileToUploadComponent,
    ],
    providers: [],
})
export class DocumentsModule { }
