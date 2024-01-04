import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from '../../../dashboard/data-access/map.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/data-access/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserContextService } from '../../../auth/data-access/user-context.service';

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
    public mapService: MapService,
    private authService: AuthService,
    public userContextService: UserContextService,
    private router: Router
  ) { 
    this.authService.beforeLogout$.pipe(
      takeUntilDestroyed()
    ).subscribe(_ => {
      this.router.navigate(['auth', 'login']);
    });
  }

  ngAfterViewInit() {
    this.mapService.initializeSearchBar(this.searchBar);
  }

  onLogout() {
    this.authService.logout();
  }
}
