import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../shared/models/client';
import { OpenChatService } from '../shared/services/open-chat.service';

@Component({
    moduleId: module.id,
    selector: 'health-client',
    templateUrl: 'client.component.html',
    styleUrls: ['client.component.css'],
    providers: [OpenChatService]
})

export class ClientComponent implements OnInit {
    @ViewChild('chatButton') chatButton: ElementRef;
    @Output() showChatEvent = new EventEmitter();
    @Output() deleteClientEvent = new EventEmitter();
    @Input() client: Client;
    @Input() haveUnread: boolean;
    @Input() role;

    constructor(
        private activatedRoute: ActivatedRoute,
        private openChatService: OpenChatService,
        private router: Router,
    ) { }

    ngOnInit() { }

    showChat() {
        this.showChatEvent.emit(this.client);
    }

    showClient() {
        this.router.navigate(
            [{ outlets: { 'sidebar': ['clients', this.client.id] } }],
            {
                relativeTo: this.activatedRoute.parent,
            }
        );
    }

    deleteClient() {
        this.deleteClientEvent.emit(this.client.id);
    }

    openChat() {
        this.openChatService.change('test');
        console.log('open chat for ', this.client.id);
    }
}
