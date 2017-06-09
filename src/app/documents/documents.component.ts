import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { environment } from '../../environments/environment';
import { CheckUploadService } from '../shared/services/check-upload.service';
import { AuthService } from '../shared/services/auth.service';
import { HealthService } from '../shared/services/health.service';

@Component({
    moduleId: module.id,
    selector: 'health-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.css'],
    providers: [CheckUploadService, HealthService]
})

export class DocumentsComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef;

    filesToUpload: File[] = [];
    userFiles = [];

    allowedFiles: string[] = [];
    hint: string;

    constructor(
        private checkUploadService: CheckUploadService,
        private authService: AuthService,
        private healthService: HealthService,
    ) {
        this.allowedFiles = environment.allowedFiles;
        this.hint = `Поддерживаемые файлы: ${this.allowedFiles.join(', ')}.`;
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.userFiles = res.data.files;
            } else {
                console.log('error', res.error);
            }
        });
    }

    ngOnInit() { }

    clear() {
        this.filesToUpload = [];
    }

    uploadFiles() {
        for (const file of this.filesToUpload) {
            this.healthService.uploadFile(file).subscribe(res => {
                if (res.success) {
                    console.log('success', res);
                } else {
                    console.log('error', res.error);
                }
            });
        }
        // for (const file of this.filesToUpload) {
        //     this.userFiles.push(file);
        // }
        // this.checkUploadService.changeState(true);
        // this.filesToUpload = [];
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
