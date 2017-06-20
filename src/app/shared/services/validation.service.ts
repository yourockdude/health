import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms/forms';
import { AuthService } from './auth.service';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ValidationService {

    static getValidatorErrorMessage(validatorName: string): string {
        const config = {
            'invalidEmailAddress': 'Неправильный формат почты',
            // tslint:disable-next-line:max-line-length
            'invalidPassword': 'Пароль должен содержать как минимум одну цифру, одну маленькую букву, одну большую букву и быть длиной не менее 8 символов',
            'invalidFirstName': 'Фамилия должна содержать только буквы',
            'invalidLastName': 'Имя должно содержать только буквы',
            'emptyField': '*Обязательное поле',
            'invalidConfirmPassword': 'Пароли должны совпадать',
            'userExist': 'Пользователь с такой почтой уже зарегистрирован',
        };
        return config[validatorName];
    }

    static emailValidator(control) {
        // tslint:disable-next-line:max-line-length
        if (
            control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ||
            control.value === ''
        ) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    static passwordValidator(control) {
        // tslint:disable-next-line:max-line-length
        if (
            control.value.match(/^(?=.*\d)(?=.*[a-zа-я])(?=.*[A-ZА-Я])[0-9a-zA-Zа-яА-Я]{8,}$/) ||
            control.value === ''
        ) {
            return null;
        } else {
            return { 'invalidPassword': true };
        }
    }

    static firstNameValidator(control) {
        if (
            control.value.match(/[a-zа-яА-ЯA-z]+/) ||
            control.value === ''
        ) {
            return null;
        } else {
            return { 'invalidFirstName': true };
        }
    }

    static lastNameValidator(control) {
        if (
            control.value.match(/[a-zа-яА-ЯA-z]+/) ||
            control.value === ''
        ) {
            return null;
        } else {
            return { 'invalidLastName': true };
        }
    }

    static emptyFieldValidator(control) {
        if (control.value === '') {
            return { 'emptyField': true };
        } else {
            return null;
        }
    }

    static confirmPasswordValidator(control: AbstractControl) {
        const password = control.get('password');
        const confirmPassword = control.get('passwordRepeat');
        if (
            password.value === confirmPassword.value ||
            password.value === '' ||
            confirmPassword.value === ''
        ) {
            if (confirmPassword.errors) {
                if (JSON.stringify(confirmPassword.errors) === JSON.stringify({ 'invalidConfirmPassword': true })) {
                    confirmPassword.setErrors(null);
                } else {
                    delete confirmPassword.errors['invalidConfirmPassword'];
                }
            }
            if (password.errors) {
                if (JSON.stringify(password.errors) === JSON.stringify({ 'invalidConfirmPassword': true })) {
                    password.setErrors(null);
                } else {
                    delete password.errors['invalidConfirmPassword'];
                }
            }
            return null;
        } else {
            const passwordErrors = password.errors;
            const passwordRepeatErrors = confirmPassword.errors;
            if (passwordErrors) {
                password.setErrors(Object.assign({}, passwordErrors, { 'invalidConfirmPassword': true }));
            } else {
                password.setErrors({ 'invalidConfirmPassword': true });
            }
            if (passwordRepeatErrors) {
                confirmPassword.setErrors(Object.assign({}, passwordRepeatErrors, { 'invalidConfirmPassword': true }));
            } else {
                confirmPassword.setErrors({ 'invalidConfirmPassword': true });
            }
            return { 'invalidConfirmPassword': true };
        }
    }

    // static existUserValidator(authService: AuthService) {
    //     return (control) => {
    //         return console.log(control);
    //         // authService.checkEmail(control).subscribe(res => console.log(res));
    //     };
    //     // TODO сделать на сервере отдельный endpoint
    // }
    // static existEmail2(control) {
    //     let http: Http;
    //     http.post(`${environment.api}/check_username`, { username: control.value })
    //         .map(res => res.json())
    //         .subscribe(r => console.log(r));
    // }

    constructor(private authService: AuthService, private http: Http) { };

    existEmail(control) {
        const obs = this.http.post(`${environment.api}/check_username`, { username: control.value })
            .map(res => res.json());
        return new Promise(resolve => {
            obs.subscribe(r => {
                if (r.success) {
                    console.log('invalid')
                    resolve({ userExist: true });
                } else {
                    console.log('valid')
                    resolve(null);
                }
            });
        });

    }

}
