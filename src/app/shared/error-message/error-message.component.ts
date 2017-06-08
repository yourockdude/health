import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
    selector: 'health-error-message',
    templateUrl: 'error-message.component.html'
})
export class ErrorMessagesComponent {
    @Input() control: FormControl;
    constructor() { }

    get errorMessage() {
        for (const propertyName in this.control.errors) {
            // && this.control.touched
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return ValidationService.getValidatorErrorMessage(propertyName);
            }
        }
        return null;
    }

}
