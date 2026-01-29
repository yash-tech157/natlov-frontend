import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizListComponent } from './components/player/quiz-list/quiz-list.component';
import { QuizAttemptComponent } from './components/player/quiz-attempt/quiz-attempt.component';
// If folder is 'admin'
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'player/quizzes', component: QuizListComponent },
  { path: 'player/quiz/:id', component: QuizAttemptComponent }, // Must have :id
  { path: 'admin/dashboard', component: AdminDashboard },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];