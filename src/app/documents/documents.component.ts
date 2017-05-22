import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'health-documents',
    templateUrl: 'documents.component.html',
    styleUrls: ['documents.component.css']
})

export class DocumentsComponent implements OnInit {
    @ViewChild('fileUploader') fileUploader: ElementRef;

    filesToUpload: File[] = [];
    userFiles: File[] = [];

    constructor() { }

    ngOnInit() { }

    fileChange(event: any) {
        // TODO allow duplicate files ??
        for (const file of event.target.files) {
            console.log(file);
            this.filesToUpload.push(file);
        }
    }

    onFileChangeClick(event) {
        this.fileUploader.nativeElement.value = null;
    }

    clear() {
        this.filesToUpload = [];
    }

    uploadFiles() {
        for (const file of this.filesToUpload) {
            this.userFiles.push(file);
        }
    }

    editFileToUpload(file: File) {
        console.log(file);
    }

    deleteFileToUpload(file: File) {
        this.filesToUpload.splice(this.filesToUpload.indexOf(file), 1);
        console.log(file);
    }
}
