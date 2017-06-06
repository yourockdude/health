import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chatDateTime'
})

export class ChatDateTimePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (value) {
            return new Intl.DateTimeFormat('ru', {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            }).format(new Date(value));
        } else {
            return '';
        }
    }
}
