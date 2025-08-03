import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule, MatIconModule  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  username = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.username = localStorage.getItem('username') || '';
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}

