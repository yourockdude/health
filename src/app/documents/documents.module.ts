import { NgModule } from '@angular/core';

import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DragNDropModule } from '../drag-n-drop/drag-n-drop.module';
import { UserFileComponent } from '../user-file/user-file.component';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        SharedModule,
        DragNDropModule,
    ],
    exports: [],
    declarations: [
        DocumentsComponent,
        UserFileComponent,
    ],
    providers: [],
})
export class DocumentsModule { }
