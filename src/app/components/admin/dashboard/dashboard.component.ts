import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { QuizService, Quiz } from '../../../services/quiz'; 
import { QuizEditorComponent } from '../../gamemaster/quiz-editor/quiz-editor.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog
  ) {}

  playerCount: number = 0;
  ngOnInit(): void {
  this.loadQuizzes(); // This calls the QuizService
  this.loadStats();
}

loadStats(): void {
  this.quizService.getPlayerCount().subscribe({
    next: (count) => {
      this.playerCount = count;
    },
    error: (err) => console.error('Error loading player count', err)
  });
}

loadQuizzes(): void {
  this.quizService.getQuizzes().subscribe({
    next: (data) => {
      this.quizzes = data; // Updates the total count in HTML
    },
    error: (err) => console.error('Error loading quizzes', err)
  });
}
openQuizEditor(quiz?: Quiz): void {
  const dialogRef = this.dialog.open(QuizEditorComponent, {
    width: '600px',
    data: quiz ? { ...quiz } : null, // Pass a copy of the quiz to edit
  });

  dialogRef.afterClosed().subscribe((result) => {
    if (!result) return;

    if (quiz && quiz.id) {
      // FIX: If we have an ID, call UPDATE
      this.quizService.updateQuiz(quiz.id, result).subscribe({
        next: () => this.loadQuizzes(),
        error: (err) => console.error('Error updating quiz', err),
      });
    } else {
      // FIX: If no ID, call CREATE
      this.quizService.createQuiz(result).subscribe({
        next: () => this.loadQuizzes(),
        error: (err) => console.error('Error creating quiz', err),
      });
    }
  });
}
deleteQuiz(id: number): void {
  if (confirm('Are you sure you want to delete this quiz?')) {
    this.quizService.deleteQuiz(id).subscribe({
      next: () => {
        // Remove the deleted quiz from the local array to update the UI
        this.quizzes = this.quizzes.filter(q => q.id !== id);
      },
      error: (err) => console.error('Delete failed', err)
    });
  }
}
}