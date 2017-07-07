import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { MessagesService } from '../services/messages.service';
import { ReadMessageService } from '../services/read-message.service';
import { OpenChatService } from '../services/open-chat.service';
import { User } from '../models/user';
import { PassUserService } from '../services/pass-user.service';
import { OpenSidenavService } from '../services/open-sidenav.service';

@Component({
    moduleId: module.id,
    selector: 'health-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.scss'],
    providers: [
        AuthService,
        ReadMessageService,
    ],
})

export class NavbarComponent implements OnInit {
    isOpenSidenav = true;
    isOpen = false;
    currentUser: User;
    jwtHelper = new JwtHelper();
    messages = [];
    unreadMessages = [];
    interlocutor;

    hide = true;
    path: string;

    constructor(
        private authService: AuthService,
        private messagesService: MessagesService,
        private readMessageService: ReadMessageService,
        private openChatService: OpenChatService,
        private openSidenavService: OpenSidenavService,
        private passUserService: PassUserService,
        private router: Router,
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.path = val.url;
            }
        });
        readMessageService.chatToNavbarObservable$.subscribe(res => {
            const index = this.unreadMessages.map(u => u.fromId).indexOf(res);
            if (res && index > -1) {
                this.unreadMessages.splice(index, 1);
            }
        });

        openChatService.observable$.subscribe(res => {
            this.interlocutor = res;
            this.openChat();
        });

        passUserService.observable$.subscribe(res => {
            this.getUser();
        });

        if (this.isAuth) {
            this.getUser();
        }
    }

    ngOnInit(): void {
        this.openSidenavService.change(this.isOpenSidenav);
        this.messagesService.receive$.subscribe(res => {
            if (this.currentUser.id === res.messages.toId) {
                this.unreadMessages.push(res.messages);
            };
            this.messages.push(res.messages);
            this.readMessageService.navbarToChatChange(res.messages);
        });
    }

    openHeaderNav() {
        this.hide = this.hide ? false : true;
    }

    onAuthClick() {
        if (this.isAuth) {
            this.authService.signOut();
            // TODO temporary
            window.location.reload();
        } else {
            this.router.navigate(['auth']);
        }
    }

    getUser(): void {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.currentUser = res.data;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
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

    openChat(): void {
        this.isOpen = !this.isOpen;
    }

    openSidenav(): void {
        this.isOpenSidenav = !this.isOpenSidenav;
        this.openSidenavService.change(this.isOpenSidenav);
    }

    passUnreadMessages() {
        return this.unreadMessages;
    }

    close(c) {
        if (c) {
            this.isOpen = false;
        }
    }

    get isAuth() {
        if (!this.authService.isAuth()) {
            this.isOpen = false;
        }
        return this.authService.isAuth();
    }
}
