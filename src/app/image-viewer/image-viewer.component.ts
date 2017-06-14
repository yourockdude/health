import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
    moduleId: module.id,
    selector: 'health-image-viewer',
    templateUrl: 'image-viewer.component.html',
    styleUrls: ['image-viewer.component.css']
})

export class ImageViewerComponent implements OnInit {
    @Input() show: boolean;
    @Output() onCloseEvent = new EventEmitter();
    scroll = document.body.style.overflow;
    subject = new Subject<string>();

    constructor() { }

    ngOnInit() {
        this.scroll = 'hidden';
    }

    close() {
        this.onCloseEvent.emit(true);
    }

    controlAction(action) {
        this.subject.next(action);
    }
}
