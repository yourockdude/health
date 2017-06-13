import { Component, OnInit, Input } from '@angular/core';
import { setIcon } from '../shared/utils/set-icon';

@Component({
    moduleId: module.id,
    selector: 'health-user-file',
    templateUrl: 'user-file.component.html',
    styleUrls: ['user-file.component.css']
})

export class UserFileComponent implements OnInit {
    @Input() file: any;

    icon;
    deleting = false;
    renaming = false;

    constructor() { }

    ngOnInit() {
        this.icon = setIcon(this.file.split('.').pop());
    }

    deleteFile() {
        this.deleting = false;
        console.log('delete', this.file);
    }

    renameFile() {
        this.renaming = false;
        console.log('rename', this.file);
    }

    choiceAction(value) {
        if (value === 'delete') {
            this.deleting = true;
        } else {
            this.renaming = true;
        }
    }

    switchControlBox() {
        if (this.deleting) {
            return 'delete';
        };
        if (this.renaming) {
            return 'rename';
        }
    }

    cancel(value) {
        if (value === 'delete') {
            this.deleting = false;
        } else {
            this.renaming = false;
        }
    }
}
