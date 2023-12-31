import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './config';

@Injectable({
  providedIn: 'root',
})
export class StatsDataService {
  constructor(private http: HttpClient) {}

  getFactStatistics(): Observable<any[]> {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    // Check if a token is available
    if (!token) {
      // Handle the case where there's no token (e.g., redirect to login)
      // You can add your error handling logic here
      return new Observable<any[]>(observer => observer.error('No token available'));
    }

    // Set the headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Send the HTTP request with the headers (Use GET request)
    return this.http.get<any[]>(`${API_URL}/api/fact-statistics`, { headers });
  }
}
