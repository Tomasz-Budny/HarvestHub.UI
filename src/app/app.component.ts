import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'sun', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/sun.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'rain', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/rain.svg")
    );
  }
}
