import { NgModule } from '@angular/core';

import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FileToUploadComponent } from '../file-to-upload/file-to-upload.component';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        SharedModule,
    ],
    exports: [],
    declarations: [
        DocumentsComponent,
        FileToUploadComponent,
    ],
    providers: [],
})
export class DocumentsModule { }
