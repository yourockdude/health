import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { OpenSidenavService } from '../shared/services/open-sidenav.service';
import { environment } from 'environments/environment';
import { OpenChatService } from '../shared/services/open-chat.service';

@Component({
    moduleId: module.id,
    selector: 'health-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.scss'],
})

export class SidenavComponent implements OnInit {
    isNew: boolean;
    user: User;
    isAdmin: boolean;
    isOpen = true;
    src = 'assets/images/profile.jpg';

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        // private openSidenavService: OpenSidenavService,
        private openChatService: OpenChatService,
    ) {
        // this.openSidenavService.observable$.subscribe(res => {
        //     this.isOpen = res;
        // });

        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
                this.src = `${environment.server}${this.user.photo}`;
                this.isAdmin = this.user.role === 0 ? true : false;
            }
        });
    }

    ngOnInit() { }

    signOut() {
        this.authService.signOut();
        this.user = null;
    }

    openChat() {
        this.openChatService.change();
    }

}
