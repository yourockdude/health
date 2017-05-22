import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'health-file-to-upload',
    templateUrl: 'file-to-upload.component.html',
    styleUrls: ['file-to-upload.component.css'],
})

export class FileToUploadComponent implements OnInit {
    @Input() file: File;
    @Output() deleteFileEvent = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    delteFile() {
        this.deleteFileEvent.emit(this.file);
    }
}
