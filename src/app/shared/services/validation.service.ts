import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms/forms';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class ValidationService {

    static getValidatorErrorMessage(validatorName: string): string {
        const config = {
            'invalidEmailAddress': 'Неправильный формат почты',
            'invalidPassword': `Пароль должен содержать как минимум одну цифру, 
                                одну маленькую букву, одну большую букву и быть 
                                длиной не менее 8 символов`,
            'invalidFirstName': 'Фамилия должна содержать только буквы',
            'invalidLastName': 'Имя должно содержать только буквы',
            'emptyField': '*Обязательное поле',
            'invalidConfirmPassword': 'Пароли должны совпадать',
            'userExist': 'Пользователь с такой почтой уже зарегистрирован',
            'userNotExist': 'Пользователя с такой почтой не зарегистрирован'
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

    constructor(private authService: AuthService) { };

    existEmail(control) {
        return new Promise(resolve => {
            this.authService.checkEmail(control.value).subscribe(r => {
                if (r.success) {
                    resolve({ userExist: true });
                } else {
                    resolve(null);
                }
            });
        });
    }

    notExistEmail(control) {
        return new Promise(resolve => {
            this.authService.checkEmail(control.value).subscribe(r => {
                if (r.success) {
                    resolve(null);
                } else {
                    resolve({ userNotExist: true });
                }
            });
        });
    }

}
