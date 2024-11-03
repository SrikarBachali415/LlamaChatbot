import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userMessage: string = '';
  botResponse: string = '';

  constructor(private chatbotService: ChatbotService) { }

  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatbotService.getResponse(this.userMessage).subscribe({
        next: (response) => {
          this.botResponse = response.choices[0].message.content;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
      this.userMessage = ''; // Clear input after sending
    }
  }
}
