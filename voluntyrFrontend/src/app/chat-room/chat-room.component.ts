import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ChatRoom, ChatService} from '@app/_services/chat.service';
import {SocketMessage} from '@app/_models/SocketMessage';
import {WebSocketSubject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy, OnChanges {

  @Input() chatRoom: ChatRoom;
  private sender: string;
  public messages: SocketMessage[] = new Array<SocketMessage>();
  private socket: WebSocketSubject<SocketMessage>;
  public clientMessage: string;
  private reconnect: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatRoom'] && !changes['chatRoom'].isFirstChange()) {
      console.error("OnChanges: ", changes);
      this.messages = new Array<SocketMessage>();
      if (this.socket && !this.socket.closed) {
        this.reconnect = true;
        this.socket.complete();
        // this.makeSocket();
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
    this.socket = this.chatService.socket;
    this.socket.subscribe(
      msg => {
        console.warn("Received Message: ", msg);
        if (msg.type == "chat_message") {
          this.messages.push(msg);
        }
      },
      error => {
        console.error(error)
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
    const message = new SocketMessage("chat_message", this.chatRoom.id, "", this.sender, this.getMessage());
    console.warn("Sent Message: ", message);
    // this.messages.push(message);
    this.socket.next(message);
    this.clientMessage = "";
  }

  public isMine(message: SocketMessage) {
    return message && message.sender === this.sender
  }


}
