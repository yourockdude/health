import { NgModule } from '@angular/core';

import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DragNDropModule } from '../drag-n-drop/drag-n-drop.module';
import { UserFileModule } from '../user-file/user-file.module';

@NgModule({
    imports: [
        DocumentsRoutingModule,
        SharedModule,
        DragNDropModule,
        UserFileModule,
    ],
    exports: [],
    declarations: [
        DocumentsComponent,
    ],
    providers: [],
})
export class DocumentsModule { }
