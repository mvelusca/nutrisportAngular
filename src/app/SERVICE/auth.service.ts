import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, user).pipe(
      tap(response => {
        if (response && response.role) {
          this.redirectToRolePage(response.role);
        } else {
          console.error('No role found in response');
        }
      })
    );
  }

  redirectToRolePage(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/admin']);
    } else if (role === 'coach') {
      this.router.navigate(['/coach']);
    } else if (role === 'member') {
      this.router.navigate(['/member']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
