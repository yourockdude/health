import { Component, OnInit } from '@angular/core';
import { Client } from '../shared/models/client';
import { HealthService } from '../shared/services/health.service';

@Component({
    moduleId: module.id,
    selector: 'health-clients',
    templateUrl: 'clients.component.html',
    styleUrls: ['clients.component.css'],
    providers: [HealthService],
})

export class ClientsComponent implements OnInit {
    clients: Client[];

    constructor(
        private healthService: HealthService
    ) {
        this.healthService.getClients().subscribe(res => {
            if (res.success) {
                this.clients = res.data;
            }
        });
    }

    ngOnInit() { }
}
