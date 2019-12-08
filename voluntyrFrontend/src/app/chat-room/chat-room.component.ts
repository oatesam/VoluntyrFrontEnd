import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ChatRoom, ChatService} from '@app/_services/chat.service';
import {ChatSocketMessage} from '@app/_models/ChatSocketMessage';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chatRoom: ChatRoom;
  @Output() chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();

  private sender: string;
  public messages: ChatSocketMessage[] = new Array<ChatSocketMessage>();
  private socket: WebSocketSubject<ChatSocketMessage>;
  public clientMessage: string;
  private reconnect: boolean = false;

  constructor(
    private chatService: ChatService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatRoom'] && !changes['chatRoom'].isFirstChange()) {
      console.error("OnChanges: ", changes);
      this.messages = new Array<ChatSocketMessage>();
      if (this.socket && !this.socket.closed) {
        this.reconnect = true;
        // this.makeSocket();
        this.socket.complete();
      } else {
        this.makeSocket();
      }
    }
  }

  ngOnDestroy(): void {
    console.error("OnDestroy");
    if (this.socket && !this.socket.closed) {
      this.socket.complete();
    }
  }

  ngOnInit() {
    console.error("Onit");
    this.sender = localStorage.getItem("sender");
    this.makeSocket();
  }

  private makeSocket() {
    this.chatService.chatId = this.chatRoom.id;
    this.socket = this.chatService.getChatSocket();
    this.socket.subscribe(
      msg => {
        console.warn("Received Message: ", msg);
        if (msg.type == "chat_message") {
          this.messages.push(msg);
        }
      },
      error => {
        console.error("Socket Error");
        console.error(error);
        this.socket = null;
        this.chatRoom = null;
        this.chatRoomChange.emit(null);
      },
      () => {
        if (this.reconnect) {
          this.reconnect = false;
          this.makeSocket();
        } else {
          console.warn("Complete");
        }
      }
    );
  }

  public getMessage() {
    // return this.messageFormGroup.controls.messageControl.value
    return this.clientMessage
  }

  public getSenderLetters(sender: string): string {
    return sender && sender.substr(0, 5).toLocaleUpperCase();
  }

  public getSenderColor(sender: string): string {
    const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
    const letters = this.getSenderLetters(sender);
    let temp: number = 0.0;
    for (let letter of letters) {
      temp = temp + alpha.indexOf(letter);
    }
    temp = temp / 5;
    const value = Math.ceil(temp * 255 * 255 * 255 / 70);
    return '#' + value.toString(16).padEnd(6, '0');
  }

  public getTextColor(sender: string): string {
    let color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.getSenderColor(sender));
    let r = parseInt(color[1], 16);
    let g = parseInt(color[2], 16);
    let b = parseInt(color[3], 16);

    let brightness = Math.sqrt(
      (r * r * 0.241) + (g * g * 0.691) + (b * b * 0.068)
    );

    if (brightness > 125) {
      return "#000"
    } else {
      return "#F5F5F5"
    }
  }

  public send(): void {
    const message = new ChatSocketMessage("chat_message", "", this.chatRoom.id, "", this.sender, this.getMessage());
    console.warn("Sent Message: ", message);
    // this.messages.push(message);
    this.socket.next(message);
    this.clientMessage = "";
  }

  public isMine(message: ChatSocketMessage) {
    return message && message.sender === this.sender
  }


}
