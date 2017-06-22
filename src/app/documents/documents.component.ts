import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { HealthService } from '../shared/services/health.service';
import { DragNDropService } from '../shared/services/drag-n-drop.service';
import { UserFile } from '../shared/models/user-file';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
    moduleId: module.id,
    selector: 'health-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.css'],
    providers: [HealthService, DragNDropService],
})

export class DocumentsComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef;

    userFiles: UserFile[] = [];
    allowedFilesExtension: string[] = [];
    hint: string;

    constructor(
        private authService: AuthService,
        private healthService: HealthService,
        private dragNDropService: DragNDropService,
    ) {
        this.allowedFilesExtension = environment.allowedFiles;
        this.hint = `Поддерживаемые файлы: ${this.allowedFilesExtension.join(', ')}.`;
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.userFiles = res.data.files;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }

    uploadFiles(files) {
        console.log('test')
        const observableGroup = [];
        for (const file of files) {
            observableGroup.push(this.healthService.uploadFile(file));
        }
        Observable.forkJoin(observableGroup).subscribe(
            res => console.log(res),
            err => console.log(err),
            () => {
                this.dragNDropService.change(true);
                console.log('finished');
            });
    }

    uploadFilesArray(files: File[]): void {
        this.healthService.uploadFiles(files).subscribe(res => {
            if (res.success) {
                this.dragNDropService.change(true);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    deleteFile(file: UserFile): void {
        this.userFiles.splice(this.userFiles.indexOf(file), 1);
    }
}
