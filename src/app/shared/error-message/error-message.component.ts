import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'health-error-message',
    templateUrl: 'error-message.component.html',
    styleUrls: ['/error-message.component.css'],
})
export class ErrorMessagesComponent {
    @Input() control: FormControl;
    class: string;

    constructor() { }

    get errorMessage() {
        console.log(this.control)
        // tslint:disable-next-line:forin
        for (const propertyName in this.control.errors) {
            // && this.control.touched
            this.class = (propertyName === 'emptyField') ? 'info' : 'error';
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return ValidationService.getValidatorErrorMessage(propertyName);
            }
        }
        return null;
    }
}
