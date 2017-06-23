import {
    Component,
    OnInit,
    Input,
    EventEmitter,
    Output,
    OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'health-image-viewer',
    templateUrl: 'image-viewer.component.html',
    styleUrls: ['image-viewer.component.css']
})

export class ImageViewerComponent implements OnInit {
    @Input() show: boolean;
    @Input() extension: string;
    @Input() src: string;
    @Output() onCloseEvent = new EventEmitter();
    subject = new Subject<string>();

    // PDF config-----------
    rotation = 0;
    zoom = 1;
    originalSize = true;
    isLoaded = false;
    // ---------------------

    constructor() { }

    ngOnInit() { }

    close() {
        document.body.style.userSelect = 'initial';
        document.body.style.overflow = 'initial';
        this.onCloseEvent.emit(true);
    }

    controlAction(action) {
        if (this.extension === 'pdf') {
            switch (action) {
                case 'left':
                    this.rotation = this.rotation - 90;
                    break;
                case 'increase':
                    this.zoom = this.zoom + 0.1;
                    break;
                case 'initial':
                    this.zoom = 1;
                    this.rotation = 0;
                    break;
                case 'decrease':
                    this.zoom = this.zoom - 0.1;
                    break;
                case 'right':
                    this.rotation = this.rotation + 90;
                    break;
            }
        } else {
            this.subject.next(action);
        }
    }

    isPdf() {
        return this.extension === 'pdf' ? true : false;
    }

    pdfLoaded() {
        this.isLoaded = true;
    }
}
