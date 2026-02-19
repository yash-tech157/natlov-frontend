import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Quiz {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  questionsList?: Question[];
}

export interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Fetch all quizzes
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes`);
  }

  // Create quiz
  createQuiz(quiz: any): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/quizzes`, quiz);
  }

  // Delete quiz
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quizzes/${id}`);
  }

  // Update quiz
  updateQuiz(id: number, quiz: any): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.baseUrl}/quizzes/${id}`, quiz);
  }

  // Get questions by quiz
  getQuestionsByQuiz(quizId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/questions/quiz/${quizId}`);
  }

  // Submit answers
  submitAnswers(quizId: number, answers: string[]): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/results/submit?quizId=${quizId}`,
      answers
    );
  }

  // Get individual result
  getResultById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/results/${id}`);
  }

  // Get leaderboard
  getLeaderboard(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/results/leaderboard`);
  }

  getPlayerCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/admin/stats/players/count`);
  }
}