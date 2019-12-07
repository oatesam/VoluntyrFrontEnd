import {Component, Input, OnInit} from '@angular/core';
import {ChatRoom, ChatService} from '@app/_services/chat.service';
import {SocketMessage} from '@app/_models/SocketMessage';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {WebSocketSubject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  @Input() chatRoom: ChatRoom;
  private sender: string;
  public messages: SocketMessage[] = new Array<SocketMessage>();
  private socket: WebSocketSubject<SocketMessage>;
  public clientMessage: string;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.chatId = this.chatRoom.id;
    this.sender = "charlie.frank72@gmail.com"; // TODO: Get email from storage
    this.socket = this.chatService.socket;
    this.socket.subscribe(
      msg => {
        this.messages.push(msg)
      },
      error => {
        console.error(error)
      },
      () => {
        console.warn("Complete");
      }
    );
  }

  // messageFormGroup = new FormGroup({
  //   messageControl: new FormControl('', [Validators.required])
  // }) ;

  public getMessage() {
    // return this.messageFormGroup.controls.messageControl.value
    return this.clientMessage
  }

  public getSenderLetter(sender: string): string {
    return sender && sender.substr(0, 1).toLocaleUpperCase();
  }

  public getSenderColor(sender: string): string {
    const alpha = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZ';
        const letter = this.getSenderLetter(sender);
        const value = Math.ceil(alpha.indexOf(letter) * 255 * 255 * 255 / 70);
        return '#' + value.toString(16).padEnd(6, '0');
  }

  public send(): void {
    const message = new SocketMessage("chat_message", this.chatRoom.id, "", this.sender, this.getMessage());

    this.messages.push(message);
    this.socket.next(message);
    this.clientMessage = "";
  }

  public isMine(message: SocketMessage) {
    return message && message.sender === this.sender
  }


}
