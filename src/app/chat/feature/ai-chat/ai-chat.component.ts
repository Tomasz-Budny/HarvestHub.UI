import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { UserContextService } from "../../../auth/data-access/user-context.service";
import { AIChatService } from "../../data-access/ai-chat.service";
import { AIChatPrompt } from "../../data-model/ai-chat-prompt.model";
import { firstValueFrom } from "rxjs";

@Component({
  selector: 'ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-chat.component.html',
  styleUrl: './ai-chat.component.scss'
})
export class AIChatComponent { 
  isOpen: boolean = false;
  messages: ChatMessage[] = [];
  userInput: string = '';
  isLoading: boolean = false;

  constructor(
    private userContextService: UserContextService,
    private aiChatService: AIChatService
  ) {}

  openChat() {
    this.isOpen = true;
  }

  closeChat() {
    this.isOpen = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // zapobiega dodaniu nowej linii
      this.sendMessage();
    }
  }

  async sendMessage(): Promise<void> {
    if (!this.userInput.trim()) return;

    const userMessage: ChatMessage = { content: this.userInput, sender: 'user' };
    this.messages.push(userMessage);
    const prompt = this.userInput;
    this.userInput = '';
    this.isLoading = true;

    try {
      const aiResponse = await this.getAIResponse(prompt);
      this.messages.push({ content: aiResponse, sender: 'ai' });
    } catch (err) {
      this.messages.push({ content: 'Wystąpił błąd podczas komunikacji z AI.', sender: 'ai' });
    } finally {
      this.isLoading = false;
    }
  }

  async getAIResponse(prompt: string): Promise<string> {
    return new Promise(async resolve => {

      const aiChatPrompt: AIChatPrompt = {
        client_id: this.userContextService.user().id,
        prompt: prompt
      };

      const response = await firstValueFrom(this.aiChatService.conversate(aiChatPrompt));

      resolve(response.response);
    });
  }
}

interface ChatMessage {
  content: string;
  sender: 'user' | 'ai';
}