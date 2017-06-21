import { Component, OnInit } from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';

@Component({
    moduleId: module.id,
    selector: 'health-client-page',
    templateUrl: 'client-page.component.html',
    styleUrls: ['client-page.component.css'],
    providers: [HealthService, AuthService],
})

export class ClientPageComponent implements OnInit {
    client: User;
    role: number;

    constructor(
        private healthService: HealthService,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
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
                console.log(this.client);
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
}
