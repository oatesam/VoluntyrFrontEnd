import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatRoom, ChatService} from '@app/_services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnChanges {

  public chatRooms: ChatRoom[];
  public selectedChatRoom: ChatRoom;
  constructor(public chatService: ChatService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getChatRooms();
  }

  ngOnInit(): void {
    this.getChatRooms();
  }

  private getChatRooms() {
    this.chatService.getChatRooms().subscribe(
      data => {
        this.chatRooms = data;
        console.log("Chat rooms: ", data);
      },
      error => {
        console.error(error);
      }
    )
  }

  selectChatRoom(chatRoom) {
    this.selectedChatRoom = chatRoom;
  }

  leaveChat() {
    this.selectedChatRoom = null;
    this.getChatRooms();
  }

}
