import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/services/notification.service';

@Component({
    selector: 'health-notification',
    templateUrl: 'notification.component.html',
    styleUrls: ['notification.component.scss'],
})

export class NotificationComponent implements OnInit {
    show = false;
    type: string;
    message: string;
    timer;

    constructor(
        private notificationService: NotificationService,
    ) { }

    ngOnInit() {
        this.notificationService.getNotification().subscribe(res => {
            if (res.timeout) {
                this.timer = {
                    id: setTimeout(() => {
                        this.show = false;
                        delete this.timer;
                    }, res.timeout),
                    callback: () => {
                        this.show = false;
                        delete this.timer;
                    },
                    delay: res.timeout
                };
            }
            this.message = res.message;
            this.type = this.getTypeIcon(res.type);
            this.show = true;
        });
    }

    getTypeIcon(type) {
        switch (type) {
            case 'error':
                return 'exclamation-circle';

            case 'info':
                return 'info-circle';
        }
    }

    close() {
        this.show = false;
    }

}
