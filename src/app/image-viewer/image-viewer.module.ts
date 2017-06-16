import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerDirective } from './image-viewer.directive';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { PdfViewerDirective } from './pdf-viewer.directive';

@NgModule({
    imports: [SharedModule],
    exports: [ImageViewerComponent],
    declarations: [
        ImageViewerComponent,
        ImageViewerDirective,
        PdfViewerComponent,
        PdfViewerDirective
    ],
    providers: [],
})
export class ImageViewerModule { }
