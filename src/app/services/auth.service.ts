import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of,tap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userRole: string | null = null;
  private userId: number | null = null;

  constructor(private http: HttpClient) {}

 getUserInfo(): Observable<any> {
    return this.http.get('http://localhost:8080/api/auth/user').pipe(
      tap((user: any) => {
        this.userRole = user.role;
        this.userId = user.id;
      }),
      catchError(() => {
        this.userRole = null;
        return of(null);
      })
    );
  }

  getRole() { return this.userRole; }
}