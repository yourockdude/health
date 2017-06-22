import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HealthService } from '../shared/services/health.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';

@Component({
    moduleId: module.id,
    selector: 'health-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
    providers: [HealthService, AuthService],
})

export class ProfileComponent implements OnInit {
    editing = false;
    profileForm: FormGroup;
    user: User;

    myDatePickerOptions = {
        dateFormat: 'dd.mm.yyyy'
    };

    constructor(
        private formBuilder: FormBuilder,
        private healthService: HealthService,
        private authService: AuthService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
                console.log(this.user);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit(): void { }

    edit(): void {
        this.buildProfileForm(this.user);
        this.editing = true;
    }

    save(): void {
        this.editing = false;
    }

    cancel(): void {
        this.editing = false;
    }

    buildProfileForm({ firstName = '', lastName = '', middleName = '', gender = '', birth = '', phone = '', location = '' }): void {
        this.profileForm = this.formBuilder.group({
            'firstName': [firstName],
            'lastName': [lastName],
            'middleName': [middleName],
            'gender': [gender],
            'birth': [birth],
            'phone': [phone],
            'location': [location],
        });
    }
}
