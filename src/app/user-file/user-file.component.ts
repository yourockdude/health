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
    styleUrls: ['user-file.component.scss'],
    providers: [HealthService],
})

export class UserFileComponent implements OnInit {
    @Input() file: UserFile;
    @Output() deleteFileEvent = new EventEmitter();
    @Input() isAdmin: boolean;

    icon: string;
    view = false;
    src: string;
    extension: string;
    allowExtensionForView = ['png', 'jpg', 'pdf'];
    rename = false;
    delete = false;
    value: string;
    originalName: string;
    flip = false;

    constructor(
        private healthService: HealthService,
    ) { }

    ngOnInit(): void {
        this.src = this.file.path;
        this.extension = this.file.name.split('.').pop();
        this.icon = setIcon(this.extension);
        this.originalName = this.getNameWithoutExtension(this.file.originalName);
    }

    deleteFile(): void {
        if (this.isAdmin) {
            console.log('coming soon...');
            this.delete = false;
            this.flip = !this.flip;
        } else {
            this.healthService.deleteFile(this.file.id).subscribe(
                res => {
                    if (res.success) {
                        this.deleteFileEvent.emit(this.file);
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                },
                (err) => { },
                () => {
                    this.delete = false;
                    this.flip = !this.flip;
                });
        }
    }

    renameFile(): void {
        if (this.isAdmin) {
            console.log('coming soon...');
            this.rename = false;
            this.flip = !this.flip;
        } else {
            this.healthService.renameFile(this.file.id, `${this.originalName}.${this.extension}`).subscribe(
                res => {
                    if (res.success) {
                        this.file.originalName = `${this.originalName}.${this.extension}`;
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                },
                (err) => { },
                () => {
                    this.rename = false;
                    this.flip = !this.flip;
                }
            );
        }
    }

    openDialog(value: string): void {
        if (value === 'rename') {
            this.rename = true;
        } else {
            this.delete = true;
        }
        this.flip = !this.flip;
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
        this.flip = !this.flip;
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
