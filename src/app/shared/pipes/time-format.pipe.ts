import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            return new Intl.DateTimeFormat('ru', { hour: 'numeric', minute: 'numeric' }).format(value);
        } else {
            return '';
        }
    }
}
