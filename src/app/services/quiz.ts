// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// @Injectable({
//   providedIn: 'root',
// })
// export class QuizService {
//   // Use a base API URL instead of specifically /quizzes
//   private baseUrl = 'http://localhost:8080/api'; 

//   constructor(private http: HttpClient) { }

//   getQuizzes(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/quizzes`);
//   }

//   createQuiz(quiz: any): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/quizzes`, quiz);
//   }

//   deleteQuiz(id: number): Observable<any> {
//     return this.http.delete(`${this.baseUrl}/quizzes/${id}`);
//   }

//   getQuestionsByQuiz(quizId: number): Observable<any[]> {
//     // This will now correctly call http://localhost:8080/api/questions/quiz/4
//     return this.http.get<any[]>(`${this.baseUrl}/questions/quiz/${quizId}`);
//   }

//   submitAnswers(quizId: number, userId: number, answers: string[]): Observable<any> {
//     return this.http.post<any>(`${this.baseUrl}/results/submit?quizId=${quizId}&userId=${userId}`, answers);
//   }
// }





// Define this at the top of your quiz.ts file
export interface Quiz {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
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
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // Fetch all quizzes
  getQuizzes(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.baseUrl}/quizzes`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new quiz
  createQuiz(quiz: any): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.baseUrl}/quizzes`, quiz).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a quiz
  deleteQuiz(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/quizzes/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch questions for a specific quiz
 getQuestionsByQuiz(quizId: number): Observable<any[]> {
  // Correctly calls http://localhost:8080/api/questions/quiz/4
  return this.http.get<any[]>(`${this.baseUrl}/questions/quiz/${quizId}`);
}

  // Submit final answers for scoring
  submitAnswers(quizId: number, userId: number, answers: string[]): Observable<any> {
    // This calls the Postman-verified submit endpoint
    return this.http.post<any>(`${this.baseUrl}/results/submit?quizId=${quizId}&userId=${userId}`, answers);
  }

  // Common error handler to debug CORS or Path issues
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Check if Backend is running and @CrossOrigin is added to Controller!');
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}