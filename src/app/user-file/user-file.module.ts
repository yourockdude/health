import { NgModule } from '@angular/core';
import { UserFileComponent } from './user-file.component';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [ImageViewerModule, SharedModule],
    exports: [UserFileComponent],
    declarations: [UserFileComponent],
    providers: [],
})
export class UserFileModule { }
