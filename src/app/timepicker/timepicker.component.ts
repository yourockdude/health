import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'health-timepicker',
    templateUrl: 'timepicker.component.html'
})

export class TimepickerComponent implements OnInit {
    time = '';

    constructor() { }

    ngOnInit() { }

    onKeyPress(event: any) {
        if (event.keyCode === 9) {
            console.log('it is tab');
        }
        const reg = /[0-9]*/;
        if (this.time.length === 1 && event.key > 2) {
            this.time = '0' + event.key;
        }
        if (reg.test(this.time)) {
            if (this.time.length === 2 && event.keyCode !== 8) {
                this.time = this.time + ':';
            }
        } else {
            this.time = this.time.substr(0, this.time.length - 1);
        }
        if (this.time.length > 5) {
            this.time = this.time.substr(0, this.time.length - 1);
        }
    }

    onFocusOut(event: any) {
        this.time.split(':');
        console.log(event);
        console.log(this.time);
    }
}
