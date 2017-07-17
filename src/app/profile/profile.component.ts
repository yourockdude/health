import {
    Component,
    OnInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { HealthService } from '../shared/services/health.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { environment } from 'environments/environment';
import { OpenChatService } from '../shared/services/open-chat.service';

@Component({
    moduleId: module.id,
    selector: 'health-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    providers: [HealthService, AuthService],
})

export class ProfileComponent implements OnInit {
    @ViewChild('profileImage') profileImage: ElementRef;
    editing = false;
    profileForm: FormGroup;
    user: User;
    src = 'assets/images/profile.png';
    passwordInputShow = false;
    myDatePickerOptions: INgxMyDpOptions = environment.datePickerOptions;
    id: string;
    isAdmin: boolean;
    isMyPage = true;
    files;

    constructor(
        private formBuilder: FormBuilder,
        private healthService: HealthService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private openChatService: OpenChatService,
        private router: Router,
    ) {
        this.authService.getUser().subscribe(r => {
            if (r.success) {
                this.isAdmin = r.data.role === 0 ? true : false;
            }
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = params['id'];
            if (this.id) {
                this.isMyPage = false;
                this.healthService.getUsersById(this.id).subscribe(res => {
                    this.commonPart(res);
                });
            } else {
                this.authService.getUser().subscribe(res => {
                    this.commonPart(res);
                });
            }
        });
    }

    ngOnInit(): void { }

    edit(): void {
        this.editing = true;
    }

    commonPart(res) {
        if (res.success) {
            this.user = res.data;
            if (this.user.photo.length > 0) {
                this.src = this.user.photo;
            }
            this.buildProfileForm(this.user);
        } else {
            throw new Error(JSON.stringify(res.error));
        }
    }

    save(): void {
        this.healthService.editProfile(this.profileForm.value).subscribe(res => {
            if (res.success) {
                this.user = this.profileForm.value;
                this.editing = false;
                // this.buildProfileForm(this.profileForm.value);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    cancel(): void {
        this.editing = false;
    }

    choosePhoto(): void {
        this.profileImage.nativeElement.value = null;
        this.profileImage.nativeElement.click();
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
                        this.buildProfileForm(this.user);
                    } else {
                        throw new Error(JSON.stringify(res.error));
                    }
                });
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    get setGender() {
        switch (this.profileForm.value.gender) {
            case 'male':
                return 'Мужчина';
            case 'female':
                return 'Женщина';
        }
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

    get controls() {
        if (this.isMyPage && !this.editing) {
            return 'myPage';
        } else if (this.editing) {
            return 'edit';
        } else if (this.isAdmin) {
            return 'admin';
        } else if (!this.isAdmin) {
            return 'user';
        }
    }

    openChat() {
        this.openChatService.change(this.user);
    }

    deleteFile(file) {
        console.log(file);
    }

    delete() {
        this.healthService.deleteUser(this.user.id).subscribe(res => {
            if (res.success) {
                this.router.navigate(
                    [{ outlets: { 'sidebar': ['clients'] } }],
                    {
                        relativeTo: this.activatedRoute.parent,
                    }
                );
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }
}
