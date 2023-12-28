import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../dashboard/data-access/map.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('searchBar') searchBar: ElementRef;

  constructor(
    public mapService: MapService
  ) { }

  ngAfterViewInit() {
    this.mapService.initializeSearchBar(this.searchBar);
  }
}
