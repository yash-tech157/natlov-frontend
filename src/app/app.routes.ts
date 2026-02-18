import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuizListComponent } from './components/player/quiz-list/quiz-list.component';
import { QuizAttemptComponent } from './components/player/quiz-attempt/quiz-attempt.component';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth-guard';
import { LoginSuccessComponent } from './components/login-success/login-success.component';
import { Results } from './components/player/results/results';
import { CanActivateFn, Router } from '@angular/router';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'login-success', component: LoginSuccessComponent },
  { path: 'player/results/:id', component: Results },
  { path: 'player/quizzes', component: QuizListComponent , canActivate: [authGuard]},
  { path: 'player/quiz/:id', component: QuizAttemptComponent },
  {
  path: 'login-success',
  component: LoginSuccessComponent
}
,
{ 
    path: 'admin/dashboard', 
    component: AdminDashboard, 
    canActivate: [authGuard] ,
    data: { role: 'ROLE_GAMEMASTER' }
    // Apply the guard here
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];