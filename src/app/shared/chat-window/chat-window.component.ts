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
import { environment } from '../../../environments/environment';

import { SocketService } from '../../shared/services/socket.service';
import { AuthService } from '../../shared/services/auth.service';
import { HealthService } from '../../shared/services/health.service';
import { ReadMessageService } from '../../shared/services/read-message.service';

@Component({
    selector: 'health-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
    providers: [HealthService],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
    @Input() currentUser: Client;
    @Input() messages;
    @Input() unreadMessages;
    @Output() closeEvent = new EventEmitter();
    @ViewChild('chatWindow') chatWindow: ElementRef;
    @ViewChild('chatBody') chatBody: ElementRef;

    message;
    chatMessages = [];

    isHide = false;
    // currentUser;

    room;
    fromId;

    interlocutor;
    clients = [];
    currentChatMessages;

    constructor(
        private socketService: SocketService,
        private authService: AuthService,
        private healthService: HealthService,
        private readMessageService: ReadMessageService,
    ) { }

    ngOnInit() {
        if (this.isAdmin()) {
            this.healthService.getClients().subscribe(res => {
                if (res.success) {
                    this.clients = res.data;
                    this.clients.splice(this.clients.map(c => JSON.stringify(c)).indexOf(JSON.stringify(this.currentUser)), 1);
                    if (this.unreadMessages.length > 0) {
                        this.interlocutor = this.clients.find(c => c.id === this.unreadMessages[0]);
                        this.readMessageService.chatToNavbarChange(this.interlocutor.id);
                    } else {
                        this.interlocutor = this.clients[0];
                    }
                } else {
                    console.log('error: ', res.error);
                }
            });
        } else {
            // TODO create point for get Admin
            this.healthService.getClients().subscribe(res => {
                if (res.success) {
                    this.interlocutor = res.data.find(c => c.userGroup === 0);
                } else {
                    console.log('error', res.error);
                }
            });
        };
        // this.getCurrentChatMessages();
        // console.log(this.messages);
        // this.chatMessages = this.messages ? this.messages : [];
        // this.getMessages();
    }

    ngOnDestroy() {
    }

    onClientClick(client) {
        this.interlocutor = client;
        this.readMessageService.chatToNavbarChange(this.interlocutor.id);
        // this.getCurrentChatMessages();
    }

    isAdmin() {
        return this.currentUser.userGroup === 0 ? true : false;
    }

    isIncoming(msg) {
        return msg.fromId === this.currentUser.id ? false : true;
    }


    isUnreadUser(id) {
        return this.unreadMessages.includes(id) ? true : false;
    }

    get getCurrentChatMessages() {
        if (this.interlocutor) {
            return this.messages
                .filter(m => m.fromId === this.interlocutor.id || m.toId === this.interlocutor.id);
        }
    }

    member(msg) {
        if (msg.fromId === this.currentUser.id) {
            return 'Вы';
        } else {
            if (this.isAdmin()) {
                return 'Клиент';
            } else {
                return 'Док';
            }
        }
    }

    // getMessages() {
    //     this.socketService.getMessages().subscribe(message => {
    //         this.chatMessages.push(message);
    //     });
    // }

    sendMessage() {
        if (this.isAdmin()) {
            this.room = this.interlocutor.id;
        } else {
            this.room = this.currentUser.id;
        }
        const data = {
            date: new Date(),
            fromId: this.currentUser.id,
            toId: this.interlocutor.id,
            room: this.room,
            message: this.message,
        };
        this.socketService.sendMessage(data);
        this.message = '';
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
