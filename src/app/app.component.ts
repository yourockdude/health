import { Component } from '@angular/core';
import { SocketService } from './shared/services/socket.service';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'health-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SocketService, AuthService]
})
export class AppComponent {
    currentUser;
    rooms = [];

    constructor(
        private authService: AuthService,
        private socketService: SocketService,
    ) {
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.currentUser = res.data;
            }
        });
    }

}
