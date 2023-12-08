import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-record-toolbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-record-toolbox.component.html',
  styleUrl: './history-record-toolbox.component.scss'
})
export class HistoryRecordToolboxComponent {
  @Output() leave = new EventEmitter()

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.leave.emit();
  }
}
