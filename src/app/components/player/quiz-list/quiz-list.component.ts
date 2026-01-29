



import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Ensure this is here!
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule], // And here

   templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})
export class QuizListComponent {
  quizzes = [
    { id: 1, title: 'Java Basics', description: 'Test your Core Java knowledge.', duration: '10 min' },
    { id: 2, title: 'React Hooks', description: 'Advanced React patterns and state.', duration: '15 min' },
    { id: 3, title: 'SQL Fundamentals', description: 'Queries, Joins, and Indexing.', duration: '12 min' },
    { id: 4, title: 'JavaScript Fundamentals', description: 'Variables, functions, and scope.', duration: '12 min' },
    { id: 5, title: 'Python Fundamentals', description: 'Variables, functions, and scope.', duration: '12 min' }
  ];
}