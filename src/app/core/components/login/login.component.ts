import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', this.username);
        this.router.navigate(['/products']);
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
