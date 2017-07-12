import { Component, OnInit } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';
import { MessagesService } from './shared/services/messages.service';
import { User } from './shared/models/user';
import { environment } from '../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { HealthService } from './shared/services/health.service';
import { OpenChatService } from './shared/services/open-chat.service';
import { PassUserService } from './shared/services/pass-user.service';
import { OpenSidenavService } from './shared/services/open-sidenav.service';
import { NotificationService } from './shared/services/notification.service';

@Component({
    selector: 'health-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [
        SocketService,
        AuthService,
        MessagesService,
        HealthService,
        OpenChatService,
        PassUserService,
        OpenSidenavService,
        NotificationService,
    ],
})
export class AppComponent implements OnInit {
    unreadMessages: any;
    // chat
    isOpen = false;
    interlocutor;
    // --------
    currentUser;
    jwtHelper = new JwtHelper();
    messages = [];

    constructor(
        private authService: AuthService,
        private healthService: HealthService,
        private socketService: SocketService,
        private messagesService: MessagesService,
        private openChatService: OpenChatService,
    ) {
        openChatService.observable$.subscribe(res => {
            this.interlocutor = res;
            this.openChat();
        });
        if (this.authService.isAuth()) {
            this.socketService.connection().subscribe();
            this.authService.getUser().subscribe(res => {
                if (res.success) {
                    this.currentUser = res.data;
                    if (this.currentUser.role === 0) {
                        this.enterAdminToRoom();
                    } else {
                        this.enterUserToRoom();
                    }
                }
            });
        }
    }

    ngOnInit(): void {
        this.getMessages();
    }

    openChat(): void {
        this.isOpen = !this.isOpen;
    }

    enterAdminToRoom() {
        this.healthService.getUsers().subscribe(r => {
            if (r.success) {
                for (const u of r.data) {
                    if (u.id !== this.currentUser.id) {
                        this.socketService.enterRoom({
                            user: this.currentUser.username,
                            room: `${u.id}-${this.currentUser.id}`
                        });
                    }
                }
            }
        });
    }

    enterUserToRoom() {
        this.healthService.getAdmins().subscribe(r => {
            if (r.success) {
                for (const u of r.data) {
                    this.socketService.enterRoom({
                        user: this.currentUser.username,
                        room: `${this.currentUser.id}-${u.id}`
                    });
                }
            }
        });
    }

    close() {
        console.log('adad')
        this.isOpen = false;
    }

    getMessages() {
        this.socketService.getMessages().subscribe((message: any) => {
            console.log(message);
            this.messages.push(message);
            // if (this.currentUser.id === message.toId) {
            //     this.unreadMessages.push(message);
            // }
            // this.messagesService.sendMessages({ isNew: true, messages: message });
        });
    }

}
