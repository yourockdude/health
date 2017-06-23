import {
    Component,
    OnInit,
    ElementRef,
    ViewChild
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HealthService } from '../shared/services/health.service';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user';
import { INgxMyDpOptions } from 'ngx-mydatepicker';


@Component({
    moduleId: module.id,
    selector: 'health-profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css'],
    providers: [HealthService, AuthService],
})

export class ProfileComponent implements OnInit {
    @ViewChild('profileImage') profileImage: ElementRef;
    editing = false;
    profileForm: FormGroup;
    user: User;
    src = 'assets/images/profile.jpg';

    myDatePickerOptions: INgxMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
        dayLabels: {
            su: 'Вс',
            mo: 'Пн',
            tu: 'Вт',
            we: 'Ср',
            th: 'Чт',
            fr: 'Пт',
            sa: 'Сб'
        },
        monthLabels: {
            1: 'Янв',
            2: 'Фев',
            3: 'Мар',
            4: 'Апр',
            5: 'Май',
            6: 'Июн',
            7: 'Июл',
            8: 'Авг',
            9: 'Сен',
            10: 'Окт',
            11: 'Ноя',
            12: 'Дек'
        },
        todayBtnTxt: 'Сегодня'
    };

    constructor(
        private formBuilder: FormBuilder,
        private healthService: HealthService,
        private authService: AuthService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
                if (this.user.photo.length > 0) {
                    this.src = this.user.photo;
                }
                this.buildProfileForm(this.user);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    ngOnInit(): void { }

    edit(): void {
        this.editing = true;
    }

    save(): void {
        this.editing = false;
        console.log(this.profileForm);
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
                console.log(res);
            } else {
                throw new Error(JSON.stringify(res.error));
            }
        });
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
