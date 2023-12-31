import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Import your authentication service
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-menu-nav-bar',
  templateUrl: './menu-nav-bar.component.html',
  styleUrls: ['./menu-nav-bar.component.css'],
})
export class MenuNavBarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); // Implement this method in your AuthService
  }

  isOnHomePage(): boolean {
    return this.router.url === '/';
  }
  

  logout(): void {
    this.authService.logout(); // Implement this method in your AuthService
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }
}
