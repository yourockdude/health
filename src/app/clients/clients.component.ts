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

    ngOnInit() {
        // this.messagesService.receive$.subscribe(res => {
        //     this.unreadId = res.messages.fromId;
        //     this.messages.push(res.messages);
        // });
        // this.getMessages();
    }

    // getMessages(id) {
    //     console.log(this.messages, id);
    //     return this.messages.filter(m => m.fromId === id || m.toId === id);
    // }

    // getMessages() {
    //     this.socketService.getMessages().subscribe(message => {
    //         this.messages.push(message);
    //     });
    // }

    showChat(client: Client) {
        this.client = client;
        console.log(this.messages);
        this.chatIsShow = !this.chatIsShow;
    }

    // close(c) {
    //     if (c) {
    //         this.chatIsShow = false;
    //     }
    // }

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
