import {
    Component,
    OnInit,
    EventEmitter,
    Output,
    Input,
    ViewChild,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CheckUploadService } from '../shared/services/check-upload.service';

@Component({
    moduleId: module.id,
    selector: 'health-drag-n-drop',
    templateUrl: 'drag-n-drop.component.html',
    styleUrls: ['drag-n-drop.component.css'],
})

export class DragNDropComponent implements OnInit, OnDestroy {
    @Output() filesDroppedEvent = new EventEmitter();
    @Input() hint: string;
    @Input() allowedFiles: string[];
    @ViewChild('uploadFileInput') uploadFileInput: ElementRef;

    error: string;
    forbiddenFiles: string[] = [];
    allowFilesToUpload: File[] = [];
    subscription: Subscription;

    constructor(
        private checkUploadService: CheckUploadService,
    ) {
        this.subscription = this.checkUploadService.upload$.subscribe(
            res => {
                console.log('child');
                if (res === true) {
                    this.error = '';
                    this.allowFilesToUpload = [];
                }
            });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onUploadFileInputClick() {
        this.uploadFileInput.nativeElement.value = null;
        this.uploadFileInput.nativeElement.click();
    }

    filesDropped(fileList: any) {
        this.allowFilesToUpload = [];
        this.forbiddenFiles = [];
        for (const file of fileList) {
            const fileExtension = file.name.split('.').pop();
            if (this.allowedFiles.indexOf(fileExtension) === -1) {
                this.forbiddenFiles.push(file.name);
            } else {
                this.allowFilesToUpload.push(file);
            }
        }
        if (this.forbiddenFiles.length > 0) {
            this.error = `Следующие файлы нельзя загрузить: ${this.forbiddenFiles.join(', ')}`;
        } else {
            this.error = '';
        }

        this.filesDroppedEvent.emit(this.allowFilesToUpload);
    }

}
