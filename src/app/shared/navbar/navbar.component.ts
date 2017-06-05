import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { AuthService } from '../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { MessagesService } from '../services/messages.service';
import { ReadMessageService } from '../services/read-message.service';

@Component({
    moduleId: module.id,
    selector: 'health-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css'],
    providers: [AuthService, ReadMessageService],
})

export class NavbarComponent implements OnInit {
    isOpen = false;
    currentUser: Client;
    jwtHelper = new JwtHelper();
    messages = [];
    unreadMessages = [];

    constructor(
        private authService: AuthService,
        private messagesService: MessagesService,
        private readMessageService: ReadMessageService,
    ) {
        readMessageService.chatToNavbarObservable$.subscribe(res => {
            const index = this.unreadMessages.map(u => u.fromId).indexOf(res);
            if (res && index > -1) {
                this.unreadMessages.splice(index, 1);
            }
        });

        if (localStorage.getItem('token') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('token'))) {
            this.authService.getUser().subscribe(res => {
                if (res.success) {
                    this.currentUser = res.data;
                } else {
                    console.log('error');
                }
            });
        }
    }

    ngOnInit() {
        this.messagesService.receive$.subscribe(res => {
            this.unreadMessages.push(res.messages);
            this.messages.push(res.messages);
            console.log('pushed');
        });
    }

    get newMessageIndicator() {
        console.log(this.unreadMessages);
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
        // let unreadMessages = [];
        // unreadMessages = this.unreadMessages.filter(u => u.toId === this.currentUser.id);
        // return unreadMessages;
        return this.unreadMessages;
    }

    close(c) {
        if (c) {
            this.isOpen = false;
        }
    }
}
