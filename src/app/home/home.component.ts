import { Component, OnInit } from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { User } from '../shared/models/user';

@Component({
    selector: 'health-home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit {
    doctors: User[] = [];
    currentTab = 'doc';
    constructor(
        private healthService: HealthService,
    ) {
        this.healthService.getAdmins().subscribe(res => {
            if (res.success) {
                this.doctors = res.data;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }
}
