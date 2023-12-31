import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Import your authentication service
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  credentials = { email: '', username: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.credentials).subscribe(
      (response) => {
        // Handle successful registration, e.g., store tokens, update UI, etc.
        // After successful registration, you can redirect the user to a specific page
        this.router.navigate(['/lesson-list']);
      },
      (error) => {
        // Handle registration error, e.g., show error message
        console.error('Registration error:', error);
      }
    );
  }
}
