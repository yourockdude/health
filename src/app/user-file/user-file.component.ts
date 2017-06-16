import { Component, OnInit, Input } from '@angular/core';
import { setIcon } from '../shared/utils/set-icon';
import { HealthService } from 'app/shared/services/health.service';

@Component({
    moduleId: module.id,
    selector: 'health-user-file',
    templateUrl: 'user-file.component.html',
    styleUrls: ['user-file.component.css'],
    providers: [HealthService],
})

export class UserFileComponent implements OnInit {
    @Input() file: any;

    icon;

    view = false;
    pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
    extension;

    constructor(
        private healthService: HealthService,
    ) { }

    ngOnInit() {
        this.extension = this.file.name.split('.').pop();
        this.icon = setIcon(this.extension);
    }

    deleteFile() {
        this.healthService.deleteFile(this.file.id).subscribe(res => {
            if (res.success) {
                console.log(res);
            } else {
                console.log('error', res);
            }
        });
        console.log('delete', this.file);
    }

    renameFile() {
        console.log('rename', this.file);
    }

    close(event) {
        if (event) {
            this.view = false;
        }
    }
}
