// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  // If we already have the role, check it immediately
  const expectedRole = route.data['role'];
  if (authService.getRole()) {
    return checkRole(authService.getRole(), expectedRole, router);
  }

  // If we don't have the role yet, fetch it from the server first
  return authService.getUserInfo().pipe(
    map(user => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }
      return checkRole(user.role, expectedRole, router);
    })
  );
};

// Helper function to validate roles
function checkRole(userRole: string | null, expectedRole: string, router: Router): boolean {
  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/player/quizzes']);
    return false;
  }
  return true;
}