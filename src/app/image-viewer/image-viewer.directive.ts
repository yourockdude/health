import {
    Directive,
    HostListener,
    Output,
    EventEmitter,
    HostBinding,
    OnInit,
    ElementRef,
    Input,
    AfterViewInit
} from '@angular/core';

@Directive({ selector: '[healthImageViewer]' })
export class ImageViewerDirective implements OnInit, AfterViewInit {
    @HostBinding('style.height') height;
    @HostBinding('style.transform') transform = 'rotate(0deg)';
    @Input() subject;

    topStart = 0;
    leftStart = 0;
    md: boolean;
    initial;

    constructor(private element: ElementRef) { }

    ngOnInit() {
        this.subject.asObservable().subscribe(res => {
            switch (res) {
                case 'left':
                    this.rotateLeft();
                    break;
                case 'increase':
                    this.increaseSize();
                    break;
                case 'initial':
                    this.getInitialSize();
                    break;
                case 'decrease':
                    this.decreaseSize();
                    break;
                case 'right':
                    this.rotateRight();
                    break;
            }
        });
        this.height = `${this.element.nativeElement.parentElement.clientHeight * 0.8}px`;
        this.initial = `${this.element.nativeElement.parentElement.clientHeight * 0.8}px`;
    }

    ngAfterViewInit(): void {
    }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        if (event.button === 2) {
            return;
        }
        this.md = true;
        this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px', '');
        this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px', '');
    }

    @HostListener('mouseup')
    onMouseUp(event: MouseEvent) {
        this.md = false;
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        event.stopPropagation();
        if (this.md) {
            this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
            this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
        }
    }

    @HostListener('touchstart', ['$event'])
    onTouchStart(event: TouchEvent) {
        event.stopPropagation();
        this.md = true;
        this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px', '');
        this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px', '');
    }

    @HostListener('touchend')
    onTouchEnd() {
        this.md = false;
    }

    @HostListener('touchmove', ['$event'])
    onTouchMove(event: TouchEvent) {
        event.stopPropagation();
        if (this.md) {
            this.element.nativeElement.style.top = (event.changedTouches[0].clientY - this.topStart) + 'px';
            this.element.nativeElement.style.left = (event.changedTouches[0].clientX - this.leftStart) + 'px';
        }
    }

    @HostListener('window:mousewheel', ['$event'])
    onWindowScroll(event: Event) {
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
    }

    @HostListener('mousewheel', ['$event'])
    onScroll(event) {
        event.preventDefault();
        event.stopPropagation();
        event.returnValue = false;
        const e = window.event || event;
        const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        const value = parseInt(this.height, 10);
        if (delta > 0) {
            if (value > 2000) {
                return;
            }
            this.height = `${value + 30}px`;
        } else {
            if (value < 100) {
                return;
            }
            this.height = `${value - 30}px`;
        }
    }

    getInitialSize() {
        this.height = this.initial;
    }

    increaseSize() {
        console.log('increase');
        const value = parseInt(this.height, 10);
        if (value > 2000) {
            return;
        }
        this.height = `${value + 30}px`;

    }

    decreaseSize() {
        console.log('decreace');
        const value = parseInt(this.height, 10);
        if (value < 100) {
            return;
        }
        this.height = `${value - 30}px`;

    }

    rotateLeft() {
        console.log('left');
        const value = parseInt(this.transform.match(/-?\d+/)[0], 10) - 90;
        this.transform = `rotate(${value}deg)`;
        console.log(this.transform);
    }

    rotateRight() {
        console.log('right');
        const value = parseInt(this.transform.match(/-?\d+/)[0], 10) + 90;
        this.transform = `rotate(${value}deg)`;
        console.log(this.transform);
    }

}
