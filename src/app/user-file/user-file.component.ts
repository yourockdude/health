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
import { environment } from '../../environments/environment';

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
    src: string;
    extension: string;
    allowExtensionForView = ['png', 'pdf'];
    rename = false;
    delete = false;
    value: string;
    originalName: string;

    constructor(
        private healthService: HealthService,
    ) { }

    ngOnInit(): void {
        this.src = `${environment.server}${this.file.path}`;
        this.extension = this.file.name.split('.').pop();
        this.icon = setIcon(this.extension);
        this.originalName = this.getNameWithoutExtension(this.file.originalName);
    }

    deleteFile(): void {
        this.healthService.deleteFile(this.file.id).subscribe(
            res => {
                if (res.success) {
                    this.deleteFileEvent.emit(this.file);
                } else {
                    throw new Error(JSON.stringify(res.error));
                }
            },
            (err) => { },
            () => { this.delete = false; });
    }

    renameFile(): void {
        this.healthService.renameFile(this.file.id, `${this.originalName}.${this.extension}`).subscribe(
            res => {
                if (res.success) {
                    this.file.originalName = `${this.originalName}.${this.extension}`;
                } else {
                    throw new Error(JSON.stringify(res.error));
                }
            },
            (err) => { },
            () => { this.rename = false; }
        );
    }

    openDialog(value: string): void {
        if (value === 'rename') {
            this.rename = true;
        } else {
            this.delete = true;
        }
        this.value = value;
    }

    apply(): void {
        if (this.value === 'rename') {
            this.renameFile();
        } else {
            this.deleteFile();
        }
    }

    cancel(): void {
        if (this.value === 'rename') {
            this.rename = false;
            this.originalName = this.getNameWithoutExtension(this.file.originalName);
        } else {
            this.delete = false;
        }
    }

    close(event): void {
        if (event) {
            this.view = false;
        }
    }

    viewAllowed(): boolean {
        return this.allowExtensionForView.includes(this.extension);
    }

    getNameWithoutExtension(name: string): string {
        return name.substr(0, name.lastIndexOf('.')) || name;
    }
}
