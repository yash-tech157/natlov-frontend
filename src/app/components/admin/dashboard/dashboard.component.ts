import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  quizzes = [
    { id: 1, title: 'Java Basics', questions: 10 },
    { id: 2, title: 'React Hooks', questions: 15 }
  ];

  deleteQuiz(id: number) {
    if(confirm('Are you sure you want to delete this quiz?')) {
      this.quizzes = this.quizzes.filter(q => q.id !== id);
      console.log('Quiz deleted:', id);
    }
  }
}