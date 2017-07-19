import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HealthService } from '../shared/services/health.service';
import { User } from '../shared/models/user';

@Component({
    selector: 'health-doctor',
    templateUrl: 'doctor.component.html',
    styleUrls: ['doctor.component.scss']
})

export class DoctorComponent implements OnInit {
    doctor: User;

    constructor(
        private activatedRoute: ActivatedRoute,
        private healthService: HealthService,
    ) {
        const id = this.activatedRoute.snapshot.params.id;
        this.healthService.getUsersById(id).subscribe(res => {
            if (res.success) {
                this.doctor = res.data;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }
}
