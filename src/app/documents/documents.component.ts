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
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }

    uploadFilesArray(files) {
        this.healthService.uploadFiles(files).subscribe(res => {
            if (res.success) {
                this.dragNDropService.change(true);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }
}
