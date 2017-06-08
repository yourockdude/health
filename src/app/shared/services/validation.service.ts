import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {

    static getValidatorErrorMessage(validatorName: string): string {
        const config = {
            'invalidEmailAddress': 'Неправильный формат почты',
            // tslint:disable-next-line:max-line-length
            'invalidPassword': 'Пароль должен содержать как минимум одну цифру, одну маленькую букву, одну большую букву и быть длиной не менее 8 символов',
            'invalidFirstName': 'Фамилия должна содержать только буквы',
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
        console.log(control.value, control.value.match(/[a-zа-яА-ЯA-z]+/));
        if (control.value.match(/[a-zа-яА-ЯA-z]+/)) {
            return null;
        } else {
            return { 'invalidFirstName': true };
        }
    }

}
