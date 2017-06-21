import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { setIcon } from '../shared/utils/set-icon';

@Component({
    moduleId: module.id,
    selector: 'health-file-to-upload',
    templateUrl: 'file-to-upload.component.html',
    styleUrls: ['file-to-upload.component.css'],
})

export class FileToUploadComponent implements OnInit {
    @Input() file: File;
    @Input() allowed: boolean;
    @Output() deleteFileEvent = new EventEmitter();

    icon: string;

    constructor() { }

    ngOnInit() {
        this.icon = setIcon(this.file.name.split('.').pop());
    }

    delteFile() {
        this.deleteFileEvent.emit(this.file);
    }
}
