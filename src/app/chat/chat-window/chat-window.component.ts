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
import { ChatService } from '../../shared/services/chat.service';

@Component({
    selector: 'health-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.css'],
    providers: [ChatService],
})
export class ChatWindowComponent implements OnInit, OnDestroy {
    @Input() client: Client;
    @Output() closeEvent = new EventEmitter();
    @ViewChild('chatWindow') chatWindow: ElementRef;
    @ViewChild('chatBody') chatBody: ElementRef;

    messages = [];
    connection;
    message;

    isHide = false;

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.connection = this.chatService.getMessages().subscribe(messages => {
            this.messages.push(messages);
        });
    }

    ngOnDestroy() {
        this.connection.unsubscribe();
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
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
