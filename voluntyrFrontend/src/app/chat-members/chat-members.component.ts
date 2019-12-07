import {Component, Input, OnInit} from '@angular/core';
import {ChatMember, ChatRoom, ChatService} from '@app/_services/chat.service';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.css']
})
export class ChatMembersComponent implements OnInit {

  @Input() chatRoom: ChatRoom;
  public members: ChatMember[] = new Array<ChatMember>();

  constructor(private chatService: ChatService) { }

  ngOnInit() {
  }

}
