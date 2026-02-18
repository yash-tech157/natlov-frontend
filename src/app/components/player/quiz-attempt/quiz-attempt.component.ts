import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { QuizService } from '../../../services/quiz';
import { Question } from '../../../services/quiz';
import { AuthService } from '../../../services/auth.service'; // Ensure this is importedq

@Component({
  selector: 'app-quiz-attempt',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  templateUrl: './quiz-attempt.component.html',
  styleUrl: './quiz-attempt.component.scss'
})
export class QuizAttemptComponent implements OnInit {

  quizId!: number;

  questions: Question[] = [];

  currentStep = 0;
  selectedOption: string | null = null;


  userAnswers: string[] = [];

  isFinished = false;
  totalScore = 0;
  isLoading = true;

  timePerQuestion = 30; 
timeLeft = this.timePerQuestion;
timerInterval: any;


  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.quizId = Number(idParam);
      this.loadQuestions();
    }
  }

  loadQuestions(): void {
    this.quizService.getQuestionsByQuiz(this.quizId).subscribe({
      next: (data: Question[]) => {
        this.questions = data;
        this.isLoading = false;
        this.startTimer();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading questions', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
startTimer(): void {
  this.clearTimer();
  this.timeLeft = this.timePerQuestion;

  this.timerInterval = setInterval(() => {
    this.timeLeft--;

    this.cdr.detectChanges();

    if (this.timeLeft === 0) {
      this.onTimeUp();
    }
  }, 1000);
}


clearTimer(): void {
  if (this.timerInterval) {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
}

onTimeUp(): void {
  this.userAnswers[this.currentStep] = this.selectedOption || '';

  if (this.currentStep < this.questions.length - 1) {
    this.currentStep++;
    this.selectedOption = this.userAnswers[this.currentStep] || null;
    this.startTimer();
  } else {
    this.submitQuiz();
  }
}


  
  next(): void {
    if (!this.selectedOption) return;

    this.userAnswers[this.currentStep] = this.selectedOption;

    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.selectedOption = this.userAnswers[this.currentStep] || null;
      this.startTimer();
    } else {
      this.submitQuiz();
    }
  }

  previous(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.selectedOption = this.userAnswers[this.currentStep] || null;
      this.startTimer();
    }
  }

//  submitQuiz(): void {
//   this.clearTimer(); 

//   const userId = 1;
// this.quizService.submitAnswers(this.quizId, this.userAnswers)

//     .subscribe({
//       next: (res) => {
//         this.totalScore = res.score;
//         this.isFinished = true;
//       },
//       error: (err) => console.error('Submission failed', err)
//     });
// }

submitQuiz(): void {
  this.clearTimer(); 

  // Adding the type 'any' to the user parameter resolves TS7006
  this.authService.getUserInfo().subscribe((user: any) => {
    if (user && user.id) {
      // Use the dynamic ID from the logged-in user
      this.quizService.submitAnswers(this.quizId, this.userAnswers)
        .subscribe({
          next: (res) => {
            this.totalScore = res.score;
            this.isFinished = true;
          },
          error: (err) => console.error('Submission failed', err)
        });
    }
  });
}
}
