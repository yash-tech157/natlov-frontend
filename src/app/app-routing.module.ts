import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizAttemptComponent } from './components/player/quiz-attempt/quiz-attempt.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'quiz', component: QuizAttemptComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }