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
import { User } from '../../shared/models/user';
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
    @Input() currentUser: User;
    @Input() messages;
    @Input() unreadMessages;
    @Output() closeEvent = new EventEmitter();
    @ViewChild('scrollBody') scrollBody: ElementRef;

    message;
    chatMessages = [];

    isHide = false;

    room;
    fromId;

    interlocutor;
    clients = [];
    currentChatMessages;

    isShowUserBox = false;
    queryUser;
    clientsFound = [];

    constructor(
        private socketService: SocketService,
        private authService: AuthService,
        private healthService: HealthService,
        private readMessageService: ReadMessageService,
    ) { }

    ngOnInit() {
        if (this.isAdmin(this.currentUser.role)) {
            this.healthService.getUsers().subscribe(res => {
                if (res.success) {
                    this.clients = res.data.filter(f => f.role === 1);
                    this.clientsFound = res.data.filter(f => f.role === 1);
                    this.clients.splice(this.clients.map(c => JSON.stringify(c)).indexOf(JSON.stringify(this.currentUser)), 1);
                    if (this.unreadMessages.length > 0) {
                        this.interlocutor = this.clients.find(c => c.id === this.unreadMessages.map(u => u.fromId)[0]);
                        this.readMessageService.chatToNavbarChange(this.interlocutor.id);
                    } else {
                        this.interlocutor = this.clients[0];
                    }
                } else {
                    console.log('error: ', res.error);
                }
            });
        } else {
            this.healthService.getUsers().subscribe(res => {
                if (res.success) {
                    this.clients = res.data.filter(f => f.role === 0);
                    this.clientsFound = res.data.filter(f => f.role === 0);
                    this.clients.splice(this.clients.map(c => JSON.stringify(c)).indexOf(JSON.stringify(this.currentUser)), 1);
                    if (this.unreadMessages.length > 0) {
                        this.interlocutor = this.clients.find(c => c.id === this.unreadMessages.map(u => u.fromId)[0]);
                        this.readMessageService.chatToNavbarChange(this.interlocutor.id);
                    } else {
                        this.interlocutor = this.clients[0];
                    }
                } else {
                    console.log('error', res.error);
                }
            });
        };
    }

    ngOnDestroy() { }

    roll() {
        this.readMessageService.navbarToChatObservable$.subscribe(res => {
            if (res.fromId === this.interlocutor.id || res.toId === this.interlocutor.id) {
                console.log(this.scrollBody.nativeElement);
                this.scrollBody.nativeElement.scrollTop = this.scrollBody.nativeElement.scrollHeight - 221;
            }
        });
    }

    onScroll(event) {
        console.log(event);
    }

    onClientClick(client) {
        this.interlocutor = client;
        this.readMessageService.chatToNavbarChange(this.interlocutor.id);
    }

    isAdmin(user) {
        return user.role === 0 ? true : false;
    }

    isIncoming(msg) {
        return msg.fromId === this.currentUser.id ? false : true;
    }


    isUnreadUser(id) {
        if (this.unreadMessages) {
            return this.unreadMessages.map(u => u.fromId).includes(id) ? true : false;
        }
    }

    get getCurrentChatMessages() {
        if (this.interlocutor) {
            this.readMessageService.chatToNavbarChange(this.interlocutor.id);
            return this.messages
                .filter(m => m.fromId === this.interlocutor.id || m.toId === this.interlocutor.id);
        }
    }

    member(msg) {
        if (msg.fromId === this.currentUser.id) {
            return 'Вы';
        } else {
            if (this.isAdmin(this.currentUser)) {
                return 'Клиент';
            } else {
                return 'Док';
            }
        }
    }

    sendMessage() {
        if (this.isAdmin(this.currentUser)) {
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
        if (this.message === '' || !this.message) {
            return;
        }
        this.socketService.sendMessage(data);
        this.message = '';
    }

    close() {
        this.closeEvent.emit(true);
    }

    hide() {
        this.isHide = !this.isHide;
    }

    showUserBox() {
        this.isShowUserBox = !this.isShowUserBox;
    }

    onSearchKeyUp() {
        this.clientsFound = this.clients.filter(c => {
            return c.firstName.toLowerCase().includes(this.queryUser.toLowerCase()) ||
                c.lastName.toLowerCase().includes(this.queryUser.toLowerCase());
        });
    }

    onTextAreaKeyUp(event) {
        if (event.keyCode === 13) {
            this.sendMessage();
        }
    }

    preventEnter(event: KeyboardEvent) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }
}
