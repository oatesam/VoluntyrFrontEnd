import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {ChatSocketMessage} from '@app/_models/ChatSocketMessage';
import {environment} from '@environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class ChatRoom {
  id: string;
  name: string;
  // unread: number = 12;
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

export class StatusSocketMessage {
  type: string;
  room: string;
  status: string;
  user: string;

  constructor(room, status, user) {
    this.type = "online_message";
    this.room = room;
    this.status = status;
    this.user = user;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // https://github.com/joewalnes/reconnecting-websocket
  private _chatRoomAPI = `${environment.apiUrl}` + "/chat/rooms/";
  private _roomWs = `${environment.wsUrl}` + "/online/";
  private _chatSocket: WebSocketSubject<ChatSocketMessage>;

  private _chatId: string;

  constructor(private http: HttpClient) {
    // let curUser = JSON.parse(localStorage.getItem("currentUser"));
    // this._chatSocket = new WebSocketSubject<SocketMessage>(`${environment.wsUrl}` + 'chat/' + curUser.access + "/");
    console.log("New Service!");
  }

  getChatRooms(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(this._chatRoomAPI);
  }

  public getChatSocket() {
    let curUser = JSON.parse(localStorage.getItem("currentUser"));
    return new WebSocketSubject<ChatSocketMessage>(`${environment.wsUrl}` + 'chat/' + curUser.access + "/" + this._chatId + "/");
  }

  public getStatusSocket() {
    let curUser = JSON.parse(localStorage.getItem("currentUser"));
    return new WebSocketSubject<StatusSocketMessage>(`${environment.wsUrl}` + 'online/' + curUser.access + "/");
  }


  set chatId(value: string) {
    this._chatId = value;
  }
}
