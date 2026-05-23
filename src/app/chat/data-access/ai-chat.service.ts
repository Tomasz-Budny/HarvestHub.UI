import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AIChatPrompt } from "../data-model/ai-chat-prompt.model";
import { HttpClient } from "@angular/common/http";
import { AIChatResponse } from "../data-model/ai-chat-response.model";

// test

@Injectable({
  providedIn: 'root'
})
export class AIChatService {
  private baseUrl: string = 'http://127.0.0.1:8000'; 

  constructor(
    protected http: HttpClient,
  ) { }
  

  conversate(prompt: AIChatPrompt): Observable<AIChatResponse> {
    return this.http.post<AIChatResponse>(`${this.baseUrl}/generate`, prompt);
  }
}