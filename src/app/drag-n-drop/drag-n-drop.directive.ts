import {
    Directive,
    HostListener,
    HostBinding,
    Output,
    EventEmitter,
} from '@angular/core';

@Directive({ selector: '[healthDragNDrop]' })
export class DragNDropDirective {
    @HostBinding('style.opacity') private opacity = '0.2';
    @Output() filesDropped = new EventEmitter();

    constructor() { }

    @HostListener('dragover', ['$event']) public onDragOver(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.opacity = '1';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.opacity = '0.2';
    }

    @HostListener('drop', ['$event']) public onDrop(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        let files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.filesDropped.emit(files);
            this.opacity = '0.2';
        }
        files = [];
    }

    @HostListener('mouseenter', ['$event']) public onMouseEnter(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.opacity = '1';
    }

    @HostListener('mouseleave', ['$event']) public onMouseLeave(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.opacity = '0.2';
    }
}
