import { Injectable } from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal-compatibility';
import {SocketMessage} from '@app/_models/SocketMessage';
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

export class ChatMember {
  email: string;
  online: boolean;

  constructor(email, online) {
    this.email = email;
    this.online = online;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // https://github.com/joewalnes/reconnecting-websocket
  private _chatRoomAPI = `${environment.apiUrl}` + "/chat/rooms/";
  private _socket: WebSocketSubject<SocketMessage>;

  private _chatId: string;

  constructor(private http: HttpClient) {
    let curUser = JSON.parse(localStorage.getItem("currentUser"));
    this._socket = new WebSocketSubject<SocketMessage>(`${environment.wsChatUrl}` + curUser.access + "/");
    console.log("New Service!");
  }

  getChatRooms(): Observable<ChatRoom[]> {
    return this.http.get<ChatRoom[]>(this._chatRoomAPI);
  }

  get socket(): WebSocketSubject<SocketMessage> {
    console.log("New Socket!");
    return this._socket;
  }

  set chatId(value: string) {
    this._chatId = value;
  }
}
