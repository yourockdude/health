import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { environment } from '../../environments/environment';
import { AuthService as GoogleService } from 'angular2-social-login';
declare const VK;

@Component({
    moduleId: module.id,
    selector: 'health-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['auth.component.css'],
})

export class AuthComponent implements OnInit {
    isSignIn = true;
    signInForm: FormGroup;
    signUpForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private facebookService: FacebookService,
        private googleService: GoogleService,
    ) {
        this.buildSignInForm();
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

    buildSignInForm() {
        this.signInForm = this.formBuilder.group({
            'name': [''],
            'password': ['']
        });
    }

    buildSignUpForm() {
        this.signUpForm = this.formBuilder.group({
            'name': [''],
            'password': [''],
            'role': ['']
        });
    }

    switch() {
        this.isSignIn = !this.isSignIn;
        if (this.isSignIn) {
            this.buildSignInForm();
        } else {
            this.buildSignUpForm();
        }
    }

    signIn() {
        this.authService.signIn({
            name: this.signInForm.value.name,
            password: this.signInForm.value.password
        }).subscribe(res => {
            console.log(res);
            if (res.success) {
                this.router.navigate(['/sidenav']);
            }
        });
    }

    signUp() {
        this.authService.signUp({
            name: this.signUpForm.value.name,
            password: this.signUpForm.value.password,
            userGroup: this.signUpForm.value.role,
        }).subscribe(res => {
            if (res.success) {
                console.log(res.data);
            } else {
                console.log(res);
            }

        });
    }

    signInViaFacebook() {
        this.facebookService.login(
            { scope: 'email, public_profile' }
        )
            .then((res: LoginResponse) => {
                console.log(res);
                this.authService.getFbProfile(res.authResponse.accessToken, res.authResponse.userID).subscribe(r => console.log(r));
            })
            .catch(err => console.log(err));
    }
    // "https://graph.facebook.com/me?access_token="

    signInViaGoogle() {
        this.googleService.login('google').subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
    }

    signInViaVkontakte() {
        VK.Auth.login((res) => {
            console.log(res);
        });
    }
}
