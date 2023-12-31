import { Component, OnDestroy, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { UserSettingsService } from "../user-settings.service";
import { FormsModule } from '@angular/forms';

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

  constructor(private router: Router, private userSettingsService: UserSettingsService) {
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

    this.userSettingsService.lastLessonId = 1234;
    // Could execute code (send save request to server)... then navigate
    this.router.navigate(['lesson-list']).then(res => {
      // Handle the navigation result if needed
    });
  }

  saveFlashcard(title: string, question: string, answer: string) {
    // Create a new flashcard
    let flashcard = { title: title, question: question, answer: answer };

    // Get the existing flashcards from localStorage
    let flashcards = JSON.parse(localStorage.getItem('flashcards') as string) || [];

    // Add the new flashcard to the array
    flashcards.push(flashcard);

    // Save the updated array back to localStorage
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }
}
