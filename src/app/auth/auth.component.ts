import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { environment } from '../../environments/environment';
import { AuthService as GoogleService } from 'angular2-social-login';
import { User } from '../shared/models/user';
import { ValidationService } from '../shared/services/validation.service';
import { PassUserService } from '../shared/services/pass-user.service';
declare const VK;

@Component({
    moduleId: module.id,
    selector: 'health-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.scss'],
    providers: [ValidationService],
})

export class AuthComponent implements OnInit {
    isSignIn = true;
    signInForm: FormGroup;
    signUpForm: FormGroup;
    info = '';
    isSocialSignUp = false;
    currentSocialId;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private facebookService: FacebookService,
        private googleService: GoogleService,
        private validationService: ValidationService,
        private passUserService: PassUserService,
    ) {
        this.buildSignInForm({});
        this.buildSignUpForm({});
        const initParams: InitParams = {
            appId: environment.facebookClientId,
            xfbml: true,
            version: environment.facebookApiVersion,
        };

        facebookService.init(initParams);
        VK.init({
            apiId: environment.vkontakteClientId,
        });
    }

    ngOnInit() { }

    buildSignInForm({ email = '', gId = '', vId = '', fId = '' }) {
        this.signInForm = this.formBuilder.group({
            'email': [
                email,
                [ValidationService.emailValidator, ValidationService.emptyFieldValidator],
                this.validationService.notExistEmail.bind(this.validationService)
            ],
            'password': ['', [ValidationService.passwordValidator, ValidationService.emptyFieldValidator]],
            'gId': [gId],
            'fId': [fId],
            'vId': [vId],
        });
    }

    buildSignUpForm({ email = '', firstName = '', lastName = '', gId = '', vId = '', fId = '' }) {
        this.signUpForm = this.formBuilder.group({
            'email': [
                email,
                [ValidationService.emailValidator, ValidationService.emptyFieldValidator],
                this.validationService.existEmail.bind(this.validationService)
            ],
            'firstName': [firstName, [ValidationService.firstNameValidator, ValidationService.emptyFieldValidator]],
            'lastName': [lastName, [ValidationService.lastNameValidator, ValidationService.emptyFieldValidator]],
            'password': ['', [ValidationService.passwordValidator, ValidationService.emptyFieldValidator]],
            'passwordRepeat': ['', [ValidationService.emptyFieldValidator]],
            'gId': [gId],
            'fId': [fId],
            'vId': [vId],
        }, {
                validator: ValidationService.confirmPasswordValidator,
            });
    }

    switch(state: string, social?: boolean) {
        this.buildSignInForm({});
        this.buildSignUpForm({});
        if (social) {
            this.info = 'Что бы связать социальную сеть с Вашим аккаунтом заполните поля';
            this.isSocialSignUp = false;
        } else {
            this.info = '';
        }
        if (state === 'signIn') {
            this.isSignIn = true;
        } else {
            this.isSignIn = false;
        }
    }

    sending() {
        if (this.isSignIn) {
            this.signIn();
        } else {
            this.signUp();
        }
    }

    signIn() {
        if (this.currentSocialId) {
            Object.assign(this.signInForm.value, this.currentSocialId);
        }
        this.authService.signIn(this.signInForm.value).subscribe(res => {
            if (res.success) {
                this.saveTokenAndRedirect(res.data);
            } else {
                this.info = 'Неверный пароль';
                throw new Error(JSON.stringify(res.error));
            }
        });
    }

    signUp() {
        this.signUpForm.value.role = 1;
        this.authService.signUp(this.signUpForm.value).subscribe(res => {
            if (res.success) {
                this.saveTokenAndRedirect(res.data);
            } else {
                throw new Error(JSON.stringify(res.error));
            }

        });
    }

    choiceSocial(social: string) {
        this.buildSignInForm({});
        this.buildSignUpForm({});
        switch (social) {
            case 'facebook':
                this.signInViaFacebook();
                break;
            case 'google':
                this.signInViaGoogle();
                break;
            case 'vk':
                this.signInViaVkontakte();
                break;
        }
    }

    signInViaFacebook() {
        this.facebookService.login(
            { scope: 'email, public_profile' }
        )
            .then((res: LoginResponse) => {
                this.authService.getFbProfile(res.authResponse.accessToken, res.authResponse.userID)
                    .subscribe(r => {
                        const user: User = {
                            fId: r.id,
                            email: r.email,
                            lastName: r.last_name,
                            firstName: r.first_name,
                        };
                        this.signInViaSocial(user);
                    });
            })
            .catch(err => {
                throw new Error(JSON.stringify(err));
            });
    }

    signInViaGoogle() {
        this.googleService.login('google').subscribe(
            (res: any) => {
                const user: User = {
                    gId: res.uid,
                    email: res.email,
                    firstName: res.name.split(' ')[0],
                    lastName: res.name.split(' ')[1],
                };
                this.signInViaSocial(user);
            },
            err => {
                throw new Error(JSON.stringify(err));
            }
        );
    }

    signInViaVkontakte() {
        VK.Auth.login((res) => {
            const user: User = {
                vId: res.session.user.id,
                firstName: res.session.user.first_name,
                lastName: res.session.user.last_name,
            };
            this.signInViaSocial(user);
        },
            err => {
                throw new Error(JSON.stringify(err));
            }
        );
    }

    signInViaSocial(user: User) {
        ['fId', 'gId', 'vId'].forEach(k => {
            if (user[k]) {
                this.currentSocialId = { [k]: user[k] };
            }
        });
        this.authService.signInViaSocial(user).subscribe(response => {
            if (response.success) {
                switch (response.data.flag) {
                    case 'token':
                        this.saveTokenAndRedirect(response.data.token);
                        break;
                    case 'emailExist':
                        this.isSignIn = true;
                        this.buildSignInForm(user);
                        this.info = `Что бы связать социальную сеть с Вашим аккаунтом заполните поля`;
                        break;
                    case 'newUser':
                        this.isSignIn = false;
                        this.buildSignUpForm(user);
                        this.info = 'Заполните недостающую информацию';
                        this.isSocialSignUp = true;
                        break;
                }
            } else {
                throw new Error(JSON.stringify(response.error));
            }
        });
    }

    saveTokenAndRedirect(token: string) {
        localStorage.setItem('token', token);
        this.passUserService.change(true);
        this.router.navigate(['/sidenav']);
    }

    disabledSendingButton() {
        if (
            this.isSignIn && this.signInForm.valid ||
            !this.isSignIn && this.signUpForm.valid
        ) {
            return false;
        }
        return true;
    }

    showPassword(e) {
        e.type = e.type === 'password' ? 'text' : 'password';
    }
}
