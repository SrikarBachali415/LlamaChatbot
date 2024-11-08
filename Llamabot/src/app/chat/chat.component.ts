import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  response: string = '';

  constructor(private chatService: ChatbotService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      this.chatService.sendMessage(this.userInput).subscribe(
        (data) => {
          this.response = data.response;
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
}