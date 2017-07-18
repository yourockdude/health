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
import { DragNDropService } from '../shared/services/drag-n-drop.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
    moduleId: module.id,
    selector: 'health-drag-n-drop',
    templateUrl: 'drag-n-drop.component.html',
    styleUrls: ['drag-n-drop.component.scss'],
})

export class DragNDropComponent implements OnInit, OnDestroy {
    @Input() hint: string;
    @Input() allowedFiles: string[];
    @Output() uploadEvent = new EventEmitter();
    @ViewChild('uploadFileInput') uploadFileInput: ElementRef;

    forbiddenFiles: string[] = [];
    allowFilesToUpload: File[] = [];
    subscription: Subscription;
    loading = false;

    constructor(
        private dragNDropService: DragNDropService,
        private notificationService: NotificationService,
    ) {
        this.subscription = this.dragNDropService.observable$.subscribe(res => {
            if (res) {
                this.loading = false;
                this.allowFilesToUpload = this.forbiddenFiles = [];
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
            const error = [
                `Следующие файлы не могут быть загружениы:`,
                this.forbiddenFiles.join(', ')
            ].join(' ');
            this.notificationService.next('error', error, 3000);
        }
    }

    deleteFileToUpload(file: File) {
        this.allowFilesToUpload.splice(this.allowFilesToUpload.indexOf(file), 1);
    }

    upload() {
        this.loading = true;
        this.uploadEvent.emit(this.allowFilesToUpload);
    }

    disabledUploadButton() {
        return this.allowFilesToUpload.length > 0 ? false : true;
    }

    onScroll(e: Event) {
        e.stopPropagation();
        console.log(e);

    }

}
