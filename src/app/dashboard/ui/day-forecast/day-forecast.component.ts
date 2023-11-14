import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-day-forecast',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './day-forecast.component.html',
  styleUrl: './day-forecast.component.scss'
})
export class DayForecastComponent {

}
