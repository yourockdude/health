import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateTimeFormat'
})

export class DateTimeFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            return new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long', year: 'numeric' }).format(value);
        } else {
            return '';
        }
    }
}
