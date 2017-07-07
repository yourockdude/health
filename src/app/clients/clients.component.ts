import { Component, OnInit } from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { SocketService } from '../shared/services/socket.service';
import { MessagesService } from '../shared/services/messages.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';

@Component({
    moduleId: module.id,
    selector: 'health-clients',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css'],
    providers: [HealthService, AuthService],
})

export class ClientsComponent implements OnInit {
    allUsers: User[] = [];
    clientsFound: User[] = [];
    adminsFound: User[] = [];
    chatIsShow = false;
    client: User;
    messages = [];
    unreadId;
    role: number;

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
                            this.allUsers = r.data;
                            this.clientsFound = r.data.filter(f => f.role === 1);
                            this.adminsFound = r.data.filter(f => f.role === 0);
                        } else {
                            throw new Error(JSON.stringify(res.error));
                        }
                    });
                } else {
                    this.healthService.getAdmins().subscribe(r => {
                        if (r.success) {
                            this.allUsers = r.data;
                            this.adminsFound = r.data;
                        } else {
                            throw new Error(JSON.stringify(res.error));
                        }
                    });
                }
            }
        });
    }

    ngOnInit() { }

    showChat(client) {
        this.client = client;
        console.log(this.messages);
        this.chatIsShow = !this.chatIsShow;
    }

    onItemsFound(users) {
        this.clientsFound = users.filter(f => f.role === 1);
        this.adminsFound = users.filter(f => f.role === 0);
    }

    isUnread(id) {
        if (this.unreadId === id) {
            return true;
        } else {
            return false;
        }
    }

    deleteClient(client) {
        this.healthService.deleteUser(client.id).subscribe(res => {
            if (res.success) {
                if (client.role === 0) {
                    this.adminsFound.splice(this.adminsFound.map(c => c.id).indexOf(client.id), 1);
                } else {
                    this.clientsFound.splice(this.clientsFound.map(c => c.id).indexOf(client.id), 1);
                }
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }
}
