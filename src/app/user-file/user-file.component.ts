import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core';
import { setIcon } from '../shared/utils/set-icon';
import { HealthService } from '../shared/services/health.service';
import { UserFile } from '../shared/models/user-file';

@Component({
    moduleId: module.id,
    selector: 'health-user-file',
    templateUrl: 'user-file.component.html',
    styleUrls: ['user-file.component.css'],
    providers: [HealthService],
})

export class UserFileComponent implements OnInit {
    @Input() file: UserFile;
    @Output() deleteFileEvent = new EventEmitter();

    icon: string;
    view = false;
    pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
    extension: string;
    allowExtensionForView = ['png', 'pdf'];

    constructor(
        private healthService: HealthService,
    ) { }

    ngOnInit(): void {
        this.extension = this.file.name.split('.').pop();
        this.icon = setIcon(this.extension);
    }

    deleteFile(): void {
        this.healthService.deleteFile(this.file.id).subscribe(res => {
            if (res.success) {
                this.deleteFileEvent.emit(this.file);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    renameFile(): void {
        console.log('rename', this.file);
    }

    close(event): void {
        if (event) {
            this.view = false;
        }
    }

    viewAllowed(): boolean {
        return this.allowExtensionForView.includes(this.extension);
    }
}
