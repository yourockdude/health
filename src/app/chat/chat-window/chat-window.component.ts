import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core';
import { Client } from '../../shared/models/client';
import { SocketService } from '../../shared/services/socket.service';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'health-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
    @Input() client: Client;
    @Input() messages;
    @Output() closeEvent = new EventEmitter();
    @ViewChild('chatWindow') chatWindow: ElementRef;
    @ViewChild('chatBody') chatBody: ElementRef;

    message;
    chatMessages = [];

    isHide = false;
    currentUser;

    room;
    fromId;
    toId;

    constructor(
        private socketService: SocketService,
        private authService: AuthService,
    ) {
        console.log('new chat window opened');
        this.authService.getUser().subscribe(res => {
            if (res.success) {
                this.currentUser = res.data;
            } else {
                console.log('error');
            }
        });
    }

    ngOnInit() {
        // console.log(this.messages);
        // this.chatMessages = this.messages ? this.messages : [];
        // this.getMessages();
    }

    ngOnDestroy() {
    }

    // getMessages() {
    //     this.socketService.getMessages().subscribe(message => {
    //         this.chatMessages.push(message);
    //     });
    // }

    sendMessage() {
        if (this.currentUser.id === environment.adminId) {
            this.room = this.client.id;
            this.toId = this.client.id;
        } else {
            this.room = this.currentUser.id;
            this.toId = environment.adminId;
        }
        const data = {
            date: new Date(),
            fromId: this.currentUser.id,
            toId: this.toId,
            room: this.room,
            message: this.message,
        };
        this.socketService.sendMessage(data);
    }

    close() {
        this.closeEvent.emit(true);
    }

    hide() {
        if (this.isHide) {
            this.chatBody.nativeElement.style.display = 'block';
            this.chatWindow.nativeElement.style.height = '300px';
        } else {
            this.chatBody.nativeElement.style.display = 'none';
            this.chatWindow.nativeElement.style.height = 'initial';
        }
        this.isHide = !this.isHide;
    }
}
