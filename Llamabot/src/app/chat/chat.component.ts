import { Component } from '@angular/core';
import { ChatbotService } from '../chatbot.service';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  userInput: string = '';
  messages: { role: string; content: SafeHtml }[] = [];
  

  constructor(private chatService: ChatbotService, private sanitizer: DomSanitizer) {}
  
  sendMessage() {
    if (this.userInput.trim()) {
      // Add user message to chat
      this.messages.push({ role: 'user', content: this.userInput });

      // Send message to backend
      this.chatService.sendMessage(this.userInput).subscribe(
        async (data) => {
          // Parse the assistant's markdown response
          const parsedContent: string = await marked.parse(data.response);
          const sanitizedContent = this.sanitizeHtml(parsedContent);

          // Add assistant message to chat
          this.messages.push({ role: 'assistant', content: sanitizedContent });
        },
        (error) => {
          console.error('Error:', error);
          this.messages.push({
            role: 'assistant',
            content: this.sanitizeHtml('Error: Unable to process request.')
          });
        }
      );

      // Clear input field
      this.userInput = '';
    }
  }

  sanitizeHtml(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
