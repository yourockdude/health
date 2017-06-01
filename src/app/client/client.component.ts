import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Client } from '../shared/models/client';

@Component({
    moduleId: module.id,
    selector: 'health-client',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.css']
})

export class ClientComponent implements OnInit {
    @ViewChild('chatButton') chatButton: ElementRef;
    @Output() showChatEvent = new EventEmitter();
    @Input() client: Client;
    @Input() haveUnread: boolean;

    constructor() { }

    ngOnInit() { }

    showChat() {
        this.showChatEvent.emit(this.client);
    }
}
