import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { QuizService } from '../../../services/quiz';
import { Question } from '../../../services/quiz';

@Component({
  selector: 'app-quiz-attempt',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, RouterModule],
  templateUrl: './quiz-attempt.component.html',
  styleUrl: './quiz-attempt.component.scss'
})
export class QuizAttemptComponent implements OnInit {

  quizId!: number;

  // ✅ Properly typed
  questions: Question[] = [];

  currentStep = 0;
  selectedOption = '';
  userAnswers: string[] = [];

  isFinished = false;
  totalScore = 0;

  // ✅ Explicit loading flag (VERY IMPORTANT)
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
     private cdr: ChangeDetectorRef
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
        console.log('Quiz Data Loaded Successfully:', data);
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error('Error loading questions', err);
        this.isLoading = false;
         this.cdr.detectChanges()
      }
    });
  }

  next(): void {
    if (!this.selectedOption) return;

    this.userAnswers.push(this.selectedOption);

    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.selectedOption = '';
    } else {
      this.submitQuiz();
    }
  }

  submitQuiz(): void {
    const userId = 1; // temporary
    this.quizService.submitAnswers(this.quizId, userId, this.userAnswers)
      .subscribe({
        next: (res) => {
          this.totalScore = res.score;
          this.isFinished = true;
        },
        error: (err) => console.error('Submission failed', err)
      });
  }
}