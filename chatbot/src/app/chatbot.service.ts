import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://integrate.api.nvidia.com/v1/chat/completions';
  private apiKey = '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'; // Replace with your actual API key

  constructor(private http: HttpClient) { }

  getResponse(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    });

    const body = {
      model: 'nvidia/llama-3.1-nemotron-70b-instruct',
      messages: [{ role: 'user', content: message }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}
