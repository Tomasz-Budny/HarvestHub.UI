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
    this.matIconRegistry.addSvgIcon(
      'little-cloudy', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/little-cloudy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'cloudy', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/cloudy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'rainy', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/rainy.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'dots', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/dots.svg")
    );
    this.matIconRegistry.addSvgIcon(
      'close', 
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/icons/close.svg")
    );
  }
}
