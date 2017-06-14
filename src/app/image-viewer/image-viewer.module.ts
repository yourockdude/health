import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerDirective } from './image-viewer.directive';

@NgModule({
    imports: [SharedModule],
    exports: [ImageViewerComponent],
    declarations: [ImageViewerComponent, ImageViewerDirective],
    providers: [],
})
export class ImageViewerModule { }
