import { Component, OnDestroy, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { UserSettingsService } from "../user-settings.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-lesson-edit-form',
  templateUrl: './lesson-edit-form.component.html',
  styleUrls: ['./lesson-edit-form.component.css']
})
export class LessonEditFormComponent implements OnInit, OnDestroy {
  title: string = '';
  question: string = '';
  answer: string = '';
  faHome = faHome;

  // Define the API URL
  private API_URL: string = 'http://your-api-url-here/api/fact'; // Change this to your actual API URL

  constructor(
    private router: Router, 
    private userSettingsService: UserSettingsService,
    private http: HttpClient // Inject HttpClient here
  ) {
    console.log("LessonEditFormComponent.constructor()");
  }

  ngOnInit(): void {
    console.log("LessonEditFormComponent.ngOnInit()");
  }

  ngOnDestroy(): void {
    console.log("LessonEditFormComponent.ngOnDestroy()");
  }

  onClickSubmit() {
    // Save the flashcard
    this.saveFlashcard(this.title, this.question, this.answer);
  }

  saveFlashcard(title: string, question: string, answer: string) {
    // Create a new flashcard
    let flashcard = { title: title, question: question, answer: answer };

    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Authentication token not found');
      return;
    }

    // Set the headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Send the POST request to the server with the flashcard data and the headers
    this.http.post(this.API_URL, flashcard, { headers }).subscribe({
      next: (response) => {
        console.log('Flashcard saved', response);
        // Navigate to lesson-list upon successful save
        this.router.navigate(['lesson-list']);
        this.userSettingsService.lastLessonId = 1234; // Update with actual ID if needed
      },
      error: (err) => {
        console.error('Error saving flashcard:', err);
      }
    });
  }
}
