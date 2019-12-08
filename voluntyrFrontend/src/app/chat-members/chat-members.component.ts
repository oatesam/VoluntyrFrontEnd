import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {StatusSocketMessage, ChatRoom, ChatService} from '@app/_services/chat.service';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {ChatSocketMessage} from '@app/_models/ChatSocketMessage';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.css']
})
export class ChatMembersComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chatRoom: ChatRoom;
  @Output() chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();

  private sender: string;
  public members: StatusSocketMessage[] = new Array<StatusSocketMessage>();
  public selectedMember: StatusSocketMessage;

  private socket: WebSocketSubject<StatusSocketMessage>;

  constructor(private chatService: ChatService) { }

  ngOnInit() {

  }

 ngOnDestroy(): void {
    if (this.socket && !this.socket.closed) {
      this.socket.next((new StatusSocketMessage(this.chatRoom.id, "offline", this.sender)));
      this.socket.complete();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.sender) {
      this.sender = localStorage.getItem("sender");
    }
    if (!this.socket || this.socket.closed) {
      this.makeSocket();
    }
    if (changes['chatRoom']) {
      if (!changes['chatRoom'].isFirstChange()) {
        this.socket.next((new StatusSocketMessage(changes['chatRoom'].previousValue.id, "offline", this.sender)));
        this.members =  new Array<StatusSocketMessage>();
      }
      this.socket.next(new StatusSocketMessage(this.chatRoom.id, "get", ""));
      this.socket.next((new StatusSocketMessage(this.chatRoom.id, "online", this.sender)));
    }
  }

  public selectMember(member) {
    this.selectedMember = member;
  //  TODO: Make private chat room
  }

  private makeSocket() {
    this.chatService.chatId = this.chatRoom.id;
    this.socket = this.chatService.getStatusSocket();
    this.socket.subscribe(
      msg => {
        console.warn("Received Message: ", msg);
        if (msg.type == "online_message" && msg.user != this.sender && msg.room === this.chatRoom.id) {
          for (let member of this.members) {
            if (msg.user === member.user) {
              member.status = msg.status;
              return
            }
          }
          this.members.push(msg);
          // this.members.sort();
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
        console.warn("Complete");
      }
    );
    this.socket.next((new StatusSocketMessage(this.chatRoom.id, "online", this.sender)));
  }

  public getBackground(member: StatusSocketMessage) {
    if (member.status === "True" || member.status === "online") {
      return "#23c200"
    } else if (member.status === "False" || member.status === "offline") {
      return "#c20006"
    }
  }

}
