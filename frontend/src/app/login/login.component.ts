import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import your authentication service
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { email: '', username: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login, e.g., set tokens or user information
        this.router.navigate(['/lesson-list']); // Navigate to a protected page after login
      },
      (error) => {
        // Handle login error, e.g., show an error message
        console.error('Login error:', error);
      }
    );
  }
}
