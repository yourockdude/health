import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { MessagesService } from '../services/messages.service';
import { ReadMessageService } from '../services/read-message.service';
import { OpenChatService } from '../services/open-chat.service';
import { User } from '../models/user';

@Component({
    moduleId: module.id,
    selector: 'health-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
    providers: [
        AuthService,
        ReadMessageService,
        OpenChatService
    ],
})

export class NavbarComponent implements OnInit {
    isOpen = false;
    currentUser: User;
    jwtHelper = new JwtHelper();
    messages = [];
    unreadMessages = [];

    constructor(
        private authService: AuthService,
        private messagesService: MessagesService,
        private readMessageService: ReadMessageService,
        private openChatService: OpenChatService,
    ) {
        readMessageService.chatToNavbarObservable$.subscribe(res => {
            const index = this.unreadMessages.map(u => u.fromId).indexOf(res);
            if (res && index > -1) {
                this.unreadMessages.splice(index, 1);
            }
        });

        openChatService.observable$.subscribe(res => {
            console.log('in navbar');
        });

        if (localStorage.getItem('token') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
            this.authService.getUser().subscribe(res => {
                if (res.success) {
                    this.currentUser = res.data;
                } else {
                    throw new Error(JSON.stringify(res.error));
                }
            });
        }
    }

    ngOnInit() {
        this.messagesService.receive$.subscribe(res => {
            if (this.currentUser.id === res.messages.toId) {
                this.unreadMessages.push(res.messages);
            };
            this.messages.push(res.messages);
            this.readMessageService.navbarToChatChange(res.messages);
        });
    }

    get newMessageIndicator() {
        if (this.unreadMessages.length > 0 && this.currentUser) {
            if (this.unreadMessages.map(u => u.toId).includes(this.currentUser.id)) {
                return 'new';
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    openChat() {
        this.isOpen = !this.isOpen;
    }

    passUnreadMessages() {
        return this.unreadMessages;
    }

    close(c) {
        if (c) {
            this.isOpen = false;
        }
    }
}
