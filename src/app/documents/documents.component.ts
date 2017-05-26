import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { environment } from '../../environments/environment';
import { CheckUploadService } from '../shared/services/check-upload.service';

@Component({
    moduleId: module.id,
    selector: 'health-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.css'],
    providers: [CheckUploadService]
})

export class DocumentsComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef;

    filesToUpload: File[] = [];
    userFiles: File[] = [];

    allowedFiles: string[] = [];
    hint: string;

    constructor(
        private checkUploadService: CheckUploadService
    ) {
        this.allowedFiles = environment.allowedFiles;
        this.hint = `Поддерживаемые файлы: ${this.allowedFiles.join(', ')}.`;
    }

    ngOnInit() { }

    clear() {
        this.filesToUpload = [];
    }

    uploadFiles() {
        for (const file of this.filesToUpload) {
            this.userFiles.push(file);
        }
        this.checkUploadService.changeState(true);
        this.filesToUpload = [];
    }

    deleteFileToUpload(file: File) {
        this.filesToUpload.splice(this.filesToUpload.indexOf(file), 1);
        console.log(file);
    }

    getFilesFromDropzone(files) {
        for (const file of files) {
            this.filesToUpload.push(file);
        }
    }
}
