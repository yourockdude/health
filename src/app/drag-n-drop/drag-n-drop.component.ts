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

    constructor(
        private dragNDropService: DragNDropService,
    ) {
        this.subscription = this.dragNDropService.observable$.subscribe(res => {
            if (res) {
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
                this.forbiddenFiles.push(file);
            } else {
                this.allowFilesToUpload.push(file);
            }
        }
    }

    deleteFileToUpload(file: File) {
        this.allowFilesToUpload.splice(this.allowFilesToUpload.indexOf(file), 1);
    }

    upload() {
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
