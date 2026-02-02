import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MaterialModule], 
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.scss'
})

export class QuizListComponent implements OnInit {
  quizzes: any[] = []; 

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.quizService.getQuizzes().subscribe((res: any) => {
      this.quizzes = res; // This fills the screen with real quizzes
    });
  }
}