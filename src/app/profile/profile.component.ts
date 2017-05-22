import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'health-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
})

export class ProfileComponent implements OnInit {
    editing = false;
    profileForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() { }

    edit() {
        this.buildProfileForm();
        this.editing = true;
    }

    save() {
        this.editing = false;
    }

    cancel() {
        this.editing = false;
    }

    buildProfileForm() {
        this.profileForm = this.formBuilder.group({
            'firstName': [''],
            'secondName': [''],
            'middleName': [''],
            'gender': [''],
            'age': [''],
            'phone': [''],
            'location': [''],
        });
    }
}
