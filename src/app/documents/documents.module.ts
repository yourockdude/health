import { NgModule } from '@angular/core';

import { DocumentsComponent } from './documents.component';
import { DocumentsRoutingModule } from './documents-routing.module';

@NgModule({
    imports: [DocumentsRoutingModule],
    exports: [],
    declarations: [DocumentsComponent],
    providers: [],
})
export class DocumentsModule { }
