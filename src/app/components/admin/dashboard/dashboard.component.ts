import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { QuizService, Quiz } from '../../../services/quiz'; // Use the interface we defined
import { QuizEditorComponent } from '../../gamemaster/quiz-editor/quiz-editor.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule], //  MaterialModule is here for the table
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  quizzes: Quiz[] = [];

  constructor(
    private quizService: QuizService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data;
      },
      error: (err) => console.error('Error loading quizzes', err),
    });
  }

  openQuizEditor(quiz?: Quiz): void {
    const dialogRef = this.dialog.open(QuizEditorComponent, {
      width: '600px',
      data: quiz ? { ...quiz } : null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.quizService.createQuiz(result).subscribe({
        next: () => this.loadQuizzes(),
        error: (err) => console.error('Error creating quiz', err),
      });
    });
  }

  deleteQuiz(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this quiz?');

    if (!confirmed) return;

    this.quizService.deleteQuiz(id).subscribe({
      next: () => {
        // instant UI update
        this.quizzes = this.quizzes.filter(q => q.id !== id);
      },
      error: (err) => console.error('Error deleting quiz', err),
    });
  }
}