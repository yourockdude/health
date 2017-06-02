import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'health-sidenav',
    templateUrl: 'sidenav.component.html',
    styleUrls: ['sidenav.component.css'],
})

export class SidenavComponent implements OnInit {
    isNew: boolean;
    user: any;
    isAdmin: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.user = res.data;
                this.isAdmin = this.user.userGroup === 0 ? true : false;
            }
        });
    }

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

    signOut() {
        this.authService.signOut();
        this.user = null;
    }

}
