import {
    Directive,
    HostListener,
    ElementRef,
    OnInit
} from '@angular/core';

@Directive({ selector: '[healthPdfViewer]' })
export class PdfViewerDirective implements OnInit {

    constructor(private element: ElementRef) {
        document.body.style.userSelect = 'none';
        document.body.style.overflow = 'hidden';
    }

    ngOnInit() { }

    @HostListener('mousedown', ['$event'])
    onMouseDown(event: MouseEvent) {
        console.log('mouse down');
    }

    @HostListener('mouseup')
    onMouseUp(event: MouseEvent) {
        console.log('mouseup');
    }

    @HostListener('mousemove', ['$event'])
    onMouseMove(event: MouseEvent) {
        console.log('mousemove');
    }

}
