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
    fromId = [];

    constructor(
        private authService: AuthService,
        private messagesService: MessagesService,
        private readMessageService: ReadMessageService,
    ) {
        readMessageService.chatToNavbarObservable$.subscribe(res => console.log('parent ', res));
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
            this.fromId.push(res.messages.fromId);
            this.messages.push(res.messages);
        });
        this.readMessageService.chatToNavbarObservable$.subscribe(res => {
            console.log(res);
            console.log(this.fromId);
            this.fromId.splice(this.fromId.indexOf(res), 1);
            console.log(this.fromId);
        });
    }

    get newMessageIndicator() {
        if (this.fromId.length > 0 && this.currentUser) {
            if (this.fromId.includes(this.currentUser.id)) {
                return '';
            } else {
                return 'new';
            }
        } else {
            return '';
        }
    }

    openChat() {
        this.isOpen = !this.isOpen;
    }

    close(c) {
        if (c) {
            this.isOpen = false;
        }
    }
}
