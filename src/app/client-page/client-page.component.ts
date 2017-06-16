import { Component, OnInit } from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'health-client-page',
    templateUrl: 'client-page.component.html',
    styleUrls: ['client-page.component.css'],
    providers: [HealthService],
})

export class ClientPageComponent implements OnInit {
    client;

    constructor(
        private healthService: HealthService,
        private activatedRoute: ActivatedRoute,
    ) {
        const id = this.activatedRoute.snapshot.url.map(u => u.path).pop();
        this.healthService.getClientById(id).subscribe(res => {
            if (res.success) {
                this.client = res.data;
                console.log(this.client);
            } else {
                console.log('error', res);
            }
        });
    }

    ngOnInit() { }
}
