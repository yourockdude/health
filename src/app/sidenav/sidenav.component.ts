import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'health-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css'],
})

export class SidenavComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() { }

    onItemClick(e: MouseEvent, part: string) {
        // if (part === '') {
        //     this.router.navigateByUrl('');
        // }
        // console.log(this.activatedRoute);
        this.router.navigate(
            [{ outlets: { 'sidebar': [part] } }],
            {
                relativeTo: this.activatedRoute,
            }
        );
    }
}
