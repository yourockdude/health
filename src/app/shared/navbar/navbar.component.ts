import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { MessagesService } from '../services/messages.service';
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
    ],
})

export class NavbarComponent implements OnInit {
    isOpenSidenav = true;
    isOpen = false;
    currentUser: User;
    jwtHelper = new JwtHelper();
    messages = [];
    unreadMessages = [];

    hide = true;
    path: string;

    constructor(
        private authService: AuthService,
        private passUserService: PassUserService,
        private router: Router,
    ) {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                this.path = val.url;
            }
        });

        passUserService.observable$.subscribe(res => {
            this.getUser();
        });

        if (this.isAuth) {
            this.getUser();
        }
    }

    ngOnInit(): void { }

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

    get isAuth() {
        if (!this.authService.isAuth()) {
            this.isOpen = false;
        }
        return this.authService.isAuth();
    }
}
