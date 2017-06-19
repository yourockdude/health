import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/models/client';
import { HealthService } from '../shared/services/health.service';
import { SocketService } from '../shared/services/socket.service';
import { MessagesService } from '../shared/services/messages.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'health-clients',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css'],
    providers: [HealthService, AuthService],
})

export class ClientsComponent implements OnInit {
    clients: any[];
    clientsFound: any[];
    chatIsShow = false;
    client: any;
    messages = [];
    unreadId;
    role;

    constructor(
        private healthService: HealthService,
        private socketService: SocketService,
        private messagesService: MessagesService,
        private authService: AuthService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.role = res.data.role;
                if (this.role === 0) {
                    this.healthService.getUsers().subscribe(r => {
                        if (r.success) {
                            this.clients = r.data;
                            this.clientsFound = r.data;
                        }
                    });
                } else {
                    this.healthService.getAdmins().subscribe(r => {
                        if (r.success) {
                            this.clients = r.data;
                            this.clientsFound = r.data;
                        }
                    });
                }
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

    deleteClient(id) {
        this.healthService.deleteUser(id).subscribe(res => {
            if (res.success) {
                this.clientsFound.splice(this.clientsFound.map(c => c.id).indexOf(id), 1);
            } else {
                console.log('error', res);
            }
        });
    }
}
