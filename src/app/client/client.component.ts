import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../shared/models/client';

@Component({
    moduleId: module.id,
    selector: 'health-client',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.css']
})

export class ClientComponent implements OnInit {
    @Input() client: Client;
    constructor() { }

    ngOnInit() { }
}
