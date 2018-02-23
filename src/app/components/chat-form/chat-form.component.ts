import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {
  message: string;
  constructor(private chat: ChatService) { }

   ngOnInit() {
  }
  sendMessage() {
    if((this.message.length)>0){
    this.chat.sendMessage(this.message);
    this.message = '';
  }
  else{
console.log('no text');
  }
}

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }
}
