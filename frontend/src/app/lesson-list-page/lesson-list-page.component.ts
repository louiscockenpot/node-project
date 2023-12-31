import { Component, OnInit } from '@angular/core';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {UserSettingsService} from "../user-settings.service";
import { API_URL } from '../config'; // Update the path as per your project structure
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Flashcard {
  title: string;
  question: string;
  answer: string;
  flipped?: boolean; // Optional property to track if the card is flipped
}

@Component({
  selector: 'app-lesson-list-page',
  templateUrl: './lesson-list-page.component.html',
  styleUrls: ['./lesson-list-page.component.css']
})
export class LessonListPageComponent implements OnInit{
  flashcards: Flashcard[] = []; // Use the Flashcard interface

  
  ngOnInit(): void {
    this.loadFlashcards();
  }

  loadFlashcards() {
    this.getFlashcards().subscribe(
      (flashcards: Flashcard[]) => {
        this.flashcards = flashcards.map((flashcard: Flashcard) => ({
          ...flashcard,
          flipped: false
        }));
      },
      (error) => {
        console.error('Error loading flashcards:', error);
      }
    );
  }

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(API_URL + "/api/package/1/facts");
  }

  constructor(
    private userSettingsService: UserSettingsService,
    private http: HttpClient // Inject FlashcardService
  ) {
    console.log("get lastLessonId:", userSettingsService.lastLessonId);
  }
  protected readonly faHome = faHome;
}

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {
  constructor(private http: HttpClient) {}

  getFlashcards(): Observable<Flashcard[]> {
    return this.http.get<Flashcard[]>(API_URL + "/api/package/1/facts");
  }
}
