import { Component, OnInit } from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { OpenChatService } from '../shared/services/open-chat.service';
import { environment } from 'environments/environment';

@Component({
    moduleId: module.id,
    selector: 'health-client-page',
    templateUrl: 'client-page.component.html',
    styleUrls: ['client-page.component.css'],
    providers: [
        HealthService,
        AuthService,
    ],
})

export class ClientPageComponent implements OnInit {
    client: User;
    role: number;
    src = 'assets/images/profile.png';

    constructor(
        private healthService: HealthService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private openChatService: OpenChatService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.role = res.data.role;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
        const id = this.activatedRoute.snapshot.url.map(u => u.path).pop();
        this.healthService.getUsersById(id).subscribe(res => {
            if (res.success) {
                this.client = res.data;
                this.src = `${environment.server}${this.client.photo}`;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }

    showFileBox() {
        if (
            this.role === 0 &&
            this.client.files &&
            this.client.files.length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    openChat() {
        this.openChatService.change(this.client);
    }
}
