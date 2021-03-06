export class ChatSocketMessage {
  type: string;
  id: number;
  room: string;
  status: string;
  sender: string;
  message: string;

  constructor(type: string, id: number, room: string, status: string, sender: string, message: string) {
    this.type = type;
    this.id = id;
    this.room = room;
    this.status = status;
    this.sender = sender;
    this.message = message;
  }
}
