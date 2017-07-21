import {
    Component,
    OnInit,
    ViewChild,
    ElementRef
} from '@angular/core';
import { HealthService } from '../shared/services/health.service';
import { User } from '../shared/models/user';
import { AuthService } from '../shared/services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from '../shared/services/validation.service';
import { Router } from '@angular/router';

@Component({
    selector: 'health-intermediate',
    templateUrl: 'intermediate.component.html',
    styleUrls: ['intermediate.component.scss'],
})

export class IntermediateComponent implements OnInit {
    @ViewChild('profileImage') profileImage: ElementRef;
    user: User;
    src: string;
    form: FormGroup;
    doctors: User[];
    selectedDoctors = [];

    constructor(
        private healthService: HealthService,
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.healthService.getAdmins().subscribe(res => {
            if (res.success) {
                this.doctors = res.data;
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
                if (this.user.photo) {
                    this.src = this.user.photo;
                }
                this.buildForm(this.user);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit() { }

    buildForm({ middleName = '', gender = '', phone = '', location = '' }) {
        this.form = this.formBuilder.group({
            'middleName': [middleName, ValidationService.emptyFieldValidator],
            'phone': [phone, ValidationService.emptyFieldValidator],
            'location': [location, ValidationService.emptyFieldValidator],
            'doctors': [],
        });
    }

    get isDisabled() {
        if (this.form.valid && this.user.photo && this.selectedDoctors.length > 0) {
            return false;
        }
        return true;
    }

    choosePhoto(): void {
        this.profileImage.nativeElement.value = null;
        this.profileImage.nativeElement.click();
    }

    updateProfile() {
        this.form.value.doctors = this.selectedDoctors;
        this.healthService.editProfile(this.form.value).subscribe(res => {
            if (res.success) {
                this.router.navigate(['sidenav']);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    onFileChange(file: File) {
        this.healthService.uploadProfilePhoto(file).subscribe(res => {
            if (res.success) {
                this.user.photo = res.data;
                this.healthService.editProfile(this.user).subscribe(r => {
                    if (r.success) {
                        this.user.photo = res.data;
                        if (this.user.photo.length > 0) {
                            this.src = this.user.photo;
                        }
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                });
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    onDocClick(doc, element) {
        if (this.selectedDoctors.includes(doc)) {
            this.selectedDoctors.splice(this.selectedDoctors.indexOf(doc), 1);
        } else {
            this.selectedDoctors.push(doc);
        }
    }
}
