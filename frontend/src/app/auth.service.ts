import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Import 'tap' operator
import { API_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; username: string }): Observable<any> {
    return this.http.post(`${API_URL}/api/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Store token in localStorage
          }
        })
      );
  }

  register(credentials: { email: string; username: string }): Observable<any> {
    return this.http.post(`${API_URL}/api/register`, credentials)
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token); // Store token in localStorage
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
