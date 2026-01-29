import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quiz-attempt',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
   templateUrl: './quiz-attempt.component.html',
  styleUrl: './quiz-attempt.component.scss'
})
export class QuizAttemptComponent {
  currentStep = 0;
  isFinished = false;
  totalScore = 0;
  selectedOption: string = '';

  // Data for UI testing - 10 Java Questions
  questions = [
    { id: 1, text: "Which keyword is used to create a class in Java?", options: ["class", "struct", "new", "object"], correct: "class" },
    { id: 2, text: "What is the default value of a boolean in Java?", options: ["true", "false", "null", "0"], correct: "false" },
    { id: 3, text: "Which of these is not a Java wrapper class?", options: ["Integer", "Boolean", "String", "Character"], correct: "String" },
    { id: 4, text: "Which method is the entry point of a Java program?", options: ["start()", "init()", "main()", "run()"], correct: "main()" },
    { id: 5, text: "What is the size of an 'int' variable in Java?", options: ["16-bit", "32-bit", "64-bit", "8-bit"], correct: "32-bit" },
    { id: 6, text: "Which keyword is used for inheritance in Java?", options: ["implements", "extends", "inherits", "using"], correct: "extends" },
    { id: 7, text: "Which package is imported by default in all Java programs?", options: ["java.util", "java.io", "java.lang", "java.net"], correct: "java.lang" },
    { id: 8, text: "Which of these is used to handle exceptions in Java?", options: ["try-catch", "throw-throws", "finally", "All of the above"], correct: "All of the above" },
    { id: 9, text: "Can we have multiple main methods in a Java class?", options: ["Yes", "No"], correct: "Yes" },
    { id: 10, text: "Is Java a pure object-oriented language?", options: ["Yes", "No"], correct: "No" }
  ];

  next() {
    // Check if the selected answer is correct before moving
    if (this.selectedOption === this.questions[this.currentStep].correct) {
      this.totalScore++;
    }

    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.selectedOption = ''; // Reset for next question
    } else {
      this.isFinished = true;
    }
  }
}