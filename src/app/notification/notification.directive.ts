import {
    Directive,
    HostListener,
    HostBinding,
    Input,
    ElementRef
} from '@angular/core';

@Directive({ selector: '[healthNotificationDirective]' })
export class NotificationDirective {
    @Input() timer;
    @HostBinding('style.background')
    background = 'rgba(0, 0, 0, 0.8)';
    constructor(
        private elementRef: ElementRef
    ) { }

    @HostListener('mouseenter', ['$event'])
    onMouseEnter(e) {
        this.background = 'rgba(0, 0, 0, 1)';
        if (this.timer) {
            clearTimeout(this.timer.id);
        }
    }

    @HostListener('mouseleave', ['$event'])
    onMouseLeave(e) {
        this.background = 'rgba(0, 0, 0, 0.8)';
        if (this.timer) {
            this.timer.id = setTimeout(this.timer.callback, this.timer.delay);
        }
    }

    @HostListener('click', ['$event'])
    onMouseClick(e) {
        const message = this.elementRef.nativeElement.children[1];
        message.style.webkitLineClamp = message.style.webkitLineClamp === 'initial' ? 4 : 'initial';
    }
}
