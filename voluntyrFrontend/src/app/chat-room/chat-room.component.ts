import {
  AfterViewInit,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {ChatRoom, ChatService, TypingSocketMessage} from '@app/_services/chat.service';
import {ChatSocketMessage} from '@app/_models/ChatSocketMessage';
import {WebSocketSubject} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() chatRoom: ChatRoom;
  @Output() chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();
  @ViewChild('autoscroll', {read: ElementRef, static: false}) viewer: ElementRef;

  private sender: string;
  public messages: ChatSocketMessage[] = new Array<ChatSocketMessage>();
  public typing: TypingSocketMessage[] = new Array<TypingSocketMessage>();
  private chatSocket: WebSocketSubject<ChatSocketMessage>;
  private typingSocket: WebSocketSubject<TypingSocketMessage>;
  public clientMessage: string;
  private reconnectChat: boolean = false;
  private reconnectTyping: boolean = false;

  constructor(
    private chatService: ChatService,
  ) {}

  ngAfterViewInit(): void {
    console.log("AfterViewInit");
    this.scroll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chatRoom'] && !changes['chatRoom'].isFirstChange()) {
      console.error("OnChanges: ", changes);
      this.messages = new Array<ChatSocketMessage>();
      this.typing = new Array<TypingSocketMessage>();
      if (this.chatSocket && !this.chatSocket.closed) {
        this.reconnectChat = true;
        // this.makeChatSocket();
        this.chatSocket.complete();
      } else {
        this.makeChatSocket();
      }
      if (this.typingSocket && !this.typingSocket.closed) {
        this.reconnectTyping = true;
        // this.makeChatSocket();
        this.typingSocket.complete();
      } else {
        this.makeTypingSocket();
      }
    }
  }

  ngOnDestroy(): void {
    console.error("OnDestroy");
    if (this.chatSocket && !this.chatSocket.closed) {
      this.chatSocket.complete();
    }
    if (this.typingSocket && !this.typingSocket.closed) {
      this.typingSocket.complete();
    }
  }

  ngOnInit(): void {
    console.error("Onit");
    this.sender = localStorage.getItem("sender");
    this.makeChatSocket();
    this.makeTypingSocket();
  }

  public sendTypingUpdate(typing: boolean): void {
    let msg: TypingSocketMessage;
    if (typing) {
      msg = new TypingSocketMessage(this.sender, "true");
    } else {
      msg = new TypingSocketMessage(this.sender, "false");
    }
    this.typingSocket.next(msg);
  }

  public getTypingMessage(): string {
    let s: string = "";
    if (this.typing.length > 1) {
      for (let typer of this.typing) {
        if (this.typing.indexOf(typer, 0) === (this.typing.length - 1)) {
          s = s + " and " + typer.user;
        } else {
          s = s + typer.user + ", ";
        }
      }
      s = s + " are typing..."
    } else if (this.typing.length === 1) {
      let typer = this.typing[0];
      s = typer.user + " is typing...";
    }
    return s;
  }

  private makeTypingSocket(): void {
    this.chatService.chatId = this.chatRoom.id;
    this.typingSocket = this.chatService.getTypingSocket();
    this.typingSocket.subscribe(
      msg => {
        console.warn("Received Typing Message: ", msg);
        if (msg.type == "typing_message" && msg.user != this.sender) {
          for (let typer of this.typing) {
            if (typer.user === msg.user) {
              if (msg.typing === 'false') {
                this.typing.splice(this.typing.indexOf(typer, 0), 1);
              } else if (msg.typing === 'true') {
                typer.typing = 'true';
              }
              return;
            }
          }
          this.typing.push(msg);
        }
      },
      error => {
        console.error("Socket Error");
        console.error(error);
        this.chatSocket = null;
        this.chatRoom = null;
        this.chatRoomChange.emit(null);
      },
      () => {
        if (this.reconnectTyping) {
          this.reconnectTyping = false;
          this.makeTypingSocket();
        } else {
          console.warn("Complete");
        }
      }
    );
  }

  public test() {
    console.log(this.messages);
  }
  private makeChatSocket(): void {
    this.chatService.chatId = this.chatRoom.id;
    this.chatSocket = this.chatService.getChatSocket();
    this.chatSocket.subscribe(
      msg => {
        console.warn("Received Message: ", msg);
        if (msg.type == "chat_message") {
          this.messages.push(msg);
          this.scroll();
        } else if (msg.type == "status_message" && msg.sender == this.sender) {
          for (let message of this.messages) {
            if (msg.id == message.id) {
              if (message.status == "Sent") {
                message.status = msg.status;
              } else if (message.status == "Delivered" && msg.status == "Read") {
                message.status = msg.status;
              } 
              return;
            }
          }
        }
      },
      error => {
        console.error("Socket Error");
        console.error(error);
        this.chatSocket = null;
        this.chatRoom = null;
        this.chatRoomChange.emit(null);
      },
      () => {
        if (this.reconnectChat) {
          this.reconnectChat = false;
          this.makeChatSocket();
        } else {
          console.warn("Complete");
        }
      }
    );
  }

  public getMessage(): string {
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
    const message = new ChatSocketMessage("chat_message", 0, this.chatRoom.id, "", this.sender, this.getMessage());
    console.warn("Sent Message: ", message);
    // this.messages.push(message);
    this.chatSocket.next(message);
    this.clientMessage = "";
  }

  public read(message: ChatSocketMessage) {
    if (message.status != "Read") {
      message.type = "status_message";
      message.status = "Read";
      this.chatSocket.next(message)
    }
  }

  public onScroll() {
    if (this.getDiff() <= 0) {
      for (let msg of this.messages) {
        this.read(msg);
      }
    }
  }

  public isMine(message: ChatSocketMessage): boolean {
    return message && message.sender === this.sender
  }

  private scroll(): void {
    console.log("Scroll");
    // viewer.scrollTop = viewer.scrollHeight;
    // let viewer = document.getElementById("viewer");
    console.log(this.viewer);
    setTimeout(() => {
      this.scrollDown()
    }, 10);
  }

  private scrollDown(i = 1, d = 0): void {
    if (d < 1) {
      d = this.getDiff();
    }
    if (d > 0 && i <= 120) {
      setTimeout(() => {
        let diff = this.easeInSin(i/120) * this.getDiff();
      this.viewer.nativeElement.scrollTop += diff;
      this.scrollDown(++i, d);
      }, 1/60);
    }
  }

  private getDiff(): number {
    if (!this.viewer) {
      return -1;
    }
    return this.viewer.nativeElement.scrollHeight - (this.viewer.nativeElement.scrollTop + this.viewer.nativeElement.clientHeight);
  }

  private easeInSin(n: number): number {
    return (1 + Math.sin(Math.PI*n-Math.PI/2))/2;
  }
}
