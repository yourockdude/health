import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';

@Component({
    moduleId: module.id,
    selector: 'health-recording',
    templateUrl: 'recording.component.html',
    styleUrls: ['recording.component.css'],
})

export class RecordingComponent implements OnInit {
    date: any;

    constructor(
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.date = params['date'];
            console.log(this.date);
        });
    }
}
