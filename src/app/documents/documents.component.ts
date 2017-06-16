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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
    moduleId: module.id,
    selector: 'health-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.css'],
    providers: [HealthService, DragNDropService],
})

export class DocumentsComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef;

    userFiles = [];

    allowedFiles: string[] = [];
    hint: string;

    constructor(
        private authService: AuthService,
        private healthService: HealthService,
        private dragNDropService: DragNDropService,
    ) {
        this.allowedFiles = environment.allowedFiles;
        this.hint = `Поддерживаемые файлы: ${this.allowedFiles.join(', ')}.`;
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.userFiles = res.data.files;
                console.log(this.userFiles);
            } else {
                console.log('error', res.error);
            }
        });
    }

    ngOnInit() { }

    uploadFiles(files) {
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

    uploadFilesArray(files) {
        this.healthService.uploadFiles(files).subscribe(res => {
            if (res.success) {
                console.log(res);
            } else {
                console.log('error', res);
            }
        });
    }
}
