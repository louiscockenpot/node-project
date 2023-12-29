import { Component, OnInit } from '@angular/core';
import {faHome} from "@fortawesome/free-solid-svg-icons";
import {UserSettingsService} from "../user-settings.service";

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
    this.flashcards = this.getFlashcards().map((flashcard: Flashcard) => ({
      ...flashcard,
      flipped: false
    }));
  }

  getFlashcards(): Flashcard[] {
    // Get the flashcards from localStorage
    let flashcards = JSON.parse(localStorage.getItem('flashcards') as string) || [];
    return flashcards;
  }

  constructor(private userSettingsService: UserSettingsService) {
    console.log("get lastLessonId:", userSettingsService.lastLessonId);
  }
  protected readonly faHome = faHome;
}
