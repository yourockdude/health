import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/models/client';
import { HealthService } from '../shared/services/health.service';
import { SocketService } from '../shared/services/socket.service';
import { MessagesService } from '../shared/services/messages.service';

@Component({
    moduleId: module.id,
    selector: 'health-clients',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css'],
    providers: [HealthService],
})

export class ClientsComponent implements OnInit {
    clients: Client[];
    clientsFound: Client[];
    chatIsShow = false;
    client: Client;
    messages = [];
    unreadId;

    constructor(
        private healthService: HealthService,
        private socketService: SocketService,
        private messagesService: MessagesService,
    ) {
        this.healthService.getClients().subscribe(res => {
            if (res.success) {
                this.clients = res.data;
                this.clientsFound = res.data;
            }
        });
    }

    ngOnInit() { }

    showChat(client: Client) {
        this.client = client;
        console.log(this.messages);
        this.chatIsShow = !this.chatIsShow;
    }

    onItemsFound(clients) {
        this.clientsFound = clients;
    }

    isUnread(id) {
        if (this.unreadId === id) {
            return true;
        } else {
            return false;
        }
    }
}
