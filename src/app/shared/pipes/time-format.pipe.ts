import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeFormat'
})

export class TimeFormatPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            let newFormat = new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: 'numeric' }).format(value);
            if (newFormat.length === 4) {
                newFormat = 0 + newFormat;
            }
            return newFormat;
        } else {
            return '';
        }
    }
}
