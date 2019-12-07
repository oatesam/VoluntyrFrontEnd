export class SocketMessage {
  type: string;
  room: string;
  status: string;
  sender: string;
  message: string;

  constructor(type: string, room: string, status: string, sender: string, message: string) {
    this.type = type;
    this.room = room;
    this.status = status;
    this.sender = sender;
    this.message = message;
  }
}
